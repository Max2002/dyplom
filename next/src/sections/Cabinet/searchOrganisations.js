import { useState } from 'react';
import PropTypes from 'prop-types';
import { getOrganisationsByName } from '@/redux/actionCreator/getOrganisationsByName';
import Notification from '@/components/Notification';
import {
  WrapperField,
  SearchUsersField,
  SearchButton,
  OrganisationSearch,
  OrganisationName,
  AvatarSearch,
} from './styled';

export default function SearchOrganisations({ organisations, dispatch }) {
  const [searchValue, setSearchValue] = useState('');
  const [searching, setSearching] = useState(false);

  const onChange = ({ target: { value } }) => {
    setSearchValue(value);
    setSearching(false);
  };

  return (
    <>
      <WrapperField>
        <SearchUsersField
          type="text"
          placeholder="Введіть назву організації для пошуку"
          value={searchValue}
          onChange={(e) => onChange(e)}
        />
        <SearchButton
          name="searchUsers"
          type="button"
          onClick={() => {
            setSearching(true);
            dispatch(getOrganisationsByName(searchValue));
          }}
        >
          Search
        </SearchButton>
      </WrapperField>
      {organisations.length === 0 ? (
        <Notification fontSize={16} textAlign="center" width="100%">
          {searchValue && searching
            ? 'Нічого не знайдено'
            : 'Введіть щось в поле для пошуку'}
        </Notification>
      ) : (
        organisations.map(({ id, name, logo }) => (
          <OrganisationSearch href={`/organisation/${id}`} key={id}>
            <AvatarSearch
              img={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${logo[0].url}`}
            />
            <OrganisationName>{name}</OrganisationName>
          </OrganisationSearch>
        ))
      )}
    </>
  );
}

SearchOrganisations.propTypes = {
  organisations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      logo: PropTypes.object,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};
