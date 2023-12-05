import React from "react";
import router from "next/router";
import SiteContext from "../context/wallet.context";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Pool } from "../models/pools";
import { formatFrom8Decimals } from "../infra/utils";

interface PoolsProps {}

interface PoolsState {}

class Pools extends React.Component<PoolsProps, PoolsState> {
	static contextType = SiteContext;
	context: React.ContextType<typeof SiteContext>;

	state: PoolsState = {};
	componentDidMount() {}

	componentDidUpdate(prevProps: PoolsProps) {}

	poolHeader(pool: Pool) {
		return (
			<div className="w-full mt-5 flex justify-around">
				<div className="grow">
					<p className="text-lg text-neutral">{pool.description}</p>
					<p className="text-sm text-neutral-400">Taxa de Swap: 0,2%</p>
				</div>
			</div>
		);
	}
	poolContent() {
		return this.context.pools.map((pool) => {
			return (
				<AccordionTab key={pool.id} header={this.poolHeader(pool)} headerClassName=" flex flex-row ">
					<div className="flex flex-col  bg-base-300 h-full   w-full  p-2 items-center">
						<div className="w-full">
							<div className="flex flex-row  font-bold">
								<p className="flex w-full md:w-1/2 text-gray-500  ">Quantidade de Títulos </p>
								<p className="text-gray-400">{formatFrom8Decimals(pool.reservA)}</p>
							</div>
							<div className="flex flex-row  font-bold">
								<p className="flex w-full md:w-1/2 text-gray-500  ">Quantidade de BRL</p>
								<p className="text-gray-400">{formatFrom8Decimals(pool.reserveReal)}</p>
							</div>
							<div className="flex flex-row  font-bold">
								<p className="flex w-full md:w-1/2 text-gray-500  ">Quantidade de Tokens LP</p>
								<p className="text-gray-400">{formatFrom8Decimals(pool.totalSupplyLP)}</p>
							</div>
							<div className="divider"></div>
							<div className="flex flex-row text-gray-600 font-bold">
								<p className="flex w-full md:w-1/2 text-gray-500  ">Seus Tokens LP</p>
								<p className="text-gray-400">{10000}</p>
							</div>
						</div>

						<button className="btn btn-primary btn-sm mt-5 md:w-60">Adicionar Liquidez</button>
					</div>
				</AccordionTab>
			);
		});
	}

	render() {
		

		return (
			<div className=" flex flex-col items-center h-full w-full md:p-20 md:pt-5">
				<p className="text-xl w-full text-center">Pools de Liquidez</p>
				<p className="text-md w-full text-center -mt-2 text-gray-400 mb-5">Garanta juros extras aos seus títulos</p>
				<div className=" rounded-lg bg-base-300 flex flex-col p-2 mt-6  w-full overflow-hidden">
					<Accordion className="w-full no-hover">

                    {this.poolContent()}
					</Accordion>
				</div>
			</div>
		);
	}
}

export default Pools;
