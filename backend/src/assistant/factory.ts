import OpenAI from "openai";
import { instruction } from "./instrutions";

export async function build() {
	try {
		const openai = new OpenAI({
			apiKey: process.env.openAIKey,
		});

		const assistant = await openai.beta.assistants.create({
            name: "Tesouro Direto Tokenizado",
			description: "Assistente para o projeto de tesouro direto tokenizado",
			// file_ids: ["file-Z3P6vc4Z83mbklmJLOtGNKTY"],
			instructions: instruction,
			model: "gpt-3.5-turbo-1106",
            // model: "gpt-4-1106-preview",
			tools: [
				// {
				// 	type: "retrieval",
				// },
				{
					type: "function",
					function: {
						name: "getAddressInfo",
						description: `
						retorna os seguintes dados da carteira conectada:
						- Saldo de Matic
						- Saldo de Real Tokenizado no tesouro direto
						- Saldo de Real Tokenizado no Banco do Brasil
						- Titulos que o usuario possui
						- Tokens LP que o usuario possui
						- Pools de liquidez que o usuario participa
						`,
						parameters: {
							type: "object",
							properties: {
								
							},
						},
					},
				},
				{
					type: "function",
					function: {
						name: "conectarMetaMask",
						description: "Conecta a carteira MetaMask",
						parameters: {
							type: "object",
							properties: {},
						},
					},
				},
			
				//async buyBond(tituloId: number, amountRealTokenizado: number, pools:Pool[] ){
				{
					type: "function",
					function: {
						name: "buyBond",
						description: "Compra um título do tesouro",
						parameters: {
							type: "object",
							properties: {
								tituloId: { type: "number", description: "O id do título que deseja comprar" },
								amountRealTokenizado: { type: "number", description: "A quantidade de Real Tokenizado que deseja investir. Maior que zero" },
							},
							required: ["tituloId", "amountRealTokenizado"],
						},
					},
				},
				//async sellBond(tituloId: number, amountToken: number, pools:Pool[] ){
				{
					type: "function",
					function: {
						name: "sellBond",
						description: "Vende um título do tesouro",
						parameters: {
							type: "object",
							properties: {
								tituloId: { type: "number", description: "O id do título que deseja vender" },
								amountToken: { type: "number", description: "A quantidade de título que deseja vender. Maior que zero" },
							},
							required: ["tituloId", "amountToken"],
						},
					},
				},
				//async depositRealtokenizado(amountRealTokenizado: number){
				{
					type: "function",
					function: {
						name: "depositRealtokenizado",
						description: "Deposita Real Tokenizado na plataforma. Somente o Banco do Brasil está integrado ao sistema",
						parameters: {
							type: "object",
							properties: {
								amountRealTokenizado: { type: "number", description: "A quantidade de Real Tokenizado que deseja depositar. Maior que zero" },
							},
							required: ["amountRealTokenizado"],
						},
					},
				},
				{
					type: "function",
					function: {
						name: "withdrawRealTokenizado",
						description: "Saca Real Tokenizado da plataforma. Somente o Banco do Brasil está integrado ao sistema",
						parameters: {
							type: "object",
							properties: {
								amountRealTokenizado: { type: "number", description: "A quantidade de Real Tokenizado que deseja sacar. Maior que zero" },
							},
							required: ["amountRealTokenizado"],
						},
					},
				},
			],
		});
		console.log("assistant created");
	} catch (err) {
		console.log(err);
	}
}
build();
