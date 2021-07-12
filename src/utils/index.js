import labels from '../labels.json';

export const getLabel = key => labels[key] || key;
