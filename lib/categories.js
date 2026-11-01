'use strict';

/**
 * Category taxonomy + display metadata for the blue-collar job board.
 * Icons are emoji so the site stays fully offline (no external image hosts).
 */
const categoryMeta = {
  Delivery: { icon: '🛵', tint: 'blue' },
  Driver: { icon: '🚗', tint: 'green' },
  'Security Guard': { icon: '🛡️', tint: 'indigo' },
  Housekeeping: { icon: '🧹', tint: 'amber' },
  'Cook / Chef': { icon: '🍳', tint: 'orange' },
  Electrician: { icon: '💡', tint: 'yellow' },
  Plumber: { icon: '🔧', tint: 'cyan' },
  'Technician / ITI': { icon: '⚙️', tint: 'slate' },
  Telecalling: { icon: '☎️', tint: 'pink' },
  'Field Sales': { icon: '🤝', tint: 'teal' },
  'Retail / Counter Sales': { icon: '🏬', tint: 'purple' },
  'Warehouse / Helper': { icon: '📦', tint: 'brown' },
  'Office Boy / Peon': { icon: '🗂️', tint: 'blue' },
  'Nurse / Ward Boy': { icon: '🏥', tint: 'red' },
  Beautician: { icon: '💇', tint: 'pink' },
  Tailoring: { icon: '✂️', tint: 'violet' },
  'Machine Operator': { icon: '🏭', tint: 'slate' }
};

const jobCategories = Object.keys(categoryMeta);

const qualifications = ['Below 10th Pass', '10th Pass', '12th Pass', 'ITI / Diploma', 'Graduate'];

const tints = ['blue', 'green', 'indigo', 'amber', 'orange', 'yellow', 'cyan', 'slate', 'pink', 'teal', 'purple', 'brown', 'red', 'violet'];

function metaFor(category) {
  if (categoryMeta[category]) return categoryMeta[category];
  const index = Math.abs(String(category).split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0)) % tints.length;
  return { icon: '💼', tint: tints[index] };
}

module.exports = { jobCategories, qualifications, metaFor };
