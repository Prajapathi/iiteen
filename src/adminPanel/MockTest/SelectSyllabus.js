import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Button,
  TextField,
} from "@material-ui/core";
import React, { useEffect } from "react";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import physics from "./data/physics";
import chemistry from "./data/chemistry";
import maths from "./data/maths";
import { useTheme } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import firebase from "firebase";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const SelectSyllabus = (props) => {
  const theme = useTheme();
  const [phy, setPhy] = React.useState([]);
  const [che, setChe] = React.useState([]);
  const [math, setMath] = React.useState([]);
  const [syllabustype, setSyllabustype] = React.useState("");
  const [date, setDate] = React.useState("2022-03-25");
  const [shift, setShift] = React.useState("shift1");
  const params = useParams();
  const [mainpapertype, setMainpapertype] = React.useState("");
  const { type } = useParams();

  console.log(props)

  var paperindex = props.location?props.location.state
    ? props.location.state.paperindex
    : null:null;

  useEffect(() => {
    if (type == "mocktest") {
      setMainpapertype("mock");
    } else setMainpapertype("aits");
  }, []);

  useEffect(() => {
    console.log(params);
    localStorage.removeItem("section");
    setSyllabustype(localStorage.getItem("syllabustype"));
    // setPhy(localStorage.getItem("phy"))
    // setChe(localStorage.getItem("che"))
    // setMath(localStorage.getItem("math"))
  }, []);

  useEffect(() => {
    localStorage.setItem("syllabustype", syllabustype);
    // localStorage.setItem("phy", phy);
    // localStorage.setItem("che", che);
    // localStorage.setItem("math", math);
  }, [syllabustype]);

  const handleChange = (value, sub) => {
    // const {
    //   target: { value },
    // } = event;
    if (sub == "phy") {
      setPhy(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else if (sub == "che") {
      setChe(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    } else if (sub == "math") {
      setMath(
        // On autofill we get a stringified value.
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  const savetodatabase = (syllabustype = "partsyllabus") => {
    const db = firebase.firestore();
    db.collection(mainpapertype.toUpperCase())
      .doc(`${params.papertype == "mains" ? "MAINS" : "ADVANCE"}`)
      .collection("PAPER")
      .doc(`PAPER${Number(params.number) + 1}`)
      .update({
        syllabustype: syllabustype,
        phy: phy,
        che: che,
        math: math,
        date2: date,
        shift: shift,
        date:shift=="shift1"?new Date(date+"T09:00:00+05:30"):new Date(date+"T13:00:00+05:30")
      })
      .then(() => {
        console.log("saved");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "900px",
      }}
    >
      <h1>Select Syllabus</h1>
      {mainpapertype == "aits" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "baseline",
            width: "500px",
            marginBottom: "60px",
          }}
        >
          <h6 style={{ marginRight: "40px" }}>Select date and time</h6>

          <TextField
            id="datetime-local"
            label="Date and time"
            type="date"
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "150px", marginRight: "18px" }}
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              console.log(e.target.value);
            }}
          />
          <TextField
            id="standard-number"
            select
            label="slot"
            value={shift}
            style={{ width: "130px" }}
            onChange={(event) => {
              setShift(event.target.value);
            }}
          >
            <MenuItem value={"shift1"}>shift 1(9-12)</MenuItem>
            <MenuItem value={"shift2"}>shift 2(1-4)</MenuItem>
          </TextField>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          textAlign: "center",
          height: "500px",
          width: "1500px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "1200px",
            marginBottom: "100px",
          }}
        >
          <Button
            className={styl.syllabusbutton}
            component={Link}
            to={{
              pathname: `/admin/${mainpapertype}test/main/${
                params.papertype == "mains"
                  ? "mains/syllabussummary"
                  : "advance/section"
              }/${params.number}`,
              state:{
                paperindex:paperindex
              }
            }}
            onClick={() => {
              setSyllabustype("fullsyllabus");
              savetodatabase("fullsyllabus");
            }}
          >
            full syllabus
          </Button>
          <Button
            className={styl.syllabusbutton}
            component={Link}
            to={{
              pathname: `/admin/${mainpapertype}test/main/${
                params.papertype == "mains"
                  ? "mains/syllabussummary"
                  : "advance/section"
              }/${params.number}`,
              state:{
                paperindex:paperindex
              }
            }}
            onClick={() => {
              setSyllabustype("class 11");
              savetodatabase("class 11");
            }}
          >
            class 11
          </Button>
          <Button
            className={styl.syllabusbutton}
            component={Link}
            to={{
              pathname: `/admin/${mainpapertype}test/main/${
                params.papertype == "mains"
                  ? "mains/syllabussummary"
                  : "advance/section"
              }/${params.number}`,
              state:{
                paperindex:paperindex
              }
            }}
            onClick={() => {
              setSyllabustype("class 12");
              savetodatabase("class 12");
            }}
          >
            class 12
          </Button>
          <Button
            className={styl.syllabusbutton}
            onClick={() => setSyllabustype("partsyllabus")}
          >
            Part Syllabus
          </Button>
        </div>
        {syllabustype == "partsyllabus" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                width: "1200px",
                marginBottom: "100px",
              }}
            >
              <h3 className={styl.syllabush3tag}>Syllabus</h3>
              <FormControl sx={{ m: 1, width: 300 }} style={{ width: "200px" }}>
                <InputLabel
                  id="demo-multiple-chip-label"
                  style={{ paddingLeft: "20px" }}
                >
                  Physics
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={phy}
                  onChange={(e) => handleChange(e.target.value, "phy")}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {physics.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, phy, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }} style={{ width: "200px" }}>
                <InputLabel
                  id="demo-multiple-chip-label"
                  style={{ paddingLeft: "20px" }}
                >
                  chemistry
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={che}
                  onChange={(e) => handleChange(e.target.value, "che")}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {chemistry.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, che, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }} style={{ width: "200px" }}>
                <InputLabel
                  id="demo-multiple-chip-label"
                  style={{ paddingLeft: "20px" }}
                >
                  Maths
                </InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={math}
                  onChange={(e) => handleChange(e.target.value, "math")}
                  input={
                    <OutlinedInput id="select-multiple-chip" label="Chip" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {maths.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, math, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Button
              component={Link}
              to={{
                pathname: `/admin/${mainpapertype}test/main/${
                  params.papertype == "mains"
                    ? "mains/syllabussummary"
                    : "advance/section"
                }/${params.number}`,
                state:{
                  paperindex:paperindex
                }
              }}
              onClick={() => {
                savetodatabase();
              }}
              style={{ boxShadow: "0 7px 18px rgba(0, 0, 0, 0.192)" }}
            >
              proceed with part syllabus
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSyllabus;
