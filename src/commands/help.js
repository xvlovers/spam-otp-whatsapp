/**
 * Command /help - Menampilkan daftar command
 */

/**
 * Handle /help command
 * @param {Object} msg - Message object dari Telegram
 * @param {Object} bot - Instance bot Telegram
 */
async function handleHelp(msg, bot) {
  const chatId = msg.chat.id;

  const message =
    `📋 *Daftar Command*\n\n` +
    `/start - Setup owner bot (hanya sekali)\n` +
    `/spam <nomor> - Kirim OTP spam\n` +
    `/status - Info status bot\n` +
    `/owner - Info owner bot\n` +
    `/help - Tampilkan menu ini\n\n` +
    `📝 *Format Nomor:*\n` +
    `6281234567890 (10-13 digit)\n\n` +
    `⚠️ *Catatan:* Hanya owner yang dapat menggunakan bot.`;

  bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

module.exports = { handleHelp };
