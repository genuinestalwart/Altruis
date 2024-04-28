import fs from "fs";
import path from "path";
import { Collection, GatewayIntentBits } from "discord.js";
import { CustomClient } from "@/utilities/types";
import dotenv from "dotenv";
dotenv.config();

// create a client instance of the extended Client with necessary intents
export const client = new CustomClient([
	GatewayIntentBits.AutoModerationConfiguration,
	GatewayIntentBits.AutoModerationExecution,
	GatewayIntentBits.DirectMessageReactions,
	GatewayIntentBits.DirectMessageTyping,
	GatewayIntentBits.DirectMessages,
	GatewayIntentBits.GuildEmojisAndStickers,
	GatewayIntentBits.GuildIntegrations,
	GatewayIntentBits.GuildInvites,
	GatewayIntentBits.GuildMembers,
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildMessageTyping,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.GuildModeration,
	GatewayIntentBits.GuildPresences,
	GatewayIntentBits.GuildScheduledEvents,
	GatewayIntentBits.GuildVoiceStates,
	GatewayIntentBits.GuildWebhooks,
	GatewayIntentBits.Guilds,
	GatewayIntentBits.MessageContent,
]);

// store all the command files in the client instance as a collection
client.commands = new Collection();
const commandsFolderPath = path.join(__dirname, "commands");
const commandsFolder = fs.readdirSync(commandsFolderPath);

// get all the files from all folders under the "/commands" folder
for (const folder of commandsFolder) {
	const filesPath = path.join(commandsFolderPath, folder);

	const files = fs
		.readdirSync(filesPath)
		.filter((file) => file.endsWith(".ts"));

	for (const file of files) {
		const filePath = path.join(filesPath, file);
		const command = require(filePath).default;

		// add to the collection only if all the necessary key-value pairs are there
		if (
			"data" in command &&
			"global" in command &&
			("execute" in command || "implement" in command)
		) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or one of commands property.`
			);
		}
	}
}

// get all the files under the "/events" folder
const eventFilesPath = path.join(__dirname, "events");
const eventsFiles = fs.readdirSync(eventFilesPath);

for (const file of eventsFiles) {
	const filePath = path.join(eventFilesPath, file);
	const event = require(filePath).default;

	// whenever an event occurs, call the respective event handler
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(process.env.CLIENT_TOKEN);
