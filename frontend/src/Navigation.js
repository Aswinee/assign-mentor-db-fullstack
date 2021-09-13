import { Navbar, Nav, Container } from "react-bootstrap";
const Navigation = () => {
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="left"
        bg="dark"
        expand="lg"
        variant="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/Home">Home</Nav.Link>
              <Nav.Link href="/students">Students</Nav.Link>
              <Nav.Link href="/mentors">Mentors</Nav.Link>
              <Nav.Link href="/createstudent">Create Student</Nav.Link>
              <Nav.Link href="/creatementor">Create Mentor</Nav.Link>
              {/* <Nav.Link href="/bookroom">Book Room</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
