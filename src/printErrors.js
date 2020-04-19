const colors = require('colors/safe');

colors.setTheme({
  WARN: 'yellow',
  ERROR: 'red'
});

const getStartColor = severity => {
  return colors[severity](`[${severity}]`);
};

const section = {
  start: 'start with',
  end: 'end with',
  contains: 'contain'
};

let message = '';
let parts = '';
let error = false;

module.exports = (errors, commitMsg) => {
  Object.keys(errors).forEach(severity => {
    const start = getStartColor(severity);
    
    Object.keys(errors[severity]).forEach(matcher => {
      if (errors[severity].capitalized && matcher === 'capitalized') {
        message += `\t${start} Commit message did not begin with a capital letter\n`;
      }

      if (errors[severity][matcher].length > 0) {
        parts = errors[severity][matcher].map(part => `"${part}"`).join(', ')
        message += `\t${start} Commit message did not ${section[matcher]} ${parts}\n`;
        if (severity === 'ERROR' && !error) {
          error = true;
        }
      }
    });

  });

  console.log(`  Commit Message: ${colors.green(commitMsg)}\n`)
  console.log(message)
  if (error) process.exit(1);
};
