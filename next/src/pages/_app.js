import { Provider } from 'react-redux';
import Layout from '@/sections/Layout';
import '@/styles/general.css';
import store from '@/redux/store';
import PropTypes from 'prop-types';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

App.defaultProps = {
  pageProps: {},
};

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default App;
