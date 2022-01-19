import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React from "react";
import styl from "../PreviousYearSubjectwise/components/css/QuePaper.module.css";
import CommentIcon from "@mui/icons-material/Comment";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import physics from "./data/physics";
import chemistry from "./data/chemistry";
import maths from "./data/maths";

const SelectSyllabus = () => {
  const [checked, setChecked] = React.useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
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
          }}
        >
          <h3 className={styl.syllabush3tag}>selectsyllabus</h3>
          <button className={styl.syllabusbutton}>full syllabus</button>
          <button className={styl.syllabusbutton}>class 11</button>
          <button className={styl.syllabusbutton}>class 12</button>
          <button className={styl.syllabusbutton}>part syllabus</button>
        </div>
        <div
        style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <h3 className={styl.syllabush3tag}>syllabus</h3>
          {/* <TextField
            select
            label="Chapter Name"
            style={{
              width: "100px",
            }}
          >
            {physics.map((e, index) => {
              return (
                <MenuItem value={e} key={index} style={{
                    width: "100px",height:"100px"
                  }}>
                  {e}
                </MenuItem>
              );
            })}
          </TextField>
          <List
            sx={{ width: "100px", maxWidth: 60, bgcolor: "background.paper" }}
          >
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-label-${value}`;

              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments"> */}

                      {/* <CommentIcon /> */}
                    {/* </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(value)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${value + 1}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List> */}
        </div>
        <div>
          <h3 className={styl.syllabush3tag}>chapters selected</h3>
        </div>
      </div>
    </div>
  );
};

export default SelectSyllabus;
