/**
 * Command /owner - Menampilkan informasi owner
 */
const fs = require('fs');
const CONFIG = require('../config');

/**
 * Handle /owner command
 * @param {Object} msg - Message object dari Telegram
 * @param {Object} bot - Instance bot Telegram
 */
async function handleOwner(msg, bot) {
  const chatId = msg.chat.id;

  if (!fs.existsSync(CONFIG.CONFIG_FILE)) {
    return bot.sendMessage(chatId, '⚠️ Owner belum di-setup. Gunakan /start untuk setup.');
  }

  const data = JSON.parse(fs.readFileSync(CONFIG.CONFIG_FILE, 'utf8'));
  const createdDate = new Date(data.createdAt).toLocaleString('id-ID');

  const message =
    `👤 *Info Owner*\n\n` +
    `🆔 Owner ID: \`${data.ownerId}\`\n` +
    `📅 Terdaftar: ${createdDate}`;

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

module.exports = { handleOwner };