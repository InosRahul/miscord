export const formatTime = dateString => {
  let firstPart = new Date(dateString)
    .toLocaleTimeString()
    .split(':')
    .slice(0, 2)
    .join(':');
  let secondPart = new Date(dateString)
    .toLocaleTimeString()
    .split(':')
    .slice(2)
    .join(' ')
    .replace(/\d+/g, '');

  return `${firstPart} ${secondPart.toLowerCase()}`;
};
