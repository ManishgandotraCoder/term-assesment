import React, { useState } from 'react';
import './GridItem.css'
import ModalComponent from 'components/Modal/Modal';

interface itemType {
  data: {
    restaurant: string,
    avg_ratings: string,
    food_type: string,
    total_ratings: string,
    delivery_time: string,
    price: string,
    address: string,
    area: string,
    city: string
  }
}
/*
  Grid Item Layout
*/
const ItemComponent = ({ data }: itemType) => {
  const [modal, setModal] = useState(false)
  function showModalCallback(params: boolean) {
    setModal(params)
  }
  return (
    <>
      <div className="background-grid " data-testid={'mocked-item-component'}
        onClick={() => setModal(!modal)}>

        <p className='heading'>
          {data.restaurant}
        </p>
        <span className='rating'>{data.avg_ratings} ☆</span>
        <span className='rating-count'>{data.total_ratings} reviews</span>
        <p className='cuisine'>{data.food_type.split(',').slice(0, 2).map((item: string) => item + ' · ')} <span className="viewmore">View more</span></p>
        <p className='cuisine'>₹ {data.price} for one ( Deliver in {data.delivery_time} min )</p>
       
      </div>
      {/* Modal COmponent */}
      <ModalComponent show={modal} data={data} showModalCallback={showModalCallback} />
    </>
  );
};

export default ItemComponent;