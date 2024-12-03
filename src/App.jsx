import Header from "./Header";
import Mainn from "./Mainn";
import Loder from "./Loader";
import Error from "./Error";
import StartQuize from "./startQuize";
import { useReducer } from "react";
import { useEffect } from "react";

const initialstate = {
  questions: [],
  status: "loading",
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
        return{
          ...state,
          status:'error',
        }
    default:
      throw new Error("Action unknown");
  }
}
function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialstate);
const numQuestion = questions.length;
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "displayData", payload: data }))
      .catch((err) => dispatch({type:"datafailed"}));
  }, []);
  return (
    <div className="app">
      <Header />
      <Mainn>
        {status=='loading'&&<Loder/>}
        {status=='error'&&<Error/>}
        {status=='ready'&&<StartQuize numQuestion={numQuestion}/>}
      </Mainn>
    </div>
  );
}

export default App;
