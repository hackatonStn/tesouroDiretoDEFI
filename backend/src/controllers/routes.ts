import express from "express";
import { WalletProvider } from "../provider/wallet";

import { etherProviderSingleton, mongoInfraSingleton } from "../../singletons";
import { EtherProvider } from "../provider/ether";

var bodyParser = require("body-parser");

const app = express();
import cors from "cors";
import { PoolProvider } from "../provider/pool";
import { BondProvider } from "../provider/bond";

app.use(cors());
function cvalue(value: number) {
	return Math.round(value * Math.pow(10, 8));
}

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "responseType,Origin,Accept,X-Requested-With,content-type,Authorization,Accept");
	next();
});

// Rota para exibir informações do usuário
app.get("/api/wallet/:address", async (req, res) => {
	let address = req.params.address;
	let walletProvider = new WalletProvider(mongoInfraSingleton);
	let wallet = await walletProvider.getWallet(address);
	if (!wallet) {
		wallet = {
			balanceRealToken: "0",
			wallet: address,
			pools: [],
			registered: false,
			bonds: [],
			tokensLP: [],
		};
		await walletProvider.setWallet(wallet);

		await etherProviderSingleton.mintRealTokenizadoBB(address, cvalue(1000));
		// concede R$ 1000.00 para o usuário no contrato do BB
		await etherProviderSingleton.enableAccountRealTokenizadoSTN(address);
		await etherProviderSingleton.enableAccountRealTokenizadoBB(address);
	}

	let balanceRealTokenizadoBB = await etherProviderSingleton.getBalanceRealTokenizadoBB(address);
	let balanceRealToken = await etherProviderSingleton.getBalanceRealTokenizadoSTN(address);
	wallet.balanceRealToken = balanceRealToken.toString();
	await walletProvider.setWallet(wallet);

	res.status(200).json({ wallet, balanceRealTokenizadoBB: balanceRealTokenizadoBB });
});

app.get("/api/data", async (req, res) => {
	let poolProvider = new PoolProvider(mongoInfraSingleton);
	let pools = await poolProvider.getPools();

	let bondProvider = new BondProvider(mongoInfraSingleton);
	let bonds = await bondProvider.getBonds();

	res.status(200).json({ pools: pools, bonds: bonds });
});

app.post("/api/notifySwapped", async (req, res) => {
	let address = req.body.address;
	let poolId = req.body.poolId;

	let etherProvider = new EtherProvider(mongoInfraSingleton);
	let poolBlockChain = await etherProvider.getPool(poolId);

	let poolProvider = new PoolProvider(mongoInfraSingleton);
	let pool = await poolProvider.getPool(poolId);

	let walletProvider = new WalletProvider(mongoInfraSingleton);
	let wallet = await walletProvider.getWallet(address);

	let bondProvider = new BondProvider(mongoInfraSingleton);
	let bond = await bondProvider.getBond(poolId);
	if (wallet && pool && bond) {
		let balanceRealTokenizadoBlockChain = await etherProvider.getBalanceRealTokenizadoSTN(address);
		let balanceTokenABlockChain = await etherProvider.balanceTokenA(address, pool.tokenA);

		pool.priceA = poolBlockChain.priceA.toString();
		pool.reservA = poolBlockChain.reserveA.toString();
		pool.reserveReal = poolBlockChain.reserveReal.toString();
		pool.totalSupplyLP = poolBlockChain.totalSupplyLP.toString();
		await poolProvider.setPool(pool);

		if (balanceTokenABlockChain == BigInt(0)) {
			wallet.bonds = wallet.bonds?.filter((p) => p.id != pool?.tokenA);
		} else {
			let bondUser = wallet.bonds?.find((b) => b.id == pool?.tokenA);
      if (!wallet.bonds)
        wallet.bonds = [];
			if (!bondUser) {
				bondUser = {
					amount: "0",
					id: pool.tokenA,
					code: bond.code,
					description: bond.description,
				};
				wallet.bonds?.push(bondUser);
			}
			bondUser.amount = balanceTokenABlockChain.toString();
		}
		wallet.balanceRealToken = balanceRealTokenizadoBlockChain.toString();
		await walletProvider.setWallet(wallet);
	}

	res.status(200).json({ wallet, pool });
});

// Iniciar o servidor
app.listen(8000, () => {
	console.log("Servidor iniciado na porta 8000");
});
