import React from "react";
import router from "next/router";
import ModalHeader from "../HeaderModal.component";
import Modal from "../modal.component";
import SiteContext, { singletonBackenProvider, singletonEthereum } from "../../context/wallet.context";
import { formatFrom8Decimals, formatMoney } from "../../infra/utils";
import { set } from "lodash";
import { loadingWait } from "../loading";
import { toastMsg } from "../toast";

interface BalanceAccountProps {
	visible: boolean;
	onHide(): void;
	onClickOneStepSwap: (isWithdraw: boolean) => void;
}

interface BalanceAccountState {}

class BalanceAccount extends React.Component<BalanceAccountProps, BalanceAccountState> {
	static contextType = SiteContext;
	declare context: React.ContextType<typeof SiteContext>;

	state: BalanceAccountState = {};
	componentDidMount() {}

	async componentDidUpdate(prevProps: BalanceAccountProps) {
		if (!prevProps.visible && this.props.visible) {
			try {
				loadingWait.showLoading();
				let { wallet, balanceRealTokenizadoBB } = await singletonBackenProvider.connect(window.ethereum.selectedAddress);
				this.context.setWallet(wallet);
				this.context.setBalanceRealTokenizadoBB(balanceRealTokenizadoBB);
			} catch (err) {
				toastMsg(err.message, "error");
			} finally {
				loadingWait.hideLoading();
			}
		}
	}

	clickOneStepSwap(isWithdraw: boolean) {
		this.props.onClickOneStepSwap(isWithdraw);
		this.props.onHide();
	}

	contentBalance() {
		return (
			<div className={"flex flex-col items-center mt-1 w-full "}>
				<div className="flex flex-col  bg-base-300 h-full   w-full m-2 p-5">
					<p className="text-gray-400 text-xs md:text-lg font-bold mb-3 tracking-wider text-center">{this.context.address}</p>

					{this.context.wallet.balanceRealToken == "0" && (
						<div className="flex flex-row text-gray-600 font-bold">
							<p className="flex flex-grow">Saldo Real Tokenizado no Tesouro Direto </p>
							<p className="text-gray-400">{this.context.wallet.balanceRealToken}</p>
						</div>
					)}
					{this.context.wallet.balanceRealToken != "0" && (
						<div className="flex flex-col text-gray-200 bg-gray-500 font-bold p-4 rounded-md mb-2">
							<div className="flex flex-row ">
								<p className="flex flex-grow">Saldo Real Tokenizado no Tesouro Direto</p>
								<p className="text-gray-300">{formatFrom8Decimals(this.context.wallet.balanceRealToken)}</p>
							</div>
							<div>
								<p className="link w-full text-center text-black font-normal" onClick={() => this.clickOneStepSwap(true)}>
									Transferir para seu Banco
								</p>
							</div>
						</div>
					)}

					<div className="divider ">
						<p className="text-neutral-content">Saldo de Real Tokenizado em bancos</p>
					</div>

					{this.context.balanceRealTokenizadoBB != "0" && (
						<div className="flex flex-col text-gray-200 bg-gray-500 font-bold p-4 rounded-md mb-2">
							<div className="flex flex-row ">
								<p className="flex flex-grow text-gray-300">Banco do Brasil </p>
								<p className="text-success">{formatFrom8Decimals(this.context.balanceRealTokenizadoBB)}</p>
							</div>
							<div>
								<p className="link w-full text-center text-black font-normal" onClick={() => this.clickOneStepSwap(false)}>
									Transferir para o Tesouro Direto
								</p>
							</div>
						</div>
					)}

					{this.context.balanceRealTokenizadoBB == "0" && (
						<div className="flex flex-row text-gray-600 font-bold">
							<p className="flex flex-grow">Itaú</p>
							<p className="text-gray-400">{formatMoney(0)}</p>
						</div>
					)}
					<div className="flex flex-row text-gray-600 font-bold">
						<p className="flex flex-grow">Itaú</p>
						<p className="text-gray-400">{formatMoney(0)}</p>
					</div>
					<div className="flex flex-row text-gray-600 font-bold">
						<p className="flex flex-grow">Bradesco </p>
						<p className="text-gray-400">{formatMoney(0)}</p>
					</div>

					<div className="divider ">
						<p className="text-neutral-content">Titulos do Tesouro Direto</p>
					</div>
					{this.context.wallet.bonds?.map((bond, index) => {
						return (
							<div key={index} className="flex flex-row text-gray-600 font-bold">
								<p className="flex flex-grow">{bond.description}</p>
								<p className="text-gray-400">{formatFrom8Decimals(bond.amount)}</p>
							</div>
						);
					})}

					<hr className="mt-5" />
					<p className="text-gray-700 text-xs font-bold mb-1 mt-1 tracking-wider">NOTA</p>
					<p className="text-gray-700 text-sm">Os tokens são fictícios.</p>
				</div>
			</div>
		);
	}

	render() {
		let header = <ModalHeader title={"Saldo da sua carteira"} onClose={() => this.props.onHide()} />;
		let footer = (
			<div className="p-2 ">
				<button className="btn btn-sm btn-secondary " onClick={() => this.props.onHide()}>
					Fechar
				</button>
			</div>
		);

		return (
			<Modal visible={this.props.visible} header={header} footer={footer} classSize="w-full md:w-[600px]">
				{this.contentBalance()}
			</Modal>
		);
	}
}

export default BalanceAccount;
