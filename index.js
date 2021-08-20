const Discord = require("discord.js");
const client = new Discord.Client();

client.on("Ready", () => {
    console.log("bot online")
})

client.on("message", async (msg) => {

    let x = msg.content
    let edit = false

    if (msg.author.bot) return

    if (x.includes("r")) {
        x = x.split("r").join("w")
        edit = true
    }

    if (x.includes("l")) {
        x = x.split("l").join("w")
        edit = true
    }

    if (edit) {
        let webhook = await msg.channel.fetchWebhooks();
        webhook = webhook.find(x => x.name === "uwubot");
        if (!webhook) {
            webhook = await msg.channel.createWebhook("uwubot", {
                avatar: client.user.displayAvatarURL({ dynamic: true })
            });
        }
        await webhook.edit({
            name: msg.author.username,
            avatar: msg.author.displayAvatarURL({ dynamic: true })
        })
        msg.delete().catch(err => { })
        webhook.send(x).catch(err => { })
        await webhook.edit({
            name: "uwubot",
            avatar: client.user.displayAvatarURL({ dynamic: true })
        })
    }
})

client.login("TOKEN")
