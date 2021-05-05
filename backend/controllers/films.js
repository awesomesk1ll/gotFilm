const Films = require('../model/Films');
const Users = require('../model/User');
const fs = require('fs');
const util = require('util');
const readFilePromise = util.promisify(fs.readFile);

exports.postFilms = async (req, res) => {
  try {
    const data = await readFilePromise('../../gotfilm.tk/frontend/public/films.json', 'utf8');
    const films = await JSON.parse(data);
    const newFilms = new Films({ part: 1, films });

    await newFilms.save();

    res.status(201).json({ message: 'фильмы добавлены' });
  } catch (e) {
    res.status(400).json({ message: 'ошибочка' });
  }
};

exports.getFilms = async (req, res) => {
  try {
    const part = req.params.part;
    const filmsPart = await Films.findOne({ part });
    res.json({ films: filmsPart.films });
  } catch (e) {
    res.status(400).json({ message: 'ошибочка' });
  }
};

exports.updateLists = async (req, res) => {
  try {
    const { nickname, wishlist, blacklist } = req.body;
    const user = await Users.findOne({ nickname });
    user.blacklist = [...user.blacklist, ...blacklist];
    user.wishlist = [...user.wishlist, ...wishlist];

    await user.save();

    res.status(201).json({ message: 'список изменен' });
  } catch (e) {
    return res.status(400).json({ message: 'ошибочка' });
  }
};
