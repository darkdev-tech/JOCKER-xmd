const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "about",
  alias: ["mrfrank"],
  react: "🇹🇿",
  desc: "Get owner description",
  category: "main",
  filename: __filename,
}, async (bot, message, args, extras) => {
  const {
    from,
    quoted,
    pushname,
    reply,
  } = extras;

  try {
    const separator = "━━━━━━━━━━━━━━━━━━━━━━━━";
    const readMore = String.fromCharCode(0x200e).repeat(4000); // Generates a long "Read More" effect
    const caption = `${separator}\n\n*👋 HELLO ${pushname || "User"} 😄*\n\n` +
      "*INTRODUCING TO YOU 𝐁.𝐌.𝐁-𝐗𝐌𝐃 MD😇*\n\n" +
      "A Versatile WhatsApp Based Multi Device Bot Created By Hans Tz from Tanzania.\n" +
      "Its sole purpose is to remove the burden or cost of purchasing data bundles to download Songs, Apps, Videos & Movies by using WhatsApp bundles.\n\n" +
      "*For More Visit*: https://wa.me/255767862457\n\n" +
      `${separator}\n${readMore}\n` +
      "*SOURCE CODE* ⛓️\n> https://github.com/bmbxmd/B.M.B-XMD\n\n" +
      "*FOLLOW OWNER* 🦋\n> https://github.com/bmbxmd/\n\n" +
      "*OWNER'S WHATSAPP* 🚀\n> https://wa.me/255767862457/?text=𝐁.𝐌.𝐁-𝐗𝐌𝐃+Fan+Here\n\n" +
      "*2ND DEVELOPER* 🦄\n> https://wa.me/255767862457/?text=𝐁.𝐌.𝐁-𝐗𝐌𝐃+Fan+Here\n\n" +
      "*SUPPORT CHANNEL* 🪄\n> https://whatsapp.com/channel/0029VawO6hgF6sn7k3SuVU3z\n\n" +
      "*FOLLOW OWNER* 🤍\n> https://youtube.com/bmbxmd/\n\n" +
      `\`\`\`[RELEASE DATE - 3 jun 2025]\`\`\`\n\n` +
      "> *𝙱.𝙼.𝙱-𝚇𝙼𝙳*\n\n" +
      `${separator}`;

    await bot.sendMessage(from, {
      image: { url: config.ALIVE_IMG },
      caption,
    }, { quoted });
  } catch (error) {
    console.error(error);
    reply(`Error: ${error.message}`);
  }
});
