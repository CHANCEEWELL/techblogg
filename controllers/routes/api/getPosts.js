const { Comments, Users, Posts } = require('../../../models');

async function getPosts(userId) {
    return posts = await Posts.findAll({
        where: {
            user_id: userId
        },
        order: [
            ['date_modifed', 'DESC'],
        ],
    });
};

async function getAllPosts() {
    return posts = await Posts.findAll({
        include: [
            {
                model: Users,
                attributes: ['user_name']
            },
            {
                model: Comments,
                include: [
                    {
                        model: Users,
                        attributes: ['user_name']
                    }
                ],
                attributes: ['content', 'date'],
                order: [
                    ['date', 'ASC'],
                ],
            },
        ]
        ,
        order: [
            ['date_modifed', 'DESC'],
        ],
    });
};

module.exports = {
    getPosts,
    getAllPosts
};