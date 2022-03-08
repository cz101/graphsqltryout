import Page from "../components/Page";
import Router  from "next/router";
import  NProgress  from "nprogress";
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
//import '../components/styles/nprpgress.css'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps, apollo }) {
    console.log(apollo)
  return (
    <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
    </ApolloProvider>
  );
}

export default withData(MyApp)