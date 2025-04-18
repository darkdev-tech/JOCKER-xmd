// DO MODIFY THIS FILE ⚠️
// CREATED BY DARK TECH
// CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const s = require(__dirname + '/../set');
const moment = require("moment-timezone");

zokou(
  {
    nomCom: 'menu',
    categorie: 'General',
    reaction: '📜',
  },
  async (dest, zk, { repondre }) => {

    const mode = (s.MODE.toLowerCase() === "yes") ? "Public" : "Private";
    const time = moment().tz('Africa/Nairobi').format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const menu = `
╔═════⊹⊱✫⊰⊹═════╗
     🃏 *JOCKER-XMD MENU*
╚═════⊹⊱✫⊰⊹═════╝

*🧑‍💻 Owner:* ${s.OWNER_NAME || 'DARK TECH'}
*🔁 Mode:* ${mode}
*📆 Date:* ${date}
*⏰ Time:* ${time}

╭───〔 ✨ GENERAL 〕───╮
│ ⚡ alive
│ 📖 define [word]
│ 📚 biblelist
│ 📘 bible [book] [chapter]
│ 🕋 quran [sura:verse]
│ 📜 menu
╰────────────────────╯

╭───〔 🔒 GROUP TOOLS 〕──╮
│ 🚫 antibot on/off
│ 🚫 antilink on/off
│ ➕ add [number]
│ ❌ kick [@tag/reply]
│ 🔇 mute/unmute
│ 🧼 clean
╰──────────────────────╯

╭───〔 ⚙️ DEV TOOLS 〕───╮
│ 🔧 dev
│ 🧠 ping
╰─────────────────────╯

╭───〔 🎧 VOICE SYSTEM 〕─╮
│ 🎙️ vv
│ ⚙️ autovv on/off
╰──────────────────────╯

╭────〔 ⚡ POWERED BY 〕────╮
│       DARK TECH - 2547107065646
╰────────────────────────╯
`;

    repondre(menu);
  }
);
