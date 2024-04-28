import { Event } from "@/utilities/types";
import { Events, Message } from "discord.js";
import { client } from "@/index";

const messageCreate: Event = {
	execute: async (message: Message<boolean>) => {
		// respond to the message only if it's a valid message command of the bot
		const validTrigger =
			message.content.startsWith("<@875282158623789080> ") ||
			message.content.startsWith("rimo ") ||
			message.content.startsWith("rm ");

		if (!validTrigger) return;
		const command = client.commands.get(message.content.split(" ")[1]);
		if (!command || !command.execute) return;

		try {
			await command.execute(message);
		} catch (error) {
			console.error(error);

			await message.reply(
				"There was an error while executing this command!"
			);
		}
	},
	name: Events.MessageCreate,
};

export default messageCreate;
