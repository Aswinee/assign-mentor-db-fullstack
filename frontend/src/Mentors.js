import React from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

const API_URL = "https://assign-mentor-database.herokuapp.com/mentors";

class Mentors extends React.Component {
  constructor() {
    super();
    this.state = {
      mentors: [],
    };
  }

  componentDidMount = () => this.getMentors();

  getMentors = async () => {
    // API Call to server and get all mentors
    try {
      const { data } = await axios.get(API_URL);
      this.setState({ mentors: data });
    } catch (err) {
      console.error(err);
    }
  };

  selectMentor = (mentorId) => this.props.history.push(`/mentor/${mentorId}`);

  render() {
    return (
      <>
        {" "}
        <h4 style={{ textAlign: "center" }}>Mentors</h4>{" "}
        <Table striped bordered hover className="table " responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Students</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.mentors.map((m) => {
              return (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>
                    <ul style={{ listStyle: "none" }}>
                      {m.studs.map((s) => {
                        return <li>{s}</li>;
                      })}
                    </ul>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        this.selectMentor(m._id);
                      }}
                    >
                      More
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </>
    );
  }
}

export default withRouter(Mentors);
