'use strict';

module.exports = (err, req, res, next) => {
  let error = {
    "text": "Something Terrible Happened",
    "error": err
  }
  res.status(500).json(error);
}
