function sendDetail(res, statusCode, detail) {
  return res.status(statusCode).json({ detail });
}

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

module.exports = {
  sendDetail,
  hasOwn,
};
