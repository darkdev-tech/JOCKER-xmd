//DO MODIFY THIS FILE ⚠️
//CREATED BY DARK TECH
//CONTACT 2547107065646

const { zokou } = require("../framework/zokou");
const { getGroupAdmins } = require("../lib/utils");
const { isBotAdmin } = require("../middleware/admin-check");
const fs = require("fs");

const antilinkDataPath = './bdd/antilink.json';
let antilinkData = fs.existsSync(antilinkDataPath) ? JSON.parse(fs.readFileSync(antilinkDataPath)) : {};

// Save updated settings
function saveAntiLink() {
  fs.writeFileSync(antilinkDataPath, JSON.stringify(antilinkData, null, 2));
}

zokou(
  {
    nomCom: "antilink",
    categorie: "Group",
    reaction: "🔗",
  },
  async (dest, zk, { ms, arg, repondre, isGroup, isAdmin }) => {
    if (!isGroup) return repondre("❌ This command is for groups only.");
    if (!isAdmin) return repondre("🛑 You must be a group admin to use this.");

    const setting = arg[0]?.toLowerCase();
    if (setting === "on") {
      antilinkData[dest] = true;
      saveAntiLink();
      return repondre("✅ Antilink is now *enabled* in this group.");
    } else if (setting === "off") {
      delete antilinkData[dest];
      saveAntiLink();
      return repondre("🚫 Antilink is now *disabled* in this group.");
    } else {
      return repondre("⚙️ Use: *antilink on* or *antilink off*");
    }
  }
);

// Message middleware to scan for links
zokou.onMessage(async (zk, ms) => {
  try {
    const { from, isGroup, sender, body } = ms;
    const groupMetadata = isGroup ? await zk.groupMetadata(from) : {};
    const groupAdmins = isGroup ? getGroupAdmins(groupMetadata) : [];

    if (isGroup && antilinkData[from]) {
      const botNumber = zk.user.id.split(":")[0] + "@s.whatsapp.net";
      const botIsAdmin = groupAdmins.includes(botNumber);
      const senderIsAdmin = groupAdmins.includes(sender);

      const linkRegex = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]+/;

      if (linkRegex.test(body)) {
        if (!botIsAdmin) return;
        if (senderIsAdmin) return;

        await zk.sendMessage(from, { text: `⚠️ ${ms.pushName} posted a group link and will be removed.` }, { quoted: ms });
        await zk.groupParticipantsUpdate(from, [sender], "remove");
      }
    }
  } catch (e) {
    console.error("Antilink Error:", e);
  }
});
