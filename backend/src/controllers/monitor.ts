import Web3 from "web3";
import { PoolProvider } from "../provider/pool";
import { MongoDbInfra } from "../infra/mongodb";
import { Pool } from "../models/pools";
import { WalletProvider } from "../provider/wallet";
import { Wallet } from "../models/wallets";

import tesouroDiretoABI from "../../abis/TesouroDireto.json";
import realTokenizadoABI from "../../abis/RealTokenizado.json";
import enableAccountRDSTNContractABI from "../../abis/RealDigitalEnableAccount.json";
import TPFtABI from "../../abis/TPFt.json";
import swapOneStepBBABI from "../../abis/SwapOneStep.json";
import { BondProvider } from "../provider/bond";
import { Bond } from "../models/bonds";

export class MonitorEventController {
	providerUrl = process.env.providerUrl;

	// Criar uma instância do web3 usando o provedor
	web3 = new Web3(this.providerUrl);

	realTokenizadoSTNAddress = process.env.realTokenizadoSTNContract;
	realTokenizadoSTNContractABI = realTokenizadoABI.abi;
	realTokenizadoSTNContract = new this.web3.eth.Contract(this.realTokenizadoSTNContractABI, this.realTokenizadoSTNAddress);

	enableAccountRDContractSTNAddress = process.env.enableAccountRDContractSTNContract;
	enableAccountRDContractSTNContractABI = enableAccountRDSTNContractABI.abi;
	enableAccountRDContractSTNContract = new this.web3.eth.Contract(this.realTokenizadoSTNContractABI, this.realTokenizadoSTNAddress);

	tpftContractAddress = process.env.tpftContract;
	tpftContractABI = TPFtABI.abi;
	tpftContract = new this.web3.eth.Contract(this.tpftContractABI, this.tpftContractAddress);

	tesouroDiretoAdress = process.env.tesouroDiretoContract;
	tesouroDiretoContractABI = tesouroDiretoABI.abi;
	tesouroDiretoContract = new this.web3.eth.Contract(this.tesouroDiretoContractABI, this.tesouroDiretoAdress);

	swapOneStepBBContractAddress = process.env.swapOneStepBBContract;
	swapOneStepBBContractABI = swapOneStepBBABI.abi;
	swapOneStepBBContract = new this.web3.eth.Contract(this.swapOneStepBBContractABI, this.swapOneStepBBContractAddress);

	lastBlock = 0;
	eventQueue: any[] = [];
	processing = false;
	
	constructor(private mongoInfra: MongoDbInfra) {
		this.innitialize();
	}
	async innitialize() {
		await this.getLastBlock();
		this.realTokenizadoSTNContract.events.allEvents({ fromBlock: this.lastBlock }).on("data", (event: any) => {
			this.insertEvent(event);
		});
		this.tesouroDiretoContract.events.allEvents({ fromBlock: this.lastBlock }).on("data", (event: any) => {
			this.insertEvent(event);
		});
		this.tpftContract.events.allEvents({ fromBlock: this.lastBlock  }).on("data", (event: any) => {
			this.insertEvent(event);
		});

		setInterval(() => {
			this.processEvents();
		}, 1000);
	}

	// Process events in the order they were received
	async processEvent(event) {
		// Your existing event handling code goes here
		// For example:
		switch (event.event) {
			// case "newLiquidityPool":
			// 	await this.eventNewLiquidityPool(event);
			// 	break;
			// case "LiquidityAdded":
			// 	await this.eventLiquidityAdded(event);
			// 	break;
			// case "EnabledAccount":
			// 	await this.eventEnableAccount(event);
			// 	break;
			// case "Transfer":
			// 	await this.eventTransfeRealTokenizadoSTN(event);
			// 	break;
			// case "TransferSingle":
			// 	await this.eventTranferTpft(event);
			// 	break;
			// case "CreatedTPFt":
			// 	await this.eventCreateTPFt(event);
			// 	break;
			case "swapped":
				await this.eventSwapped(event);
				break;

			default:
				break;
		}
		// Update the last processed block
		await this.updateLastBlock(event.blockNumber);
	}
	insertEvent(event) {
		this.eventQueue.push(event);
		this.eventQueue = this.eventQueue.sort((a, b) => {
			if (a.blockNumber !== b.blockNumber) {
				return Number(a.blockNumber) - Number(b.blockNumber);
			} else {
				return Number(a.transactionIndex) - Number(b.transactionIndex);
			}
		});
	}

