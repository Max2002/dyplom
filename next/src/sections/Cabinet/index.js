import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/Button';
import CRUDBoard from '@/components/CRUDBoard';
import {
  activeOrgSelector,
  idSelector,
  ownerSelector,
  PIBSelector,
} from '@/redux/selectors/getUser';
import organisationsByNameSelector from '@/redux/selectors/getOrganisationsByName';
import SearchUsers from '@/sections/Cabinet/searchUsers';
import { Content, AdminFunc } from '@/sections/Cabinet/styled';
import { getUsers } from '@/redux/actionCreator/getUsers';
import usersSelector from '@/redux/selectors/getUsers';
import UsersOrganisation from '@/sections/Cabinet/usersOrganisation';
import Info from '@/sections/Cabinet/info';
import { getCollection } from '@/redux/actionCreator/getCollection';
import PositionInfo from '@/sections/Cabinet/positionInfo';
import CRUDSchedule from '@/components/CRUDSchedule';
import SearchOrganisations from '@/sections/Cabinet/searchOrganisations';
import JobApplications from '@/sections/Cabinet/JobApplications';
import {
  DEFAULT,
  NEWS,
  ORGANISATIONS,
  USERS,
  SEARCH_ORGANISATIONS,
  JOB_APPLICATIONS,
  USERS_ORGANISATION,
  PAYROLL,
  POSITION_USER,
  WORK_SCHEDULE,
  VACATION_SCHEDULE,
  ACCOUNTING,
} from '@/constants/cabinetConstants';

const data = createStructuredSelector({
  id: idSelector,
  owner: ownerSelector,
  users: usersSelector,
  PIB: PIBSelector,
  activeOrg: activeOrgSelector,
  organisationsByName: organisationsByNameSelector,
});

