const express = require("express");
const {
  list,
  get,
  create,
  update,
  deleteById,
  addComment,
  addLike,
} = require("../usecases/post.usecase");
const { auth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let filter = req.body;
    if (Object.keys(req.body).length === 0 || req.body.value === "") {
      filter = false;
    }
    const posts = await list(filter);
    res.json({
      success: true,
      data: posts,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await get(req.params.id);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const post = await create(req.body);
    res.status(201);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await deleteById(req.params.id, req);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const post = await update(req.params.id, req.body, req);
    res.json({
      success: true,
      data: post,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

// [extra] ruta para añadir comentarios a un post

router.patch("/:id/comments", auth, async (req, res) => {
  try {
    const user = await addComment(req.params.id, req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

// [extra] ruta para reaccionar a un post (likes)

router.patch("/:id/likes", auth, async (req, res) => {
  try {
    const user = await addLike(req.params.id, req.body);
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
