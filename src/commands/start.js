/**
 * Command /start - Setup owner bot
 */
const fs = require('fs');
const CONFIG = require('../config');
const logger = require('../utils/logger');

/**
 * Handle /start command
 * @param {Object} msg - Message object dari Telegram
 * @param {Object} bot - Instance bot Telegram
 */
async function handleStart(msg, bot) {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Cek apakah config.json sudah ada
  if (fs.existsSync(CONFIG.CONFIG_FILE)) {
    return bot.sendMessage(chatId, '⚠️ Bot sudah memiliki owner. Anda tidak dapat menggunakan bot ini.');
  }

  // Simpan owner baru
  const ownerData = {
    ownerId: userId,
    createdAt: new Date().toISOString()
  };

  // Pastikan folder data ada
  if (!fs.existsSync(CONFIG.DATA_DIR)) {
    fs.mkdirSync(CONFIG.DATA_DIR, { recursive: true });
  }

  fs.writeFileSync(CONFIG.CONFIG_FILE, JSON.stringify(ownerData, null, 2));

  logger.success(`Owner registered: ${userId}`);
  bot.sendMessage(chatId, `✅ Anda berhasil terdaftar sebagai owner bot!\n\nGunakan /help untuk melihat daftar command.`);
}

module.exports = { handleStart };