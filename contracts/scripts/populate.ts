// @ts-nocheck

import { ethers } from "hardhat";
import { env } from "./env";

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

	let tit1 = {
		acronym: "PRE2030",
		code: "00001",
		maturityDate: new Date('2030-01-01T00:00:00.000-03:00').getTime() / 1000,
	};
    //["PRE2030","00001",1893456000]

	let tit2 = {
		acronym: "IPCA+ 2035",
		code: "00002",
		maturityDate: new Date('2030-01-01T00:00:00.000-03:00').getTime() / 1000,
	};
    //["IPCA+ 2035","00002",1893456000]

	let tit3 = {
		acronym: "RENDA+ 2045",
		code: "00003",
		maturityDate: new Date('2045-01-01T00:00:00.000-03:00').getTime() / 1000,
	};


	let tit4 = {
		acronym: "EDUCA+ 2035",
		code: "00004",
		maturityDate: new Date('2035-01-01T00:00:00.000-03:00').getTime() / 1000,
	};

	let tit5 = {
		acronym: "VERDE+ 2040",
		code: "00005",
		maturityDate: new Date('2040-01-01T00:00:00.000-03:00').getTime() / 1000,
	};

	await tpftContract.connect(tesouroNacional).createTPFt(tit1);
    await tpftContract.connect(tesouroNacional).createTPFt(tit2);
	await tpftContract.connect(tesouroNacional).createTPFt(tit3);
	await tpftContract.connect(tesouroNacional).createTPFt(tit4);
	await tpftContract.connect(tesouroNacional).createTPFt(tit5);
    

	await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, ethers.parseUnits("150000", 8,"0x"));
    
	let tx= await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, ethers.parseUnits("150000", 8), "0x");
    await tx.wait();

	tx= await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit2, ethers.parseUnits("150000", 8));
    await tx.wait();
	tx= await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 2, ethers.parseUnits("150000", 8), "0x");
    await tx.wait();

	tx= await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit3, ethers.parseUnits("150000", 8));
    await tx.wait();
    ////////////////
	tx= await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 3, ethers.parseUnits("150000", 8), "0x");
    await tx.wait();
    ///////////////
	tx= await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit4, ethers.parseUnits("150000", 8));
    await tx.wait();
	tx= await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 4, ethers.parseUnits("150000", 8), "0x");
    await tx.wait();
	tx= await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit5, ethers.parseUnits("150000", 8));
    await tx.wait();
	tx= await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 5, ethers.parseUnits("150000", 8), "0x");
    await tx.wait();


	//criando os pools
	tx = await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(1, ethers.parseUnits("600", 8), ethers.parseUnits("0.002", 8));
   await tx.wait();  
    tx = await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), ethers.parseUnits("5000000", 8));
    await tx.wait();
	tx = await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(1, ethers.parseUnits("3000", 8));
    await tx.wait();

	tx = await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(2, ethers.parseUnits("2200", 8), ethers.parseUnits("0.003", 8));
    await tx.wait();
   
    tx = await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), ethers.parseUnits("15000000", 8));
    await tx.wait();
	tx = await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(2, ethers.parseUnits("4000", 8));
    await tx.wait();

	tx = await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(3, ethers.parseUnits("776", 8), ethers.parseUnits("0.001", 8));
    await tx.wait();
   
    tx = await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), ethers.parseUnits("15000000", 8));
    await tx.wait();
	tx = await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(3, ethers.parseUnits("5500", 8));
    await tx.wait();

	tx = await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(4, ethers.parseUnits("1990", 8), ethers.parseUnits("0.001", 8));
    await tx.wait();
    tx = await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), ethers.parseUnits("15000000", 8));
    await tx.wait();
	tx = await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(4, ethers.parseUnits("4500", 8));
    await tx.wait();

	tx = await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(5, ethers.parseUnits("500", 8), ethers.parseUnits("0.001", 8));
    await tx.wait();
   
    tx = await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), ethers.parseUnits("15000000", 8));
    await tx.wait();
	tx = await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(5, ethers.parseUnits("3800", 8));
    await tx.wait();
}

execute()