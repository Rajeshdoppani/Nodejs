const Express = require('express');
const router = Express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const Post = require('../models/Post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

const log4js = require('log4js');
log4js.configure({
    appenders: { file_log: { type: 'file', filename: 'log_file.log' } },
    categories: { default: { appenders: ['file_log'], level: 'error' } }
});

const logger = log4js.getLogger('file_log');

router.post('/register', async (req, res) => {
    var hashPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.json(savedUser);
        logger.fatal(res);
    }
    catch (err) {
        if (err) {
            return res.status(500).send("There was a problem registering the user.");
        }
        logger.error(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Email is not found');
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign({ id: user._id }, 'webtoken', {
            expiresIn: 86400
        });
        res.status(200).send({ auth: true, token: token });
        logger.fatal(res);
        
    } catch (err) {
        res.json({ msg: err });
        logger.error(err);
    }
});

// router.post('/:id', async (req,res)=>{
//     const order = new Order({
//         product: req.product,
//         price: req.price
//     });
//     const savedOrder = await order.save();
// })



router.get('/', verify, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        res.json(user);
    } catch (err) {
        res.json({ msg: err });
    }
})

module.exports = router;


