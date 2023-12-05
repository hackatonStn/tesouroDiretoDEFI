import { MonitorEventController } from "./src/controllers/monitor";
import { EtherProvider } from "./src/provider/ether";
import { mongoInfraSingleton } from "./singletons";
import { MongoDbInfra } from "./src/infra/mongodb"



// let monitorEventController = new MonitorEventController(mongoInfraSingleton);
import "./src/controllers/routes"