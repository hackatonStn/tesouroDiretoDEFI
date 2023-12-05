// @ts-nocheck

import { ethers } from "hardhat";
import { env } from "./env";

function cvalue(value) {
	return Math.round(value * Math.pow(10, 8));
}

async function execute() {
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

	// const enableAccountBB = await ethers.getContractFactory("RealDigitalEnableAccount");
	// const enableAccountBBContract = enableAccountBB.attach(env.enableAccountBBContract);

	const [bancoCentral, tesouroNacional, tPFtManager, bb, alice, bob, robber1] = await ethers.getSigners();

	console.log("banco central: ", await bancoCentral.getAddress());
	console.log("tesouro nacional: ", await tesouroNacional.getAddress());
	console.log("tpft manager: ", await tPFtManager.getAddress());
	console.log("bb: ", await bb.getAddress());
	console.log("alice: ", await alice.getAddress());
	console.log("bob: ", await bob.getAddress());

	// criando o real na reserva da STN e transferindo uma parte para o tpftManager
	let tx = await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tPFtManager.address);
	await tx.wait();
	let tx = await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tesouroNacional.address);
    await tx.wait();
	let tx = await realTokenizadoSTNContract.connect(tesouroNacional).mint(await tesouroNacional.getAddress(), ethers.parseUnits("1000000000", 8));
    await tx.wait();
	let tx = await realTokenizadoSTNContract.connect(tesouroNacional).transfer(tPFtManager.address, ethers.parseUnits("500000000", 8));
    await tx.wait();

	// criando  o titulo na conta tpftManager
	let tx = await tpftContract.allowTPFtMint(tesouroNacional.address);
    await tx.wait();
	let tx = await tpftContract.allowDirectPlacement(tesouroNacional.address);
    await tx.wait();
	// await tpftContract.connect(tesouroNacional).createTPFt(tit1);
	// await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(10000));
	// await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, cvalue(10000), "0x");

	// criando o real na conta reserva do bb
	let tx = await realTokenizadoBBContract.connect(bb).enableAccount(bb.address);
    await tx.wait();
	let tx = await realTokenizadoBBContract.connect(bb).mint(bb.address, ethers.parseUnits("10000000", 8));
    await tx.wait();

	// transferindo da reserva do BB para a conta da alice
	// await realTokenizadoBBContract.connect(bb).enableAccount(alice.address);
	// await realTokenizadoBBContract.connect(bb).transfer(alice.address, cvalue(100000));

	// dando os grants necessarios para a transferencia para o tesouro
	let moverRoleBB = "0xe5ed70e23144309ce456cb48bf5e6d0d8e160f094a6d65ecf1d5b03cf292d8e6"; // await realTokenizadoBBContract.MOVER_ROLE()
	let mintRoleSTN = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"; // await realTokenizadoSTNContract.MINTER_ROLE()
	let tx = await realTokenizadoBBContract.connect(bancoCentral).grantRole(moverRoleBB, env.swapOneStepBBContract);
    await tx.wait();
	let tx = await realTokenizadoSTNContract.connect(bancoCentral).grantRole(mintRoleSTN, env.swapOneStepBBContract);
    await tx.wait();
	// await realTokenizadoBBContract.connect(alice).approve(swapOneStepBBContract.getAddress(), cvalue(1000));
	let tx = await realTokenizadoBBContract.connect(bb).enableAccount(tesouroNacional.address);
    await tx.wait();

	// aprovando a conta da alice no tesouro
	// await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(alice.address);

	// fazendo a transferencia para a conta dela no tesouro
	// await swapOneStepBBContract.connect(alice).executeSwap(realTokenizadoBBContract, realTokenizadoSTNContract, alice.address, cvalue(1000));

	// criando a pool de liquidez
	// await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(1, cvalue(100), cvalue(0.01));

	//adicionando liquidez
	// await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(1000000));
	let tx = await tpftContract.connect(tPFtManager).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
    await tx.wait();
	let tx = await tpftContract.connect(tesouroNacional).setApprovalForAll(await tPFtManager.getAddress(), true);
    await tx.wait();
	// await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(1, cvalue(10000));

	// alice compra titulo
	// await realTokenizadoSTNContract.connect(alice).approve(await tesouroDiretoContract.getAddress(), cvalue(105));
	// await tesouroDiretoContract.connect(alice).swap(1, cvalue(105), false, cvalue(1));

	//verificações de saldo
	// expect(await realTokenizadoSTNContract.connect(tPFtManager).balanceOf(tPFtManager)).to.equal(cvalue(1000000 + 105));
	// expect(await tpftContract.connect(tPFtManager).balanceOf(tPFtManager, 1))
	// .to.be.lessThan(cvalue(10000))
	// .and.to.be.greaterThan(cvalue(9998));
	// expect(await realTokenizadoSTNContract.connect(alice).balanceOf(alice.address)).to.equal(cvalue(1000 - 105));
	// expect(await realTokenizadoBBContract.connect(alice).balanceOf(alice.address)).to.equal(cvalue(100000 - 1000));
	// expect(await tpftContract.connect(alice).balanceOf(alice.address, 1))
	// .to.greaterThanOrEqual(cvalue(1))
	// .and.to.be.lessThan(cvalue(1.3));

	//alice vende o titulo
	// let ammountAlice = await tpftContract.connect(alice).balanceOf(alice.address, 1);
	// await tpftContract.connect(alice).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
	let tx = await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await tesouroDiretoContract.getAddress());
    await tx.wait();
	// await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(150));
	// await tesouroDiretoContract.connect(alice).swap(1, ammountAlice, true, cvalue(100));

	//alice transfere o saldo para o BB
	let moverRoleSTN = "0xe5ed70e23144309ce456cb48bf5e6d0d8e160f094a6d65ecf1d5b03cf292d8e6"; //await realTokenizadoSTNContract.MOVER_ROLE()
	let mintRoleBB = "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"; //await realTokenizadoBBContract.MINTER_ROLE()
	let tx = await realTokenizadoSTNContract.connect(bancoCentral).grantRole(moverRoleSTN, env.swapOneStepSTNContract);
    await tx.wait();
	let tx = await realTokenizadoBBContract.connect(bancoCentral).grantRole(mintRoleBB, env.swapOneStepSTNContract);
    await tx.wait();
	let tx = await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(bb.address); //permintindo a reserva do bb
    await tx.wait();

	// let ammountAliceSTN = await realTokenizadoSTNContract.connect(alice).balanceOf(alice.address);
	// let ammountAliceBB = await realTokenizadoBBContract.connect(alice).balanceOf(alice.address);

	// await realTokenizadoSTNContract.connect(alice).approve(await swapOneStepSTNContract.getAddress(), ammountAliceSTN);
	// await swapOneStepSTNContract.connect(alice).executeSwap(realTokenizadoSTNContract, realTokenizadoBBContract, alice.address, ammountAliceSTN);

	//verificações de saldo
	// expect(await realTokenizadoBBContract.connect(bb).balanceOf(bb.address)).to.equal(Number(ammountAlice) + Number(cvalue(10000000 - 100000)));
	// expect(await realTokenizadoSTNContract.connect(alice).balanceOf(alice.address)).to.equal(0);
	// expect(await realTokenizadoBBContract.connect(alice).balanceOf(alice.address)).to.equal(9900000000000 + 99791071444);
}
execute();
