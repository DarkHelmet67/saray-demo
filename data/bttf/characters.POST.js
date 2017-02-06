const fs = require('fs');
const path = require('path');

module.exports = function(req, res, log, next) {
  const fileName = path.resolve('./data/bttf/characters.GET.json')
  const file = fs.readFileSync(fileName);
  const jsonData = JSON.parse(file);

  const maxId = Math.max(...jsonData.characters.map(item => item.id));
  const newCharacter = {
    id: maxId + 1,
    name: req.body.name,
    surname: req.body.surname,
    gender: req.body.gender
  };

  const updatedCharacters = jsonData.characters.concat(newCharacter);
  const newData = {
    characters: updatedCharacters
  }
  const newDataString = JSON.stringify(newData, null, 2);
  fs.writeFileSync(fileName, newDataString);

  res.json(newData);
}