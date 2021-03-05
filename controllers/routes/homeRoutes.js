const router = require('express').Router();
const checkAuth = require('../../utils/auth');
const { getPosts, getAllPosts } = require('./api/getPosts')
const { Userlog } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const login = req.session.logged_in;
        const home = true;
        const dashboard = false;
        const posts = await getAllPosts();
        // console.log(posts);
        const mappedPosts = posts.map((post) => post.get({ plain: true}));
        res.render('homepage', { login, home, dashboard, mappedPosts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', checkAuth, async (req, res) => {
    try {
        const login = req.session.logged_in;
        const home = false;
        const dashboard = true;
        const posts = await getPosts(req.session.user_id);
        const mappedPosts = posts.map((post) => post.get({ plain: true}));
        res.render('dashboard', { login, home, dashboard, mappedPosts });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    try {
        const login = req.session.logged_in;
        const home = false;
        const dashboard = false;
        res.render('login', { login, home, dashboard });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    try {
        const login = req.session.logged_in;
        const home = false;
        const dashboard = false;
        res.render('signup', { login, home, dashboard });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/logout', async (req, res) => {
    if (req.session.logged_in) {
        await Userlog.update({
            logout_date: Date.now()
        }, {
            where: {
                id: req.session.log_id,
            },
        });
        req.session.destroy(() => {
            res.redirect('/');
        });
    } else {
        res.redirect('/login');
    }
});

router.get('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;