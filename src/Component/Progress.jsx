function Progress({answer,maxtTottalPoint,numQuestion,index,points}) {
    return (
        <header className="progress">
           <progress max={numQuestion} value={index + Number(answer!==null)}/>
            <p>
            Question <strong> {index}</strong>/{numQuestion}
            </p>
            <p>
                <strong>{points}</strong>/{maxtTottalPoint} Points
            </p>
        </header>
    )
}

export default Progress
