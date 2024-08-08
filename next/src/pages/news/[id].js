import Head from 'next/head';
import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import New from '@/sections/New';

export default function Id({ news: { attributes } }) {
  return (
    <>
      <Head>
        <title>Новина</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <New data={attributes} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const {
    data: { data },
  } = await apiRequest.get(`/api/news-plural/${id}?populate=photo`);

  return {
    props: { news: data },
  };
};

Id.propTypes = {
  news: PropTypes.shape({
    id: PropTypes.number,
    attributes: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
      photo: PropTypes.object,
    }),
  }).isRequired,
};
