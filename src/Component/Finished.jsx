function Finished({ highscore , points, maxtTottalPoint ,dispatch}) {
    let percent = (points / maxtTottalPoint)*100;
  /*   if (percent < 50) {

    } */
    
    return (
        <div>
            <p className="result">
                You have got {points} the from {maxtTottalPoint} points
            </p>
            <p className="highscore">
                Your highscore is {highscore} points You answered Percent ({Math.ceil(percent)}%)
            </p>
            <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>
            Start again
        </button>
        </div>
    )
}

export default Finished
