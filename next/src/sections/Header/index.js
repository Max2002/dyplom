import { useEffect, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/Button';
import FormRegister from '@/sections/Header/formRegister';
import FormAuth from '@/sections/Header/formAuth';
import { BsPersonCircle } from 'react-icons/bs';
import { ImExit } from 'react-icons/im';
import { RxAvatar } from 'react-icons/rx';
import { logOut } from '@/redux/actionCreator/getUser';
import {
  fullNameSelector,
  avatarSelector,
  activeOrgSelector,
  tokenSelector,
} from '@/redux/selectors/getUser';
import {
  Logo,
  HeaderStyle,
  Organisation,
  NameOrganisation,
  MainNode,
  Main,
  ButtonMobile,
  Navigation,
  ItemLink,
  UserData,
  UserName,
  UserImage,
  DropDown,
  Cabinet,
  Exit,
} from '@/sections/Header/styled';

const userSel = createStructuredSelector({
  fullName: fullNameSelector,
  avatar: avatarSelector,
  organisation: activeOrgSelector,
  token: tokenSelector,
});

export default function Header() {
  const dispatch = useDispatch();
  const { fullName, avatar, organisation, token } = useSelector(userSel);
  const [registration, setRegistration] = useState(false);
  const [auth, setAuth] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [menuMobile, setMenuMobile] = useState(false);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

  const exitUser = () => {
    dispatch(logOut());
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <HeaderStyle>
      <ButtonMobile onClick={() => setMenuMobile(!menuMobile)}>
        <div>
          <span />
          <span />
          <span />
        </div>
      </ButtonMobile>
      <MainNode mobile={menuMobile} height={menuMobile ? 290 : 0}>
        <Organisation>
          <Logo
            href="/"
            borderRadius={organisation.name}
            logo={
              organisation.name
                ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${organisation?.logo}`
                : '/images/logo.png'
            }
          />
          <NameOrganisation>
            {organisation?.name || 'Smart work flow'}
          </NameOrganisation>
        </Organisation>
        {isAuth ? (
          <Main>
            <Navigation>
              <li>
                <ItemLink href="/workSchedule">Робочі графіки</ItemLink>
              </li>
              <li>
                <ItemLink href="/vacationSchedule">Графіки відпусток</ItemLink>
              </li>
            </Navigation>
            <UserData>
              <UserName>{fullName}</UserName>
              {avatar ? (
                <UserImage
                  url={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${avatar}`}
                />
              ) : (
                <RxAvatar size={40} color="#fff" />
              )}
              <DropDown className="dropDown">
                <Cabinet href="/cabinet">
                  <BsPersonCircle size={15} color="#000" />
                  <span>Особистий кабінет</span>
                </Cabinet>
                <Exit href="/" onClick={() => exitUser()}>
                  <ImExit size={15} color="#000" />
                  <span>Вихід</span>
                </Exit>
              </DropDown>
            </UserData>
          </Main>
        ) : (
          <div>
            <Button name="sigIn" onClick={() => setRegistration(true)}>
              Зарєструватися
            </Button>
            <Button name="logIn" onClick={() => setAuth(true)}>
              Увійти
            </Button>
          </div>
        )}
      </MainNode>
      {/* {menuMobile && getMenuMobile()} */}
      {registration && (
        <FormRegister
          setIsAuth={setIsAuth}
          onClose={() => setRegistration(false)}
          dispatch={dispatch}
        />
      )}
      {auth && (
        <FormAuth
          setIsAuth={setIsAuth}
          onClose={() => setAuth(false)}
          dispatch={dispatch}
        />
      )}
    </HeaderStyle>
  );
}
