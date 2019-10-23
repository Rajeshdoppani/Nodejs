const jwt = require('jsonwebtoken');
const log4js = require('log4js');
log4js.configure({
    appenders: { file_log: { type: 'file', filename: 'log_file.log' } },
    categories: { default: { appenders: ['file_log'], level: 'error' } }
});

const logger = log4js.getLogger('file_log');

function verifyToken(req, res, next) {
    const token = req.header('access-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verify = jwt.verify(token, 'webtoken');
        req.user = verify;
        next(); //stop execution after triggering
    } catch (err) {
        res.status(400).send('Invalid token');
        logger.error(err);
    }
}

module.exports = verifyToken;