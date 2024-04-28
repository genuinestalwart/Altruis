import fs from "node:fs";
import path from "node:path";
import { REST, Routes } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const registerCommands = async () => {
	// create an instance of the REST module
	const rest = new REST().setToken(process.env.CLIENT_TOKEN || "");
	// store the SlashCommandBuilder#toJSON() output of each command's data in arrays
	const globalCommands: object[] = [];
	const guildCommands: object[] = [];
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

			// add to the arrays only if all the necessary key-value pairs are there
			if (
				"data" in command &&
				"global" in command &&
				("execute" in command || "implement" in command)
			) {
				if (command.global) {
					globalCommands.push(command.data.toJSON());
				} else {
					guildCommands.push(command.data.toJSON());
				}
			} else {
				console.log(
					`[WARNING] The command at ${filePath} is missing a required "data" or one of commands property.`
				);
			}
		}
	}

	try {
		console.log(
			`Started refreshing ${globalCommands.length} global and ${guildCommands.length} guild (/) commands.`
		);

		// register the global commands
		const globalData: any = await rest.put(
			Routes.applicationCommands(process.env.CLIENT_ID || ""),
			{ body: globalCommands }
		);

		// register the test guild commands
		const guildData: any = await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID || "",
				process.env.GUILD_ID || ""
			),
			{ body: guildCommands }
		);

		console.log(
			`Successfully reloaded ${globalData.length} global and ${guildData.length} guild (/) commands.`
		);
	} catch (error) {
		console.error(error);
	}
};

registerCommands();
