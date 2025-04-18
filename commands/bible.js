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
