import React, { useState } from 'react';
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
      <div className="rounded-md border border-gray-200 bg-white pb-4 cursor-pointer" data-testid={'mocked-item-component'}
        onClick={() => setModal(!modal)}>

        <p className='leading-6 mb-3 text-left text-base text-gray-700 overflow-hidden truncate whitespace-nowrap border border-gray-200 py-2 px-4'>
          {data.restaurant}
        </p>
        <span className='text-xs bg-[green] text-white py-1 px-2 rounded-md ml-4'>{data.avg_ratings} ☆</span>
        <span className='text-xs ml-1'>{data.total_ratings} reviews</span>
        <p className='text-xs justify-between ml-4 whitespace-nowrap'> <span className="text-blue-500 underline cursor-pointer">{data.food_type.split(',').slice(0, 2).map((item: string) => item + ' · ')}</span></p>
        <p className='text-xs justify-between ml-4 whitespace-nowrap'>₹ {data.price} for one ( Deliver in {data.delivery_time} min )</p>

      </div>
      {/* Modal COmponent */}
      <ModalComponent show={modal} data={data} showModalCallback={showModalCallback} />
    </>
  );
};

export default ItemComponent;