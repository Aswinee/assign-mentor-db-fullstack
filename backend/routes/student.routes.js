const express = require("express");
const router = express.Router();

const studentService = require("../services/student.services");

// READ
router.get("/students", async (req, res) => {
  const students = await studentService.displayStudents();
  res.send(students);
});
// READ
router.get("/mentors", async (req, res) => {
  const mentors = await studentService.displayMentors();
  res.send(mentors);
});
// READ
router.get("/mentor/:id", async (req, res) => {
  const mentors = await studentService.displayMentor(req.params.id);
  res.send(mentors);
});
//Create student
router.post("/students", (req, res) => {
  const student = studentService.createStudent(req.body);
  res.send(student);
});
//Create mentor
router.post("/mentors", (req, res) => {
  const mentor = studentService.createMentor(req.body);
  res.send(mentor);
});

//1. Change in Mentor collection
router.put("/mentor/:id", async (req, res) => {
  const mentor = await studentService.assignStudentToMentor(
    req.params.id,
    req.body
  );
  res.send(mentor.value);
});

//2. Change in student collection
router.put("/student/:id", async (req, res) => {
  const student = await studentService.assignMentorToStudent(
    req.params.id,
    req.body
  );
  res.send(student);
});

module.exports = router;