export default function Main({
  news,
  organisations,
  payrolls,
  schedules,
  vacations,
  applications,
  accounting,
}) {
  const dispatch = useDispatch();
  const { id, owner, users, PIB, activeOrg, organisationsByName } =
    useSelector(data);
  const [adminPanel, setAdminPanel] = useState(DEFAULT);
  const tabsAdminPanel = [
    { name: NEWS, text: 'Новини', forOwner: true },
    { name: ORGANISATIONS, text: 'Організації', forOwner: true },
    { name: WORK_SCHEDULE, text: 'Робочі графіки', forOwner: true },
    { name: VACATION_SCHEDULE, text: 'Графіки відпусток', forOwner: true },
    { name: PAYROLL, text: 'Табіль заробітних плат', forOwner: true },
    { name: USERS_ORGANISATION, text: 'Робітники організації', forOwner: true },
    { name: USERS, text: 'Пошук користувачів', forOwner: true },
    { name: POSITION_USER, text: 'Робоча інформація', forOwner: false },
    { name: SEARCH_ORGANISATIONS, text: 'Пошук організацій', forOwner: false },
    { name: ACCOUNTING, text: 'Бухгалтерія', forOwner: true },
  ];

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (organisations.organisations.length === 0) {
      document.cookie = `idOrganisation=;Max-Age=0`;
    } else {
      document.cookie = `idOrganisation=${organisations.organisations[0].id}`;
    }
  }, [organisations]);

  useEffect(() => {
    if (adminPanel === PAYROLL) {
      dispatch(getCollection(`/api/get-payrolls/${activeOrg?.id || 0}`));
    } else if (adminPanel === NEWS) {
      dispatch(getCollection(`/api/get-news/${activeOrg?.id || 0}`));
    } else if (adminPanel === WORK_SCHEDULE || adminPanel === POSITION_USER) {
      dispatch(getCollection(`/api/get-workSchedules/${activeOrg?.id || 0}`));
    } else if (
      adminPanel === VACATION_SCHEDULE ||
      adminPanel === POSITION_USER
    ) {
      dispatch(
        getCollection(`/api/get-vacationSchedules/${activeOrg?.id || 0}`),
      );
    } else if (adminPanel === JOB_APPLICATIONS) {
      dispatch(
        getCollection(
          `/api/get-applications-by-role/${owner ? 'owner' : 'user'}/${
            owner ? activeOrg?.id || 0 : id
          }`,
        ),
      );
    } else if (adminPanel === ACCOUNTING) {
      dispatch(getCollection(`/api/get-accounting/${activeOrg?.id || 0}`));
    }
  }, [activeOrg?.id, adminPanel, id, owner]);

  const stateMainBlock = {
    [DEFAULT]: <Info organisations={organisations.organisations} />,
    [POSITION_USER]: (
      <PositionInfo
        activeOrg={activeOrg}
        schedules={schedules.schedules}
        vacations={vacations.vacations}
        PIB={PIB}
      />
    ),
    [NEWS]: (
      <CRUDBoard
        status={news.status}
        data={news.news}
        schema={news.schema}
        endPoint="/api/news-plural"
        getEndpoint={`/api/get-news/${activeOrg?.id}`}
        activeOrgId={activeOrg?.id}
        isOrganisation={organisations.organisations.length > 0}
      />
    ),
    [ORGANISATIONS]: (
      <CRUDBoard
        status={organisations.status}
        schema={organisations.schema}
        data={organisations.organisations}
        endPoint="/api/organisations"
        getEndpoint={`/api/get-organisations/${id}`}
        userId={id}
        isOrganisation={!organisations.organisations.length > 0}
      />
    ),
    [WORK_SCHEDULE]: (
      <CRUDSchedule
        endpoint="/api/work-schedules"
        dispatch={dispatch}
        data={schedules.schedules}
        status={schedules.status}
        activeOrgId={activeOrg?.id}
        getEndpoint={`/api/get-workSchedules/${activeOrg?.id}`}
        exampleFile="/uploads/Example_ea0484a479.xls"
        nameCollection="work"
        isOrganisation={organisations.organisations.length > 0}
      />
    ),
    [VACATION_SCHEDULE]: (
      <CRUDSchedule
        endpoint="/api/vacation-schedules"
        dispatch={dispatch}
        data={vacations.vacations}
        status={vacations.status}
        activeOrgId={activeOrg?.id}
        getEndpoint={`/api/get-vacationSchedules/${activeOrg?.id}`}
        exampleFile="/uploads/Vacation_cfce7d2caf.xls"
        nameCollection="vacation"
        isOrganisation={organisations.organisations.length > 0}
      />
    ),
    [PAYROLL]: (
      <CRUDBoard
        status={payrolls.status}
        schema={payrolls.schema}
        data={payrolls.payrolls}
        endPoint="/api/payrolls"
        getEndpoint={`/api/get-payrolls/${activeOrg?.id}`}
        activeOrgId={activeOrg?.id}
        isOrganisation={organisations.organisations.length > 0}
      />
    ),
    [USERS]: (
      <SearchUsers
        users={users}
        getUsers={getUsers}
        activeOrg={activeOrg}
        userId={id}
        dispatch={dispatch}
        payrolls={payrolls.payrolls}
        isOrganisation={organisations.organisations.length > 0}
      />
    ),
    [SEARCH_ORGANISATIONS]: (
      <SearchOrganisations
        dispatch={dispatch}
        organisations={organisationsByName?.organisations || []}
      />
    ),
    [JOB_APPLICATIONS]: (
      <JobApplications
        owner={owner}
        applications={applications}
        dispatch={dispatch}
        endPoint={`/api/get-applications-by-role/${owner ? 'owner' : 'user'}/${
          owner ? activeOrg?.id : id
        }`}
      />
    ),
    [USERS_ORGANISATION]: (
      <UsersOrganisation
        users={users}
        userId={id}
        activeOrgId={activeOrg?.id}
      />
    ),
    [ACCOUNTING]: (
      <CRUDSchedule
        endpoint="/api/accountings"
        dispatch={dispatch}
        data={accounting.accounting}
        status={accounting.status}
        activeOrgId={activeOrg?.id}
        getEndpoint={`/api/get-accounting/${activeOrg?.id}`}
        exampleFile="/uploads/Accounting_d72224da6b.xls"
        nameCollection="accounting"
        isOrganisation={organisations.organisations.length > 0}
      />
    ),
  };

  return (
    <Content>
      <AdminFunc>
        <Button
          name={DEFAULT}
          onClick={() => setAdminPanel(DEFAULT)}
          active={adminPanel === DEFAULT}
        >
          Особиста інформація
        </Button>
        {tabsAdminPanel.map(
          ({ name, text, forOwner }) =>
            forOwner === owner && (
              <Button
                key={name}
                name={name}
                onClick={() => setAdminPanel(name)}
                active={adminPanel === name}
              >
                {text}
              </Button>
            ),
        )}
        <Button
          name={JOB_APPLICATIONS}
          onClick={() => setAdminPanel(JOB_APPLICATIONS)}
          active={adminPanel === JOB_APPLICATIONS}
        >
          Запити на роботу
        </Button>
      </AdminFunc>
      {stateMainBlock[adminPanel]}
    </Content>
  );
}

Main.propTypes = {
  news: PropTypes.shape({
    status: PropTypes.number,
    news: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
  organisations: PropTypes.shape({
    status: PropTypes.number,
    organisations: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
  payrolls: PropTypes.shape({
    status: PropTypes.number,
    payrolls: PropTypes.arrayOf(PropTypes.object),
    schema: PropTypes.object,
  }).isRequired,
  schedules: PropTypes.shape({
    status: PropTypes.number,
    schedules: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  vacations: PropTypes.shape({
    status: PropTypes.number,
    vacations: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  applications: PropTypes.shape({
    status: PropTypes.number,
    applications: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  accounting: PropTypes.shape({
    status: PropTypes.number,
    accounting: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};
