const sequelize = require('../config/connection');
const { Comments, Posts, Userlog, Users } = require('../models');

const commentsData = require('./commentsData.json');
const postsData = require('./postsData.json');
const userlogData = require('./userlogData.json');
const usersData = require('./usersData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Users.bulkCreate(usersData, {
        individualHooks: true,
        returning: true,
    });

    await Posts.bulkCreate(postsData, {
        individualHooks: true,
        returning: true,
    });

    await Comments.bulkCreate(commentsData, {
        individualHooks: true,
        returning: true,
    });

    await Userlog.bulkCreate(userlogData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();