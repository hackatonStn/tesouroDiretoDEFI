import { ethers } from "ethers";
import { singletonBackenProvider, singletonEthereum } from "../../context/wallet.context";
import { CustomError } from "../../infra/error";
import { HttpAxios } from "../../infra/httpAxios.infra";
import { Pool } from "../../models/pools";
import Markdown from 'react-markdown';
import { Wallet } from "../../models/wallets";

export class AssistentProvider {
    // urlBase = process.env.NEXT_PUBLIC_URL_BACKEND;

    constructor() {

    }

    async getAddressInfo(){
        try {
            let valueSTN = await singletonEthereum.getBalance(window.ethereum.selectedAddress,'stn');
            let value = await singletonEthereum.getBalanceMatic(window.ethereum.selectedAddress);
            let valueBB = await singletonEthereum.getBalance(window.ethereum.selectedAddress,'bb');
            let  { wallet, balanceRealTokenizadoBB } = await singletonBackenProvider.connect(window.ethereum.selectedAddress);
            let bonds = (wallet as Wallet).bonds;
            bonds?.forEach(b => {
                b.amount = ethers.formatUnits(b.amount.toString(), 8);
            })
            let tokensLiquidityProvider = (wallet as Wallet).tokensLP;
            let pools = (wallet as Wallet).pools;
            let valueRealTokenizadoSTN = ethers.formatUnits(valueSTN.toString(), 8);
            let valueRealTokenizadoBB = ethers.formatUnits(valueBB.toString(), 8);
            let valueMatic = ethers.formatEther(value.toString()) // BigInt("1000000000000000000");
            let response = {
                usersBonds : bonds,
                usersTokenLiquidityProvider : tokensLiquidityProvider,
                usersPoolsLiquidity : pools,
                balanceRealTokenizadoTesouroDireto: valueRealTokenizadoSTN,
                balanceRealTokenizadoBancoDoBrasil: valueRealTokenizadoBB,
                balanceMatic: valueMatic
            }
            
            return response;


        } catch (error) {
            return ({realTokenizadoAmount: 0 , msg: "Erro ao executar a operação. Tente novamente mais tarde"})
        }
    }

    async getBalanceRealTokenizado( contract: "stn" | "bb"){
        try {
            let value = await singletonEthereum.getBalance(window.ethereum.selectedAddress,contract);
            let valueRealTokenizado = ethers.formatUnits(value.toString(), 8);
            return { realTokenizado: valueRealTokenizado , msg: 'Sado do contrato '+ contract}
            //ex: {"realTokenizado": 1000 , "msg": 'Sado do contrato STN'  }
            //ex: {"realTokenizado": 1000 , "msg": 'Sado do contrato BB'}
        } catch (err) {
            
            return ({realTokenizadoAmount: 0 , msg: "Erro ao executar a operação. Tente novamente mais tarde"})
        }
    }

    async conectarMetaMask(){
        try{
            await window?.ethereum.request({ method: "eth_requestAccounts" });
            return {msg: 'Conectado com sucesso'}
        }catch(err){
            return ({msg: "Erro ao conectar a carteira. Verifica se a mesma está instalada"});
        }
    }

    async getBallanceMatic(){
        try {
            let value = await singletonEthereum.getBalanceMatic(window.ethereum.selectedAddress);
            console.log("*** ~ file: assistent.ts:40 ~ value:", value);
            //@ts-ignore
            console.log( ethers.formatEther(value.toString()) )
            let valueMatic = ethers.formatEther(value.toString()) // BigInt("1000000000000000000");
            return { maticAmount: valueMatic , msg: 'Sado do contrato Matic'}
            //ex: {"maticAmount": 1000 , msg: 'Sado do contrato Matic'  }	

        } catch (err) {
            return ({realTokenizado: 0 , msg: "Erro ao executar a operação. Tente novamente mais tarde"})
        }
    }

    async getPriceBond(){

    }

    // async swap(address: string, poolId: number, amountIn: number, isTokenAtoRealDigital: boolean, minAmountOut: number) {
    async buyBond(tituloId: number, amountRealTokenizado: number, pools:Pool[] ){
        try {
            let pool = pools.find(p => p.id == tituloId);
            if(!pool) throw new Error("Não foi possível encontrar o título selecionado");
            let price = Number(pool.priceA) / 100000000;
		    let minimum = amountRealTokenizado/ price;// 100/505.5
            minimum = minimum * 0.99;
            await singletonEthereum.swap(window.ethereum.selectedAddress, pool.id, amountRealTokenizado, false, minimum);
            await singletonBackenProvider.notifySwapped(window.ethereum.selectedAddress, pool.id);
            let newBalances = await this.getAddressInfo();
            return {msg: 'Compra realizada com sucesso', newBalances: newBalances}
        } catch (err) {
            return ({msg: "Erro ao executar a operação. Pode ser um congestionamento na rede. Nenhum fundo foi perdido"})
        }

    }
    async sellBond(tituloId: number, amountToken: number, pools:Pool[] ){
        try {
            let pool = pools.find(p => p.id == tituloId);
            if(!pool) throw new Error("Não foi possível encontrar o título selecionado");
            let price = Number(pool.priceA) / 100000000;
		    let minimum = price * amountToken;
            minimum = minimum * 0.99;
            await singletonEthereum.swap(window.ethereum.selectedAddress, pool.id, amountToken, true, minimum);
            await singletonBackenProvider.notifySwapped(window.ethereum.selectedAddress, pool.id);
            let newBalances = await this.getAddressInfo();
            return {msg: 'Venda realizada com sucesso', newBalances: newBalances}
        } catch (err) {
            return ({msg: "Erro ao executar a operação. Pode ser um congestionamento na rede. Nenhum fundo foi perdido"})
        }
    }

    async depositRealtokenizado(amountRealTokenizado: number){
        try {
            let tx = await singletonEthereum.oneStepSwap(window.ethereum.selectedAddress, amountRealTokenizado,false);
 
            let response = await this.getAddressInfo();
            return {msg: 'Depósito realizado com sucesso',  newBallances: response }
            

        } catch (err) {
            return ({msg: "Erro ao executar a operação. Pode ser um congestionamento na rede. Nenhum fundo foi perdido"})
        }
    }

    async withdrawRealTokenizado(amountRealTokenizado: number){
        try {
            let tx = await singletonEthereum.oneStepSwap(window.ethereum.selectedAddress, amountRealTokenizado,true);
            let response = await this.getAddressInfo();
            return {msg: 'Depósito realizado com sucesso',  newBallances: response }
            
        } catch (err) {
            return ({msg: "Erro ao executar a operação. Pode ser um congestionamento na rede. Nenhum fundo foi perdido"})
        }
    }



  

}


