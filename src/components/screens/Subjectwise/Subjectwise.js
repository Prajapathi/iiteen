import React,{useEffect} from "react";
import "../../../styles/subjectwise.css";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Loading from "../../elements/Loading";
import SubjectSection from "./SubjectSection";
import { useHistory } from "react-router-dom";

export default function Subjectwise() {
  const [open, setOpen] = React.useState(true);
  const [classNumber, setClassNumber] = React.useState("11");
  const [loading, setLoading] = React.useState(false);
  let history = useHistory();
  window.onpopstate = function (e) {
    if (!open || localStorage.getItem("dialog")===null) {
      setOpen(true);
      history.push("/Subjectwise");
    }
    localStorage.removeItem("dialog");
  };

  useEffect(()=>{
    if(localStorage.getItem("dialog")!==null){
      setOpen(localStorage.getItem("dialog"));
    }else{
      localStorage.setItem("dialog",true);
    }
  },[])

  const selectClass = (n) => {
    setClassNumber(n);
    localStorage.setItem("dialog",false);
    setOpen(false);
  };
  document.title = "Subjectwise | IITEENS";
  return (
    <div className="screen" id="subjectwise">
      {loading ? (
        <Loading />
      ) : open===true ? (
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          id="class-select-dialog"
        >
          <DialogTitle id="alert-dialog-title">
            {"Please select your class"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Button onClick={() => selectClass("11")}>Class 11</Button>
              <Button onClick={() => selectClass("12")}>Class 12</Button>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      ) : (
        <>
          <h1
            style={{
              textAlign: "center",
              fontWeight: "800",
              letterSpacing: "5px",
              wordSpacing: "15px",
              color: "#3F7B94",
              padding: "15px 0px",
            }}
          >
            SUBJECT-WISE QUESTIONS
          </h1>
          <div id="phy">
            <SubjectSection
              subject="physics"
              classNumber={classNumber}
              loadingStart={setLoading}
            />
          </div>
          <div id="chem">
            <SubjectSection
              subject="chemistry"
              classNumber={classNumber}
              loadingStart={setLoading}
            />
          </div>
          <div id="mat">
            <SubjectSection
              subject="maths"
              classNumber={classNumber}
              loadingStart={setLoading}
            />
          </div>
        </>
      )}
    </div>
  );
}
