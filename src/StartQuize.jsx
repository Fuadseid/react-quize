function StartQuize({numQuestion, dispatch}) {
    return (
        <div className="start">
            <h2>Welcome to react Quize</h2>
            <h3>{numQuestion} questions to test Your React mastery</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"start"})}>Lets&apos;s Start</button>
        </div>
    )
}

export default StartQuize;
