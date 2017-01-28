module.exports = (req, res, log, next) => {
  const num = Math.floor(Math.random() * 12);
  const laps = [...new Array(num)];
  const objs = laps.map((e,i) => {
    return {
      id: Math.floor(Math.random() * 99999),
      name: `(${i}) Random Contactlab user`,
      timestamp: new Date(),
    }
  });
  res.json(objs);
}
