
// log4js.configure({
//     appenders: { clinton: { type: "file", filename: "api-clinton-entrydata.log" } },
//     categories: { default: { appenders: ["clinton"], level: "debug" } },
// });



const log = function(){
    var log4js = require("log4js");
    var logger = log4js.getLogger();
    logger.debug("LOG ACTIVE");
    return logger
}

module.exports = {
    log
}