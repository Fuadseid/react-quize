import Header from "./Header";
import Mainn from "./Mainn";
import Loder from "./Loader";
import Error from "./Error";
import StartQuize from "./startQuize";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import { useReducer } from "react";
import { useEffect } from "react";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "displayData":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "datafailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * 30,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQUestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        ...initialstate, questions: state.questions, status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [
    { questions, status, index, answer, points, highscore, secondRemaining },
    dispatch,
  ] = useReducer(reducer, initialstate);
  const numQuestion = questions.length;
  const maxtTottalPoint = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "displayData", payload: data }))
      .catch((err) => dispatch({ type: "datafailed", err }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Mainn>
        {status == "loading" && <Loder />}
        {status == "error" && <Error />}
        {status == "ready" && (
          <StartQuize numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status == "active" && (
          <>
            {" "}
            <Progress
              answer={answer}
              points={points}
              numQuestion={numQuestion}
              maxtTottalPoint={maxtTottalPoint}
              index={index}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer 
              dispatch = {dispatch}
              secondRemaining = {secondRemaining}
              />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numquestion={numQuestion}
              />
            </Footer>
          </>
        )}
        {status == "finished" && (
          <Finished
            highscore={highscore}
            points={points}
            maxtTottalPoint={maxtTottalPoint}
            dispatch={dispatch}
          />
        )}
      </Mainn>
    </div>
  );
}

export default App;
