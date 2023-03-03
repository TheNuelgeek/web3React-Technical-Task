import React from "react";
import { Link } from "react-router-dom";

function ThirdPageBtn(){
    return(
        <Link to={'/uploadPage'}>
            <button className="third--btn"> Go to Third Page</button>
        </Link>
    )
}

export default ThirdPageBtn;