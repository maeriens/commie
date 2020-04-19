/**
 * Cosmiconfig does a lazy search - first file it founds with the name given to the cosmiconfig 
 * function plus rc, rc.json, etc. or a key in the package.json is loaded. 
 * All actions here are done synchronously. If the file is not found, said result would be null.
 * This file parses the found config and returns a new config object, empty if not found.
 */
const { cosmiconfigSync } = require('cosmiconfig');
const synced = cosmiconfigSync('commie').search();
const { green, red, yellow } = require('colors');
const errorLabel = red('\t[ERROR]');
const warnLabel = yellow('\t[WARNING]');

const newConfig = {};
const validConfigs = ['start', 'end', 'contains', 'capitalized'];
const validSeverities = ['WARN', 'ERROR'];
// If a cofiguration was found
if (synced && synced.config) {
  const config = synced.config;

  // Check config file for bad keys, severities, etc.
  Object.keys(config).forEach(key => {
    const { severity, matchers } = config[key];
    const newKey = key.toLowerCase();
    const sev = (severity === undefined) ? 'WARN' : severity.toUpperCase();

    if (!validConfigs.includes(newKey)) {
      console.log(`${errorLabel} Config key ${red(key)} is not a valid key.`);
      return process.exit(1);
    };

    if (!validSeverities.includes(sev)) {
      console.log(`${errorLabel} Key ${green(key)} has ${red(severity)} as severity, which is an invalid option. ` +
        `Choose either ${yellow('WARN')} or ${yellow('ERROR')}.`);
      return process.exit(1);;
    };

    if(!matchers && newKey !== 'capitalized') {
      console.log(`${warnLabel} Key ${green(key)} requires matchers but found none. Skipping.`)
      return;
    }

    newConfig[newKey] = {};
    newConfig[newKey].severity = sev;

    if (matchers) {
      newConfig[newKey].matchers = Array.isArray(matchers) && key !== 'capitalized' ? matchers : [matchers];
    };
  });
} else {
  console.log(`${errorLabel} ${yellow('[COMMIE]')} No config file found`)
}
module.exports = newConfig;


