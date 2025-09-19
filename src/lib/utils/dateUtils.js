/**
 * Utility functions for handling dates from Firebase Firestore
 */

/**
 * Converts various Firebase timestamp formats to a JavaScript Date object
 * @param {any} timestamp - Firebase timestamp (can be various formats)
 * @returns {Date|null} - JavaScript Date object or null if invalid
 */
export function convertFirestoreTimestamp(timestamp) {
  if (!timestamp) return null;
  
  let date;
  
  if (timestamp.seconds) {
    // Standard Firestore timestamp format
    date = new Date(timestamp.seconds * 1000);
  } else if (timestamp._seconds) {
    // Alternative Firestore timestamp format
    date = new Date(timestamp._seconds * 1000);
  } else if (typeof timestamp === 'string') {
    // ISO string format
    date = new Date(timestamp);
  } else if (typeof timestamp === 'number') {
    // Unix timestamp (in milliseconds)
    date = new Date(timestamp);
  } else {
    return null;
  }
  
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Formats a Firebase timestamp for display
 * @param {any} timestamp - Firebase timestamp
 * @param {string} format - Format type ('date', 'time', 'datetime', 'locale')
 * @returns {string} - Formatted date string or 'N/A' if invalid
 */
export function formatFirestoreDate(timestamp, format = 'locale') {
  const date = convertFirestoreTimestamp(timestamp);
  
  if (!date) return 'N/A';
  
  switch (format) {
    case 'date':
      return date.toLocaleDateString();
    case 'time':
      return date.toLocaleTimeString();
    case 'datetime':
      return date.toLocaleString();
    case 'locale':
    default:
      return date.toLocaleDateString();
  }
}

/**
 * Formats a Firebase timestamp for display with time
 * @param {any} timestamp - Firebase timestamp
 * @returns {string} - Formatted date and time string or 'N/A' if invalid
 */
export function formatFirestoreDateTime(timestamp) {
  return formatFirestoreDate(timestamp, 'datetime');
}
