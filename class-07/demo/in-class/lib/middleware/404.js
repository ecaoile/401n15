'use strict';

module.exports = (req, res, next) => {
  res.status(404).send("Route Not Supported");
}

// function notFoundMiddleware(req, res, next) {
//   res.status(404).send("Route Not Supported");
// }

// module.exports = notFoundMiddleware;