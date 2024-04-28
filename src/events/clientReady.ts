import { Event } from "@/utilities/types";
import { Client, Events } from "discord.js";

const clientReady: Event = {
	execute: async (client: Client<true>) => {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
	name: Events.ClientReady,
	once: true,
};

export default clientReady;
