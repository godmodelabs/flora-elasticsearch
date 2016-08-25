'use strict';

/* Creates a prototype for a logger as used by elasticsearch. Directs logs to the provided bunyan logger */
module.exports = {

    createEsLogAdapter: function (log) {
        return function () {
            this.error = log.error.bind(log);
            this.warning = log.warn.bind(log);
            /* redirect es info to debug */
            this.info = log.debug.bind(log);
            this.debug = log.debug.bind(log);
            // eslint-disable-next-line max-params
            this.trace = function (method, requestUrl, body, responseBody, responseStatus) {
                return log.trace({
                    method: method,
                    requestUrl: requestUrl,
                    body: body,
                    responseBody: responseBody,
                    responseStatus: responseStatus
                });
            };
            this.close = function () {};
            return this;
        };
    }
};