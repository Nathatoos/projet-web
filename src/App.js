import React, { Component } from 'react';
import "./App.css";
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, ButtonDropdown,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Button, Form, FormGroup, Label, Input, Container, Row, Col, Progress } from 'reactstrap';


class App extends Component {


  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state =
      {
        isOpen: false,
        dropdownOpen: false,
        pourcentage : 78
      };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  recupAPI() {
    let a;
    console.log(a);
    fetch("http://localhost:8000/api/v1/sensors/emissions", { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(JSON.stringify(json));
      });
  }

  render() {
    return (
      <div className="App">
        {this.recupAPI()}

        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">ACCEUIL</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">ENERGIE SOLAIRE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">ENERGIE EOLIENNE</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tara/"> ENERGIE HYDROLIQUE</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Annexe
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>

        <Container>
          <Row>
            <Col xs="3">CONSOMMATION</Col>
          </Row>
          <div className="toot">{this.state.conso_total}</div>
          
          <br></br>
          <br></br>
          <br></br>
          <Row>
          <Col xs="3">PRODUCTION</Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <Row>
          <Col xs="3">DIFFERENCE</Col>
          </Row>
        </Container>

      <Progress  className= "toto" animated color="success" value="65"> {this.state.pourcentage}%</Progress>

      </div>
    );
  }
}

export default App;

