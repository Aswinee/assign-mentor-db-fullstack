import React from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const API_URL = "https://assign-mentor-database.herokuapp.com/mentors";

class CreateMentor extends React.Component {
  constructor() {
    super();
    this.state = {
      mentors: [],
      name: "",
      studs: [],
      id: null,
    };
  }

  componentDidMount = () => this.getMentors();

  getMentors = async () => {
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ mentors: data });
    } catch (err) {
      console.error(err);
    }
  };

  createMentor = async () => {
    const { name, mentors } = this.state;
    let flag = true;
    //Checking if mentor already exists
    for (let i in mentors) {
      if (mentors[i].name == name) {
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
          studs: [],
          id: this.state.mentors.length + 1,
        }),
      };

      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.props.history.push("/mentors");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else alert("Already mentor exists");
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.createMentor();
  };

  render() {
    return (
      <>
        <div className="page">
          <h3>To add a mentor enter the name: </h3>
          <Form onSubmit={this.handleSubmit}>
            <label> Name : </label>{" "}
            <input
              required
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />{" "}
            <br />
            <br />
            <input type="Submit" />
          </Form>
        </div>
      </>
    );
  }
}

export default withRouter(CreateMentor);
