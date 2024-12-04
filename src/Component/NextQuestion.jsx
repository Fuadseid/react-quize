function NextQuestion({dispatch,answer}) {
if(answer==null) return null;
    
    return (
        <button className="btn btn-ui" onClick={()=>dispatch({type:'nextQUestion'})}>
            Next
        </button>
    )
}

export default NextQuestion
