/* eslint-disable no-undef */
const router = require("express").Router();
const { models } = require("../db");
const Student = models.Student;

router.get("/", async (req, res, next) => {
  try {
    res.send(await Student.findAll());
  } catch (ex) {
    next(ex);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const newStudent = await Student.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gpa: req.body.gpa,
      schoolId: req.body.schoolId
    });
    newStudent.save();
    res.send(newStudent);
  } catch (ex) {
    next(ex);
  }
});
router.put("/:id", async (req, res, next) => {
  try {
    const updateStudent = await Student.findByPk(req.params.id);
    await updateStudent.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gpa: req.body.gpa,
      schoolId: req.body.schoolId
    });
    updateStudent.save();
    res.send(updateStudent);
  } catch (e) {
    next(e);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    await Student.destroy({ where: { id: req.params.id } });
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
