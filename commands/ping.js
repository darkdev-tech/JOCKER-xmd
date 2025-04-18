//DO MODIFY THIS FILE ⚠️
//CREATED BY DARK TECH
//CONTACT 2547107065646

const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "ping",
    categorie: "General",
    reaction: "🏓",
  },
  async (dest, zk, { ms, repondre }) => {
    const start = Date.now();
    const res = await zk.sendMessage(dest, { text: "🏓 Pong!" }, { quoted: ms });
    const end = Date.now();
    const latency = end - start;

    repondre(`🏓 *Pong!*\nBot Latency: *${latency}ms*\nAPI Latency: *${res.latency}ms*`);
  }
);
