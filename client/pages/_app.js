import 'bootstrap/dist/css/bootstrap.css';
import { buildClient } from '../api/build-client';
import Header from '../components/Header'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

/**
 * getInitialProps is a special function in Next.js that allows you to do
 * server-side rendering of a page's props. The function is called by Next.js
 * when the page is first loaded, and the results are passed as props to the
 * page component.
 *
 * The function is also called by Next.js when the page is navigated to via
 * the Link component. In this case, the function is called on the client-side
 * and the results are passed as props to the page component.
 *
 * The function takes an object as an argument, which contains the following
 * properties:
 *
 *   - ctx: an object that contains information about the current request
 *   - Component: the page component
 *   - router: the Next.js router object
 *
 * The function should return an object with the following properties:
 *
 *   - pageProps: an object that contains the props to pass to the page
 *     component
 *   - ...data: any other props that should be passed to the page component
 */
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
