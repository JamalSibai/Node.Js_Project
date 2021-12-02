const models = require("../models");
const validator = require("fastest-validator");

function save(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1,
  };

  const schema = {
    title: { type: "string", Optional: false, max: "100" },
    content: { type: "string", Optional: false, max: "100" },
    categoryId: { type: "number", Optional: false },
  };

  const v = new validator();
  const validationresponse = v.validate(post, schema);

  if (validationresponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationresponse,
    });
  }

  models.Post.create(post)
    .then((result) => {
      res.status(201).json({
        message: "post created successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

function show(req, res) {
  const id = req.params.id;

  const schema = {
    id: { type: "number", Optional: false },
  };

  const v = new validator();
  const validationresponse = v.validate(id, schema);

  if (validationresponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationresponse,
    });
  }

  models.Post.findByPk(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}
function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}
function index(req, res) {
  models.Post.findAll()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
}

function update(req, res) {
  const id = req.params.id;
  const update = {
    id: id,
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 1,
  };

  const schema = {
    id: { type: "number", Optional: false },
    title: { type: "string", Optional: true, max: "100" },
    content: { type: "string", Optional: true, max: "100" },
    categoryId: { type: "number", Optional: true },
  };

  const v = new validator();
  const validationresponse = v.validate(update, schema);

  if (validationresponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationresponse,
    });
  }

  models.Post.update(update, { where: { id: id } })
    .then((result) => {
      res.status(201).json({
        message: "post updated successfully",
        post: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}
function destroy(req, res) {
  const id = parseInt(req.params.id);
  const destroy = {
    id: id,
  };

  const schema = {
    id: { type: "number", Optional: false },
  };

  const v = new validator();
  const validationresponse = v.validate(destroy, schema);

  if (validationresponse !== true) {
    return res.status(400).json({
      message: "validation failed",
      error: validationresponse,
    });
  }

  models.Post.destroy({ where: { id: id } })
    .then((result) => {
      res.status(201).json({
        message: "post destroyed successfully",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        error: error,
      });
    });
}

module.exports = {
  save: save,
  show: show,
  index: index,
  update: update,
  destroy: destroy,
};
