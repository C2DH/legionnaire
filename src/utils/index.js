import labels from '../labels.json';

export const getLabel = key => labels[key] || key;

export const parseDate = dateStr => {

  const date      = new Date(dateStr);
  const dateItems = dateStr.split('-');

  return date.toLocaleString("fr", {
    day: dateItems.length > 2 ? "numeric" : undefined,
    month: dateItems.length > 1 ? "long" : undefined,
    year: "numeric"
  });
}
