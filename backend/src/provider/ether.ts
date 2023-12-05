import { Contract, VoidSigner, Wallet, ethers } from "ethers";
import { RealTokenizado, SwapOneStep, TPFt, TesouroDireto } from "../../typechain";

import realTokenizadoABI from "../../abis/RealTokenizado.json";
import tesouroDiretoABI from "../../abis/TesouroDireto.json";
import enableAccountABI from "../../abis/RealDigitalEnableAccount.json";
import swapOneStepABI from "../../abis/SwapOneStep.json";
import TPFtABI from "../../abis/TPFt.json";

import { WalletProvider } from "./wallet";
import { MongoDbInfra } from "../infra/mongodb";
import { ITPFt } from "../../typechain/TPFt";
import { utils } from "web3";

export class EtherProvider {
	provider: ethers.JsonRpcProvider;
	providerUrl = process.env.providerUrlHttp;

	realTokenizadoSTNAddress = process.env.realTokenizadoSTNContract;
	enableAccountRDContractSTNAddress = process.env.enableAccountRDContractSTNContract;
	tpftContractAddress = process.env.tpftContract;
	realTokenizadoBBAddress = process.env.realTokenizadoBBContract;
	swapOneStepBBContractAddress = process.env.swapOneStepBBContract;
	tesouroDiretoContractAddress = process.env.tesouroDiretoContract;

	realTokenizadoSTNContract: RealTokenizado;
	realTokenizadoBBContract: RealTokenizado;
	swapOneStepBBContract: SwapOneStep;
	tpftContract: TPFt;
	tesouroDiretoContract: TesouroDireto;

	tesouroNacionalPK = process.env.tesouroNacionalPK || "";
	bancoCentralPK = process.env.bancoCentralPK || "";
	tPFtManagerPK = process.env.tPFtManagerPK || "";
	bbPK = process.env.bbPK || "";

	tesouroDiretoAdress = process.env.tesouroDiretoContract || "";
	bancoCentralAddress = process.env.bancoCentralAddress || "";
	tesouroNacionalAddress = process.env.tesouroNacionalAddress || "";
	tPFtManagerAddress = process.env.tPFtManagerAddress || "";
	bbAddress = process.env.bbAddress || "";

	walletTesouroNacional: Wallet;
	walletBancoCentral: Wallet;
	walletTPFtManager: Wallet;
	walletBB: Wallet;

	constructor(private mongodbInfra: MongoDbInfra) {
		if (!this.providerUrl || !this.tesouroNacionalPK || !this.realTokenizadoSTNAddress) {
			throw new Error("Parameters not found");
		}
		this.provider = new ethers.JsonRpcProvider(this.providerUrl);
		this.walletTesouroNacional = new Wallet(this.tesouroNacionalPK, this.provider);
		this.walletBancoCentral = new Wallet(this.bancoCentralPK, this.provider);
		this.walletTPFtManager = new Wallet(this.tPFtManagerPK, this.provider);
		this.walletBB = new Wallet(this.bbPK, this.provider);

		//@ts-ignore
		this.realTokenizadoSTNContract = new Contract(this.realTokenizadoSTNAddress, realTokenizadoABI.abi, this.provider);
		//@ts-ignore
		this.tpftContract = new Contract(this.tpftContractAddress, TPFtABI.abi, this.provider);

		//@ts-ignore
		this.realTokenizadoBBContract = new Contract(this.realTokenizadoBBAddress, realTokenizadoABI.abi, this.provider);

		//@ts-ignore
		this.tesouroDiretoContract = new Contract(this.tesouroDiretoContractAddress, tesouroDiretoABI.abi, this.provider);
	}

	async enableAccountRealTokenizadoSTN(address: string) {
		try {
			let walletProvider = new WalletProvider(this.mongodbInfra);
			let wallet = await walletProvider.getWallet(address);
			// if (wallet) return wallet;
			let tx = await this.realTokenizadoSTNContract.connect(this.walletTesouroNacional).enableAccount(address);
			let receipt = await tx.wait();
			return receipt;
		} catch (err) {
			throw err;
		}
	}

	async enableAccountRealTokenizadoBB(address: string) {
		try {
			let walletProvider = new WalletProvider(this.mongodbInfra);
			let wallet = await walletProvider.getWallet(address);
			let tx = await this.realTokenizadoBBContract.connect(this.walletBB).enableAccount(address);
			let receipt = await tx.wait();
			return receipt;
		} catch (err) {
			throw err;
		}
	}

	async mintRealTokenizadoSTN(address: string, amount: number) {
		try {
			let tx = await this.realTokenizadoSTNContract.mint(address, amount);
			let receipt = await tx.wait();
			return receipt;
		} catch (err) {
			throw err;
		}
	}

	async mintRealTokenizadoBB(address: string, amount: number) {
		try {
			let checkEnabled = await this.realTokenizadoBBContract.connect(this.walletBB).verifyAccount(address);
			if (!checkEnabled) {
				let tx = await this.realTokenizadoBBContract.connect(this.walletBB).enableAccount(address);
				await tx.wait();
			}
			let tx = await this.realTokenizadoBBContract.connect(this.walletBB).mint(address, amount, { gasLimit: 500000 });
			let receipt = await tx.wait();
			return receipt;
		} catch (err) {
			throw err;
		}
	}

	async transferRealTokenizadoSTN(to: string, amount: number) {
		try {
			let tx = await this.realTokenizadoSTNContract.transfer(to, amount);
			let receipt = await tx.wait();
			return receipt;
		} catch (err) {
			throw err;
		}
	}

	async getBalanceRealTokenizadoBB(address: string) {
		try {
			let balance = await this.realTokenizadoBBContract.connect(this.walletTesouroNacional).balanceOf(address);

			return Number(balance);
		} catch (err) {
			throw err;
		}
	}

	async getBalanceRealTokenizadoSTN(address: string) {
		try {
			let balance = await this.realTokenizadoSTNContract.connect(this.walletTesouroNacional).balanceOf(address);
			return balance;
		} catch (err) {
			throw err;
		}
	}

	async getPool(poolId: string) {
		try {
			let pool = await this.tesouroDiretoContract.connect(this.walletTesouroNacional).getPool(poolId);
			return pool;
		} catch (err) {
			throw err;
		}
	}

	async balanceTokenA(address: string, tokenId: number) {
		try {
			let balance = await this.tpftContract.connect(this.walletTesouroNacional).balanceOf(address, tokenId);
			return balance;
		} catch (err) {
			throw err;
		}
	}
}
