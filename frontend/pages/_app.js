import Page from "../components/Page";
import Router  from "next/router";
import  NProgress  from "nprogress";
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';
import '../components/styles/nprpgress.css'

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


function MyApp({ Component, pageProps, apollo }) {
    //console.log(apollo)
  return (
    <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
    </ApolloProvider>
  );
}
/*
MyApp.getInitialProps = async function ({ components, ctx}) {

  let pageProps = {}

  if (components.getInitialProps){
    pageProps = await components.getInitialProps(ctx)
  }

  pageProps.query = ctx.query

  return {pageProps}
}
*/

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp)