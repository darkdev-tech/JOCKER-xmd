// DO MODIFY THIS FILE ⚠️
// CREATED BY DARK TECH
// CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'bible',
    categorie: 'General',
    reaction: '📖',
  },
  async (dest, zk, { ms, repondre }) => {
    try {
      const response = await axios.get('https://labs.bible.org/api/?passage=random&type=json');
      const verse = response.data[0];

      const message = `*📖 Random Bible Verse*:
*${verse.bookname} ${verse.chapter}:${verse.verse}*
_"${verse.text}"_`;

      await repondre(message);
    } catch (error) {
      console.error('Bible API Error:', error);
      await repondre('❌ Failed to fetch Bible verse.');
    }
  }
);


const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'quran',
    categorie: 'General',
    reaction: '🕋',
  },
  async (dest, zk, { ms, repondre }) => {
    try {
      const res = await axios.get('https://api.alquran.cloud/v1/ayah/random/en.asad');
      const verse = res.data.data;

      const message = `*🕋 Random Quran Verse*\n\n*Surah:* ${verse.surah.englishName} (${verse.surah.name})\n*Ayah:* ${verse.numberInSurah}\n\n_"${verse.text}"_`;

      await repondre(message);
    } catch (error) {
      console.error('Quran API Error:', error);
      await repondre("❌ Failed to fetch Quran verse.");
    }
  }
);
