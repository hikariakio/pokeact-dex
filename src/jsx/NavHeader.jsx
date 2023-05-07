import { Link, useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import React from "react";

function NavLogo() {
  return (
    <div className={"nav-logo"}>
      <Link to="/pokeact-dex">
        <img src={require(`../assets/misc/small_pokeball.png`)} />P &nbsp;
        kéact-DEX
      </Link>
    </div>
  );
}

function NavLink(props) {
  return (
    <div onClick={props.linkFunc} className={"nav-link"}>
      {props.linkName}
    </div>
  );
}

export function NavHeader() {
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate

  const nav_links = [
    {
      name: " PokéQUIZ ",
      func: function () {
        navigate('/pokeact-dex/quiz');
      },
    },
    {
      name: "SurpriseMe! ",
      func: function () {
        const randomItemId = Math.floor(Math.random() * 1010) + 1; // generates a random item ID between 1 and 100
        navigate(`/pokeact-dex/${randomItemId}`);
        // window.location.reload();
      },
    },
    {
      name: "Subscribe",
      func: function () {
        navigate('/pokeact-dex/subscribe');
      },
    },
  ];

  return (
    <Navbar style={{ backgroundColor: "#333" }} variant="dark" expand="sm">
      <Container>
        <NavLogo />
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="ms-auto" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/*<Nav.Link>Home</Nav.Link>*/}
            {/*<Nav.Link>Link</Nav.Link>*/}
            {/*<NavLink linkName={"SurpriseMe!"} />*/}
            {nav_links.map((link, idx) => (
              <NavLink key={idx} linkName={link.name} linkFunc={link.func} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
