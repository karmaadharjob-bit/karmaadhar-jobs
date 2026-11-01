'use strict';

const currencySymbols = { INR: '₹', USD: '$', EUR: '€', GBP: '£' };

function formatSalary(job) {
  const { salaryMin, salaryMax, salaryPeriod, currency } = job;
  if (!salaryMin && !salaryMax) return 'Salary not disclosed';
  const symbol = currencySymbols[currency] || '';
  const period = salaryPeriod === 'month' ? '/mo' : '/yr';
  const asLakhs = (value) => `${(value / 100000).toFixed(1).replace(/\.0$/, '')}L`;
  const formatValue = (value) =>
    salaryPeriod === 'month' ? `${symbol}${Number(value).toLocaleString('en-IN')}` : `${symbol}${asLakhs(value)}`;

  if (salaryMin && salaryMax) return `${formatValue(salaryMin)} – ${formatValue(salaryMax)} ${period}`.trim();
  return `${formatValue(salaryMin || salaryMax)} ${period}`.trim();
}

function timeAgo(isoDate) {
  const then = new Date(isoDate).getTime();
  if (Number.isNaN(then)) return '';
  const seconds = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months === 1 ? '' : 's'} ago`;
}

function initials(name) {
  return String(name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

module.exports = { formatSalary, timeAgo, initials };
