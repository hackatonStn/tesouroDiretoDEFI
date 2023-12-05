import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
	solidity: "0.8.20",
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {
			accounts: [

			],
			loggingEnabled: true,
		},
		mumbai: {
			
			//  url: "https://rpc-mumbai.maticvigil.com",
			
			 blockGasLimit: 10000000,
			 gasPrice: 3500000015,// 1.5 Gwei em wei
			// gas: "auto", // Usa estimativa automática de gás
			// gasPrice: "auto", // Usa estimativa automática de preço de gás
			gasMultiplier: 3, // Aumenta a estimativa de gás em 50% para garantir que as transações sejam mineradas
			// initialBaseFeePerGas: 1000000000, // 1 Gwei, ajuste conforme necessário
			// hardfork: "london", // Especifica a versão do hardfork, use a mais recente suportada pela rede
			// minGasPrice: 1000000000,
			// blockGasLimit: 5000000,
			
			accounts: [

			],
		},
	},
};

export default config;

// Accounts
// ========
// Account #0: 0x6f4352C902C1d544B5D5bdC35c38C98138ae0b38 (10 ETH) //bancoCentral
// Account #1: 0xAbC23Ffbc47c2DB2b59b2133295c0F5801731b93 (10 ETH) //tesouroNacional
// Account #2: 0x7C770eF57F469Da6C6d799D9F80d15Eb46931C41 (10 ETH) //tPFtManager
// Account #3: 0xB6327c01464F9Ea8A8dcC3d93b7A11f20B4FFb1B (10 ETH) //bb
// Account #4: 0x340A6c56109921CCc874d57c113aA286E2D68FBE (10 ETH) //alice
// Account #5: 0xf1C6a44FF38A1030cfe9F2Cd5CE95d8257ce5B9C (10 ETH) //bob
// Account #6: 0x950a2743DBD0905679Dd2d186FE597Ae2eF28234 (10 ETH)
// Account #7: 0x000a93b83164188e8382cD400bc66AEEc724B2ff (10 ETH)