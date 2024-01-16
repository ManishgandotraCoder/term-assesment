import React from 'react';
import './index.css'
const Record = ({ id, data }: any) => {

  return (
    <>
    <div className="background-grid ">
 
      <p className='heading'>
          {data.restaurant}
      </p>
      <span className='rating'>{data.avg_ratings}</span>
      <span className='rating-count'>{data.total_ratings} reviews</span>
      <p className='cuisine'>{data.food_type.split(',').slice(0, 2).map((item: any) => item + ' · ')} <span className="viewmore">View more</span></p>
      <p className='cuisine'>₹ {data.price} for one ( Deliver in {data.delivery_time} min )</p>
      <p className='address'>
        Address : {data.address} , {data.area} , {data.city}
      </p>
    </div>
    </>
  );
};

export default Record;