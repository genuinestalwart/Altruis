import {
	Client,
	Collection,
	CommandInteraction,
	GatewayIntentBits,
	Message,
	SlashCommandBuilder,
} from "discord.js";

// every command file will have these key-value pairs
export interface Command {
	data: SlashCommandBuilder;
	execute?: (message: Message) => Promise<void>;
	global: boolean;
	implement?: (interaction: CommandInteraction) => Promise<void>;
}

// every event file will have these key-value pairs
export interface Event {
	execute: (event: any) => Promise<void>;
	name: string;
	once?: boolean;
}

// extend the Client class to let the instance store command files in it
export class CustomClient extends Client {
	public commands: Collection<string, Command>;

	constructor(intents: GatewayIntentBits[]) {
		// call the constructor of the actual Client class and pass the intents to it
		super({ intents });
		// initialize the commands collection
		this.commands = new Collection<string, Command>();
	}
}
