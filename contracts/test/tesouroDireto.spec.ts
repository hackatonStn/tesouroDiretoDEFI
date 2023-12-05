import { BigNumberish } from "ethers";
import { ethers } from "hardhat";
import { ITPFt } from "../typechain-types";
import { expect } from "chai";



enum PaymentType {
	TBRL,
	ETH,
}

enum TokenType {
	PRE,
	PRE_SEM,
	IPCA,
	IPCA_SEM,
	RENDA,
	EDUCA,
}


function cvalue(value: number): BigNumberish {
	return Math.round(value * Math.pow(10, 8));
}

let cnpjTesouroNacional = 12345678;
let cnpjBB = 98765432;

describe("TesouroDireto", function () {
	let dec = Math.pow(10, 8);
	async function deployFixture() {
		const [bancoCentral, tesouroNacional, tPFtManager, bb, alice, bob, robber1] = await ethers.getSigners();
		const realTokenizadoSTN = await ethers.getContractFactory("RealTokenizado");
		const realTokenizadoBB = await ethers.getContractFactory("RealTokenizado");

		const realTokenizadoSTNContract = await realTokenizadoSTN.connect(tesouroNacional).deploy(
			"Tesouro Direto",
			"BRL@" + cnpjTesouroNacional,
			tesouroNacional.address,
			bancoCentral.address,
			"TesouroNacional",
			cnpjTesouroNacional,
			tesouroNacional.address
		);

		const enableAccountRDSTN = await ethers.getContractFactory("RealDigitalEnableAccount");
		const enableAccountRDSTNContract = await enableAccountRDSTN.deploy(realTokenizadoSTNContract.getAddress());

		const tpft = await ethers.getContractFactory("TPFt");
		const tpftContract = await tpft.deploy();

		const swapOneStepSTN = await ethers.getContractFactory("SwapOneStep");
		const swapOneStepSTNContract = await swapOneStepSTN.deploy(realTokenizadoSTNContract);

		// const enableTpft = await ethers.getContractFactory("TPFtAccessControl");
		// const enableTpftContract = await enableTpft.deploy(
		// );

		const realTokenizadoBBContract = await realTokenizadoBB.deploy(
			"Tesouro Direto",
			"BRL@CNPJ_BB",
			bb.address,
			bancoCentral.address,
			"BancoDoBrasil",
			cnpjBB,
			bb.address
		);

		const swapOneStepBB = await ethers.getContractFactory("SwapOneStep");
		const swapOneStepBBContract = await swapOneStepBB.deploy(realTokenizadoBBContract);

		const enableAccountBB = await ethers.getContractFactory("RealDigitalEnableAccount");
		const enableAccountBBContract = await enableAccountBB.deploy(realTokenizadoBBContract.getAddress());

		const tesouroDireto = await ethers.getContractFactory("TesouroDireto");

		const tesouroDiretoContract = await tesouroDireto.deploy(
			await realTokenizadoSTNContract.getAddress(),
			await tpftContract.getAddress(),
			tPFtManager.address
		);



		return {
			realTokenizadoSTNContract,
			realTokenizadoBBContract,
			enableAccountRDSTNContract,
			tpftContract,
			swapOneStepSTNContract,
			swapOneStepBBContract,
			enableAccountBBContract,
			tesouroDiretoContract,
			// enableTpftContract,
			bancoCentral,
			tesouroNacional,
			tPFtManager,
			bb,
			alice,
			bob,
			robber1,
		};

	}
	it("should deploy", async function () {
		const { realTokenizadoSTNContract } = await deployFixture();
	});

	it("should mint", async function () {
		const { realTokenizadoSTNContract, tpftContract, enableAccountRDSTNContract, tesouroNacional, alice, bancoCentral, bob } = await deployFixture();

		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(alice.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(bob.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).mint(alice.address, cvalue(1000));
		await realTokenizadoSTNContract.connect(alice).transfer(bob.address, cvalue(1000));
		let tit1: ITPFt.TPFtDataStruct = {
			acronym: "PRE2024",
			code: "00001",
			maturityDate: new Date("2030-01-01").getTime() / 1000,
		};
		await tpftContract.allowTPFtMint(tesouroNacional.address);
		await tpftContract.allowDirectPlacement(tesouroNacional.address);
		await tpftContract.connect(tesouroNacional).createTPFt(tit1);
		await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(1000));
	});

	it("Should create pool and add liquidity", async function () {
		const {
			realTokenizadoSTNContract,
			tesouroDiretoContract,
			realTokenizadoBBContract,
			swapOneStepBBContract,
			enableAccountBBContract,
			tPFtManager,
			bb,
			tpftContract,
			enableAccountRDSTNContract,
			tesouroNacional,
			alice,
			bancoCentral,
			bob,
		} = await deployFixture();

		let tit1: ITPFt.TPFtDataStruct = {
			acronym: "PRE2024",
			code: "00001",
			maturityDate: new Date("2030-01-01").getTime() / 1000,
		};
	


		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tPFtManager.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tesouroNacional.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).mint(await tesouroNacional.getAddress(), cvalue(1000000));
		await realTokenizadoSTNContract.connect(tesouroNacional).transfer(tPFtManager.address, cvalue(1000000));

		await tpftContract.allowTPFtMint(tesouroNacional.address);
		await tpftContract.allowDirectPlacement(tesouroNacional.address);
		await tpftContract.connect(tesouroNacional).createTPFt(tit1);
		await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(1000));
		await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, cvalue(1000), "0x");
		
		// await tesouroDiretoContract.grantRole(await tesouroDiretoContract.CREATOR_LIQUIIDITY_POOL_ROLE(), tesouroNacional.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await tesouroDiretoContract.getAddress());

		await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(1, cvalue(100), cvalue(0.01));

		await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(1000000));
		await tpftContract.connect(tPFtManager).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
		await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(1, cvalue(100));

		expect(await realTokenizadoSTNContract.connect(tPFtManager).balanceOf(tPFtManager)).to.equal(cvalue(1000000));
		

		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await bob.getAddress());
		await realTokenizadoSTNContract.connect(tesouroNacional).mint(bob.address, cvalue(101));
		await tpftContract.connect(tesouroNacional).mint(bob.address, tit1, cvalue(1));
		await realTokenizadoSTNContract.connect(bob).approve(await tesouroDiretoContract.getAddress(), cvalue(101));
		
		await tpftContract.connect(bob).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
		await tesouroDiretoContract.connect(bob).addLiquidtyPool(1, cvalue(1));
		
		expect(await realTokenizadoSTNContract.connect(tPFtManager).balanceOf(tPFtManager.address)).to.equal(cvalue(1000000 + 100));
		expect(await tpftContract.connect(tPFtManager).balanceOf(tPFtManager.address,1)).to.equal(cvalue(1000+1));
		
		expect(await realTokenizadoSTNContract.connect(bob).balanceOf(bob.address)).to.equal(cvalue(1));
		expect(await tpftContract.connect(bob).balanceOf(bob.address,1)).to.equal(cvalue(0));
		


	});

    it ("Should swap", async function() {

		const {
			realTokenizadoSTNContract,
			tesouroDiretoContract,
			realTokenizadoBBContract,
			swapOneStepBBContract,
			enableAccountBBContract,
			tPFtManager,
			bb,
			tpftContract,
			enableAccountRDSTNContract,
			tesouroNacional,
			alice,
			bancoCentral,
			bob,
		} = await deployFixture();

		let tit1: ITPFt.TPFtDataStruct = {
			acronym: "PRE2024",
			code: "00001",
			maturityDate: new Date("2030-01-01").getTime() / 1000,
		};
	


		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tPFtManager.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tesouroNacional.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).mint(await tesouroNacional.getAddress(), cvalue(1000000));
		await realTokenizadoSTNContract.connect(tesouroNacional).transfer(tPFtManager.address, cvalue(1000000));

		await tpftContract.allowTPFtMint(tesouroNacional.address);
		await tpftContract.allowDirectPlacement(tesouroNacional.address);
		await tpftContract.connect(tesouroNacional).createTPFt(tit1);
		await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(10000));
		await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, cvalue(10000), "0x");
		
		// await tesouroDiretoContract.grantRole(await tesouroDiretoContract.CREATOR_LIQUIIDITY_POOL_ROLE(), tesouroNacional.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await tesouroDiretoContract.getAddress());

		await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(1, cvalue(100), cvalue(0.01));

		await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(1000000));
		await tpftContract.connect(tPFtManager).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
		await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(1, cvalue(10000));


		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await bob.getAddress());
		await realTokenizadoSTNContract.connect(tesouroNacional).mint(bob.address, cvalue(1000));
		await realTokenizadoSTNContract.connect(bob).approve(await tesouroDiretoContract.getAddress(), cvalue(1000));

		await tesouroDiretoContract.connect(bob).swap(1,cvalue(105),false,cvalue(1));

		expect(await realTokenizadoSTNContract.connect(tPFtManager).balanceOf(tPFtManager)).to.equal(cvalue(1000000 + 105));
		expect(await tpftContract.connect(tPFtManager).balanceOf(tPFtManager,1)).to.be.lessThan(cvalue(10000)).and.to.be.greaterThan(cvalue(9998));

    })

	
    it ("Should complete entire operatons", async function() {

		const {
			realTokenizadoSTNContract,
			tesouroDiretoContract,
			realTokenizadoBBContract,
			swapOneStepBBContract,
			swapOneStepSTNContract,
			enableAccountBBContract,
			tPFtManager,
			bb,
			tpftContract,
			enableAccountRDSTNContract,
			tesouroNacional,
			alice,
			bancoCentral,
			bob,
		} = await deployFixture();

		let tit1: ITPFt.TPFtDataStruct = {
			acronym: "PRE2024",
			code: "00001",
			maturityDate: new Date("2030-01-01").getTime() / 1000,
		};
		


		// criando o real na reserva da STN e transferindo uma parte para o tpftManager
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tPFtManager.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(tesouroNacional.address);
		await realTokenizadoSTNContract.connect(tesouroNacional).mint(await tesouroNacional.getAddress(), cvalue(2000000));
		await realTokenizadoSTNContract.connect(tesouroNacional).transfer(tPFtManager.address, cvalue(1000000));

		// criando  o titulo na conta tpftManager
		await tpftContract.allowTPFtMint(tesouroNacional.address);
		await tpftContract.allowDirectPlacement(tesouroNacional.address);
		await tpftContract.connect(tesouroNacional).createTPFt(tit1);
		await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(10000));
		await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, cvalue(10000), "0x");

		// criando o real na conta reserva do bb
		await realTokenizadoBBContract.connect(bb).enableAccount(bb.address);
		await realTokenizadoBBContract.connect(bb).mint(bb.address, cvalue(10000000));

		// transferindo da reserva do BB para a conta da alice
		await realTokenizadoBBContract.connect(bb).enableAccount(alice.address);
		await realTokenizadoBBContract.connect(bb).transfer(alice.address, cvalue(100000));
		

		// dando os grants necessarios para a transferencia para o tesouro
    	await realTokenizadoBBContract.connect(bancoCentral).grantRole(await realTokenizadoBBContract.MOVER_ROLE(), swapOneStepBBContract.getAddress());	
		await realTokenizadoSTNContract.connect(bancoCentral).grantRole(await realTokenizadoSTNContract.MINTER_ROLE(), swapOneStepBBContract.getAddress());
		await realTokenizadoBBContract.connect(alice).approve(swapOneStepBBContract.getAddress(), cvalue(1000));
		await realTokenizadoBBContract.connect(bb).enableAccount(tesouroNacional.address);


		// aprovando a conta da alice no tesouro
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(alice.address); 

		// fazendo a transferencia para a conta dela no tesouro
		await swapOneStepBBContract.connect(alice).executeSwap(realTokenizadoBBContract, realTokenizadoSTNContract, alice.address, cvalue(1000));

		// criando a pool de liquidez
		await tesouroDiretoContract.connect(tPFtManager).createLiquidtyPool(1, cvalue(100), cvalue(0.01));

		//adicionando liquidez
		await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(1000000));
		await tpftContract.connect(tPFtManager).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
		await tesouroDiretoContract.connect(tPFtManager).addLiquidtyPool(1, cvalue(10000));

		// alice compra titulo
		await realTokenizadoSTNContract.connect(alice).approve(await tesouroDiretoContract.getAddress(), cvalue(105));
		await tesouroDiretoContract.connect(alice).swap(1,cvalue(105),false,cvalue(1));

		//verificações de saldo
		expect(await realTokenizadoSTNContract.connect(tPFtManager).balanceOf(tPFtManager)).to.equal(cvalue(1000000 + 105));
		expect(await tpftContract.connect(tPFtManager).balanceOf(tPFtManager,1)).to.be.lessThan(cvalue(10000)).and.to.be.greaterThan(cvalue(9998));
		expect(await realTokenizadoSTNContract.connect(alice).balanceOf(alice.address)).to.equal(cvalue(1000 - 105));
		expect(await realTokenizadoBBContract.connect(alice).balanceOf(alice.address)).to.equal(cvalue(100000 - 1000));
		expect(await tpftContract.connect(alice).balanceOf(alice.address,1)).to.greaterThanOrEqual(cvalue(1)).and.to.be.lessThan(cvalue(1.3));


		//alice vende o titulo
		let ammountAlice = await tpftContract.connect(alice).balanceOf(alice.address,1);
		await tpftContract.connect(alice).setApprovalForAll(await tesouroDiretoContract.getAddress(), true);
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(await tesouroDiretoContract.getAddress());
		await realTokenizadoSTNContract.connect(tPFtManager).approve(await tesouroDiretoContract.getAddress(), cvalue(150));
		await tesouroDiretoContract.connect(alice).swap(1,ammountAlice,true,cvalue(100));

		//alice transfere o saldo para o BB
		await realTokenizadoSTNContract.connect(bancoCentral).grantRole(await realTokenizadoSTNContract.MOVER_ROLE(), swapOneStepSTNContract.getAddress());	
		await realTokenizadoBBContract.connect(bancoCentral).grantRole(await realTokenizadoBBContract.MINTER_ROLE(), swapOneStepSTNContract.getAddress());
		await realTokenizadoSTNContract.connect(tesouroNacional).enableAccount(bb.address); //permintindo a reserva do bb
		
		let ammountAliceSTN = await realTokenizadoSTNContract.connect(alice).balanceOf(alice.address);
		let ammountAliceBB = await realTokenizadoBBContract.connect(alice).balanceOf(alice.address);

	    await realTokenizadoSTNContract.connect(alice).approve(await swapOneStepSTNContract.getAddress(), ammountAliceSTN);
		await swapOneStepSTNContract.connect(alice).executeSwap(realTokenizadoSTNContract, realTokenizadoBBContract, alice.address, ammountAliceSTN);

		//verificações de saldo
		// expect(await realTokenizadoBBContract.connect(bb).balanceOf(bb.address)).to.equal(Number(ammountAlice) + Number(cvalue(10000000 - 100000)));
		expect(await realTokenizadoSTNContract.connect(alice).balanceOf(alice.address)).to.equal(0);
		expect(await realTokenizadoBBContract.connect(alice).balanceOf(alice.address)).to.equal(9900000000000 + 99791071444 );









    })
});
