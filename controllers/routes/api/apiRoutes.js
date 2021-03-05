const router = require('express').Router();
const bcrypt = require('bcrypt');
const checkAuth = require('../../../utils/auth');
const { Comments, Posts, Userlog, Users } = require('../../../models');


router.post('/login', async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { user_name: req.body.user_name },
        });
        if (!user) {
            res.status(200).json({ message: 'Login failed!' });
            return;
        }
        const passVali = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!passVali) {
            res.status(200).json({ message: 'Login failed!' });
            return;
        }
        await Users.update({
            last_login: Date.now()
        }, {
            where: {
                id: user.id
            }
        });
        const userLog = await Userlog.create({
            user_id: user.id,
            login_date: Date.now()
        });
        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.logged_in = true;
            req.session.log_id = userLog.id;
            res.status(200).json({ message: 'Login Successful!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/signup', async (req, res) => {
    try {
        const newUser = req.body;
        const userCheck = await Users.findOne({
            where: {
                user_name: newUser.user_name
            }
        });
        if (userCheck === null) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
            const createdUser = await Users.create(newUser);
            const userLog = await Userlog.create({
                user_id: createdUser.id,
                login_date: Date.now()
            });
            req.session.save(() => {
                req.session.user_id = createdUser.id;
                req.session.logged_in = true;
                req.session.log_id = userLog.id;
                res.status(200).json({ message: 'Login Successful!' });
            });
        } else {
            res.status(200).json({ message: 'Username taken' });
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/post', checkAuth, async (req, res) => {
    try {
        const newPost = req.body;
        newPost.user_id = req.session.user_id;
        newPost.date = Date.now();
        const createdPost = await Posts.create(newPost);
        if (createdPost) {
            res.status(200).json(createdPost);
        } else {
            res.status(400)
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('*', (req, res) => {
    res.status(500);
});

module.exports = router;