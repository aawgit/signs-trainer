import pkg from 'winston';
const {createLogger, transports} = pkg;
const logger = createLogger({
    transports: [new transports.Console()]
  });

export {logger}
