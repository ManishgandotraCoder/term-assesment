import React from "react";

export default function Modal({ show, showModalCallback, data }: { data: any, show: boolean, showModalCallback: Function }) {

    return (
        <>

            {show ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-2xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between pl-5 pt-2 pb-2  border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-2xl font-semibold">
                                        {data.restaurant}<span className='rating'>{data.avg_ratings} ☆</span>
                                        <span className='rating-count'>{data.total_ratings} reviews</span>
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => showModalCallback(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                
                                <div className="relative pl-5 pr-5 pt-2 flex-auto">
                                    <p className="my-2 text-blueGray-500 text-lg leading-relaxed">
                                        Price : {data.price}₹
                                    </p>
                                </div>
                                <div className="relative pl-5 pr-5 pt-1 flex-auto">
                                    <p className="my-1 text-blueGray-500 text-lg leading-relaxed">
                                        Food Type : {data.food_type}
                                    </p>
                                </div>
                               
                                
                                <div className="relative pl-5 pr-5 pt-2 flex-auto">
                                    <p className="my-1 text-blueGray-500 text-lg leading-relaxed">
                                        Delivery time : {data.delivery_time} minutes
                                    </p>
                                </div> 
                                <div className="relative pl-5 pr-5 pt-1 flex-auto">
                                    <p className="my-1 text-blueGray-500 text-lg leading-relaxed">
                                        Address : {data.address} , {data.area} , {data.city}
                                    </p>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end pl-5 pt-2 pb-2  border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => showModalCallback(false)}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}