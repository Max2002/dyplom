import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Notification from '@/components/Notification';
import { RxAvatar } from 'react-icons/rx';
import { UserOrg, MainInfo, AvatarSearch } from '@/sections/Cabinet/styled';

export default function UsersOrganisation({ users, userId, activeOrgId }) {
  const [filterUsers, setFilterUsers] = useState([]);
  const [usersId, setUsersId] = useState([]);

  useEffect(() => {
    if (activeOrgId) {
      setUsersId(
        users.flatMap(
          ({ id, payrolls }) =>
            payrolls.length > 0 &&
            payrolls.map(
              ({ organisation }) => organisation?.id === activeOrgId && id,
            ),
        ),
      );
    }
  }, [users, activeOrgId]);

  useEffect(
    () =>
      setFilterUsers(
        users.filter(({ id }) => id !== userId && usersId.includes(id)),
      ),
    [userId, users, usersId],
  );

  return (
    <div>
      {filterUsers.length === 0 ? (
        <Notification textAlign="center" fontSize={18}>
          В даній організації ніхто не працює
        </Notification>
      ) : (
        filterUsers.map(
          ({ id, username, surname, name, email, avatar, payrolls }) => (
            <UserOrg key={id} href={`/user/${id}`}>
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
                  {surname} {name}
                </div>
                <div>{email}</div>
                <div>
                  {
                    payrolls.find(
                      ({ organisation }) => organisation.id === activeOrgId,
                    )?.position
                  }
                </div>
              </MainInfo>
            </UserOrg>
          ),
        )
      )}
    </div>
  );
}

UsersOrganisation.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      id: PropTypes.number,
      name: PropTypes.string,
      surname: PropTypes.string,
      username: PropTypes.string,
      avatar: PropTypes.object,
    }),
  ).isRequired,
  userId: PropTypes.number.isRequired,
  activeOrgId: PropTypes.number.isRequired,
};
