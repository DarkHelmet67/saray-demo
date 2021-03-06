const fs = require('fs');
const path = require('path');

module.exports = function(req, res, log, next) {
  const fileName = path.resolve('./data/bttf/characters.GET.json')
  const file = fs.readFileSync(fileName);
  const jsonData = JSON.parse(file);
  const characterId = parseInt(req.query.id);

  const updatedCharacters = jsonData.characters.filter(
    character => character.id !== characterId
  );
  const newData = {
    characters: updatedCharacters
  }

  const newDataString = JSON.stringify(newData, null, 2);
  fs.writeFileSync(fileName, newDataString);

  res.json(newData);
}