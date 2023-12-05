import { CustomError } from "../infra/error";
import { HttpAxios } from "../infra/httpAxios.infra";

export class BackendProvider {
    // urlBase = process.env.NEXT_PUBLIC_URL_BACKEND;

    constructor(private httpApiInfra: HttpAxios) {

    }

    async connect(address:string){
        try {
            let url = '/wallet/'+address;
            let {wallet, balanceRealTokenizadoBB} = await this.httpApiInfra.get(url);
            return {wallet, balanceRealTokenizadoBB};
        } catch (err) {
            CustomError.catchException(err);
            throw (err);
        }
    }

    async getData(){
        try {
            let url = '/data';
            let {pools,bonds} = await this.httpApiInfra.get(url);
            return {pools,bonds};
        } catch (err) {
            CustomError.catchException(err);
            throw (err);
        }
    }

    async notifySwapped(address:string, poolId:number){
        try {
            let url = '/notifySwapped';
            let data = {address, poolId};
            let result = await this.httpApiInfra.post(url, data);
            return result;
        } catch (err) {
            CustomError.catchException(err);
            throw (err);
        }
    }

}


