import React from 'react';

const InputSearch = (prop) =>{
    const{Search, setSearch} = prop;
    const searchKey = (event) => {
        if (event.key === "Enter") {
          console.log(Search);
         prop.searchStuff();
        }
      };
    
    return(
        <input className ="placeholder:italic placeholder:text-slate-400 block
        bg-green w-400 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none
        focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm " 
        placeholder = "Stock Input" type = "text" 
        onChange = {(event) => {setSearch(event.target.value.toUpperCase())}}
        onKeyDown={searchKey}
        />
    )
}

export default InputSearch;