import Document, { Html, Head, Main, NextScript } from 'next/document'
import SiteContext, { singletonBackenProvider } from '../context/wallet.context';

class MyDocument extends Document {
  static contextType = SiteContext;
	declare context: React.ContextType<typeof SiteContext>;



  componentDidMount() {
  
   
  }

  render() 
  {

    return (
      <Html data-theme="dark" className="notranslate dark" translate="no" lang='pt-BR'>
         <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet" />
          
        <Head >
          <meta name="google" content="notranslate" />
          <meta name='application-name' content='PWA App' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='PWA App' />
          <meta name='description' content='Best PWA App in the world' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/icons/browserconfig.xml' />
          <meta name='msapplication-TileColor' content='#2B5797' />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name='theme-color' content='#000000' />

          <link rel="apple-touch-icon" sizes="57x57" href="/icons/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/icons/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/icons/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/icons/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/icons/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/icons/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/icons/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/icons/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-icon-180x180.png" />

          <link rel="icon" type="image/png" sizes="192x192" href="/icon/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/icon/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
          <link rel='manifest' href='/manifest.json' />
          <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://yourdomain.com' />
          <meta name='twitter:title' content='PWA App' />
          <meta name='twitter:description' content='Best PWA App in the world' />
          <meta name='twitter:image' content='https://yourdomain.com/icons/android-chrome-192x192.png' />
          <meta name='twitter:creator' content='@DavidWShadow' />
          <meta property='og:type' content='website' />
          <meta property='og:title' content='PWA App' />
          <meta property='og:description' content='Best PWA App in the world' />
          <meta property='og:site_name' content='PWA App' />
          <meta property='og:url' content='https://yourdomain.com' />
          <meta property='og:image' content='https://yourdomain.com/icons/apple-touch-icon.png' />


          {/* <link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
          <link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' /> */}




        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument