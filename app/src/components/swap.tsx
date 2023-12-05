import React from "react";
import router from "next/router";
import SiteContext, { singletonBackenProvider, singletonEthereum } from "../context/wallet.context";
import ButtonSelection, { IButtonSelectItem } from "./button-selection";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { ConvertFrom8Decimals, formatFrom8Decimals, formatMoney, formatTo8Decimals } from "../infra/utils";
import { ethers } from "ethers";
import { loadingWait } from "./loading";
import { toastMsg } from "./toast";
import { Pool } from "../models/pools";

interface SwapProps {}

interface SwapState {
	tabSwap: "buy" | "sell";
	bondselectedBuy: number;
	bondselectedSell: number;
	poolSelectedBuy?: Pool;
	poolSelectedSell?: Pool;
	buyValue: number;
	sellValue: number;

	amountTokenBuy: number;
	amountTokenSell: number;
	priceBondBuy: number;
	priceBondSell: number;
	loadedPrice: boolean;
}

class Swap extends React.Component<SwapProps, SwapState> {
	static contextType = SiteContext;
	context: React.ContextType<typeof SiteContext>;

	state: SwapState = {
		tabSwap: "buy",
		bondselectedBuy: 1,
		bondselectedSell: 1,
		buyValue: 0,
		sellValue: 0,
		amountTokenBuy: 0,
		amountTokenSell: 0,
		priceBondBuy: 0,
		priceBondSell: 0,
		loadedPrice: false,
	};

	itens: IButtonSelectItem[] = [
		{
			label: "Comprar",
			onClick: () => {
				this.setState({ tabSwap: "buy" });
				// this.router.push("/");
			},
			value: "buy",
		},
		{
			label: "Vender",
			onClick: () => {
				this.setState({ tabSwap: "sell" });
				// this.router.push("/advanced");
			},
			value: "sell",
		},
	];
	bonds: { label: string; value: number }[] = [];
	userBonds: { label: string; value: number }[] = [];

	componentDidMount() {}
	componentDidUpdate(prevProps: SwapProps) {
		if (this.context.pools.length != 0 && !this.state.loadedPrice) {
			this.setState({ loadedPrice: true });
			this.onChangeBondBuy(1);
			this.onChangeBondSell(1);
		}
	}

	onChangeBondBuy(value: number) {

		let pool = this.context.pools.find((pool) => pool.tokenA == value);
		if (!pool) return;
		let price = Number(pool.priceA) / 100000000;
		let minimum = this.state.buyValue / price;

        console.log('bbbb',value)
		this.setState({ bondselectedBuy: value, priceBondBuy: price, amountTokenBuy: minimum || 0, poolSelectedBuy: pool });
	}

	onChangeBondSell(value: number) {
        console.log('pools', this.context.pools)
        console.log('vvvv', value)


        let pool = this.context.pools.find((pool) => pool.tokenA == value);
        console.log('pool', pool)
		if (!pool) return;

		let price = Number(pool.priceA) / 100000000;
		let minimum = this.state.sellValue > 0 ? price / this.state.sellValue : 0;
        this.state.bondselectedSell = value;
		this.setState({ bondselectedSell: value, priceBondSell: price, amountTokenSell: minimum || 0, poolSelectedSell: pool });
	}

	onChangeBRLBuy(value: number) {
		this.setState({ buyValue: value });
		if (this.state.bondselectedBuy) {
			let minimum = value / this.state.priceBondBuy;
			console.log(`minimum`, minimum);
			this.setState({ amountTokenBuy: minimum });
		}
	}

	onChangeBRLSell(value: number) {
		this.setState({ sellValue: value });
		if (this.state.bondselectedSell) {
			let minimum = this.state.priceBondSell * value;
			console.log(`minimum`, minimum);
			this.setState({ amountTokenSell: minimum });
		}
	}

	async clickBuy() {
		if (!this.state.poolSelectedBuy) return;
		let minimum = this.state.amountTokenBuy * 0.99;
		try {
			loadingWait.showLoading();
			await singletonEthereum.swap(this.context.address, this.state.poolSelectedBuy.id, this.state.buyValue, false, minimum);
			await singletonBackenProvider.notifySwapped(this.context.address, this.state.poolSelectedBuy.id);
			singletonEthereum.onWalletConnected(this.context.address);
		} catch (err) {
			toastMsg(err.message, "error");
		} finally {
            toastMsg("Compra realizada com sucesso", "success");
			loadingWait.hideLoading();
		}
	}

    async clickSell() {
		if (!this.state.poolSelectedSell) return;
		let minimum = this.state.amountTokenSell * 0.99;
		try {
			loadingWait.showLoading();
			await singletonEthereum.swap(this.context.address, this.state.poolSelectedSell.id, this.state.sellValue, true, minimum);
			await singletonBackenProvider.notifySwapped(this.context.address, this.state.poolSelectedSell.id);
			singletonEthereum.onWalletConnected(this.context.address);
		} catch (err) {
			toastMsg(err.message, "error");
		} finally {
            toastMsg("Venda realizada com sucesso", "success");
			loadingWait.hideLoading();
		}
	}

