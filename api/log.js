var log4js = require('log4js');
log4js.configure({
  appenders: {
    console:{ type: 'console' },
    cheeseLogs:{ type: 'dateFile', pattern : 'yyyy-MM-dd.log', alwaysIncludePattern : true, filename: 'logs/app', category: 'app' }
  },
     categories: {
        default: {appenders: ['console', 'cheeseLogs'], level: 'info'}
    }
});
var logger = log4js.getLogger('app');

module.exports = logger;