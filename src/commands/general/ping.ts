import { Command } from "@/utilities/types";
import { SlashCommandBuilder } from "discord.js";

const response = (heartbeat: number, latency: number) => `### Pong! 🏓
- **Heartbeat:** \`${heartbeat}ms\`
- **Latency:** \`${latency}ms\``;

const ping: Command = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	execute: async (message) => {
		// first, send a reply and then edit the message
		const sent = await message.reply("Pinging...");

		await sent.edit(
			response(
				message.client.ws.ping,
				sent.createdTimestamp - message.createdTimestamp
			)
		);
	},
	global: true,
	implement: async (interaction) => {
		// first, send a reply and then edit the message
		const sent = await interaction.reply({
			content: "Pinging...",
			fetchReply: true,
		});

		await interaction.editReply(
			response(
				interaction.client.ws.ping,
				sent.createdTimestamp - interaction.createdTimestamp
			)
		);
	},
};

export default ping;
