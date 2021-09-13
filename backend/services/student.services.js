const { ObjectId } = require("mongodb");

const mongo = require("../shared/mongo");

let students = [];

//Services

const service = {
  async displayStudents() {
    students = await mongo.db.collection("student").find().toArray();
    // console.log(students);
    return students;
  },
  displayMentors() {
    return mongo.db.collection("mentors").find().toArray();
  },
  displayMentor(id) {
    return mongo.db.collection("mentors").findOne({ _id: ObjectId(id) });
  },

  //To create STUDENT
  createStudent(newData) {
    return mongo.db.collection("student").insert(newData);
  },
  //To create Mentor
  createMentor(newData) {
    return mongo.db.collection("mentors").insert(newData);
  },

  //Function to assign a student to a mentor
  assignStudentToMentor(id, newData) {
    return mongo.db
      .collection("mentors")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: newData },
        { returnDocument: "after" }
      );
  },

  assignMentorToStudent(id, newData) {
    return mongo.db
      .collection("student")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        { $set: newData },
        { returnDocument: "after" }
      );
  },
};

module.exports = service;
