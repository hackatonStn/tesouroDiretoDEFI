// @ts-nocheck
// Run: npx hardhat run scripts/runCoomands.ts --network localhost

import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { ITPFt } from "../typechain-types";
import { expect } from "chai";
import { env } from "./env";

function cvalue(value) {
	return Math.round(value * Math.pow(10, 8));
}

let cnpjTesouroNacional = 12345678;
let cnpjBB = 98765432;

async function getAddress() {
	const realTokenizadoSTNFactory = await ethers.getContractFactory("RealTokenizado");
	const realTokenizadoSTNContract = realTokenizadoSTNFactory.attach(env.realTokenizadoSTNContract);

	const realTokenizadoBBFactory = await ethers.getContractFactory("RealTokenizado");
	const realTokenizadoBBContract = realTokenizadoBBFactory.attach(env.realTokenizadoBBContract);

	const tpftContractFactory = await ethers.getContractFactory("TPFt");
	const tpftContract = tpftContractFactory.attach(env.tpftContract);

	const tesouroDiretoContractFactory = await ethers.getContractFactory("TesouroDireto");
	const tesouroDiretoContract = tesouroDiretoContractFactory.attach(env.tesouroDiretoContract);

	const swapOneStepSTN = await ethers.getContractFactory("SwapOneStep");
	const swapOneStepSTNContract = swapOneStepSTN.attach(env.swapOneStepSTNContract);

	const swapOneStepBB = await ethers.getContractFactory("SwapOneStep");
	const swapOneStepBBContract = swapOneStepBB.attach(env.swapOneStepBBContract);

	const enableAccountBB = await ethers.getContractFactory("RealDigitalEnableAccount");
	const enableAccountBBContract = enableAccountBB.attach(env.enableAccountBBContract);

	return {
		realTokenizadoSTNContract,
		realTokenizadoBBContract,
		tpftContract,
		tesouroDiretoContract,
		swapOneStepSTNContract,
		swapOneStepBBContract,
		enableAccountBBContract,
	};
}

