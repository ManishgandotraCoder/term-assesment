import { useState } from "react";

import RestaurantComponentContainer from "./container";
const RestaurantComponent = () => {
    const [counter, setCounter] = useState(0)
    const [fields, setFields] = useState({
        count: 25, sort: '',  search: ''
    })
    const passFields = (type: string, count: number) => {
        setFields({ ...fields, [type]: count });

    }
      const getCount = (count:number)=>{
        setCounter(count);
        
      }  
    return (<RestaurantComponentContainer counter ={counter}getCount = {getCount} passFields={passFields} search={fields.search} count={fields.count} sort={fields.sort}  />)
}

export default RestaurantComponent