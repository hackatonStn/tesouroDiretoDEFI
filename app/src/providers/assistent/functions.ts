//@ts-ignore
const assistant = await openai.beta.assistants.create({
    instructions: "You are a weather bot. Use the provided functions to answer questions.",
    model: "gpt-4-1106-preview",
    tools: [{
      "type": "function",
      "function": {
        "name": "getBalanceRealTokenizado",
        "description": "Retorna o saldo de Real Tokenizado da carteira conectada",
        "parameters": {
          "type": "object",
          "properties": {
            "intituicao": {"type": "string", "enum": ["stn", "bb"], "description": "A instituição financeira que deseja consultar o saldo"}
          },
          "required": ["intituicao"]
        }
      }
    }, {
      "type": "function",
      "function": {
        "name": "getNickname",
        "description": "Get the nickname of a city",
        "parameters": {
          "type": "object",
          "properties": {
            "location": {"type": "string", "description": "The city and state e.g. San Francisco, CA"},
          },
          "required": ["location"]
        }
      }
    }]
  });