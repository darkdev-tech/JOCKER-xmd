//DO MODIFY THIS FILE ⚠️
//CREATED BY DARK TECH
//CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const { getGroupAdmins } = require('../lib/utils');
const fs = require('fs');

// Path to store anti-bot settings
const antibotDataPath = './bdd/antibot.json';
let antibotData = fs.existsSync(antibotDataPath) ? JSON.parse(fs.readFileSync(antibotDataPath)) : {};

function saveAntiBot() {
  fs.writeFileSync(antibotDataPath, JSON.stringify(antibotData, null, 2));
}

zokou(
  {
    nomCom: 'antibot',
    categorie: 'Group',
    reaction: '🚫🤖',
  },
  async (dest, zk, { ms, isAdmin, repondre }) => {
    if (!isAdmin) return repondre("🛑 You must be a group admin to use this.");

    const setting = arg[0]?.toLowerCase();
    if (setting === 'on') {
      antibotData[dest] = true;
      saveAntiBot();
      return repondre("✅ Anti-bot protection is now *enabled* in this group.");
    } else if (setting === 'off') {
      delete antibotData[dest];
      saveAntiBot();
      return repondre("🚫 Anti-bot protection is now *disabled* in this group.");
    } else {
      return repondre("⚙️ Use: *antibot on* or *antibot off*");
    }
  }
);

// Middleware to handle bot detection in groups
zokou.onGroupParticipantUpdate(async (zk, ms) => {
  try {
    const { from, action, participant } = ms;
    const groupMetadata = await zk.groupMetadata(from);
    const groupAdmins = getGroupAdmins(groupMetadata);

    // Check if the anti-bot protection is enabled in this group
    if (antibotData[from] && action === 'add') {
      // Check if the participant is a bot
      if (participant.endsWith('@s.whatsapp.net') && !groupAdmins.includes(participant)) {
        // Notify and remove the bot
        await zk.sendMessage(from, { text: `🚫 Bot detected! Removing: ${participant}` }, { quoted: ms });
        await zk.groupParticipantsUpdate(from, [participant], 'remove');
      }
    }
  } catch (e) {
    console.error('Antibot Error:', e);
  }
});
