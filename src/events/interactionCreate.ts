import { client } from "@/index";
import { Event } from "@/utilities/types";
import { CacheType, Events, Interaction } from "discord.js";

const interactionCreate: Event = {
	execute: async (interaction: Interaction<CacheType>) => {
		// respond to the interaction only if it's a valid slash command of the bot
		if (!interaction.isChatInputCommand()) return;
		const command = client.commands.get(interaction.commandName);
		if (!command || !command.implement) return;

		try {
			await command.implement(interaction);
		} catch (error) {
			console.error(error);

			const response = {
				content: "There was an error while executing this command!",
				ephemeral: true,
			};

			if (interaction.replied || interaction.deferred) {
				await interaction.followUp(response);
			} else {
				await interaction.reply(response);
			}
		}
	},
	name: Events.InteractionCreate,
};

export default interactionCreate;
