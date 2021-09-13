import React from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

const API_URL = "https://assign-mentor-database.herokuapp.com/students";
const API_URL1 = "https://assign-mentor-database.herokuapp.com/mentors";
const API_URL2 = "https://assign-mentor-database.herokuapp.com/student";
const API_URL3 = "https://assign-mentor-database.herokuapp.com/mentor";

class Students extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
      visibility: [],
      view: false,
      mentors: [],
      error: "",
    };
  }

  componentDidMount = () => {
    this.getStudents();
    this.getMentors();
  };

  getStudents = async () => {
    // API Call to server and get all students
    try {
      const { data } = await axios.get(API_URL);
      let visibility = new Array(data.length).fill(0);
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  };
  getMentors = async () => {
    // API Call to server and get all mentors
    try {
      const { data } = await axios.get(API_URL1);
      this.setState({ mentors: data });
    } catch (err) {
      console.error(err);
    }
  };

  viewMentors = (studentId) => {
    let visibility = { ...this.state.visibility };
    visibility[studentId] = !visibility[studentId];
    this.setState({ visibility });
  };

  assignMentor = (student, mentor) => {
    let oldMentorId, newStuds, oldMentor;
    let oldMentorName = student.mentor;
    let mentors = this.state.mentors;
    if (student.mentor == mentor.name) {
      alert("Student already has this mentor only");
    } else {
      //Updating the selected student with mentor name
      var config = {
        method: "put",
        url: `${API_URL2}/${student._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          mentor: mentor.name,
        }),
      };

      axios(config)
        .then((response) => {
          if (!this.state.error) {
            this.viewMentors(student.id);
            this.getStudents();
          } else alert(this.state.error);
        })
        .catch(function (error) {
          console.log(error);
        });

      //Adding selected student to the selected mentor
      let studs = mentor.studs;
      studs.push(student.name);

      var config1 = {
        method: "put",
        url: `${API_URL3}/${mentor._id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          studs,
        }),
      };

      axios(config1)
        .then((response) => {
          console.log(JSON.stringify(response.data.value));
          if (!this.state.error) {
            this.viewMentors(student.id);
            this.getStudents();
          } else alert(response.data.error);
        })
        .catch(function (error) {
          console.log(error);
        });

      //Removing selected student from the students' old mentor
      if (oldMentorName) {
        for (let i in mentors) {
          if (mentors[i].name == oldMentorName) {
            oldMentorId = mentors[i]._id;
            const index = mentors[i].studs.indexOf(student.name);
            if (index > -1) {
              mentors[i].studs.splice(index, 1);
              oldMentor = mentors[i];
            }
          }
        }
        var config2 = {
          method: "put",
          url: `${API_URL3}/${oldMentorId}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: JSON.stringify({
            studs: oldMentor.studs,
          }),
        };

        axios(config2)
          .then((response) => {
            console.log(JSON.stringify(response.data.value));
            if (!this.state.error) {
              this.viewMentors(student.id);
              this.getStudents();
            } else alert(response.data.error);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  viewToggle = () => {
    this.setState({ view: !this.state.view });
  };

  render() {
    return (
      <>
        {" "}
        <h4 style={{ textAlign: "center" }}>Students</h4>{" "}
        <Table striped bordered hover className="table " responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mentor</th>
              <th>Change Mentor</th>
            </tr>
          </thead>
          <tbody>
            {this.state.students.map((s) => {
              return (
                <>
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.mentor ? s.mentor : "-"}</td>

                    <td>
                      <Button
                        onClick={() => {
                          this.viewMentors(s.id);
                        }}
                      >
                        Mentors
                      </Button>
                    </td>
                  </tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <p>
                    {this.state.visibility[s.id] ? (
                      <p>
                        {this.state.mentors.map((m) => {
                          return (
                            <Button
                              className="studentButton"
                              onClick={() => {
                                this.assignMentor(s, m);
                              }}
                            >
                              {m.name}
                            </Button>
                          );
                        })}
                      </p>
                    ) : null}
                  </p>
                </>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default Students;
