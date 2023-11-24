import React from 'react';
import { Nav, Navbar, Container, Image } from "react-bootstrap";
import logo from "./logo.png"

function Navigation() {
    return (
        <Navbar className="bg-body-tertiary">
            <Container className="navbar">
              <Navbar.Brand href="/">
                <Image src={logo} alt="logo" height="30" width="200"/>
              </Navbar.Brand>
              <Nav>
                <Nav.Link href="/">서비스 소개</Nav.Link>
                <Nav.Link href="/community">커뮤니티</Nav.Link>
                <Nav.Link href="/habits">나의 습관</Nav.Link>
                <Nav.Link href="/userpage" className="ml-5">
                <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="profile" roundedCircle height="40" width="40"/>
                </Nav.Link>
              </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigation;