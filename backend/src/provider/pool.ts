import { Pool } from "../models/pools";
import { MongoDbInfra } from "../infra/mongodb";

export class PoolProvider {
	constructor(private mongodbInfra: MongoDbInfra) {}

	async getPool(id: number) {
		let conn = await this.mongodbInfra.getConnection();
		
		let pool = await conn.collection("pools").findOne<Pool>({ id: id });
        
		return pool;
	}

	async setPool(pool: Pool) {
		let conn = await this.mongodbInfra.getConnection();
		await conn.collection("pools").updateOne({ id: pool.id }, { $set: pool }, { upsert: true });
	}

	async getPools() {
		let conn = await this.mongodbInfra.getConnection();
		let pools = await conn.collection("pools").find<Pool>({}).toArray();
		//@ts-ignore
		pools.forEach((pool) => {
			//@ts-ignore
			delete pool._id;
			pool.priceA = this.getPrice(pool).toString();
		});

		return pools;
	}

	getPrice(pool: Pool) {
		let amountA = BigInt(pool.reservA);
		let amountBRL = BigInt(pool.reserveReal);
		let swapFee = BigInt(pool.swapFee);

		let price = BigInt(amountBRL / amountA) * BigInt("100000000") ;
        price = price + (price*swapFee/BigInt(100000000)) //adiciona taxa de swap

		return price;
	}
    

    notifySwapped(address:string, poolId:string){
        
    }
}

