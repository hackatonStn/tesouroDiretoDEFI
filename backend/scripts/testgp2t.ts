#!/usr/bin/env -S npm run tsn -T

import OpenAI from "openai";
import { ChatCompletionMessage, ChatCompletionMessageParam } from "openai/resources/chat";

// gets API Key from environment variable OPENAI_API_KEY
const openai = new OpenAI();

async function main() {
	// const assistant = await openai.beta.assistants.retrieve("asst_Xzz0vxhCCgJlp22A7bVqlwf5"); //
	// const thread = await openai.beta.threads.create(); //"thread_Q3kAwBPBglty79QBXGw1abF9"

	// const message = await openai.beta.threads.messages.create(`thread_Q3kAwBPBglty79QBXGw1abF9`, {
	// 	role: "user",
	// 	content: "Ok. quais titulos tem, e já quero me conectar",
	// });

	// const run = await openai.beta.threads.runs.create(`thread_Q3kAwBPBglty79QBXGw1abF9`, {
	// 	assistant_id: "asst_Xzz0vxhCCgJlp22A7bVqlwf5",
	// }); //"run_fpPFo8TPCoUL0idj0vhtzFE2"

	let runned = await openai.beta.threads.runs.retrieve("thread_Q3kAwBPBglty79QBXGw1abF9", "run_fpPFo8TPCoUL0idj0vhtzFE2");
	runned = await openai.beta.threads.runs.retrieve("thread_Q3kAwBPBglty79QBXGw1abF9", "run_fpPFo8TPCoUL0idj0vhtzFE2");
	runned = await openai.beta.threads.runs.retrieve("thread_Q3kAwBPBglty79QBXGw1abF9", "run_fpPFo8TPCoUL0idj0vhtzFE2");

	// const steps = await openai.beta.threads.runs.steps.list("thread_Q3kAwBPBglty79QBXGw1abF9", "run_L4tqNR4Fjy3rDLP0QVKVs9eU");

	// const msg = await openai.beta.threads.messages.retrieve("thread_Q3kAwBPBglty79QBXGw1abF9", "msg_FOP3WCUsGSh3WPpxCIj1xFLn")
	// const msg2 = await openai.beta.threads.messages.retrieve("thread_Q3kAwBPBglty79QBXGw1abF9", "msg_FOP3WCUsGSh3WPpxCIj1xFLn")
	//  const run = await openai.beta.threads.runs.retrieve("thread_7gd2d2b1ZyMdE3H0RazbOVpu", "run_sb90Pi8qx03w8vg9CuyIkgmW") //run_3F5qPF5BSCgmDExWG7O00AJC

	//    const run = await openai.beta.threads.runs.submitToolOutputs(
	//     "thread_7gd2d2b1ZyMdE3H0RazbOVpu",
	//     "run_sb90Pi8qx03w8vg9CuyIkgmW",
	//     {
	//       tool_outputs: [
	//         {
	//           tool_call_id: "call_2ZLRIcg3aWu7plLAY9GrraWr",
	//           output: "{balance: 1000}",
	//         },

	//       ],
	//     }
	//   );

	// const run = await openai.beta.threads.messages.list(
	//     "thread_7gd2d2b1ZyMdE3H0RazbOVpu",
	//     // "run_sb90Pi8qx03w8vg9CuyIkgmW"
	//   );

	//  const message = await openai.beta.threads.messages.create("thread_7gd2d2b1ZyMdE3H0RazbOVpu", {
	//         role: "user",
	//         content: "Qual o melhor para longo Prazo?",
	//     });

	//      const run = await openai.beta.threads.runs.create("thread_7gd2d2b1ZyMdE3H0RazbOVpu", {
	//         assistant_id: "asst_Xzz0vxhCCgJlp22A7bVqlwf5",
	//     } ) //run_t06fGhtKp95ChByqEUs4qt4w

	//     const run = await openai.beta.threads.runs.retrieve("thread_7gd2d2b1ZyMdE3H0RazbOVpu", "run_t06fGhtKp95ChByqEUs4qt4w")

	//     const messages = await openai.beta.threads.messages.list(
	//     "thread_7gd2d2b1ZyMdE3H0RazbOVpu",
	//     // "run_sb90Pi8qx03w8vg9CuyIkgmW"
	//   );

	// const runs = await openai.beta.threads.runs.list(
	//     "thread_7gd2d2b1ZyMdE3H0RazbOVpu"
	//   );
	//   const steps = await openai.beta.threads.runs.steps.list('thread_7gd2d2b1ZyMdE3H0RazbOVpu',`run_sb90Pi8qx03w8vg9CuyIkgmW`)

	console.log("asdf");
}
main();
