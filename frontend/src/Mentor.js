import { withRouter } from "react-router-dom";
import React from "react";
import axios from "axios";

import { Table, Button } from "react-bootstrap";

const API_URL = "https://assign-mentor-database.herokuapp.com/mentor";
const API_URL1 = "https://assign-mentor-database.herokuapp.com/students";
const API_URL2 = "https://assign-mentor-database.herokuapp.com/student";

class Mentor extends React.Component {
  constructor() {
    super();
    this.state = {
      mentor: [],
      mentorStuds: [],
      students: [],
    };
  }

  componentDidMount = () => {
    this.getMentor();
    this.getStudents();
  };
  getMentor = async () => {
    // API Call to server
    try {
      const id = this.props.match.params.id;
      const { data } = await axios.get(`${API_URL}/${id}`);
      this.setState({ mentor: data, mentorStuds: data.studs });
    } catch (err) {
      console.error(err);
    }
  };
  getStudents = async () => {
    // API Call to server and get all students without mentor
    try {
      const { data } = await axios.get(API_URL1);
      let students = [];
      for (let i in data) {
        if (!data[i].mentor) {
          students.push(data[i]);
        }
      }
      this.setState({ students });
    } catch (err) {
      console.error(err);
    }
  };

  addStudent = (student) => {
    let studs = this.state.mentor.studs;
    studs.push(student.name);

    //Adding selected student to mentor
    var config = {
      method: "put",
      url: `${API_URL}/${this.state.mentor._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        studs,
      }),
    };

    axios(config)
      .then((response) => {
        this.getMentor();
      })
      .catch(function (error) {
        console.log(error);
      });

    //Updating student with mentor name
    var config1 = {
      method: "put",
      url: `${API_URL2}/${student._id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        mentor: this.state.mentor.name,
      }),
    };

    axios(config1)
      .then((response) => {
        this.getMentor();
        this.getStudents();
      })
      .catch(function (error) {
        console.log(error);
      });
    this.getStudents();
  };

  render() {
    return (
      <>
        {" "}
        <h4>Mentor Info</h4>{" "}
        <Table striped bordered hover className="table " responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Students</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.mentor.id}</td>
              <td>{this.state.mentor.name}</td>
              <td>
                <ul style={{ listStyle: "none" }}>
                  {this.state.mentorStuds.map((s) => {
                    return <li>{s}</li>;
                  })}
                </ul>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <br />
        <br />
        <h4>
          List of students without a mentor. Click to add the student to this
          mentor
        </h4>
        {this.state.students.map((s) => {
          return (
            <Button
              className="studentButton"
              onClick={() => {
                this.addStudent(s);
              }}
            >
              {s.name}
            </Button>
          );
        })}
      </>
    );
  }
}
export default withRouter(Mentor);
