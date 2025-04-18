const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const config = require("../set");

zokou(
  {
    nomCom: "alive",
    categorie: "General",
    reaction: "🃏",
  },
  async (dest, zk, { ms, arg, repondre, superUser }) => {
    try {
      const currentTime = moment().tz(config.TIMEZONE || "Etc/GMT");
      const date = currentTime.format("DD/MM/YYYY");
      const time = currentTime.format("HH:mm:ss");
      const mode = config.MODE.toLowerCase() === "yes" ? "public" : "private";

      if (!arg || arg.length === 0) {
        const data = await getDataFromAlive();

        const caption = `
╭━━━━━━━◇◆◇━━━━━━━╮
┃     *🃏 JOCKER XMD STATUS*    
╰━━━━━━━◇◆◇━━━━━━━╯

*👤 Owner:* ${config.OWNER_NAME}
*⚙️ Mode:* ${mode}
*🗓️ Date:* ${date}
*⏰ Time (GMT):* ${time}

${data?.message || "_Use_ *alive message;link* _to customize this!_"}

*🔋 POWERED BY DARK TECH*
`;

        const mediaUrl = data?.lien?.trim();
        const extension = mediaUrl?.split('.').pop().toLowerCase();

        if (mediaUrl && ["mp4", "gif"].includes(extension)) {
          await zk.sendMessage(dest, { video: { url: mediaUrl }, caption }, { quoted: ms });
        } else if (mediaUrl && ["jpg", "jpeg", "png", "webp"].includes(extension)) {
          await zk.sendMessage(dest, { image: { url: mediaUrl }, caption }, { quoted: ms });
        } else {
          repondre(caption);
        }

      } else {
        if (!superUser) return repondre("🚫 Only the bot owner can set a custom alive message.");

        const [messageText, mediaLink] = arg.join(" ").split(";");
        await addOrUpdateDataInAlive(messageText.trim(), mediaLink?.trim());
        repondre("✅ Alive message successfully updated!");
      }

    } catch (err) {
      console.error("Alive Command Error:", err);
      repondre("❌ Something went wrong while processing the alive command.");
    }
  }
);
