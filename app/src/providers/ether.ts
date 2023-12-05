// services/EthereumService.ts
import { Contract, ethers } from "ethers";
import { RealTokenizado, SwapOneStep, TPFt, TesouroDireto } from "../typechain";

import realTokenizadoABI from "../abis/RealTokenizado.json";
import SwapOneStepABI from "../abis/SwapOneStep.json";
import TPFtABI from "../abis/TPFt.json";
import TesouroDiretoABI from "../abis/TesouroDireto.json";

import { formatFrom8Decimals } from "../infra/utils";
import SiteContext from "../context/wallet.context";

declare global {
	interface Window {
		ethereum: any;
	}
}

export class EthereumProvider {
	private provider: ethers.JsonRpcProvider;
	realTokenizadoSTNContract: RealTokenizado;
	realTokenizadoBBContract: RealTokenizado;
	swapOneStepBBContract: SwapOneStep;
	swapOneStepSTNContract: SwapOneStep;
	tpftContract: TPFt;
	tesouroDiretoContract: TesouroDireto;

	swapOneStepBBContractAddress = process.env.NEXT_PUBLIC_swapOneStepBBContract || "";
	realTokenizadoBBAddress = process.env.NEXT_PUBLIC_realTokenizadoBBContract || "";
	realTokenizadoSTNAddress = process.env.NEXT_PUBLIC_realTokenizadoSTNContract || "";
	swapOneStepSTNContractAddress = process.env.NEXT_PUBLIC_swapOneStepSTNContract || "";
	tpftContractAddress = process.env.NEXT_PUBLIC_tpftContract || "";
	tesouroDiretoContractAddress = process.env.NEXT_PUBLIC_tesouroDiretoContract || "";

	onBalanceChange: {  (address: string): void } = async () => {};

	constructor() {
		console.log("conectando a " + process.env.NEXT_PUBLIC_PROVIDER_ETH);
		this.provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_PROVIDER_ETH);

		//@ts-ignore
		this.realTokenizadoBBContract = new Contract(this.realTokenizadoBBAddress, realTokenizadoABI.abi, this.provider);
		//@ts-ignore
		this.swapOneStepBBContract = new Contract(this.swapOneStepBBContractAddress, SwapOneStepABI.abi, this.provider);

		//@ts-ignore
		this.realTokenizadoSTNContract = new Contract(this.realTokenizadoSTNAddress, realTokenizadoABI.abi, this.provider);

		//@ts-ignore
		this.swapOneStepSTNContract = new Contract(this.swapOneStepSTNContractAddress, SwapOneStepABI.abi, this.provider);

		//@ts-ignore
		this.tpftContract = new Contract(this.tpftContractAddress, TPFtABI.abi, this.provider);

		//@ts-ignore
		this.tesouroDiretoContract = new Contract(this.tesouroDiretoContractAddress, TesouroDiretoABI.abi, this.provider);
	}

	onWalletConnected: { (address: string): void } = () => {};

	async getBalance(address: string, contract: "stn" | "bb"): Promise<BigInt> {
		try {
			let balance;
			if (contract == "bb") balance = await this.realTokenizadoBBContract.balanceOf(address);
			else balance = await this.realTokenizadoSTNContract.balanceOf(address);
			return BigInt(balance);
		} catch (error) {
			console.error("Erro ao obter o saldo:", error);
			throw error;
		}
	}

	async getBalanceMatic(address: string): Promise<BigInt> {
		try {
			let balance = await this.provider.getBalance(address);
			return BigInt(balance);
		} catch (error) {
			throw error;
		}
	}

	async checkConnection() {
		try {
			const accounts = await this.provider.listAccounts();
			return accounts[0];
		} catch (error) {
			console.error("Erro ao verificar a conexão da carteira:", error);
			throw error;
		}
	}

	async requestAccount() {
		await window?.ethereum.request({ method: "eth_requestAccounts" });
	}

	async oneStepSwap(address: string, value: number, isSell: boolean) {
	try {
			// Conecte a carteira do usuário ao contrato
			const provider = new ethers.BrowserProvider(window.ethereum);
	
			let signer = await provider.getSigner();
	
			let tx: ethers.ContractTransactionResponse;
	
			if (!isSell) {
				tx = await this.realTokenizadoBBContract.connect(signer).approve(this.swapOneStepBBContract, ethers.parseUnits(value.toString(), 8));
				await tx.wait();
	
				tx = await this.swapOneStepBBContract
					.connect(signer)
					.executeSwap(this.realTokenizadoBBAddress, this.realTokenizadoSTNAddress, address, ethers.parseUnits(value.toString(), 8));
				await tx.wait();
			} else {
				tx = await this.realTokenizadoSTNContract.connect(signer).approve(this.swapOneStepSTNContract, ethers.parseUnits(value.toString(), 8));
				await tx.wait();
	
				tx = await this.swapOneStepSTNContract
					.connect(signer)
					.executeSwap(this.realTokenizadoSTNAddress, this.realTokenizadoBBAddress, address, ethers.parseUnits(value.toString(), 8));
	
				await tx.wait();
			}
			this.onBalanceChange(address);
			return tx;
	} catch (err) {
		console.log(err);
		throw err;
	}
	}

	async swap(address: string, poolId: number, amountIn: number, isTokenAtoRealDigital: boolean, minAmountOut: number) {
		try {
			const provider = new ethers.BrowserProvider(window.ethereum);

			let signer = await provider.getSigner();

			let tx: ethers.ContractTransactionResponse;

			//deixar apenas 5 casas decimais depois da virgula
			console.log("minAmountOut", minAmountOut);
			minAmountOut = Number(minAmountOut.toFixed(5));
			console.log("minAmountOut", minAmountOut);
			let amountIn8 = ethers.parseUnits(amountIn.toString(), 8);
			let minAmountOut8 = ethers.parseUnits(minAmountOut.toString(), 8);

			if (!isTokenAtoRealDigital) {
				//aprove
				tx = await this.realTokenizadoSTNContract.connect(signer).approve(this.tesouroDiretoContractAddress, amountIn8);
				await tx.wait();
			} else {
				//aprove
				tx = await this.tpftContract.connect(signer).setApprovalForAll(this.tesouroDiretoContractAddress, true);
				await tx.wait();
			}

			// no futuro enviar a asinatura da transação para o backend
			// const transactionRequest = await this.tesouroDiretoContract.connect(signer).swap(poolId, amountIn8, isTokenAtoRealDigital, minAmountOut8);
			// const rawTransaction = await signer.signTransaction(transactionRequest);

			tx = await this.tesouroDiretoContract.connect(signer).swap(poolId, amountIn8, isTokenAtoRealDigital, minAmountOut8);
			await tx.wait();
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
}

export default EthereumProvider;
