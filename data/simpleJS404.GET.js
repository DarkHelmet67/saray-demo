module.exports = function(req, res, log, next) {
  const now = new Date();
  res.status(404).json({
    message: 'This is a simple response for a GET request with 404 status ' + now.toISOString()
  });
}