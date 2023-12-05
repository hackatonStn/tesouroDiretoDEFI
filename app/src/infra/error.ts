import { debug } from "./utils";

export class CustomError extends Error {
    public typeError: ITypeError;

    constructor(typeError: ITypeError) {
        super(typeError?.message);
        if (typeError) {
            this.typeError = {
                message: typeError.message,
                status: typeError.status,
                httpCode: typeError.httpCode,
            }
        }
    }

    static catchException(err: any) {
        if (err instanceof CustomError)
            throw err;
        if (process.env.NODE_ENV != "production") {
            debug('ERROR: ', err);
        }
        throw new CustomError({ status: "INTERNAL", message: "Erro interno", httpCode: 500 });
    }
}
export interface ITypeError {
    status: string,
    message: string,
    httpCode: number,
    detail?: any
}