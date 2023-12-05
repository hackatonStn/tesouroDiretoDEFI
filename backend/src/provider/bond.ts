import { Bond } from "../models/bonds";
import { Pool } from "../models/pools";
import { MongoDbInfra } from "../infra/mongodb";

export class BondProvider {
	constructor(private mongodbInfra: MongoDbInfra) {}

	async getBond(id: number) {
		let conn = await this.mongodbInfra.getConnection();
		let pool = await conn.collection("bonds").findOne<Bond>({ id: id });
		//@ts-ignore
		delete pool._id;

		return pool;
	}

	async setBond(bond: Bond) {
		let conn = await this.mongodbInfra.getConnection();
		await conn.collection("bonds").updateOne({ id: bond.id }, { $set: bond }, { upsert: true });
	}

	async getBonds() {
		let conn = await this.mongodbInfra.getConnection();
		let bonds = await conn.collection("bonds").find<Bond>({}).toArray();
		//@ts-ignore
		bonds.forEach((bond) => delete bond._id);
		return bonds;
	}
}
