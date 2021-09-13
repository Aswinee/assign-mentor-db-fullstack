import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const API_URL = "https://assign-mentor-database.herokuapp.com/students";

class CreateStudent extends React.Component {
  constructor() {
    super();
    this.state = {
      students: [],
      name: "",
      mentor: "",
      id: null,
    };
  }

  componentDidMount = () => this.getStudents();

  getStudents = async () => {
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ students: data });
    } catch (err) {
      console.error(err);
    }
  };

  createStudent = async () => {
    const { name, students } = this.state;
    let flag = true;
    //Checking if student already exists
    for (let i in students) {
      if (students[i].name == name) {
        flag = false;
      }
    }
    if (flag) {
      var config = {
        method: "post",
        url: API_URL,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          name: name,
          mentor: "",
          id: this.state.students.length + 1,
        }),
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.props.history.push("/students");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("Already student exists");
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.createStudent();
  };

  render() {
    return (
      <>
        <div className="page">
          <h3>To add a student enter the name: </h3>
          <Form onSubmit={this.handleSubmit}>
            <label> Name : </label>{" "}
            <input
              required
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <br />
            <br />
            <input type="Submit" />
          </Form>{" "}
        </div>
      </>
    );
  }
}

export default withRouter(CreateStudent);