	buyContent() {
		this.bonds = [];
		this.context.bonds.forEach((bond) => {
			this.bonds.push({ label: bond.description, value: bond.id });
		});
		this.userBonds = [];
		this.context.wallet.bonds?.forEach((bond) => {
			this.userBonds.push({ label: bond.description, value: bond.id });
		});

		return (
			<div className="w-full animate__animated  animate__fadeInLeft animate__faster p-1">
				<div className="flex flex-row justify-around w-full ">
					<div className="text-sm w-full">Você paga</div>
				</div>
				<div className="to-base-100 flex justify-around  mt-2">
					<div className="flex-grow input-transparent input-lg w-20 ">
						<InputNumber
							inputId="minmax"
							currency="BRL"
							mode="currency"
							value={this.state.buyValue}
							min={1.0}
							buttonLayout="horizontal"
							step={1}
							onChange={(e: any) => {
								this.onChangeBRLBuy(e.value);
							}}
						/>
					</div>
					<div className="rounded-3xl">
						<p className="text-3xl">BRL</p>
					</div>
				</div>
				<div className="text-xs text-neutral-400  w-full flex justify-end">
					Saldo <span className="text-xs text-neutral-focus ml-2">{formatFrom8Decimals(this.context.wallet.balanceRealToken,5)}</span>
				</div>
				<div className="divider">
					<i className="bi bi-arrow-down-circle  text-2xl" />
				</div>
				<div className="flex flex-row justify-around w-full">
					<div className="text-sm w-full">Você recebe</div>
				</div>
				<div className="to-base-100 flex justify-around p-1 mt-2">
					<div className="grow input-transparent input-lg">
						<p className="text-3xl mt-1 ml-2">{formatMoney(this.state.amountTokenBuy, false)}</p>
					</div>
					<div className=" rounded-3xl input-transparent dropdown-md lg:dropdown-lg mt-2 ">
						<Dropdown value={this.state.bondselectedBuy} options={this.bonds} onChange={(e) => this.onChangeBondBuy(e.value)} />
					</div>
				</div>
				<div className="divider"></div>
				<span className="text-xs text-gray-400">1 Título = </span>{" "}
				<span className="text-xs text-gray-400">{formatMoney(this.state.priceBondBuy)}</span>
                <p className="text-xs text-gray-400">Taxa de Swap de {Number(this.state.poolSelectedBuy?.swapFee)/1000000} %</p>
				<p className="text-xs text-gray-400">Slippage de 1%</p>
                
				<button
					className="btn btn-primary btn-block mt-4"
					disabled={
						!this.context.wallet.balanceRealToken ||
						!this.state.bondselectedBuy ||
						BigInt(this.context.wallet.balanceRealToken) < BigInt(formatTo8Decimals(this.state.buyValue)) ||
						this.state.buyValue == 0
					}
					onClick={() => this.clickBuy()}
				>
					Comprar
				</button>
			</div>
		);
	}

	sellContent() {
		let amountTokenA = this.context.wallet.bonds?.find((bond) => bond.id == this.state.bondselectedSell)?.amount || "0";
		return (
			<div className="w-full  animate__animated  animate__fadeInRight animate__faster p-1">
				<div className="flex flex-row justify-around w-full">
					<div className="text-sm w-full">Você Vende</div>
				</div>
				<div className="to-base-100 flex justify-around p-1 mt-2">
					<div className=" grow w-20 input-transparent input-lg">
						<InputNumber
							inputId="minmax"
                            size={4}
							value={this.state.sellValue}
							min={0.0}
							buttonLayout="horizontal"
							minFractionDigits={2}
							onChange={(e: any) => {
								this.onChangeBRLSell(e.value);
							}}
						/>
					</div>
					<div className=" rounded-3xl input-transparent dropdown-md ">
						<Dropdown value={this.state.bondselectedSell} options={this.userBonds} onChange={(e) => this.onChangeBondSell(e.value)} />
					</div>
				</div>
				<div className="text-xs text-neutral-400 text-end  flex justify-end">
					Saldo <span className="text-xs text-neutral-focus ml-2"> {formatFrom8Decimals(amountTokenA,5)}</span>
				</div>
				<div className="divider">
					<i className="bi bi-arrow-down-circle  text-2xl" />
				</div>
				<div className="flex flex-row justify-around w-full">
					<div className="text-sm w-full">Você recebe</div>
				</div>
				<div className="to-base-100  p-1 mt-2 flex">
					<div className="grow input-transparent input-lg ">
						<p className="text-3xl ">{formatMoney(this.state.amountTokenSell, false)}</p>
					</div>
					<div className="rounded-3xl">
						<p className="text-3xl">BRL</p>
					</div>
				</div>
				<div className="divider"></div>
				<p className="text-xs text-gray-400">1 Título Pre Fixado = {this.state.priceBondSell}</p> 
                <p className="text-xs text-gray-400">Taxa de Swap de {Number(this.state.poolSelectedSell?.swapFee)/1000000} %</p>
				<p className="text-xs text-gray-400">Slippage de 1%</p>
				<button
					className="btn btn-primary btn-block mt-4"
					disabled={
						this.state.sellValue  ==0 ||
						
						Number(amountTokenA)/100000000 < this.state.sellValue
						
					}
					onClick={() => this.clickSell()}
				>
					Vender
				</button>
			</div>
		);
	}
	render() {
		return (
			<div className=" flex flex-col items-center h-full w-full md:p-20 md:pt-5">
				<p className="text-xl w-full text-center">Swap</p>
				<p className="text-md w-full text-center -mt-2 text-gray-400 mb-5">Compre e venda títulos na velocidade da Web 3.0</p>

		

				<div className=" rounded-lg bg-base-300 flex flex-col md:p-2 mt-6 w-full lg:w-[540px] overflow-hidden">
					<div className="w-full flex justify-center mb-10">
						<ButtonSelection items={this.itens} value={this.state.tabSwap} style="tabs-bordered" active="bg-primary" label="text-white" />
					</div>
					{this.state.tabSwap == "buy" && this.buyContent()}
					{this.state.tabSwap == "sell" && this.sellContent()}
				</div>
			</div>
		);
	}
}

export default Swap;
