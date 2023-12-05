import React from "react";
import router from "next/router";
import SiteContext, { singletonBackenProvider } from "../context/wallet.context";
import NavBar from "../components/nav";
import Chat from "../components/chat";

interface HomeProps {}

interface HomeState {
	showChat: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
	static contextType = SiteContext;
	context: React.ContextType<typeof SiteContext>;

	state: HomeState = {
		showChat: false,
	};
	componentDidMount() {}

	componentDidUpdate(prevProps: HomeProps) {}

	render() {
		return (
			<>
				<NavBar />

				<div className="hero min-h-screen bg-base-200 " style={{ backgroundImage: "url(/bg1.jpg)" }}>
					<div className="container mx-auto  md:hero w-full  py-10 bg-black bg-opacity-80 flex flex-col items-center  h-full  md:h-3/4 max-h-[650px] lg:max-h-[800px] rounded-xl backdrop-blur-sm">
						{!this.state.showChat && (
							<>
								<div className="h-full p-6">
									<div className=" app-name">
										<span className="text-5xl ">Tesouro Direto</span> <span className="font-bold text-primary text-2xl">DeFi</span>
									</div>
									<p className=" text-md md:text-lg mt-10 text-justify">
										Bem-vindo ao Tesouro Direto DeFi, a inovadora plataforma de investimentos em títulos tokenizados. Aqui, você pode escolher entre
										diversas opções de títulos, como o Tesouro Pré Fixado 2030, Tesouro IPCA+ 2035, e mais, todos adaptados para diferentes perfis de
										investidores. Com a integração ao sistema DREX, oferecemos suporte para Real Digital e Real Tokenizado, facilitando transações
										seguras e rápidas. Nossa interface amigável e assistente virtual estão aqui para ajudar até mesmo os mais leigos a investir com
										confiança. Junte-se a nós e faça parte da evolução dos investimentos em títulos públicos!
									</p>
								</div>
								<button className="btn btn-primary btn-outline" onClick={() => this.setState({ showChat: true })}>
									Acesse o Assistente Pessoal
								</button>
							</>
						)}

						{this.state.showChat && <Chat />}

						<div></div>
					</div>
				</div>
			</>
		);
	}
}

export default Home;
