"use client";
import React, { createContext, useEffect, useState } from "react";
import EthereumProvider from "../providers/ether";
import { BackendProvider } from "../providers/backend";
import { HttpAxios } from "../infra/httpAxios.infra";
import { Wallet } from "../models/wallets";
import { loadingWait } from "../components/loading";
import { toastMsg } from "../components/toast";
import { CustomError } from "../infra/error";
import { Bond } from "../models/bonds";
import { Pool } from "../models/pools";
import { AssistentProvider } from "../providers/assistent/assistent";

//singletons
export var singletonEthereum: EthereumProvider = new EthereumProvider();
let httpInfra = new HttpAxios(process.env.NEXT_PUBLIC_URL_BACKEND || "http://localhost:3000/api");
export var singletonBackenProvider = new BackendProvider(httpInfra);
// export var singletonAssistentPvodier = new AssistentProvider();

// Criação do contexto
interface SiteContext {
	address: string;
	balance: string;
	version: string;
	wallet: Wallet;
	balanceRealTokenizadoBB: string;
	showModalBalance: boolean;
	bonds: Bond[];
	pools: Pool[];
	setAddress: (address: string) => void;
	setBalance: (balance: string) => void;
	setVersion: (version: string) => void;
	setWallet: (wallet: Wallet) => void;
	setBonds: (bonds: Bond[]) => void;
	setPools: (pools: Pool[]) => void;
	setBalanceRealTokenizadoBB: (balance: string) => void;
	setShowModalBalance: (show: boolean) => void;
}

const SiteContext = createContext<SiteContext>({} as SiteContext);

// Provedor do contexto
export function WalletProvider(props: any) {
	const [address, setAddress] = useState("");
	const [balance, setBalance] = useState("0");
	const [version, setVersion] = useState("simple");
	const [wallet, setWallet] = useState({} as Wallet);
	const [bonds, setBonds] = useState([] as Bond[]);
	const [pools, setPools] = useState([] as Pool[]);
	const [balanceRealTokenizadoBB, setBalanceRealTokenizadoBB] = useState("0");
	const [showModalBalance, setShowModalBalance] = useState(false);
	const [dataLoaded, setDataLoaded] = useState(false);
	useEffect(() => {
		if (!dataLoaded) {
			singletonBackenProvider.getData().then((data) => {
				console.log(`data`,data);
				setBonds(data.bonds);
				setPools(data.pools);
			})
			setDataLoaded(true);
		}
	}, [dataLoaded]);
	

	singletonEthereum.onBalanceChange = async (address) => {
		let value = await singletonEthereum.getBalance(address, "stn");
		wallet.balanceRealToken = value.toString();
		value = await singletonEthereum.getBalance(address, "bb");

		setBalanceRealTokenizadoBB(value.toString());
		setWallet(wallet);
	};

	singletonEthereum.onWalletConnected = async (address: string) => {
		setAddress(address || "");

		if (!address) {
			setShowModalBalance(false);
			return;
		}

		try {
			loadingWait.showLoading();
			let { wallet, balanceRealTokenizadoBB } = await singletonBackenProvider.connect(address);
			setWallet(wallet);
			setBalanceRealTokenizadoBB(balanceRealTokenizadoBB);

			setShowModalBalance(true);
		} catch (err) {
			toastMsg((err as CustomError).message, "error");
		} finally {
			loadingWait.hideLoading();
		}
	};
	return (
		<SiteContext.Provider
			value={{
				address,
				balance,
				version,
				wallet,
				balanceRealTokenizadoBB,
				showModalBalance,
				bonds,
				pools,
				setAddress,
				setBalance,
				setVersion,
				setWallet,
				setBonds,
				setPools,
				setBalanceRealTokenizadoBB,
				setShowModalBalance: setShowModalBalance,
			}}
		>
			{props.children}
		</SiteContext.Provider>
	);
}

export default SiteContext;
