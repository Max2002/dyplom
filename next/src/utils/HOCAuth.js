import { useRouter } from 'next/router';
import { useEffect } from 'react';

const isAuth = (WrappedComponent) => {
  // eslint-disable-next-line func-names
  return function (props) {
    const router = useRouter();

    useEffect(() => {
      if (!localStorage.getItem('token')) {
        router.push('/404');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default isAuth;
