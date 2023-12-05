"use client";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";

import React from "react";
import ButtonSelection, { IButtonSelectItem } from "../../components/button-selection";
import NavBar from "../../components/nav";
import Swap from "../../components/swap";
import Pools from "../../components/pools";

interface AdvancedPageProps {}

interface AdvancedPageState {
	functionality: "swap" | "pool";
}

class AdvancedPage extends React.Component<AdvancedPageProps, AdvancedPageState> {
	state: AdvancedPageState = {
		functionality: "swap",
	};

	componentDidMount() {}

	componentDidUpdate(prevProps: AdvancedPageProps) {}

	render() {
		return (
			<>
				<NavBar />
				<div className="hero min-h-screen bg-base-200" style={{ backgroundImage: "url(/bg1.jpg)" }}>
					<div className=" container mx-auto  md:hero w-full p-0 md:p-2 bg-black bg-opacity-80 flex flex-col items-center  h-full  md:h-3/4 max-h-[600px] lg:max-h-[800px] rounded-xl ">
						{this.state.functionality == "swap" && (
							<>
								<Swap />
								<p className="link w-full text-center absolute bottom-10" onClick={() => this.setState({ functionality: "pool" })}>
						Acesse os Pools de Liquidez
					</p>
							</>
						)}
						{this.state.functionality == "pool" && (
							<>
								<Pools />
								<p className="link w-full text-center absolute bottom-10" onClick={() => this.setState({ functionality: "swap" })}>
									Acesse o Swap
								</p>
							</>
						)}
					</div>
					
				</div>
			</>
		);
	}
}

export default AdvancedPage;
