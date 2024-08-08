import Head from 'next/head';
import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import Accounting from '@/sections/Accounting';
import isAuth from '@/utils/HOCAuth';

function Id({ accounting }) {
  return (
    <>
      <Head>
        <title>Бухгалтерія</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Accounting accounting={accounting} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data: accounting } = await apiRequest.get(
    `/api/get-accounting-by-id/${id}`,
  );

  return {
    props: {
      accounting,
    },
  };
};

Id.propTypes = {
  accounting: PropTypes.shape({
    status: PropTypes.number.isRequired,
    accounting: PropTypes.shape({
      tax: PropTypes.number,
      year: PropTypes.number,
      month: PropTypes.string,
      file: PropTypes.shape({
        id: PropTypes.number,
        size: PropTypes.number,
        mime: PropTypes.string,
        name: PropTypes.string,
        url: PropTypes.string,
        hash: PropTypes.string,
      }),
      organisation: PropTypes.object,
    }).isRequired,
  }).isRequired,
};

export default isAuth(Id);
