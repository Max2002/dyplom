import Head from 'next/head';
import { parseCookies } from 'nookies';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import apiRequest from '@/api/api';
import Home from '@/sections/Home';
import collectionSelector from '@/redux/selectors/getCollection';
import { tokenSelector } from '@/redux/selectors/getUser';

const collectionSel = createStructuredSelector({
  collection: collectionSelector,
  token: tokenSelector,
});

export default function Index({ serverNews, status }) {
  const [news, setNews] = useState([]);
  const { collection, token } = useSelector(collectionSel);

  useEffect(() => {
    if (collection?.news) {
      setNews(collection?.news);
    }
  }, [collection]);

  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Home
        news={news.length === 0 ? serverNews : news}
        status={status}
        token={token}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { idOrganisation } = parseCookies({ req });

  const {
    data: { news: serverNews, status },
  } = await apiRequest.get(`/api/get-news/${idOrganisation || 0}`);

  return {
    props: { serverNews, status },
  };
};

Index.propTypes = {
  serverNews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      createdAt: PropTypes.string,
      date: PropTypes.string,
      description: PropTypes.string,
      photo: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          url: PropTypes.string,
          name: PropTypes.string,
        }),
      ),
      publishedAt: PropTypes.string,
      test: PropTypes.bool,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
  status: PropTypes.number.isRequired,
};
