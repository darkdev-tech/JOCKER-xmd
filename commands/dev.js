//DO MODIFY THIS FILE ⚠️
//CREATED BY DARK TECH
//CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const os = require('os');
const moment = require('moment');
const process = require('process');

zokou(
  {
    nomCom: 'dev',
    categorie: 'General',
    reaction: '👨‍💻',
  },
  async (dest, zk, { ms, repondre }) => {
    const uptime = moment.duration(process.uptime(), 'seconds');
    const uptimeStr = `${uptime.hours()}h ${uptime.minutes()}m ${uptime.seconds()}s`;

    const memoryUsage = process.memoryUsage();
    const memoryStr = `RSS: ${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB | Heap Total: ${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB | Heap Used: ${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`;

    const cpus = os.cpus();
    const cpuInfo = cpus.map(cpu => {
      return `${cpu.model} - Speed: ${cpu.speed}MHz`;
    }).join("\n");

    const botInfo = `
╭━━━━━━━◇◆◇━━━━━━━╮
┃    *👨‍💻 Bot System Info*    
╰━━━━━━━◇◆◇━━━━━━━╯

*⚙️ Bot Uptime:* ${uptimeStr}
*💻 Memory Usage:* ${memoryStr}
*💻 CPU Info:*
${cpuInfo}

*🔋 Powered by DARK TECH*
`;

    repondre(botInfo);
  }
);
