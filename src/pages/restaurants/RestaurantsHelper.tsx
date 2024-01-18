import { useState } from "react";

import RestaurantComponentContainer from "./RestaurantsContainer";
const RestaurantComponent = () => {
    const [counter, setCounter] = useState(0)
    const [fields, setFields] = useState({
        count: 50, sort: '',  search: ''
    })
    /*
    Change Fields (Filters) values
    */
    const passFields = (type: string, count: number) => {
        setFields({ ...fields, [type]: count });

    }
      const getCount = (count:number)=>{
        setCounter(count);
      }  
    return (<RestaurantComponentContainer counter ={counter}getCount = {getCount} passFields={passFields} search={fields.search} count={fields.count} sort={fields.sort}  />)
}

export default RestaurantComponent