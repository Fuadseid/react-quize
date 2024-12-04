import Option from "./option"
function Question({question , dispatch, answer}) {
    return (
        <div>
       <Option question={question} dispatch={dispatch} answer={answer}/>
        </div>
    )
}

export default Question
