import { ethers } from "hardhat";

async function main() {
	let cnpjTesouroNacional = 12345678;
	let cnpjBB = 98765432;
	const [bancoCentral, tesouroNacional, tPFtManager, bb, alice, bob, robber1] = await ethers.getSigners();
	const realTokenizadoSTN = await ethers.getContractFactory("RealTokenizado");
	const realTokenizadoBB = await ethers.getContractFactory("RealTokenizado");
	console.log("// Deploying contracts with the account:", await bancoCentral.getAddress());

	// const realTokenizadoSTNContract = await realTokenizadoSTN
	// 	.connect(tesouroNacional)
	// 	.deploy(
	// 		"Tesouro Direto",
	// 		"BRL@" + cnpjTesouroNacional,
	// 		tesouroNacional.address,
	// 		bancoCentral.address,
	// 		"TesouroNacional",
	// 		cnpjTesouroNacional,
	// 		tesouroNacional.address
	// 	);

	// const realTokenizadoBBContract = await realTokenizadoBB.deploy(
	// 	"Tesouro Direto",
	// 	"BRL@CNPJ_BB",
	// 	bb.address,
	// 	bancoCentral.address,
	// 	"BancoDoBrasil",
	// 	cnpjBB,
	// 	bb.address
	// );

    //deploys manuais
    const realTokenizadoSTNContract = "0x0abafacdb4034ff8847efd682b6e142b542938f4";
    const realTokenizadoBBContract = "0xddeb0dd9597c2033b4c31faba5eb43f8062d4777";


    const tpft = await ethers.getContractFactory("TPFt");
	const tpftContract = await tpft.deploy();
    console.log(`"tpftContract"  : "${await tpftContract.getAddress()}"`)

    const swapOneStepSTN = await ethers.getContractFactory("SwapOneStep");
	const swapOneStepSTNContract = await swapOneStepSTN.deploy(realTokenizadoSTNContract);
    console.log(`"swapOneStepSTNContract"  : "${await swapOneStepSTNContract.getAddress()}"`)


    const swapOneStepBB = await ethers.getContractFactory("SwapOneStep");
	const swapOneStepBBContract = await swapOneStepBB.deploy(realTokenizadoBBContract); //0xFD50B2c025c396DaCbAEbdf70bcab57540768205
    console.log(`"swapOneStepBBContract"  : "${await swapOneStepBBContract.getAddress()}"`)



    const tesouroDireto = await ethers.getContractFactory("TesouroDireto");
	const tesouroDiretoContract = await tesouroDireto.deploy(
		realTokenizadoSTNContract,
		await tpftContract.getAddress(),
		tPFtManager.address
	);

}
main();
