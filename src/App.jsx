import Header from './Header';
import Mainn from './Mainn';
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
    default:
      throw new Error("Error");
  }
}
function App(){
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "displayData", payload: data }))
      .catch((err) => console.error("Error"));
  }, []);
  return(
    <div className='app'>
<Header/>
<Mainn/>
    </div>
  )
}

export default App;
