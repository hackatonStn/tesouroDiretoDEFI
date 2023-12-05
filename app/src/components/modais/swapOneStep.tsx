import React from "react";
import router from "next/router";
import ModalHeader from "../HeaderModal.component";
import Modal from "../modal.component";
import SiteContext, { singletonEthereum } from "../../context/wallet.context";
import { formatFrom8Decimals, formatMoney } from "../../infra/utils";
import { InputNumber } from "primereact/inputnumber";
import Image from "next/image";
import { loadingWait } from "../loading";
import { toastMsg } from "../toast";
import { CustomError } from "../../infra/error";

interface OneStepSwapProps {
	visible: boolean;
	onHide(): void;
	isWithdraw: boolean;
	amountTransfer?: number;
}

interface OneStepSwapState {
	amountTransfer: number;
}

class OneStepSwap extends React.Component<OneStepSwapProps, OneStepSwapState> {
	static contextType = SiteContext;
	declare context: React.ContextType<typeof SiteContext>;

	state: OneStepSwapState = {
		amountTransfer: this.props.amountTransfer || 0,
	};
	componentDidMount() {}

	componentDidUpdate(prevProps: OneStepSwapProps) {}

	contentDeposit() {
		return (
			<div className="flex flex-col justify-center w-full animate__animated  animate__fadeInLeft animate__faster">
				<div className="flex flex-col items-center mb-2">
					<Image src="/bb.png" width={50} height={50} />
					<p className="text-neutral-focus mb-0">Banco do Brasil</p>
					<p className="text-neutral-content text-sm -mt-1">Insituição Certificada</p>
				</div>

				<div className="flex flex-row justify-around w-full">
					<div className="text-sm w-full">Valor a ser transferido</div>
				</div>

				<div className="to-base-100 flex justify-around p-1 mt-2">
					<div className="flex-grow input-transparent input-lg w-20 ">
						{/* <InputNumber size={8} value={this.state.amountTransfer} /> */}
						<InputNumber
							inputId="minmax"
							currency="BRL"
							mode="currency"
							value={this.state.amountTransfer}
							min={1.0}
							max={Number(formatFrom8Decimals(this.context.balanceRealTokenizadoBB))}
							buttonLayout="horizontal"
							step={1}
							onChange={(e: any) => {
								this.setState({ amountTransfer: e.value || 0 });
							}}
						/>
					</div>
					<div className="rounded-3xl">
						<p className="text-3xl">BRL</p>
					</div>
				</div>
				<div className="text-sm text-neutral-400 text-end w-full flex justify-end">
					Saldo de DREX <span className="text-sm text-neutral-focus ml-2">{formatFrom8Decimals(this.context.balanceRealTokenizadoBB)}</span>
				</div>
				<div className="divider">
					<p className="text-neutral-content">Transferindo para</p>
				</div>

				<div className="flex flex-col items-center mb-2">
					<Image src="/logo.png" width={50} height={50} />
					<p className="text-neutral-focus mb-0">Tesouro Direto</p>
					<p className="text-neutral-content text-sm -mt-1">Secretaria do Tesouro Nacional</p>
				</div>
			</div>
		);
	}
	contentWithdraw() {
		return (
			<div className="flex flex-col justify-center w-full animate__animated  animate__fadeInLeft animate__faster">
					<div className="flex flex-col items-center mb-2">
					<Image src="/logo.png" width={50} height={50} />
					<p className="text-neutral-focus mb-0">Tesouro Direto</p>
					<p className="text-neutral-content text-sm -mt-1">Secretaria do Tesouro Nacional</p>
				</div>

				

				<div className="flex flex-row justify-around w-full">
					<div className="text-sm w-full">Valor a ser transferido</div>
				</div>

				<div className="to-base-100 flex justify-around p-1 mt-2">
					<div className="flex-grow input-transparent input-lg w-20 ">
						{/* <InputNumber size={8} value={this.state.amountTransfer} /> */}
						<InputNumber
							inputId="minmax"
							currency="BRL"
							mode="currency"
							value={this.state.amountTransfer}
							min={1.0}
							max={Number(formatFrom8Decimals(this.context.wallet.balanceRealToken))}
							buttonLayout="horizontal"
							step={1}
							onChange={(e: any) => {
								this.setState({ amountTransfer: e.value || 0 });
							}}
						/>
					</div>
					<div className="rounded-3xl">
						<p className="text-3xl">BRL</p>
					</div>
				</div>
				<div className="text-sm text-neutral-400 text-end w-full flex justify-end">
					Saldo de DREX <span className="text-sm text-neutral-focus ml-2">{formatFrom8Decimals(this.context.wallet.balanceRealToken)}</span>
				</div>
				<div className="divider">
					<p className="text-neutral-content">Transferindo para</p>
				</div>

			    <div className="flex w-full justify-between">
				<div className="flex flex-col items-center mb-2 opacity-50">
					<Image src="/itau.png" width={50} height={50} />
					<p className="text-neutral-focus mb-0">Itaú</p>
					<p className="text-neutral-content text-sm -mt-1">Indisponível</p>
				</div>
				<div className="flex flex-col items-center mb-2 scale-110">
					<Image src="/bb.png" width={50} height={50} />
					<p className="text-neutral-focus mb-0">Banco do Brasil</p>
					<p className="text-neutral-content text-sm -mt-1">Insituição Certificada</p>
				</div>
				<div className="flex flex-col items-center mb-2 opacity-50">
					<Image src="/bradesco.png" width={50} height={50} />
					<p className="text-neutral-focus mb-0">Bradesco</p>
					<p className="text-neutral-content text-sm -mt-1">Insdisponivel</p>
				</div>

				</div>

			
			</div>
		);
	}



	async clickOneStepSwap() {
		try {
			loadingWait.showLoading();
			let tx = await singletonEthereum.oneStepSwap(this.context.address, this.state.amountTransfer, this.props.isWithdraw);
			this.props.onHide();
			toastMsg("Transferência realizada com sucesso", "success");
		} catch (err) {
			toastMsg(err.message, "error");
			console.log(err);
		} finally {
			loadingWait.hideLoading();
		}
	}

	render() {
		let title = this.props.isWithdraw ? "Sacar BRL" : "Transferir BRL para o Tesouro Direto";
		let header = <ModalHeader title={title} onClose={() => this.props.onHide()} />;
		let buttonLabel = this.props.isWithdraw ? "Sacar para o Banco do Brasil" : "Transferir";
		let footer = (
			<div className="p-2 ">
				<button className="btn btn-sm btn-secondary " onClick={() => this.clickOneStepSwap()} disabled={this.state.amountTransfer == 0}>
					{buttonLabel}
				</button>
			</div>
		);
		return (
			<Modal visible={this.props.visible} header={header} footer={footer} classSize="w-full md:w-[600px]">
				{!this.props.isWithdraw && this.contentDeposit()}
				{this.props.isWithdraw && this.contentWithdraw()}
			</Modal>
		);
	}
}

export default OneStepSwap;
