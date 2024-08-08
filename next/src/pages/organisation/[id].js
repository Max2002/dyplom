import PropTypes from 'prop-types';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import apiRequest from '@/api/api';
import Organisation from '@/sections/Organisation';
import { fullNameSelector, idSelector } from '@/redux/selectors/getUser';

const fullNameSel = createStructuredSelector({
  id: idSelector,
  fullName: fullNameSelector,
});

export default function Id({ organisation: { organisation } }) {
  const { id, fullName } = useSelector(fullNameSel);

  return (
    <>
      <Head>
        <title>Сторінка органызації</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Organisation
        organisation={organisation}
        fullName={fullName}
        userId={id}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.params;
  const { data: organisation } = await apiRequest.get(
    `/api/get-organisations-by-id/${id}`,
  );

  return {
    props: { organisation },
  };
};

Id.propTypes = {
  organisation: PropTypes.shape({
    status: PropTypes.number,
    organisation: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.object,
      organisation: PropTypes.object,
      payrolls: PropTypes.shape({
        id: PropTypes.number,
        position: PropTypes.string,
        salary: PropTypes.number,
        isOpen: PropTypes.bool,
        organisation: PropTypes.object,
      }),
    }),
  }).isRequired,
};
