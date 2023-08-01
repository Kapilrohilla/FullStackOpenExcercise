const userRouter = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

userRouter.get('/', async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
})
userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const user = new User({
        username,
        name,
        passwordHash: passwordHash
    })

    const savedUser = await user.save();
    res.status(201).json(savedUser);
})

module.exports = userRouter;