import { Bond } from "./bonds";

export class WalletPool{
    wallet:string;
    ballanceLP: number;
    ingressDate: Date;
}

export class Pool{
    id: number;
    description: string;
    tokenA: number;
    reservA: string;
    reserveReal: string;
    priceA: string;
    swapFee: string;
    totalSupplyLP: string;

    wallets?: WalletPool[];
}