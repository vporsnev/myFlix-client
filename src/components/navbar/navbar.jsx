import React from "react";

import { Navbar, Nav } from "react-bootstrap";

import "./navbar.scss";

export function Navigation({ user }) {
	const onLoggedOut = () => {
		localStorage.clear();
		window.open("/", "_self");
	};

	const isAuth = () => {
		if (typeof window == "undefined") {
			return false;
		}
		if (localStorage.getItem("token")) {
			return localStorage.getItem("token");
		} else {
			return false;
		}
	};

	return (
		<Navbar className="main-nav" expand="lg">
			<Navbar.Brand className="mybrand">MyFlix</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="ml-auto">
					{isAuth() && (
						<Nav.Link href="/">
							<h5>Home</h5>
						</Nav.Link>
					)}
					{isAuth() && (
						<Nav.Link to={`/users/${user}`}>
							<h5>{user}</h5>
						</Nav.Link>
					)}

					{isAuth() && (
						<button className="button-55 ml-1" onClick={onLoggedOut}>
							Logout
						</button>
					)}
					{!isAuth() && <Nav.Link to="/">Sign-in</Nav.Link>}
					{!isAuth() && <Nav.Link to="/register">Sign-up</Nav.Link>}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
}
