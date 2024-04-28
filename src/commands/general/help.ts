import { Command } from "@/utilities/types";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

const response = (
	avatarURL: string | undefined,
	thumbnail: string | null,
	username: string
) =>
	new EmbedBuilder()
		.setAuthor({
			iconURL: "https://i.ibb.co/p48Ds9g/GS-logo-new.png",
			name: "Genuine Stalwart",
		})
		.setColor("#674eff")
		.setDescription(
			`> Protecting the secret of **Genuine Stalwart**!
> At any cost, by any means, if necessary!

Altruis is a custom bot which I made for my personal uses. The main purpose of using it is to reduce my dependency on multiple bots to manage a single server. It's an open source bot, meaning you can use [its code](https://github.com/genuinestalwart/Altruis) to make your own.

Altruis will respond to you in 4 ways:
- rm [command]
- rimo [command]
- <@875282158623789080> [command]
- /[command]

**USE \`/commands\` TO SEE THE LIST OF COMMANDS**`
		)
		.setFooter({ iconURL: avatarURL, text: username })
		.setThumbnail(thumbnail)
		.setTimestamp()
		.setTitle("Altruis | Help");

const help: Command = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Everything you need to know about the bot"),
	execute: async (message) => {
		// dynamically show the guild icon as thumbnail and who sent the command trigger
		await message.reply({
			embeds: [
				response(
					message.author.avatarURL() || undefined,
					message.guild?.iconURL() || null,
					message.author.username
				),
			],
		});
	},
	global: true,
	implement: async (interaction) => {
		// dynamically show the guild icon as thumbnail and who use the slash command
		await interaction.reply({
			embeds: [
				response(
					interaction.user.avatarURL() || undefined,
					interaction.guild?.iconURL() || null,
					interaction.user.username
				),
			],
		});
	},
};

export default help;
