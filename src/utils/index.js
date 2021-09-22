import labels from '../labels.json';

export const getLabel = key => labels[key] || key;

export const parseDate = (dateStr, long = false) => {

  if(!dateStr) return null;

  const date      = new Date(dateStr);
  const dateItems = dateStr.split('-');

  return date.toLocaleString("fr", {
    day: dateItems.length > 2 ? "numeric" : undefined,
    month: dateItems.length > 1 ? (long ? "long" : "short") : undefined,
    year: "numeric"
  });
}

export const parseYear = (dateStr) => {

  if(!dateStr) return null;

  const date      = new Date(dateStr);

  return date.toLocaleString("fr", {
    year: "numeric"
  });
}
