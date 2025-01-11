function NextQuestion({dispatch,answer,index,numquestion}) {
if(answer==null) return null;
    

if(index< numquestion-1){
    return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQUestion'})}>
            Next
        </button>
    )
}else if(index===numquestion-1) {
    return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:'finish'})}>
            Finish
        </button>
    );

} 
}

export default NextQuestion
