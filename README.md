# Altruis

This is a discord bot which I made for my personal uses. The main purpose of using it is to reduce my dependency on multiple bots to manage a single server. Currently I'm planning to implement the following features in it:

- create custom VCs, like [VoiceMaster](https://voicemaster.xyz/)
- add a sticky message in any channel, like [Sticky Bot](https://www.stickybot.info/)
- get youtube notifications, like [Pingcord](https://pingcord.xyz/)

The bot will not be hosted on any platform until I have the ability to pay for it, nor it will become a public bot at any point in the future. **THIS BOT IS ONLY FOR MY PERSONAL USES, BUT YOU CAN USE THE CODE TO MAKE YOUR OWN.** Meaning that the code is open source. You don't need my permission to use it. So it's not mandatory to mention my name in your code as the *real* author.

## Documentation

These are the steps that I followed to make this project. First, I created the `package.json` file with default config and installed the necessary packages.

```bash
npm init -y
npm install discord.js @discordjs/voice dotenv
```

Then, I added three extra scripts in there.

```json
"build": "tsc",
"deploy": "ts-node-dev -r tsconfig-paths/register --transpile-only src/deploy.ts",
"dev": "ts-node-dev -r tsconfig-paths/register --respawn --transpile-only src/index.ts",
```

I also used eslint and typescript in this project.

```bash
npm install --save-dev typescript ts-node-dev tsconfig-paths
npm init @eslint/config@latest
npx tsc --init
```

Finally, I generated a `tsconfig.json` file with these settings:

```json
{
    "compilerOptions": {
        "baseUrl": "./src",
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "module": "commonjs",
        "outDir": "./dist",
        "paths": { "@/*": ["./*"] },
        "rootDir": "./src",
        "skipLibCheck": true,
        "strict": true,
        "target": "ESNext"
    },
    "exclude": ["node_modules"],
    "include": ["src/**/*"]
}
```

If you don't know how to use discord.js, follow their [official guide](https://discordjs.guide/#before-you-begin)

## Things to Notice

- all the files are written in typescript and are inside the `/src` folder
- paths aliases are used (i.e. `import { client } from "@/client"`)
- In every command file, `execute` function is for replying to message commands and `interaction` function is for replying to slash commands
