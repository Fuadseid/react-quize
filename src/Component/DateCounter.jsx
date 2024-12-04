import { useReducer } from "react";

const initialstate = {count:0 ,step:1}

function reducer(state,action){

switch(action.type ) {
case 'inc':
  return {...state,count:state.count+state.step}
case 'dec':
  return {...state,count:state.count-state.step}
case 'setCount' :
  return {...state,count:action.payload} 
case 'setStep':
return{...state,step:action.payload}
case 'reset':
  return initialstate;
  default:
    return new Error("Unknowen action")
}
}




function DateCounter() {
/*   const [count, setCount] = useState(0);*/


  const [state, dispach] = useReducer(reducer,initialstate);
  const {count,step} = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
   date.setDate(date.getDate() + count);
 

  const dec = function () {
    // setCount((count) => count - 1);
/*     setCount((count) => count - step);
 */  
dispach({type:'dec'});

};

  const inc = function () {
    // setCount((count) => count + 1);
/*     setCount((count) => count + step);
 */  

dispach({type:'inc'});
};

  const defineCount = function (e) {
/*     setCount(Number(e.target.value));
 */  
dispach({type:'setCount', payload:Number(e.target.value)})


};

  const defineStep = function (e) {
/*     setStep(Number(e.target.value));

 */  
dispach({type:'setStep',payload: Number(e.target.value)})

};

  const reset = function () {
/*     setCount(0);
    setStep(1); */
    dispach({type:'reset'})
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
