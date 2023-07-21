const createError = require("http-errors");
const Post = require("../models/post.model");
const jwt = require("../lib/jwt.lib");

const list = async (filter) => {
  const posts = await Post.find();
  if (!filter) {
    return posts;
  } else {
    let filteredPosts = [];
    for (index in posts) {
      if (
        posts[index].postAuthor.includes(filter.value) ||
        posts[index].postContent.includes(filter.value) ||
        posts[index].postTitle.includes(filter.value)
      ) {
        filteredPosts.push(posts[index]);
      }
    }
    return filteredPosts;
  }
};

const get = async (id) => {
  const post = await Post.findById(id);
  if (!post) throw createError(404, "Post not found");
  return post;
};

const create = (data) => {
  const post = Post.create(data);
  return post;
};

const deleteById = async (id, request) => {
  const post = await Post.findById(id);
  const authorization = request.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != post.postAuthorId)
    throw createError(403, "No tienes permiso de eliminar a este post");
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost) throw createError(404, "Post not found");
  return deletedPost;
};

const update = async (id, data, request) => {
  const post = await Post.findById(id);
  const authorization = request.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");
  const isVerified = jwt.verify(token);
  if (isVerified.id != post.postAuthorId)
    throw createError(403, "No tienes permiso de editar a este post");
  const updatedPost = await Post.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });
  if (!updatedPost) throw createError(404, "Post not found");
  return updatedPost;
};

// [extra] const add para añadir comentarios a un post
const addComment = async (id, data, request) => {
  const post = await Post.findById(id);
  const updatedData = post.postComments;
  updatedData.push(data);
  const updatedPost = Post.findByIdAndUpdate(
    id,
    { postComments: updatedData },
    {
      returnDocument: "after",
    }
  );
  if (!updatedPost) throw createError(404, "Post not found");
  return updatedPost;
};

// [extra] const add para añadir(? o eliminar) likes a un post
const addLike = async (id, data, request) => {
  const post = await Post.findById(id);
  const likesArray = post.postLikes.likes;
  const validateId = likesArray.findIndex(
    (item) => item.likeAuthorId === data.likeAuthorId
  );
  if (validateId === -1) {
    likesArray.push(data);
  } else {
    likesArray.splice(validateId, 1);
  }
  const updatedCounter = likesArray.length;
  const updatedPost = Post.findByIdAndUpdate(
    id,
    { postLikes: { likeCounter: updatedCounter, likes: likesArray } },
    {
      returnDocument: "after",
    }
  );
  if (!updatedPost) throw createError(404, "Post not found");
  return updatedPost;
};

module.exports = { list, get, create, deleteById, update, addComment, addLike };
