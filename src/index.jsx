import React from "react";
import ReactDOM from "react-dom";
import Container from "react-bootstrap/Container";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import moviesApp from "./reducers/reducers";
import { devToolsEnhancer } from "redux-devtools-extension";
import MainView from "./components/main-view/main-view";

import "./index.scss";
const store = createStore(moviesApp, devToolsEnhancer());
class MyFlixApplication extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Container fluid>
					<MainView />
				</Container>
			</Provider>
		);
	}
}

const container = document.getElementsByClassName("app-container")[0];

ReactDOM.render(React.createElement(MyFlixApplication), container);
