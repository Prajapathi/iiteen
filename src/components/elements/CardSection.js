/* eslint-disable eqeqeq */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import "../../styles/subjectSection.css";
import "../../styles/subjectCardSection.css";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import SubjectCard from "../screens/Subjectwise/SubjectCard";
import AITSCard from "../screens/AITS/AITSCard";
import PreviousYearCard from "../screens/PreviousYear/PreviousYearCard";
import PreviousYearSubjectCard from "../screens/PreviousYear/PreviousYearSubjectCard";
import { phy11, chem11, maths11 } from "../../assets/data/11th";
import { phy12, chem12, maths12 } from "../../assets/data/12th";
import Loading from "./Loading";
import Slide from "@material-ui/core/Slide";

export default React.memo(function SubjectCardSection(props) {
  const [chapters, setChapters] = useState([]);
  const [chapterIndex, setChapterIndex] = useState(0);
  const [chapterNumber, setChapterNumber] = useState([]);
  const [disableLeft, setDisableLeft] = useState("gray");
  const [color, setColor] = useState("gray");
  const [vpWidth, setvpWidth] = useState(window.innerWidth);
  const [cardNumbers, setcardNumbers] = useState(1);
  const [stl, setStl] = useState("red");
  const [loading, setLoading] = useState(true);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState("left");

  //set list of chapters
  let initialItems = [];
  if (props.section == null) {
    switch (props.subject) {
      case "physics": {
        initialItems = props.classNumber == "11" ? phy11 : phy12;
        break;
      }
      case "chemistry": {
        initialItems = props.classNumber == "11" ? chem11 : chem12;
        break;
      }
      case "maths": {
        initialItems = props.classNumber == "11" ? maths11 : maths12;
        break;
      }
    }
  } else {
    initialItems = props.paper;
  }

  useEffect(() => {
    //evaluate the number of cards to be displayed at one time
    let cardN;
    if (vpWidth > 1250) {
      cardN = 5;
    } else if (vpWidth > 1000) {
      cardN = 4;
    } else if (vpWidth > 700) {
      cardN = 3;
    } else if (vpWidth > 500) {
      cardN = 2;
    } else cardN = 1;
    setcardNumbers(cardN);

    setLoading(false);

    //set array for card numbers
    let items = [];
    for (let i = 0; i < initialItems.length / cardN; i++) {
      items.push(i + 1);
    }
    setChapterNumber(items);

    //set initial cards list
    let firstFourProducts = initialItems.slice(
      chapterIndex,
      chapterIndex + cardN
    );
    setChapters(firstFourProducts);

    window.addEventListener("resize", () => setvpWidth(window.innerWidth));
  }, []);

  //Change cards to be shown when chapterIndex is changed by navigation
  useEffect(() => {
    setChapters(initialItems.slice(chapterIndex, chapterIndex + cardNumbers));
  }, [chapterIndex]);

  //listen for screen width change
  useEffect(() => {
    if (vpWidth > 1300) {
      setcardNumbers(5);
    } else if (vpWidth > 1180) {
      setcardNumbers(4);
    } else if (vpWidth > 890) {
      setcardNumbers(3);
    } else if (vpWidth > 600) {
      setcardNumbers(2);
    } else setcardNumbers(1);
    // console.log(cardNumbers);
  }, [vpWidth]);

  //change number list when number of cards is changed
  useEffect(() => {
    setChapters(initialItems.slice(chapterIndex, chapterIndex + cardNumbers));
    let items = [];
    for (let i = 0; i < initialItems.length / cardNumbers; i++) {
      items.push(i + 1);
    }

    setChapterNumber(items);
  }, [cardNumbers]);

  //Show chapters based on chapter
  useEffect(() => {
    if (props.search == null || props.search === "" || !props.search.trim()) {
      setChapters(initialItems.slice(chapterIndex, chapterIndex + cardNumbers));
      return;
    }
    setChapters(
      initialItems.filter((data) => {
        let s = props.search.trim();
        if (props.search === null || props.search === "") return data;
        else if (data.toLowerCase().startsWith(s.toLowerCase())) {
          return data;
        }
      })
    );
  }, [props.search]);

  const nextProduct = () => {
    setSlideDirection("right");
    setSlideIn(false);

    setTimeout(() => {
      setDisableLeft("black");
      const lastchapterIndex = initialItems.length - 1;
      const resetChapterIndex =
        chapterIndex + cardNumbers - 1 >= lastchapterIndex;
      const index = resetChapterIndex ? 0 : chapterIndex + cardNumbers;
      setChapterIndex(index);
      setStl("blue");
      setSlideDirection("left");
      setSlideIn(true);
    }, 300);
  };

  const prevProduct = (e) => {
    if (chapterIndex === 0) {
      setDisableLeft("gray");
      return;
    }
    setSlideDirection("left");
    setSlideIn(false);
    setTimeout(() => {
      setDisableLeft("black");
      const index = chapterIndex - cardNumbers;
      setChapterIndex(index);
      if (index === 0) {
        setDisableLeft("gray");
      }
      setSlideDirection("right");
      setSlideIn(true);
    }, 300);
  };

  const refreshChapters = (number) => {
    console.log("number", number);
    if (chapterIndex === 0) {
      setDisableLeft("gray");
    }
    if((chapterIndex/cardNumbers+1)===number){
      return;
    }else if((chapterIndex/cardNumbers+1)<number){
      setSlideDirection("right");
      setSlideIn(false);
      setTimeout(() => {
        setDisableLeft("black");
        setChapterIndex(cardNumbers*(number-1));
        setStl("blue");
        setSlideDirection("left");
        setSlideIn(true);
      }, 300);
    }else{
      setSlideDirection("left");
      setSlideIn(false);
      setTimeout(() => {
        setDisableLeft("black");
        setChapterIndex(cardNumbers*(number-1));
        if (cardNumbers*(number-1) === 0) {
          setDisableLeft("gray");
        }
        setSlideDirection("right");
        setSlideIn(true);
      }, 300);
    }
  };

  return loading == true ? (
    <Loading />
  ) : (
    <div>
      <div className="sub-cards">
        {console.log(chapters)}
        {console.log(initialItems)}
        {chapters.length === 0 ? (
          <div className="no-results">No Results found</div>
        ) : (
          chapters.map((chapter, index) =>
            props.section == "AITS" ? (
              <AITSCard />
            ) : props.section == "PreviousYear" ? (
              <Slide in={slideIn} direction={slideDirection}>
                <div>
                  <PreviousYearCard
                    isAttempted={props.checkAttempted(chapter.name)}
                    setLoading={props.setLoading}
                    type={props.type}
                    paper={chapter}
                  />
                </div>
              </Slide>
            ) : props.sec == "PreviousYearSectionwise" ? (
              <Slide in={slideIn} direction={slideDirection}>
                <div>
                  <PreviousYearSubjectCard
                    // number={chapterIndex + index + 1}
                    number={initialItems.indexOf(chapters[index])+1}
                    classNumber={props.classNumber}
                    name={chapters[index]}
                    subject={props.subject}
                    loadingStart={props.loadingStart}
                  />
                </div>
              </Slide>
            ) : (
              <Slide in={slideIn} direction={slideDirection}>
                <div>
                  <SubjectCard
                    // number={chapterIndex + index + 1}
                    number={initialItems.indexOf(chapters[index])+1}
                    classNumber={props.classNumber}
                    name={chapters[index]}
                    subject={props.subject}
                    loadingStart={props.loadingStart}
                  />
                </div>
              </Slide>
            )
          )
        )}
      </div>
      {chapters.length !== 0 ? (
        <div style={{ display: "flex", margin: "20px 0" }}>
          <ArrowLeftIcon
            type="button"
            style={{
              fontSize: "46px",
              margin: "0px 0 0px auto",
              color: disableLeft,
            }}
            className="arrow"
            onClick={prevProduct}
          />

          {/* pagination for cards */}
          <div style={{ margin: "auto 0", display: "flex" }}>
            {cardNumbers != 1
              ? chapterNumber.map((number) => (
                  <div
                    id="touchnum"
                    style={{
                      margin: "4px",
                      color:
                        number == (chapterIndex + cardNumbers) / cardNumbers
                          ? "#448698"
                          : "rgba(0,0,0,0.8)",
                    }}
                    onClick={() => {
                      refreshChapters(number);
                        console.log("number", number);
                      
                    }}
                  >
                    {number}
                  </div>
                ))
              : null}
          </div>

          <ArrowRightIcon
            type="button"
            style={{ fontSize: "46px", margin: "0 auto 0px 0" }}
            className="arrow"
            onClick={nextProduct}
          />
        </div>
      ) : null}
    </div>
  );
});
