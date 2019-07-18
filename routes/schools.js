const router = require("express").Router();
const { models } = require("../db");
const School = models.School;

router.get("/", async (req, res, next) => {
  try {
    res.send(await School.findAll());
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await School.findByPk(req.params.id));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
