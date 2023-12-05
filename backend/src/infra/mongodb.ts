

//const url = `mongodb://${varDbServer.user}:${varDbServer.pass}@${varDbServer.host1}:${varDbServer.port1},${varDbServer.host2}:${varDbServer.port2}${varDbServer.host1}:${varDbServer.port1}?replicaSet=rs0`
export interface VarDbServer {
    host1?: string,
    port1?: string,
    host2?: string,
    port2?: string,
    host3?: string,
    port3?: string,
    dbName?: string,
    user?: string,
    pass?: string,
    direct?: boolean,
};

import { ClientSession, Db, DBRef, MongoClient } from 'mongodb';
export class MongoDbInfra {
    public connection: Db | undefined;
    public mongoClient: MongoClient | undefined;
    private url: string;
    private direct: boolean = false;

    constructor(public config: VarDbServer) {
        let hosts = config.host1 + ':' + config.port1;
        if (config.host2 && config.host2)
            hosts += "," + config.host2 + ':' + config.port2;
        if (config.host3 && config.host3)
            hosts += "," + config.host3 + ':' + config.port3;

        if (config.direct) {
            this.url = `mongodb://${config.user}:${config.pass}@${hosts}/${config.dbName}`;
            this.direct = true;
        }

        else
            this.url = `mongodb://${config.user}:${config.pass}@${hosts}/${config.dbName}?replicaSet=rs0`;

    }

    async getConnection(): Promise<Db> {
        if (this.connection !== undefined)
            return this.connection;


        try {
            console.log('Mongodb conecting at:' + this.url, 'info');
            this.mongoClient = await MongoClient.connect(this.url,{directConnection:this.direct});
            this.connection = this.mongoClient.db(this.config.dbName);

            console.log('Mongodb connected. Mongodb at:' + this.url, 'info');
            return this.connection;
        } catch (err) /* istanbul ignore next */ {
            throw (err);
        }
    }

    async startTransaction(): Promise<ClientSession> {
        if (this.mongoClient !== undefined) {
            let session = this.mongoClient.startSession();
            session.startTransaction({
                readConcern: { level: 'snapshot' },
                writeConcern: { w: 'majority' }
            });
            return session;
        }

        this.mongoClient = await MongoClient.connect(this.url);
        this.connection = this.mongoClient.db(this.config.dbName);
        let session = this.mongoClient.startSession();
        session.startTransaction();
        return session;

    }
}
export { ClientSession, MongoClient, Db };