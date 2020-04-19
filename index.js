const message = require('./src/getMessage');
const config = require('./src/getConfig');
const printErrors = require('./src/printErrors');
const errors = {
  WARN: { start: [], end: [], contains: [] },
  ERROR: { start: [], end: [], contains: [] }
};

const checkMatch = (key, obj, symbol = '') => {

  const { severity, matchers } = obj;
  let failMatches = 0;

  matchers.forEach(string => {
    if (!RegExp(symbol + string).test(message)) {
      errors[severity][key].push(string);
      failMatches += 1;
    };
  });

  if (severity === 'ERROR' && matchers.length > failMatches) {
    errors['ERROR'][key] = [];
  }
  return (matchers.length === failMatches) && (severity === 'ERROR');
}

const capitalization = (char, { severity }) => {
  if (char !== char.toUpperCase()) {
    errors[severity].capitalized = true;
    return true;
  }
  return false;
}

// If the config object is not empty
if (Object.keys(config).length > 0) {
  Object.keys(config).forEach(key => {
    switch (key) {
      case 'start':
        return checkMatch(key, config[key], '^');
      case 'end':
        return checkMatch(key, config[key], '$');
      case 'contains':
        return checkMatch(key, config[key]);
      case 'capitalized':
        return capitalization(message[0], config[key]);
      default:
        return console.log(`Rule ${key} not recognized.`);
    };
  });
  printErrors(errors, message);
};








