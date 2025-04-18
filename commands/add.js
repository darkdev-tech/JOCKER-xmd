// DO MODIFY THIS FILE ⚠️
// CREATED BY DARK TECH
// CONTACT 2547107065646

const { zokou } = require('../framework/zokou');
const fs = require('fs');

// Path to store custom data added by users
const customDataPath = './bdd/group_custom_data.json';
let customData = fs.existsSync(customDataPath) ? JSON.parse(fs.readFileSync(customDataPath)) : {};

// Function to save added data
function saveCustomData() {
  fs.writeFileSync(customDataPath, JSON.stringify(customData, null, 2));
}

zokou(
  {
    nomCom: 'add',
    categorie: 'Group',
    reaction: '➕',
  },
  async (dest, zk, { ms, isAdmin, arg, repondre }) => {
    if (!isAdmin) return repondre("🛑 You must be a group admin to use this command.");

    if (!arg || arg.length < 2) {
      return repondre("⚙️ Use: *add [key] [value]* to add data for this group.");
    }

    const [key, value] = arg.join(' ').split(' ');

    // Add the key-value pair to the custom data for this group
    if (!customData[dest]) {
      customData[dest] = {};
    }
    customData[dest][key] = value;
    saveCustomData();

    repondre(`✅ *Data added successfully for this group!* \n*Key:* ${key} \n*Value:* ${value}`);
  }
);

// Example: Retrieving added data for the group
zokou(
  {
    nomCom: 'getdata',
    categorie: 'Group',
    reaction: '🔍',
  },
  async (dest, zk, { ms, repondre }) => {
    const key = arg[0];
    if (!key || !customData[dest] || !customData[dest][key]) {
      return repondre(`❌ No data found for key: ${key} in this group.`);
    }

    const value = customData[dest][key];
    repondre(`*Key:* ${key} \n*Value:* ${value}`);
  }
);
