import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./components/Landing";
import Home from "./components/screens/Home/Home";
import Footer from "./components/Footer";
import LeftMenu from "./components/NavigationLeftMenu/LeftMenu";
import Routing from "./Routing";
import Loading from "./components/elements/Loading";
import AddPaper from "./adminPanel/AddPaper";
import Paper from "./adminPanel/Paper";
import ComingSoon from "./components/screens/ComingSoon/ComingSoon";
import PreviousYrSubPaper from "./adminPanel/PreviousYearSubjectwise/pages/PreviousYrSubPaper";
import SetQuestion from "./adminPanel/PreviousYearSubjectwise/components/SetQuestion";
import QuestionContent from "./adminPanel/PreviousYearSubjectwise/pages/QuestionContent";
import MockTestAdmin from "./adminPanel/MockTest/MockTestAdmin";
import MockTestAdminMain from "./adminPanel/MockTest/MockTestAdminMain";
import Mains from "./adminPanel/MockTest/Mains";
import Advance from "./adminPanel/MockTest/Advance";
import MainsPaper from "./adminPanel/MockTest/MainsPaper";
import SelectSyllabus from "./adminPanel/MockTest/SelectSyllabus";
import Syllabussummary from "./adminPanel/MockTest/Syllabussummary";
import Syllabussummaryadvance from "./adminPanel/MockTest/Syllabussummaryadvance";
import AdvancePattern from "./adminPanel/MockTest/AdvancePattern";

export function RoutingWrapper(props) {
  return props.isCheckingAuth ? (
    <Loading />
  ) : (
    <Switch>
      <Route path="/AddPaper">
        <AddPaper />
      </Route>
      <Route path="/Paper">
        <Paper />
      </Route>
      {/* link for mode test admin pane */}
      <Route exact path="/admin/:type">
        <MockTestAdmin />
      </Route>
      <Route exact path="/admin/:type/main">
        {console.log("going")}
        <MockTestAdminMain />
      </Route>
      <Route exact path="/admin/:type/main/mains" exact>
        <Mains />
      </Route>
      <Route exact path="/admin/:type/main/advance" exact>
        <Advance />
      </Route>
      <Route exact path="/admin/:type/main/mains/:number" exact>
        <MainsPaper />
      </Route>
      <Route exact path="/admin/:type/main/:papertype/selectsyllabus/:number" exact>
        <SelectSyllabus />
      </Route>
      <Route exact path="/admin/:type/main/mains/syllabussummary/:number" exact>
        <Syllabussummary />
      </Route>
      <Route exact path="/admin/:type/main/advance/section/:number" exact>
        <AdvancePattern />
      </Route>
      <Route exact path="/admin/:type/main/advance/syllabussummary/:number" exact>
        <Syllabussummaryadvance />
      </Route>
      {/* // */}
      {/* //new code for prevousyearsubjectwise*/}
      <Route
        path="/PreviousYearSubjectwise"
        exact
        component={PreviousYrSubPaper}
      />
      <Route
        path="/PreviousYearSubjectwise/setQuestion"
        exact
        component={SetQuestion}
      />
      <Route
        path="/PreviousYearSubjectwise/:subject"
        exact
        component={QuestionContent}
      />
      <Route
        path="/edit/:Class/:Chapter/:Subject/:QuestionNo/:Id"
        exact
        component={SetQuestion}
      />
      {/* // */}
      <Route exact path="/">
        <ComingSoon />
      </Route>
      <Route exact path="/mjki@123U">
        {props.isAuthenticated ? (
          <>
            <LeftMenu />
            <Home />
            <Footer />
          </>
        ) : (
          <>
            <LeftMenu />
            <Landing />
            <Footer />
          </>
        )}
      </Route>
      <Route path="/">
        <Routing />
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    isCheckingAuth: state.AuthReducer.isChecking,
  };
};

export default connect(mapStateToProps, null)(RoutingWrapper);
