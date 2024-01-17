import React, { useState } from 'react';
import './style.css'
import ModalComponent from 'components/Modal';
const ItemComponent = ({ id, data }: any) => {
  const [modal, setModal] = useState(false)
  function showModalCallback(params:boolean) {
    setModal(params)
  }
  return (
    <>
    <div className="background-grid " onClick={()=>setModal(!modal)}>
 
      <p className='heading'>
          {data.restaurant}
      </p>
      <span className='rating'>{data.avg_ratings} ☆</span>
      <span className='rating-count'>{data.total_ratings} reviews</span>
      <p className='cuisine'>{data.food_type.split(',').slice(0, 2).map((item: any) => item + ' · ')} <span className="viewmore">View more</span></p>
      <p className='cuisine'>₹ {data.price} for one ( Deliver in {data.delivery_time} min )</p>
      <p className='address'>
        Address : {data.address} , {data.area} , {data.city}
      </p>
     
    </div>
    <ModalComponent show={modal} data ={data} showModalCallback={showModalCallback}/>
    </>
  );
};

export default ItemComponent;