import GridLayout from "components/GridLayout/GridLayout";
import data from "../../products.json"

const RestaurantComponentContainer = ({ search, count, sort, passFields, getCount, records_string }: { records_string: string, getCount: Function, search: string, count: number, sort: string, passFields: Function }) => {
    return (<div data-testid="restaurant-component" className ="bg-gray-200 h-[calc(100vh)]">

        <form className="flex items-center bg-white p-4 fixed top-0 w-full" >
            <span className="mr-5 ml-5 text-lg font-semibold" >
                Restaurants
            </span>
            <div className="relative w-full" >
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor"   d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <input type="text" 
                    value={search}
                    data-testid="search-input"
                    onChange={(e) => passFields('search', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search by restaurant name" required />

            </div>

        </form>


        <div className="container mx-auto p-4 mt-5 " >

            <div className="grid grid-cols-3 gap-4 mt-14">
                
                <div>
                    <select
                        value={sort}
                        
                        onChange={(e) => {
                            passFields('sort', e.target.value);
                        }}
                        id="sort"
                        data-testid="sort-input"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value ="">Sort</option>
                        <option value="restaurant">Name</option>
                        <option value="price">Price</option>
                        <option value="delivery_time">Delivery time</option>
                        <option value="avg_ratings">Rating</option>
                    </select>

                </div>
                <div className="bg-white p-2 rounded-lg"> {records_string}

                </div>
            </div>

            <GridLayout records={data} count={count} sort={sort} sendCount={getCount} search={search} records_string={records_string} />
        </div>
    </div>)
}
export default RestaurantComponentContainer;