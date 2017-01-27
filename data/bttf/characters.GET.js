const fs = require('fs');
const path = require('path');

module.exports = function(req, res, log, next) {
  const file = fs.readFileSync(path.resolve('./data/bttf/characters.GET.json'));
  const jsonData = JSON.parse(file);
  if (req.query.gender) {
    const characters = jsonData.characters
      .filter(character => character.gender === req.query.gender);
    res.json({
      characters: characters
    });
  }
  res.json(jsonData);
}