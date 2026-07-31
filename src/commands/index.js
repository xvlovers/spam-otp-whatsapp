/**
 * Command registry - mendaftarkan semua command handler
 */
const { handleStart } = require('./start');
const { handleSpam } = require('./spam');
const { handleStatus } = require('./status');
const { handleOwner } = require('./owner');
const { handleHelp } = require('./help');

/**
 * Daftar command yang tersedia
 */
const COMMANDS = {
  '/start': handleStart,
  '/spam': handleSpam,
  '/status': handleStatus,
  '/owner': handleOwner,
  '/help': handleHelp
};

module.exports = { COMMANDS };