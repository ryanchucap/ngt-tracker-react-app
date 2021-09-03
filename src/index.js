import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import "./index.css";
import configureStore from "./redux/configureStore";

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <ReduxProvider store={store}>
            <Router>
                <App />
            </Router>
        </ReduxProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

export { store };
