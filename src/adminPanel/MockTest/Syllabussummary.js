import {
    Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import Paper from "@mui/material/Paper";

const Syllabussummary = () => {
  return (
      <>
      <div style={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        paddingTop:"200px",
        paddingBottom:"200px",
    }}>
      <TableContainer component={Paper} style={{width:"800px"}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                MOCK PAPER PATTERN
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow
              key="physics"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Subjects
              </TableCell>
              <TableCell align="right">Question No.</TableCell>
              <TableCell align="right">
              </TableCell>
            </TableRow>
            <TableRow
              key="physics"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Physics
              </TableCell>
              <TableCell align="right">1-30</TableCell>
              <TableCell align="right">
                1-20: single correct and 21-30: multiple correct
              </TableCell>
            </TableRow>
            <TableRow
              key="physics"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                chemistry
              </TableCell>
              <TableCell align="right">31-60</TableCell>
              <TableCell align="right">
                31-50: single correct and 51-60: multiple correct
              </TableCell>
            </TableRow>
            <TableRow
              key="physics"
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Maths
              </TableCell>
              <TableCell align="right">61-90</TableCell>
              <TableCell align="right">
                61-80: single correct and 81-90: multiple correct
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Button>
        Create MOCK TEST
    </Button>
    </div>
    
      </>
    
  );
};

export default Syllabussummary;
