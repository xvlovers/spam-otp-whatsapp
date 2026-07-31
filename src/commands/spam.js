/**
 * Command /spam - Menjalankan OTP spam ke nomor target
 */
const { spamOtp } = require('../engine/spam');
const { isValidPhone, normalizePhone } = require('../utils/validator');
const logger = require('../utils/logger');

/**
 * Handle /spam command
 * @param {Object} msg - Message object dari Telegram
 * @param {Object} bot - Instance bot Telegram
 */
async function handleSpam(msg, bot) {
  const chatId = msg.chat.id;
  const args = msg.text.split(' ').slice(1);
  const phone = args[0];

  if (!phone) {
    return bot.sendMessage(chatId, '⚠️ Format: /spam <nomor>\nContoh: /spam 6281234567890');
  }

  const normalized = normalizePhone(phone);

  if (!isValidPhone(normalized)) {
    return bot.sendMessage(chatId, '❌ Nomor tidak valid! Format: 628xxx (10-13 digit setelah 62)');
  }

  // Kirim pesan sebelum eksekusi
  await bot.sendMessage(chatId, `🔥 Memulai spam ke ${normalized}...`);

  logger.info(`Spam started for ${normalized} by ${msg.from.id}`);

  try {
    const result = await spamOtp(normalized);

    const failedCount = result.total - result.success;

    const responseMsg =
      `📊 *Hasil Spam*\n\n` +
      `📱 Nomor: \`${normalized}\`\n` +
      `✅ Sukses: ${result.success}/${result.total}\n` +
      `❌ Gagal: ${failedCount}/${result.total}\n` +
      `⏱️ Waktu: ${result.elapsed.toFixed(1)} detik`;

    bot.sendMessage(chatId, responseMsg, { parse_mode: 'Markdown' });
  } catch (err) {
    logger.error(`Spam error: ${err.message}`);
    bot.sendMessage(chatId, `❌ Error: ${err.message}`);
  }
}

module.exports = { handleSpam };