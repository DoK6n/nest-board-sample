export const camel2snake = str =>
  str.replace(/([A-Z])/g, arg => '_' + arg.toLowerCase()).toUpperCase();