async function complete() {
	const [bancoCentral, tesouroNacional, tPFtManager, bb, alice, bob, robber1] = await ethers.getSigners();
	console.log("banco central: ", await bancoCentral.getAddress());
	console.log("tesouro nacional: ", await tesouroNacional.getAddress());
	console.log("tpft manager: ", await tPFtManager.getAddress());
	console.log("bb: ", await bb.getAddress());
	console.log("alice: ", await alice.getAddress());
	console.log("bob: ", await bob.getAddress());

	const {
		realTokenizadoSTNContract,
		realTokenizadoBBContract,
		tpftContract,
		tesouroDiretoContract,
		swapOneStepBBContract,
		swapOneStepSTNContract,
		enableAccountBBContract,
	} = await getAddress();

	let tit1 = {
		acronym: "PRE2030",
		code: "00001",
		maturityDate: new Date("2030-01-01").getTime() / 1000,
	};

	// criando o real na reserva da STN e transferindo uma parte para o tpftManager
	// await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tPFtManager.address);
	// await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tesouroNacional.address);
	await realTokenizadoSTNContract.connect(tesouroNacional).mint(await tesouroNacional.getAddress(), ethers.parseUnits("2000000",8));
	await realTokenizadoSTNContract.connect(tesouroNacional).transfer(tPFtManager.address,ethers.parseUnits("2000000",8) );

	// criando  o titulo na conta tpftManager
	// await tpftContract.allowTPFtMint(tesouroNacional.address);
	// await tpftContract.allowDirectPlacement(tesouroNacional.address);
	await tpftContract.connect(tesouroNacional).createTPFt(tit1);
	await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(100000));
	await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, cvalue(10000), "0x");

	// criando o real na conta reserva do bb
	// await realTokenizadoBBContract.connect(bb).enableAccount(bb.address);
	await realTokenizadoBBContract.connect(bb).mint(bb.address, cvalue(10000000));

	// transferindo da reserva do BB para a conta da bob
	await realTokenizadoBBContract.connect(bb).enableAccount(bob.address);
	await realTokenizadoBBContract.connect(bb).transfer(bob.address, cvalue(100000));

	// dando os grants necessarios para a transferencia para o tesouro
	// await realTokenizadoBBContract.connect(bancoCentral).grantRole(await realTokenizadoBBContract.MOVER_ROLE(), swapOneStepBBContract.getAddress());
	// await realTokenizadoSTNContract.connect(bancoCentral).grantRole(await realTokenizadoSTNContract.MINTER_ROLE(), swapOneStepBBContract.getAddress());
	await realTokenizadoBBContract.connect(bob).approve(swapOneStepBBContract.getAddress(), cvalue(1000));
	// await realTokenizadoBBContract.connect(bb).enableAccount(tesouroNacional.address);

	// aprovando a conta da bob no tesouro
	await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(bob.address);

	// fazendo a transferencia para a conta dela no tesouro
	await swapOneStepBBContract.connect(bob).executeSwap(realTokenizadoBBContract, realTokenizadoSTNContract, bob.address, cvalue(1000));

	// criando a pool de liquidez
	await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(1, cvalue(100), cvalue(0.01));

	//adicionando liquidez
	await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(1000000));
	// await tpftContract.connect(tPFtManager).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
	await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(1, cvalue(10000));

	// bob compra titulo
	await realTokenizadoSTNContract.connect(bob).approve(await tesouroDiretoContract.getAddress(), cvalue(105));
	await tesouroDiretoContract.connect(bob).swap(1, cvalue(105), false, cvalue(1));

	//verificações de saldo
	expect(await realTokenizadoSTNContract.connect(tPFtManager).balanceOf(tPFtManager)).to.equal(cvalue(2000000 + 105));
	expect(await tpftContract.connect(tPFtManager).balanceOf(tPFtManager, 1))
		.to.be.lessThan(cvalue(10000))
		.and.to.be.greaterThan(cvalue(9998));
	expect(await realTokenizadoSTNContract.connect(bob).balanceOf(bob.address)).to.equal(cvalue(1000 - 105));
	expect(await realTokenizadoBBContract.connect(bob).balanceOf(bob.address)).to.equal(cvalue(100000 - 1000));
	expect(await tpftContract.connect(bob).balanceOf(bob.address, 1))
		.to.greaterThanOrEqual(cvalue(1))
		.and.to.be.lessThan(cvalue(1.3));

	//bob vende o titulo
	let ammountbob = await tpftContract.connect(bob).balanceOf(bob.address, 1);
	await tpftContract.connect(bob).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
	// await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await tesouroDiretoContract.getAddress());
	await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(150));
	await tesouroDiretoContract.connect(bob).swap(1, ammountbob, true, cvalue(100));

	//bob transfere o saldo para o BB
	// await realTokenizadoSTNContract.connect(bancoCentral).grantRole(await realTokenizadoSTNContract.MOVER_ROLE(), swapOneStepSTNContract.getAddress());
	// await realTokenizadoBBContract.connect(bancoCentral).grantRole(await realTokenizadoBBContract.MINTER_ROLE(), swapOneStepSTNContract.getAddress());
	// await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(bb.address); //permintindo a reserva do bb

	let ammountbobSTN = await realTokenizadoSTNContract.connect(bob).balanceOf(bob.address);
	let ammountbobBB = await realTokenizadoBBContract.connect(bob).balanceOf(bob.address);

	await realTokenizadoSTNContract.connect(bob).approve(await swapOneStepSTNContract.getAddress(), ammountbobSTN);
	await swapOneStepSTNContract.connect(bob).executeSwap(realTokenizadoSTNContract, realTokenizadoBBContract, bob.address, ammountbobSTN);

	//verificações de saldo

	expect(await realTokenizadoSTNContract.connect(bob).balanceOf(bob.address)).to.equal(0);
	expect(await realTokenizadoBBContract.connect(bob).balanceOf(bob.address)).to.equal(9900000000000 + 99791071444);
}

async function run() {
	await complete();
	// await passo1();
	// await command1();
}

run();
