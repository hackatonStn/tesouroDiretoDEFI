import { MongoDbInfra } from "./src/infra/mongodb";
import { EtherProvider } from "./src/provider/ether";

export const mongoInfraSingleton = new MongoDbInfra({
    host1: process.env.MONGO_HOST1,
    port1: process.env.MONGO_PORT1,
    host2: process.env.MONGO_HOST2,
    port2: process.env.MONGO_PORT2,
    host3: process.env.MONGO_HOST3,
    port3: process.env.MONGO_PORT3,
    dbName: process.env.MONGO_DBNAME,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASS,
    direct: process.env.MONGO_DIRECT == 'true'
});

export var etherProviderSingleton = new EtherProvider(mongoInfraSingleton);