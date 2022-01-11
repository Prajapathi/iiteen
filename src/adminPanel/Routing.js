import React from "react";
import { Switch, Route } from "react-router-dom";
import AddPaper from "./AddPaper";
import Paper from "./Paper";
import PreviousYrSubPaper from "./PreviousYearSubjectwise/pages/PreviousYrSubPaper";
import SetQuestion from "./PreviousYearSubjectwise/components/SetQuestion";
import QuestionContent from "./PreviousYearSubjectwise/pages/QuestionContent";
import Questions from "./Questions";
import Question from "./elements/Question";

export default function Routing() {
  return (
    <Switch>
      <Route path="/AddPaper">
        <AddPaper />
      </Route>
      <Route path="/Paper">
        <Paper />
      </Route>
      {/* new code */}
      <Route path="/PreviousYearSubjectwise" exact component={PreviousYrSubPaper} />
      <Route path="/PreviousYearSubjectwise/setQuestion" exact component={SetQuestion} />
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
    </Switch>
  );
}
