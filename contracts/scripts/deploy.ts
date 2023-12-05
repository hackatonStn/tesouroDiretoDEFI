import { ethers } from "hardhat";

let cnpjTesouroNacional = 12345678;
let cnpjBB = 98765432;

async function main() {
	const [bancoCentral, tesouroNacional, tPFtManager, bb, alice, bob, robber1] = await ethers.getSigners();
	const realTokenizadoSTN = await ethers.getContractFactory("RealTokenizado");
	const realTokenizadoBB = await ethers.getContractFactory("RealTokenizado");
	console.log("// Deploying contracts with the account:", await bancoCentral.getAddress());

	const realTokenizadoSTNContract = await realTokenizadoSTN
		.connect(tesouroNacional)
		.deploy(
			"Tesouro Direto",
			"BRL@" + cnpjTesouroNacional,
			tesouroNacional.address,
			bancoCentral.address,
			"TesouroNacional",
			cnpjTesouroNacional,
			tesouroNacional.address
		);

	// const enableAccountRDSTN = await ethers.getContractFactory("RealDigitalEnableAccount");
	// const enableAccountRDSTNContract = await enableAccountRDSTN.deploy(realTokenizadoSTNContract.getAddress());

	const tpft = await ethers.getContractFactory("TPFt");
	const tpftContract = await tpft.deploy();

	const swapOneStepSTN = await ethers.getContractFactory("SwapOneStep");
	const swapOneStepSTNContract = await swapOneStepSTN.deploy(realTokenizadoSTNContract);
	await swapOneStepSTNContract.waitForDeployment();

	// const enableTpft = await ethers.getContractFactory("TPFtAccessControl");
	// const enableTpftContract = await enableTpft.deploy();

	const realTokenizadoBBContract = await realTokenizadoBB.deploy(
		"Tesouro Direto",
		"BRL@CNPJ_BB",
		bb.address,
		bancoCentral.address,
		"BancoDoBrasil",
		cnpjBB,
		bb.address
	);
	await realTokenizadoBBContract.waitForDeployment();

	const swapOneStepBB = await ethers.getContractFactory("SwapOneStep");
	const swapOneStepBBContract = await swapOneStepBB.deploy(realTokenizadoBBContract);
	await swapOneStepBBContract.waitForDeployment();

	// const enableAccountBB = await ethers.getContractFactory("RealDigitalEnableAccount");
	// const enableAccountBBContract = await enableAccountBB.deploy(realTokenizadoBBContract.getAddress());

	const tesouroDireto = await ethers.getContractFactory("TesouroDireto");

	const tesouroDiretoContract = await tesouroDireto.deploy(
		await realTokenizadoSTNContract.getAddress(),
		await tpftContract.getAddress(),
		tPFtManager.address
	);
	await tesouroDiretoContract.waitForDeployment();


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
