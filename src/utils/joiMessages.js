export const strFieldsMessage = (label) => ({
  'string.base': `${label} must be a string`,
  'string.min': `${label} must have at least {#limit} characters`,
  'string.max': `${label} must have at most {#limit} characters`,
  'any.required': `${label} is required`,
});

export const enumMessage = (label, values) => ({
  'any.only': `${label} must be one of: ${values.join(', ')}`,
  'string.base': `${label} must be a string.`,
});
