"use client";
import React from "react";
import ButtonSelection, { IButtonSelectItem } from "./button-selection";

import Image from "next/image";

import { toastMsg } from "./toast";
import { loadingWait } from "./loading";
import SiteContext, { singletonEthereum } from "../context/wallet.context";
import router from "next/router";
import BalanceAccount from "./modais/balanceAcount";
import OneStepSwap from "./modais/swapOneStep";

interface NavBarProps {}

interface NavBarState {
	tabSelect: string;
	showOneStepSwap: boolean;
	oneStepSwapIsWithdraw: boolean;
}

class NavBar extends React.Component<NavBarProps, NavBarState> {
	static contextType = SiteContext;
	declare context: React.ContextType<typeof SiteContext>;

	itens: IButtonSelectItem[] = [
		{
			label: "Versão Simples",
			onClick: () => {
				this.context.setVersion("simple");
				router.push("/");
			},
			value: "simple",
		},
		{
			label: "Versão Avançada",
			onClick: () => {
				this.context.setVersion("advanced");
				router.push("/advanced");
			},
			value: "advanced",
		},
	];

	state: NavBarState = {
		tabSelect: "simple",
		showOneStepSwap: false,
		oneStepSwapIsWithdraw: false,
	};
	componentDidMount() {}

	componentDidUpdate(prevProps: NavBarProps) {}

	async connectMetaMask() {
		try {
			await singletonEthereum.requestAccount();
		} catch (err) {
			toastMsg(err.message, "error");
		} finally {
		}
	}

	formatAddress(address: string) {
		address = "" + address;
		return `${address.substring(0, 7)}...${address.substring(address.length - 6, address.length - 1)}`;
	}

	render() {
		return (
			<>
				<nav id="header" className="fixed top-0 h-20   w-full   flex flex-col items-center z-50">
					<div className="flex justify-between w-full bg-black px-4 pt-4 backdrop-blur-sm opacity-70">
						<img alt="Tesouro Direto" className="td-logo__title" src="/td-logo.svg"></img>

						<div className="-mt-3">
							<button
								className="btn  btn-primary btn-xs "
								onClick={() => {
									if (this.context.address == "") this.connectMetaMask();
									else this.context.setShowModalBalance(true);
								}}
							>
								{this.context.address != "" ? this.formatAddress(this.context.address) : "Conectar"}
							</button>
						</div>
					</div>
					<div className="bg-black p-3 rounded-lg md:-m-8 z-50">
						<ButtonSelection items={this.itens} value={this.context.version} style="tabs-boxed" active="bg-secondary" label="text-white" />
					</div>
				</nav>

				<BalanceAccount
					onHide={() => this.context.setShowModalBalance(false)}
					visible={this.context.showModalBalance}
					onClickOneStepSwap={(isWithdraw: boolean) => this.setState({ showOneStepSwap: true, oneStepSwapIsWithdraw: isWithdraw })}
				/>

				<OneStepSwap
					onHide={() => this.setState({ showOneStepSwap: false })}
					visible={this.state.showOneStepSwap}
					isWithdraw={this.state.oneStepSwapIsWithdraw}
				/>

				<div className="absolute bottom-0 bg-black w-full h-6 flex flex-col justify-end">
					<div className="flex p-1">
						<p className=" text-sm">Secretaria do Tesouro Nacional - Tesouro Direto DeFi</p>
					</div>
				</div>
			</>
		);
	}
}

export default NavBar;
