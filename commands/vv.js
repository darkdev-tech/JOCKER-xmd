// DO MODIFY THIS FILE ⚠️
// CREATED BY DARK TECH
// CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const fs = require('fs');
const path = require('path');
const { vvData } = require('./autovv'); // Ensure vvData is exported from autovv.js

// Folder containing voice notes
const voiceFolder = './media/voices';

zokou(
  {
    nomCom: 'vv',
    categorie: 'Group',
    reaction: '🎧',
  },
  async (dest, zk, { ms, repondre }) => {
    try {
      // Only auto-trigger if enabled
      if (!vvData[dest]) {
        return repondre("⚠️ Auto voice reply is not enabled. Use *autovv on* first.");
      }

      const files = fs.readdirSync(voiceFolder).filter(file =>
        /\.(mp3|opus|ogg)$/i.test(file)
      );

      if (files.length === 0) {
        return repondre("❌ No voice notes found in media/voices.");
      }

      const randomFile = files[Math.floor(Math.random() * files.length)];
      const filePath = path.join(voiceFolder, randomFile);

      await zk.sendMessage(dest, {
        audio: fs.readFileSync(filePath),
        mimetype: 'audio/ogg',
        ptt: true
      }, { quoted: ms });

    } catch (e) {
      console.error("VV Error:", e);
      repondre("❌ Failed to send voice note.");
    }
  }
);
