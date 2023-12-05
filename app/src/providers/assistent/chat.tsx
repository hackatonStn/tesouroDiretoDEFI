import React from "react";
import router from "next/router";
import SiteContext from "../context/wallet.context";
import OpenAI from "openai";
import ReactMarkdown from "react-markdown";
import { InputTextarea } from "primereact/inputtextarea";
import { AssistentProvider } from "../providers/assistent/assistent";

const initialMsg = "***Assistente Financeiro***  \n Olá eu sou o seu assistente de investimentos, como posso te ajudar?  \n\n";

interface ChatProps {}

interface ChatState {
	inputUserMsg: string;
	chatText: string;
	loading: boolean;
}

class Chat extends React.Component<ChatProps, ChatState> {
	static contextType = SiteContext;
	context: React.ContextType<typeof SiteContext>;

	openai = new OpenAI({ apiKey: "", dangerouslyAllowBrowser: true });
	assistant: OpenAI.Beta.Assistants.Assistant;
	thread: OpenAI.Beta.Threads.Thread;
	myDiv:any = React.createRef() || null;

	state: ChatState = {
		inputUserMsg: "",
		chatText: initialMsg,
		loading: false,
	};
	componentDidMount() {}

	componentDidUpdate() {
		const scrollDiv = this.myDiv.current;
		//@ts-ignore
		scrollDiv.scrollTop = scrollDiv.scrollHeight;
	}

	async createThread() {
		this.assistant = await this.openai.beta.assistants.retrieve("asst_Xzz0vxhCCgJlp22A7bVqlwf5");
		this.thread = await this.openai.beta.threads.create(); //thread_7gd2d2b1ZyMdE3H0RazbOVpu
	}
	userMessageContent(msg: string) {
		this.state.chatText += "***Usuário***  \n";
		this.state.chatText += msg + "  \n\n";
		this.setState({ chatText: this.state.chatText, inputUserMsg: "", loading: true });
	}

	updateChat(msg: string, who: string) {
		this.state.chatText += who + "  \n";
		this.state.chatText += msg + "  \n\n";
		this.setState({ chatText: this.state.chatText, loading: false });
		
	}

	async inputUser() {
		if (!this.state.inputUserMsg) return;
		let input = this.state.inputUserMsg;

		this.userMessageContent(input);
		if (!this.thread) await this.createThread();

		const message = await this.openai.beta.threads.messages.create(this.thread.id, {
			role: "user",
			content: this.state.inputUserMsg,
		});

		let run1 = await this.openai.beta.threads.runs.create(this.thread.id, {
			assistant_id: this.assistant.id,
		});

		let run2: OpenAI.Beta.Threads.Runs.Run;
		while (true) {
			await new Promise((resolve) => setTimeout(resolve, 2000));

			run2 = await this.openai.beta.threads.runs.retrieve(this.thread.id, run1.id);

			if (["cancelled", "failed", "expired"].includes(run2.status)) break;

			if (run2.status == "requires_action") {
				let respones = await this.action(run2);
				run1 = await this.openai.beta.threads.runs.submitToolOutputs(this.thread.id, run2.id, {
					tool_outputs: respones,
				});
				continue;
			}
			if (run2.status == "completed") {
				let msgs = await this.openai.beta.threads.messages.list(this.thread.id);
				//@ts-ignore
				let msg = msgs.data[0].content[0].text.value;
				this.updateChat(msg, "***Assistente Financeiro***");
				break;
			}
		}
	}

	async action(run: OpenAI.Beta.Threads.Runs.Run): Promise<{ output: string; tool_call_id: string }[]> {
		let responses: { output: string; tool_call_id: string }[] = [];
		if (!run.required_action?.submit_tool_outputs?.tool_calls) return responses;

		for (let toolCall of run.required_action?.submit_tool_outputs?.tool_calls) {
            let assistentProvider = new AssistentProvider();
			
            if (toolCall.function.name == 'conectarMetaMask'){
                let output = await assistentProvider.conectarMetaMask();
                responses.push({ output: JSON.stringify(output), tool_call_id: toolCall.id });
            }

            else if (toolCall.function.name == 'getBallanceMatic'){
                let output = await assistentProvider.getBallanceMatic()
                responses.push({ output: JSON.stringify(output), tool_call_id: toolCall.id });
            }

            else if (toolCall.function.name == 'getBalanceRealTokenizado'){
                let argument:'stn'|'bb' = JSON.parse(toolCall.function.arguments).intituicao
                let output = await assistentProvider.getBalanceRealTokenizado(argument)
                responses.push({ output: JSON.stringify(output), tool_call_id: toolCall.id });
            }
            else if (toolCall.function.name == 'depositRealtokenizado'){
                let argument = JSON.parse(toolCall.function.arguments).amountRealTokenizado
                let output = await assistentProvider.depositRealtokenizado(argument)
                responses.push({ output: JSON.stringify(output), tool_call_id: toolCall.id });
            }




		}
		return responses;
	}
	async clear() {
		this.setState({ chatText: initialMsg });
		this.createThread();
	}

	render() {
		return (
			<>
				<div className="flex flex-col  h-3/4 max-h-[600px] lg:max-h-[800px] rounded-3xl  px-1 md:px-20 md:py-10 backdrop-grayscale w-full">
					<div className="w-full flex flex-col h-full  bg-gray-100 md:pt-5 md:px-5">
                        
						<div ref={this.myDiv} className="w-full h-full pt-5 px-5 overflow-scroll overflow-x-hidden  ">
							<ReactMarkdown  className="  text-black prose ">
								{this.state.chatText}
							</ReactMarkdown>
						</div>

						<form
							className="w-full p-5 pt-1 "
							onSubmit={(e) => {
								e.preventDefault();
								this.inputUser();
							}}
						>
							<div
								className={`w-full bg-white rounded-lg border px-5 pb-5 shadow-lg shadow-indigo-200  ${
									this.state.loading && "pointer-events-none opacity-50"
								}`}
							>
								<div className={`${this.state.loading && "animate__animated animate__flash animate__slow animate__infinite	infinite"} h-5`}>
									<p>{this.state.loading? "Pensando..." : "  " }</p>
									
								</div>
								<textarea
									placeholder="Digite sua mensagem..."
									className="w-full bg-white border-0 focus:outline-none text-gray-600 resize-none"
									name="description"
									value={this.state.inputUserMsg}
									rows={2}
									onChange={(e) => this.setState({ inputUserMsg: e.target.value })}
									onKeyPress={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											this.inputUser();
										}
									}}
								/>
								<div className="flex flex-col md:flex-row md:justify-end w-full">
									<button className="btn btn-primary btn-sm mb-2 md:m-0 md:mr-2">Enviar</button>
									<button className="btn btn-outline btn-sm" onClick={() => this.clear()}>
										Limpar
									</button>
								</div>
							</div>
							{/* <InputTextarea id="description" rows={4} className="w-full bg-white" name="description" value={this.state.inputUserMsg}
                        onChange={(e) => this.setState({ inputUserMsg: e.target.value })}        /> */}
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default Chat;
