// DO MODIFY THIS FILE ⚠️
// CREATED BY DARK TECH
// CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'define',
    categorie: 'General',
    reaction: '📖',
  },
  async (dest, zk, { arg, repondre }) => {
    const word = arg.join(' ');
    if (!word) return repondre('❓ Please provide a word to define. Example: *define love*');

    try {
      const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!data || !data[0]) return repondre(`❌ No definition found for "${word}".`);

      const meanings = data[0].meanings.map((m, idx) =>
        `*${idx + 1}. ${m.partOfSpeech}*\n- ${m.definitions[0].definition}`
      ).join('\n\n');

      const message = `📚 *Definition of "${word}":*\n\n${meanings}`;
      repondre(message);

    } catch (error) {
      console.error('Define Error:', error);
      repondre("❌ Failed to fetch definition. Please try again later.");
    }
  }
);
