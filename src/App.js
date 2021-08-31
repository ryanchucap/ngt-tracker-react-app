import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router";
import { ToastContainer } from "react-toastify";

import AddEmployee from "./components/add-employee/AddEmployee.page";
import Employees from "./components/employees/Employees.page";
import Header from "./components/common/Header";
import Home from "./components/home/Home.page";
import EditEmployee from "./components/edit-employee/EditEmployee.page";
import Footer from "./components/common/Footer";

const App = () => {
    return (
        <Container>
            <Header />
            <Switch>
                <Route path="/employees/add" component={AddEmployee} />
                <Route path="/employees/:id" component={EditEmployee} />
                <Route path="/employees" component={Employees} />
                <Route path="/" component={Home} />
            </Switch>
            <Footer />
            <ToastContainer autoClose={5000} hideProgressBar />
        </Container>
    );
};

export default App;
