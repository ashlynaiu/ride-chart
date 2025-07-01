/**
 * Formats a number to a string with commas as thousand separators
 */
export const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Formats elevation by adding commas as thousand separators and appending ' ft'
 */
export const formatElevation = (elevation: string): string => {
  // Extract numbers from the string
  const numbers = elevation.match(/\d+/g);
  if (!numbers) return elevation;
  
  // Format each number with commas
  let result = elevation;
  numbers.forEach(num => {
    result = result.replace(num, formatNumber(parseInt(num)));
  });
  
  return result;
};

/**
 * Capitalizes the first letter of each word in a string
 */
export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

/**
 * Truncates a string to a specified length and adds an ellipsis if needed
 */
export const truncate = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

/**
 * Formats a rating (1-5) to star emojis
 */
export const formatRating = (rating: number): string => {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

/**
 * Formats a date to a readable string
 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
