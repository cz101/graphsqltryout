import Page from "../components/Page";
import Router  from "next/router";
import  NProgress  from "nprogress";

//import '../components/styles/nprpgress.css'

Router.events.on( 'routeChangeStart',() => NProgress.start())
Router.events.on( 'routeChangeComplete',() => NProgress.done())

Router.events.on( 'routeChangeError',() => NProgress.error())


export default function MyApp ({Component ,pageProps}){

    return (
        <Page>
            <Component {...pageProps}/>
        </Page>
    )



}