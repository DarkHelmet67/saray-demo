module.exports = function(req, res, log, next) {
  const now = new Date();
  res.json({
    message: 'This is a simple response for a DELETE request ' + now.toISOString()
  });
}