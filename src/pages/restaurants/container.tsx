import GridLayout from "components/GridLayout";
import data from "../../products.json"
const RestaurantComponentContainer = ({ search, count, sort, passFields , getCount, counter}: {counter: number, getCount: Function,search: string, count: number, sort: string,  passFields: Function }) => {
    return (<><div style={{ background: "#F5F5F5" }}>

        <form className="flex items-center label" >
            <span className="heading-label" >
            Restaurants
            </span>
            <div className="relative w-full" >
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" id="voice-search"
                    value={search}
                    onChange={(e) => passFields('search', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by restaurant name" required />

            </div>

        </form>


        <div className="container mx-auto p-4 " >

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <select value={count} onChange={(e) => passFields('count', +e.target.value)}
                        id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>No. of records</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>

                </div>
                <div>
                    <select onChange={(e) => {
                        passFields('sort', e.target.value);
                    }} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Sort</option>
                        <option value="restaurant">Name</option>
                        <option value="price">Price</option>
                        <option value="delivery_time">Delivery time</option>
                        <option value="avg_ratings">Rating</option>
                    </select>

                </div>
                <div className="showing">Showing 1 to {counter} records

                </div>
            </div>

            <GridLayout records={data} count={count} sort={sort} sendCount={getCount} search={search} />
        </div>
    </div></>)
}
export default RestaurantComponentContainer;