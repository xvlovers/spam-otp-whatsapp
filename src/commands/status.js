/**
 * Command /status - Menampilkan informasi bot
 */
const CONFIG = require('../config');
const { getEndpoints } = require('../engine/endpoints');
const { normalizePhone } = require('../utils/validator');

let startTime = Date.now();

/**
 * Handle /status command
 * @param {Object} msg - Message object dari Telegram
 * @param {Object} bot - Instance bot Telegram
 */
async function handleStatus(msg, bot) {
  const chatId = msg.chat.id;

  const uptimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  const uptimeStr = `${hours}j ${minutes}m ${seconds}d`;

  // Hitung jumlah endpoint
  const endpoints = getEndpoints(normalizePhone('6281234567890'));
  const endpointCount = endpoints.length;

  const message =
    `📊 *Status Bot*\n\n` +
    `🤖 Nama: OTP Spam Bot\n` +
    `📌 Versi: ${CONFIG.VERSION}\n` +
    `📡 Endpoint: ${endpointCount}\n` +
    `🟢 Status: Online\n` +
    `⏱️ Uptime: ${uptimeStr}`;

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

module.exports = { handleStatus };