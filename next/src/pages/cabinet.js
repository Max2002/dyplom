import Head from 'next/head';
import { parseCookies } from 'nookies';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import apiRequest from '@/api/api';
import isAuth from '@/utils/HOCAuth';
import Main from '@/sections/Cabinet';
import collectionSelector from '@/redux/selectors/getCollection';

const collectionSel = createStructuredSelector({
  collection: collectionSelector,
});

function Cabinet({
  serverNews,
  serverOrganisations,
  serverPayrolls,
  serverSchedules,
  serverVacations,
  serverAccounting,
}) {
  const [news, setNews] = useState({});
  const [organisations, setOrganisations] = useState({});
  const [payrolls, setPayrolls] = useState({});
  const [schedules, setSchedules] = useState({});
  const [vacations, setVacations] = useState({});
  const [applications, setApplications] = useState({});
  const [accounting, setAccounting] = useState({});
  const { collection } = useSelector(collectionSel);

  useEffect(() => {
    const nameCollection = Object.keys(collection).find(
      (key) =>
        key === 'news' ||
        key === 'organisations' ||
        key === 'payrolls' ||
        key === 'schedules' ||
        key === 'vacations' ||
        key === 'applications' ||
        key === 'accounting',
    );

    const actionSet = {
      news: () => setNews(collection),
      organisations: () => setOrganisations(collection),
      payrolls: () => setPayrolls(collection),
      schedules: () => setSchedules(collection),
      vacations: () => setVacations(collection),
      applications: () => setApplications(collection),
      accounting: () => setAccounting(collection),
    };

    if (nameCollection) {
      actionSet[nameCollection]();
    }
  }, [collection]);

  return (
    <>
      <Head>
        <title>Особистий кабінет</title>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      <Main
        news={Object.keys(news).length === 0 ? serverNews : news}
        organisations={
          Object.keys(organisations).length === 0
            ? serverOrganisations
            : organisations
        }
        payrolls={
          Object.keys(payrolls).length === 0 ? serverPayrolls : payrolls
        }
        schedules={
          Object.keys(schedules).length === 0 ? serverSchedules : schedules
        }
        vacations={
          Object.keys(vacations).length === 0 ? serverVacations : vacations
        }
        accounting={
          Object.keys(accounting).length === 0 ? serverAccounting : accounting
        }
        applications={applications}
      />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { req } = context;
  const { userId } = parseCookies({ req });

  const { data: serverOrganisations } = await apiRequest.get(
    `/api/get-organisations/${userId}`,
  );
  const { data: serverNews } = await apiRequest.get(
    `/api/get-news/${serverOrganisations.organisations[0]?.id || 0}`,
  );
  const { data: serverPayrolls } = await apiRequest.get(
    `/api/get-payrolls/${serverOrganisations.organisations[0]?.id || 0}`,
  );
  const { data: serverSchedules } = await apiRequest.get(
    `/api/get-workSchedules/${serverOrganisations.organisations[0]?.id || 0}`,
  );
  const { data: serverVacations } = await apiRequest.get(
    `/api/get-vacationSchedules/${
      serverOrganisations.organisations[0]?.id || 0
    }`,
  );
  const { data: serverAccounting } = await apiRequest.get(
    `/api/get-accounting/${serverOrganisations.organisations[0]?.id || 0}`,
  );

  return {
    props: {
      serverNews,
      serverOrganisations,
      serverPayrolls,
      serverSchedules,
      serverVacations,
      serverAccounting,
    },
  };
};

Cabinet.propTypes = {
  serverNews: PropTypes.shape({
    status: PropTypes.number,
    news: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
  serverOrganisations: PropTypes.shape({
    status: PropTypes.number,
    organisations: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
  serverPayrolls: PropTypes.shape({
    status: PropTypes.number,
    payrolls: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
  serverSchedules: PropTypes.shape({
    status: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  serverVacations: PropTypes.shape({
    status: PropTypes.number,
    vacations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  serverAccounting: PropTypes.shape({
    status: PropTypes.number,
    accounting: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default isAuth(Cabinet);
