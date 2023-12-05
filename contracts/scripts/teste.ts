// @ts-nocheck
import { env } from "./env";
import { ethers } from "hardhat";


function cvalue(value:number) {
	return Math.round(value * Math.pow(10, 8));
}

async function main() {
    const [bancoCentral, tesouroNacional, tPFtManager, bb, alice, bob, robber1] = await ethers.getSigners();

	const tpftContractFactory = await ethers.getContractFactory("TPFt");
	const tpftContract = tpftContractFactory.attach("0x7b12Fe92423F126d054B51f85bA49A28c414e43F");

    let tit1 = {
		acronym: "PRE2024",
		code: "00001",
		maturityDate: new Date("2030-01-01").getTime() / 1000,
	};

	// await tpftContract.allowTPFtMint(tesouroNacional.address);
	// await tpftContract.allowDirectPlacement(tesouroNacional.address);
try {
    const gasLimit = 100;
    const gasPrice  = 0.000000001500000015 * 1e18;
    console.log(gasPrice);
    const tx = await tpftContract.connect(tesouroNacional).createTPFt(tit1, {
        gasLimit: gasLimit,
        gasPrice: gasPrice
    });
        
    	// await tpftContract.connect(tesouroNacional).mint(tesouroNacional.address, tit1, cvalue(10000));
    	// await tpftContract.connect(tesouroNacional).safeTransferFrom(tesouroNacional.address, tPFtManager.address, 1, cvalue(10000), "0x")
} catch (err) {
    console.log(err)
};
}
main();
