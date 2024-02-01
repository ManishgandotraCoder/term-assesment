import { useState } from "react";

import RestaurantComponentContainer from "./RestaurantsContainer";
const RestaurantComponent = () => {
  const [records_string, setRecordsString] = useState('')
  const [fields, setFields] = useState({
    count: 50, sort: '', search: ''
  })
  /*
  Change Fields (Filters) values
  */
  const passFields = (type: string, count: number) => {
    setFields({ ...fields, [type]: count });

  }

  const getCount = (count: string) => {
    setRecordsString(count);
  }
  return (<RestaurantComponentContainer records_string={records_string} getCount={getCount} passFields={passFields} search={fields.search} count={fields.count} sort={fields.sort} />)
}

export default RestaurantComponent