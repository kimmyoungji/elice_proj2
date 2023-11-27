import React from 'react';
import { Nav, Navbar, Container, Image, Offcanvas } from "react-bootstrap";
import logo from "./logo.png"


function Navigation() {
    return (
        <Navbar expand="False" className="bg-body-tertiary mb-3">
            <Container fluid>
              <Navbar.Brand href="/">
                <Image src={logo} alt="logo" height="30" width="200"/>
              </Navbar.Brand>
              <Nav className="d-flex flex-row ms-auto"> 
                  <Nav.Link href="/" className="me-4">서비스 소개</Nav.Link>
                  <Nav.Link href="/community" className="me-4">커뮤니티</Nav.Link>              
                  <Nav.Link href="/habit" className="me-4">나의 습관</Nav.Link>
              </Nav>
              <Navbar.Toggle>
                <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                    alt="profile" roundedCircle height="40" width="40"/>
              </Navbar.Toggle>
              <Navbar.Offcanvas
                    id="offcanvasNavbar-expand-false"
                    aria-labelledby="offcanvasNavbarLabel-expand-false"
                    placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id="offcanvasNavbarLabel-expand-false">
                    <Image src={logo} alt="logo" height="30" width="200"/>
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/userpage">내 정보</Nav.Link>
                    <Nav.Link href="/">로그아웃</Nav.Link>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
        </Navbar>
    )
}

export default Navigation;