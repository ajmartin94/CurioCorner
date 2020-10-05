const Posts = require("../models").Posts

const renderPost = (req,res) => {
    Posts.findByPk(req.params.id)
    .then(foundPost => {
        res.render('posts/postpage.ejs', {
            post: foundPost
        });
    })
}

module.exports = {
    renderPost
}