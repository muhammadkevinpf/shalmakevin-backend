const CommentsModel = require('../../models/comments');

module.exports = {
  addComments: (name, message, callback) => {
    const newComment = new CommentsModel({
      name,
      message,
    });

    newComment.save((error) => {
      if (error) {
        callback({ error: true });
      } else {
        callback({ success: true });
      }
    });
  },
  getComments: (page, callback) => {
    const options = {
      page: parseInt(page),
      limit: 5,
      sort: { createdDate: -1 },
    };

    CommentsModel.paginate({}, options, (err, result) => {
      if (err) {
        callback({ error: true });
      } else {
        callback({ success: true, res: result });
      }
    });
  },
};
