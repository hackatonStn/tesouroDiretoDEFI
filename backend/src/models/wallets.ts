import { Bond, TypeBond } from "./bonds";

export class PoolWallet{
    poolId:string;
    description:string;
}

export class BondWallet{
    id: number;
    code: string;
    description:string;
    type?: TypeBond;
    amount: string;
}

export class TokensLPWallet{
    id: string;
    amount: string;
}

export class Wallet{
    wallet:string;     // A carteira do cliente
    taxId?:string;      // O CPF do cliente
    bankNumber?:number; // O código da participante
    account?: number;    // A conta do cliente
    branch?: number;     // A agência do cliente   
    registered?:boolean;    // Registrado ou não
    owner?:string;      // A carteira do participante que inseriu o cliente

    bonds?: BondWallet[];     // Os títulos da carteira
    balanceRealToken: string;   // O saldo da carteira em real Tokenizado no contrato da STN
    pools?: PoolWallet[]; // As pools que a carteira participa
    tokensLP?: TokensLPWallet[]; // Os tokens LP que a carteira possui
    tokenSenderAdress?: string;





}