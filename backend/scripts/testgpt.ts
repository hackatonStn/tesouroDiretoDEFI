import OpenAI from "openai";
import * as readline from "readline";

async function main() {
	let openai = new OpenAI({ apiKey: "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" });
	let assistant = await openai.beta.assistants.retrieve("asst_3w3gmPvNIhu7TectXbKDgS6f");
	let thread = await openai.beta.threads.create(); //thread_7gd2d2b1ZyMdE3H0RazbOVpu
	let chat = "";

	function updateChat(msg: string, who: string) {
		chat += who + "\n";
		chat += msg + "\n";
		console.log("-------------------------" )
		console.log(chat)
		console.log("-------------------------");
	}

	async function inputUser(msg: string) {
		const message = await openai.beta.threads.messages.create(thread.id, {
			role: "user",
			content: msg,
		});

		let run1 = await openai.beta.threads.runs.create(thread.id, {
			assistant_id: assistant.id,
		});

		let run2: OpenAI.Beta.Threads.Runs.Run;
		while (true) {
			await new Promise((resolve) => setTimeout(resolve, 2000));

			run2 = await openai.beta.threads.runs.retrieve(thread.id, run1.id);

			if ([ "cancelled", "failed", "expired"].includes(run2.status)) break;

			if (run2.status == "requires_action") {
				let respones = await action(run2);
				run1 = await openai.beta.threads.runs.submitToolOutputs(thread.id, run2.id, {
					tool_outputs: respones,
				});
				continue;
			}
			if (run2.status == "completed") {
				let msgs = await openai.beta.threads.messages.list(thread.id);
				//@ts-ignore
				let msg = msgs.data[0].content[0].text.value;
				updateChat(msg, "Assistente");
				break;
			}
		}
	}
	async function action(run: OpenAI.Beta.Threads.Runs.Run): Promise<{ output: string; tool_call_id: string }[]> {
		let responses: { output: string; tool_call_id: string }[] = [];
		if (!run.required_action?.submit_tool_outputs?.tool_calls) return responses;
		for (let toolCall of run.required_action?.submit_tool_outputs?.tool_calls) {
			toolCall.function.arguments;
			responses.push({ output: "ok", tool_call_id: toolCall.id });
			await new Promise((resolve) => setTimeout(resolve, 1000));
		}
		return responses;
	}
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	function startReading() {
		rl.question("Digite algo: ", async (input: string) => {
			updateChat(input, "Usuário");
			await inputUser(input);
			startReading(); // Volta a ler o teclado após a função ser executada
		});
	}
	startReading();
}

main();
