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
const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
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
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQUestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialstate
  );
  const numQuestion = questions.length;
  const maxtTottalPoint = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "displayData", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
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
          </>
        )}
        <NextQuestion dispatch={dispatch} answer={answer} />
      </Mainn>
    </div>
  );
}

export default App;
