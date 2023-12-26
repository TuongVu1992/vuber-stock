import React from 'react';

const DeleteButton = (props) =>{

    return(   
        <div className="flex w-max gap-4" style={{ marginLeft: "500px" }}>
        <button className ="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={props.onClick}>
        Delete 
        </button> 
        </div>
    );
}

export default DeleteButton