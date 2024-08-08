import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';
import { getUser } from '@/redux/actionCreator/getUser';
import { tokenSelector } from '@/redux/selectors/getUser';
import { Wrapper, Background, Container } from '@/sections/Layout/styled';

const tokenSel = createStructuredSelector({
  token: tokenSelector,
});

export default function Layout({ children }) {
  const { pathname } = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector(tokenSel);

  useEffect(() => {
    if (token || localStorage.getItem('token')) {
      dispatch(getUser(token || localStorage.getItem('token')));
    }
  }, [token]);

  const urlBack = {
    '/': '/images/homeBack.jpg',
    '/workSchedule': '/images/BackWorkSchedule.jpg',
    '/vacationSchedule': '/images/BackVacation.jpg',
    '/cabinet': '#D9D8D2',
    '/news/[id]': '/images/BackNew.jpg',
    '/organisation/[id]': '/images/BackOrganisation.jpg',
    '/accounting/[id]': '/images/BackAccounting.jpg',
  };

  return (
    <Wrapper>
      <Background url={urlBack[pathname]} />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
