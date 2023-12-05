import { Pool } from "../models/pools";
import { Wallet } from "../models/wallets";
import { MongoDbInfra } from "../infra/mongodb";

export class WalletProvider {
    
    constructor(private mongodbInfra:MongoDbInfra) {
     
    }

    async getWallet(wallet:string){
        let conn = await this.mongodbInfra.getConnection();
        let pool = await conn.collection('wallets').findOne<Wallet>({wallet:wallet.toLowerCase()});
        return pool;
    }
    
    async setWallet(wallet:Wallet){
        wallet.wallet = wallet.wallet.toLowerCase();
        let conn = await this.mongodbInfra.getConnection();
        await conn.collection('wallets').updateOne({wallet:wallet.wallet},{$set:wallet},{upsert:true});
    }

    async getWallets (){
        let conn = await this.mongodbInfra.getConnection();
        let pools = await conn.collection('wallets').find<Wallet>({}).toArray();
        return pools;
    }
}