	async processEvents() {
		try {
			if (this.processing) return;
			this.processing = true;
			while (this.eventQueue.length > 0) {
				let event = this.eventQueue.shift();
				await this.processEvent(event);
			}
		} catch (err) {
		} finally {
			this.processing = false;
		}
	}

	async updateLastBlock(blockNumber: number) {
		this.lastBlock = blockNumber;
		let conn = await this.mongoInfra.getConnection();
		await conn.collection("lastBlock").updateOne({ id: 1 }, { $set: { lastBlock: blockNumber } }, { upsert: true });
	}
	async getLastBlock() {
		if (this.lastBlock) return this.lastBlock;

		let conn = await this.mongoInfra.getConnection();
		let lastBlock = await conn.collection("lastBlock").findOne({ id: 1 });
		if (lastBlock) {
			this.lastBlock = lastBlock.lastBlock;
		} else this.lastBlock = 0;
	}

	async eventNewLiquidityPool(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;
			let poolProvider = new PoolProvider(this.mongoInfra);
			let pool: Pool = {
				id: event.returnValues.id,
				description: event.returnValues.pool.description,
				priceA: event.returnValues.pool.priceA,
				reservA: event.returnValues.pool.reserveA,
				reserveReal: event.returnValues.pool.reserveReal,
				swapFee: event.returnValues.pool.swapFee,
				tokenA: event.returnValues.pool.tokenA,
				totalSupplyLP: event.returnValues.pool.totalSupplyLP,
			};
			await poolProvider.setPool(pool);
			// this.updateLastBlock(event.blockNumber);
			console.log("eventNewLiquidityPool ", pool);
		} catch (err) {
			throw err;
		}
	}

	async eventLiquidityAdded(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;

			let poolProvider = new PoolProvider(this.mongoInfra);
			let pool = await poolProvider.getPool(event.returnValues.poolId);
			if (!pool) return;

			//ajustando a pool
			pool.reserveReal = (BigInt(pool.reserveReal) +  BigInt(event.returnValues.amountRealTokenizado)).toString();
			pool.totalSupplyLP = (BigInt(pool.totalSupplyLP) +  BigInt(event.returnValues.amountLiquidity)).toString();
			pool.reservA  = (BigInt(pool.reservA) +  BigInt(event.returnValues.amountTokenA)).toString();
			await poolProvider.setPool(pool);
			console.log("eventLiquidityAdded ", pool.id, event.returnValues.amountLiquidity, event.returnValues.amountTokenA, event.returnValues.amount);
		} catch (err) {
			console.log(err)
			// throw err;
		}
	}

	async eventEnableAccount(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;

			let walletProvider = new WalletProvider(this.mongoInfra);
			let wallet: Wallet = {
				wallet: event.returnValues.member,
				registered: true,
				balanceRealToken: '0',
				bonds: [],
				pools: [],
				tokensLP: [],
			};
			await walletProvider.setWallet(wallet);
			// this.updateLastBlock(event.blockNumber);
			console.log("eventEnableAccount ", wallet.wallet);
		} catch (err) {
			throw err;
		}
	}

	//    event Transfer(address indexed from, address indexed to, uint256 value);
	async eventTransfeRealTokenizadoSTN(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;

			// atualizar a wallet de quem recebeu
			let walletProvider = new WalletProvider(this.mongoInfra);
			let wallet = await walletProvider.getWallet(event.returnValues.to);
			if (wallet) {
				wallet.balanceRealToken = (BigInt(event.returnValues.value) +  BigInt(event.returnValues.value)).toString();
				await walletProvider.setWallet(wallet);
			}

			// atualizar a wallet de quem enviou
			wallet = await walletProvider.getWallet(event.returnValues.from);
			if (wallet) {
				wallet.balanceRealToken = (BigInt(event.returnValues.value)-  BigInt(event.returnValues.value)).toString();
				await walletProvider.setWallet(wallet);
			}

			// this.updateLastBlock(event.blockNumber);
			console.log("eventTransfer ", event.returnValues);
		} catch (err) {
			throw err;
		}
	}
	//event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
	async eventTranferTpft(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;

			let bondProvider = new BondProvider(this.mongoInfra);
			let bondId = Number(event.returnValues.id);
			let bond = await bondProvider.getBond(bondId);
			if (!bond) return;

			// atualizar a wallet de quem recebeu
			let walletProvider = new WalletProvider(this.mongoInfra);
			let wallet = await walletProvider.getWallet(event.returnValues.to);
			if (!wallet) return;
			if (!wallet.bonds) wallet.bonds = [];
			let bondWallet = wallet.bonds.find((b) => b.id == bondId);
			if (!bondWallet) {
				bondWallet = {
					id: bondId,
					code: bond.code,
					amount: "0",
					description: bond.description,
					type: bond.type,
				};
				wallet.bonds.push(bondWallet);
			}
			bondWallet.amount = (BigInt(bondWallet.amount) + BigInt(event.returnValues.value)).toString();
			await walletProvider.setWallet(wallet);

			//atualizar a wallet de quem enviou
			wallet = await walletProvider.getWallet(event.returnValues.from);
			if (wallet) {
				if (!wallet.bonds) wallet.bonds = [];
				bondWallet = wallet.bonds.find((b) => b.id == bondId);
				if (!bondWallet) return;
				bondWallet.amount = (BigInt(bondWallet.amount) - BigInt(event.returnValues.value)).toString();
				await walletProvider.setWallet(wallet);
			}

			// this.updateLastBlock(event.blockNumber);
			console.log("eventTranferTpft ", event.returnValues);
		} catch (err) {
			throw err;
		}
	}
	async eventCreateTPFt(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;

			let bondProvider = new BondProvider(this.mongoInfra);
			let bond: Bond = {
				id: Number(event.returnValues.id),
				code: event.returnValues.tpftData.code,
				description: "",
				acronym: event.returnValues.tpftData.acronym,
				maturityDate: new Date(Number(event.returnValues.tpftData.maturityDate) * 1000),
			};
			await bondProvider.setBond(bond);
			// this.updateLastBlock(event.blockNumber);
			console.log("eventCreateTPFt ", bond.code);
		} catch (err) {
			throw err;
		}
	}

	async eventSwapped(event: any) {
		try {
			if (await this.checkTxAndSave(event.transactionHash) == false) return;

			let poolProvider = new PoolProvider(this.mongoInfra);
			let pool = await poolProvider.getPool(Number(event.returnValues.id));
			if (!pool) throw new Error("Pool not found");
			if (event.returnValues.isTokenAToRealDigital){
				pool.reserveReal = (BigInt(pool.reserveReal )-  BigInt(event.returnValues.amountOut)).toString();
				pool.reservA= (BigInt(pool.reservA) +  BigInt(event.returnValues.amountIn)).toString();
			}
			else{
				pool.reserveReal = (BigInt(pool.reserveReal ) +  BigInt(event.returnValues.amountOut)).toString();
				pool.reservA= (BigInt(pool.reservA)-  BigInt(event.returnValues.amountIn)).toString();
				
			}
			pool.priceA = event.returnValues.newPrice;
		
			await poolProvider.setPool(pool);
			console.log("eventNewLiquidityPool ", pool);
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async saveTx(transactionHash:string){
		try {
			let conn = await this.mongoInfra.getConnection();
			conn.collection('tx').insertOne({transactionHash:transactionHash});
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	async isTxSaved(transactionHash:string){
		try {
			let conn = await this.mongoInfra.getConnection();
			let tx = await conn.collection('tx').findOne({transactionHash:transactionHash});
			return tx;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}

	async checkTxAndSave(transactionHash:string){
		try {
			return true;
			let tx = await this.isTxSaved(transactionHash);
			if (!tx){
				await this.saveTx(transactionHash);
				return true;
			}
			console.log("tx already processed ", transactionHash);
			return false;
		} catch (err) {
			console.log(err);
			throw err;
		}
	}
	
}
