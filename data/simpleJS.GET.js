module.exports = function(req, res, log, next) {
  res.json({
    message: 'This is a simple response for a GET request from a JS stub file'
  });
}