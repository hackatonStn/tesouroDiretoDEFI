import { ethers } from "ethers";

export function debug(...args: any[]) {
    try {
        if (process.env.NODE_ENV != "production") {
            var obj = {}
            console.groupCollapsed(args);
            console.trace(); // hidden in collapsed group
            console.groupEnd();
        }
    } catch (err) {
        throw(err)
    }
}

export function formatMoney(value: number, currency = true): string {
    if (!value) return 'R$ 0,00';
    if (currency)
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    else
        return value.toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function     formatFrom8Decimals(value: string,maximumFractionDigits=2): string {
    
    if (!value) return '0,00';
    let v =  ethers.formatUnits(value, 8);
    return Number(v).toLocaleString('pt-br', { minimumFractionDigits: 2, maximumFractionDigits: maximumFractionDigits });
}

export function formatTo8Decimals(value: number): string {
    
    if (!value) return '0';
    let v = BigInt(value*100000000);
    return v.toString();
}

export function ConvertFrom8Decimals(value: string): number {
    
    
    let v = Number(BigInt(value)/BigInt(100000000)) ;
    return v
}