const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postAuthor: {
    type: String,
    require: true,
  },
  postAuthorId: {
    type: String,
  },
  postContent: {
    type: String,
    require: true,
  },
  postDate :{
    type: Date
  },
  postDateDay: {
    type: String,
  },
  postDateMonth: {
    type: String,
  },
  postImageURL: {
    type: String,
    require: true,
  },
  postReadTime: {
    type: Number,
    require: true,
  },
  postRelevance: {
    type: Number,
    require: true,
  },
  postTags: {
    type: Array,
  },
  postTitle: {
    type: String,
    require: true,
  },
  postComments: [{
    commentAuthorId: {type: String},
    commentAuthorImg: {type: String},
    commentAuthorName: {type: String},
    commentDate: {type: String},
    commentText: {type: String},
  }],
  postLikes: {
    likeCounter: {type: Number},
    likes:[{
      likeAuthorId: {type: String},
    }]
  }
});

module.exports = mongoose.model("Posts", postSchema, "Posts");