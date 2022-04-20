import React, { useEffect } from "react";
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
import SubPaper from "./adminPanel/Subjectwise/pages/SubPaper";

import SetQuestionsubjectwise from "./adminPanel/Subjectwise/components/SetQuestionsubjectwise";
import QuestionContentsubjectwise from "./adminPanel/Subjectwise/pages/QuestionContentsubjectwise";

import PublicRoute from "./adminPanel/PublicRoute";
import PrivateRoute from "./adminPanel/PrivateRoute";
import SignIn from "./adminPanel/SignIn";
import { ProfileProvider } from "./adminPanel/profile.context";
import firebase from "firebase";

// window.addEventListener("beforeunload", (ev) => {
//   const db = firebase.firestore();
//   db.collection("User")
//     .doc(firebase.auth().currentUser.uid)
//     .update({ admin: false })
//     .then((snap) => {
//       console.log("removed admin");
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// });

export function RoutingWrapper(props) {
  // useEffect(()=>{
  //   return ()=>{
  //     const db = firebase.firestore();
  //         db.collection("User")
  //           .doc(firebase.auth().currentUser.uid)
  //           .update({admin:false})
  //           .then((snap) => {
  //             console.log("removed admin");
  //           })
  //           .catch((error) => {
  //             console.log(error.message);
  //           });
  //   }
  // },[])
  return props.isCheckingAuth ? (
    <Loading />
  ) : (
    <ProfileProvider>
      <Switch>
        <PublicRoute path="/signin">
          <SignIn />
        </PublicRoute>
        <PrivateRoute path="/AddPaper">
          <AddPaper />
        </PrivateRoute>
        <PrivateRoute path="/Paper">
          <Paper />
        </PrivateRoute>
        {/* link for mode test admin pane */}
        <PrivateRoute exact path="/admin/:type">
          <MockTestAdmin />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/:type/main">
          <MockTestAdminMain />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/:type/main/mains" exact>
          <Mains />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/:type/main/advance" exact>
          <Advance />
        </PrivateRoute>
        <PrivateRoute exact path="/admin/:type/main/mains/:number" exact>
          <MainsPaper />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/:type/main/:papertype/selectsyllabus/:number"
          exact
        >
          <SelectSyllabus />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/:type/main/mains/syllabussummary/:number"
          exact
        >
          <Syllabussummary />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/:type/main/advance/section/:number"
          exact
        >
          <AdvancePattern />
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/admin/:type/main/advance/syllabussummary/:number"
          exact
        >
          <Syllabussummaryadvance />
        </PrivateRoute>
        {/* // */}
        {/* //new code for prevousyearsubjectwise*/}
        <PrivateRoute
          path="/PreviousYearSubjectwise"
          exact
          component={PreviousYrSubPaper}
        />
        <PrivateRoute
          path="/PreviousYearSubjectwise/setQuestion"
          exact
          component={SetQuestion}
        />
        <PrivateRoute
          path="/PreviousYearSubjectwise/:subject"
          exact
          component={QuestionContent}
        />
        <PrivateRoute
          path="/edit/:Class/:Chapter/:Subject/:QuestionNo/:Id"
          exact
          component={SetQuestion}
        />
        {/* // */}
        {/* //new code for subjectwise*/}
        <PrivateRoute path="/Subjectwise" exact component={SubPaper} />
        <PrivateRoute
          path="/Subjectwise/setQuestionsubjectwise"
          exact
          component={SetQuestionsubjectwise}
        />
        <PrivateRoute
          path="/Subjectwise/:subject"
          exact
          component={QuestionContentsubjectwise}
        />
        <PrivateRoute
          path="/editsubjectwise/:Class/:Chapter/:Subject/:QuestionNo/:Id"
          exact
          component={SetQuestionsubjectwise}
        />
        {/* // */}

        {/* <Route exact path="/">
        <ComingSoon />
      </Route> */}
        {/* mjki@123U */}
        <Route exact path="/">
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
    </ProfileProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    isCheckingAuth: state.AuthReducer.isChecking,
  };
};

export default connect(mapStateToProps, null)(RoutingWrapper);
