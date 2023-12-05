import 'animate.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import type { AppProps } from 'next/app';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 import '../styles/globals.css';
import "../styles/primeReact.css";
import { WalletProvider, singletonBackenProvider, singletonEthereum } from '../context/wallet.context';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }: AppProps) {

	useEffect(() => {
    
		if (window.ethereum?.selectedAddress) {
			singletonEthereum.getBalance( window.ethereum.selectedAddress,"stn" ).then((balance) => {
        singletonEthereum.onWalletConnected(window.ethereum.selectedAddress);
      });
		
		}
    window.ethereum?.on("accountsChanged", (accounts: any) => {
         singletonEthereum.onWalletConnected(window.ethereum.selectedAddress);
    });



   

	}, []);


  return (

      <WalletProvider>
    
      <ToastContainer />
      {/* <FloatingButtonHelp visible={true} /> */}
      <Component {...pageProps} >
      </Component>
      </WalletProvider>

    
  )
}
export default MyApp
