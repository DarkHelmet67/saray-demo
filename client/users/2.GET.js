module.exports = (req, res, log, next) => {
  const obj = {
    id: Math.floor(Math.random() * 99999),
    name: 'Random Contactlab user',
    timestamp: new Date(),
  }
  res.json(obj);
}
