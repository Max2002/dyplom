import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import { BsPersonAdd } from 'react-icons/bs';
import Button from '@/components/Button';
import apiRequest from '@/api/api';
import { ERROR } from '@/constants/messages';
import StatusRequest from '@/components/StatusRequest';
import { getCollection } from '@/redux/actionCreator/getCollection';
import Select from '@/components/Select';
import Notification from '@/components/Notification';
import { RxAvatar } from 'react-icons/rx';
import {
  WrapperField,
  SearchUsersField,
  SearchButton,
  UserSearch,
  AvatarSearch,
  MainInfo,
  SubInfo,
  Answer,
  NameOrg,
} from './styled';

export default function SearchUsers({
  users,
  getUsers,
  userId,
  activeOrg,
  dispatch,
  payrolls,
  isOrganisation,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [filterUsers, setFilterUsers] = useState([]);
  const [searching, setSearching] = useState(false);
  const [addUserId, setAddUserId] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleFilterUsers = () =>
    setFilterUsers(
      users.filter(
        ({ id, username, email, owner }) =>
          (username.includes(searchValue) || email.includes(searchValue)) &&
          id !== userId &&
          !owner,
      ),
    );

  useEffect(() => {
    if (searching && searchValue) {
      handleFilterUsers();
    }
  }, [searching, searchValue, users]);

  const onChange = ({ target: { value } }) => {
    setSearchValue(value);
    setSearching(false);
  };

  const confirmAddUser = async (id) => {
    try {
      const usersId = payrolls
        .filter((p) => p.id === selectedId)[0]
        .users_permissions_users.map((item) => item.id);

      usersId.push(id);
      await apiRequest.put(`/api/payrolls/${selectedId}`, {
        data: { users_permissions_users: usersId },
      });

      setAddUserId(null);
      setMessage('Користувача успішно додано до організації)');
      dispatch(getUsers());
    } catch (e) {
      setMessage(ERROR);
    }
  };

  const getModalAdd = () => {
    return (
      <Modal position="center" onClose={() => setAddUserId(null)}>
        <Answer>
          {payrolls.length === 0 ? (
            <div>
              В вашій організації немає жодної посади, тому ви не зможете додати
              робітника!
            </div>
          ) : (
            <>
              <div>Оберіть посаду для майбутнього працівника</div>
              <Select
                onChange={(idSelected) => setSelectedId(idSelected)}
                defaultValue=""
                options={payrolls.map(
                  ({ id: payrollId, position, isOpen }) =>
                    position !== 'Власник' &&
                    isOpen && {
                      id: payrollId,
                      name: position,
                    },
                )}
                back="#bf8c6f"
              />
            </>
          )}
          {payrolls.length !== 0 && (
            <>
              <div>
                Ви впевнені, що бажаєте додати цього користувача до організації{' '}
                <NameOrg>{activeOrg.name}</NameOrg>?
              </div>
              <div>
                <Button
                  name="confirmAddUser"
                  onClick={() => confirmAddUser(addUserId)}
                  disabled={!selectedId}
                >
                  Так
                </Button>
                <Button
                  name="doNotConfirmAddUser"
                  onClick={() => setAddUserId(null)}
                >
                  Ні
                </Button>
              </div>
            </>
          )}
        </Answer>
      </Modal>
    );
  };

  return (
    <>
      <WrapperField>
        <SearchUsersField
          type="text"
          placeholder="Введіть нікнейм користувача для пошуку"
          value={searchValue}
          onChange={(e) => onChange(e)}
        />
        <SearchButton
          name="searchUsers"
          type="button"
          onClick={() => {
            setSearching(true);
            dispatch(getCollection(`/api/get-payrolls/${activeOrg.id}`));
          }}
        >
          Search
        </SearchButton>
      </WrapperField>
      {filterUsers.length === 0 ? (
        <Notification fontSize={16} textAlign="center" width="100%">
          {searchValue && searching
            ? 'Нічого не знайдено'
            : 'Введіть щось в поле для пошуку'}
        </Notification>
      ) : (
        filterUsers.map(
          ({
            id: idUser,
            username,
            surname,
            name,
            fatherName,
            email,
            phone,
            birthday,
            avatar,
            payrolls: userPayrolls,
          }) => (
            <UserSearch key={idUser}>
              {avatar?.url ? (
                <AvatarSearch
                  img={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${avatar?.url}`}
                />
              ) : (
                <RxAvatar size={100} color="#fff" />
              )}
              <MainInfo>
                <div>{username}</div>
                <div>
                  {surname} {name} {fatherName}
                </div>
                <div>{email}</div>
              </MainInfo>
              <SubInfo>
                <div>{phone}</div>
                <div>{birthday}</div>
              </SubInfo>
              {userPayrolls.filter(
                ({ organisation }) => organisation.id === activeOrg.id,
              ).length === 0 &&
                isOrganisation && (
                  <BsPersonAdd
                    color="#fff"
                    size={30}
                    onClick={() => setAddUserId(idUser)}
                  />
                )}
              {addUserId && getModalAdd()}
            </UserSearch>
          ),
        )
      )}
      {message && (
        <StatusRequest close={() => setMessage(null)} message={message} />
      )}
    </>
  );
}

SearchUsers.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      birthday: PropTypes.string,
      blocked: PropTypes.bool,
      confirmed: PropTypes.bool,
      createdAt: PropTypes.string,
      email: PropTypes.string,
      fatherName: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.bool,
      phone: PropTypes.string,
      provider: PropTypes.string,
      surname: PropTypes.string,
      updatedAt: PropTypes.string,
      username: PropTypes.string,
      organisations: PropTypes.arrayOf(PropTypes.object),
      avatar: PropTypes.object,
    }),
  ).isRequired,
  getUsers: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  activeOrg: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  payrolls: PropTypes.arrayOf(PropTypes.object).isRequired,
  isOrganisation: PropTypes.bool.isRequired,
};
