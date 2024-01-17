import ItemComponent from 'components/Item';
import React, { useEffect } from 'react';

const GridLayout = ({ records, count, sort, sendCount, search }: any) => {

  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  React.useEffect(() => {
    fetchData(page);
  }, [page]);

  function filterData() {

    return records
      .data
      .filter((item: any) =>
        (item.cellValues.restaurant.toLowerCase().includes(search.toLowerCase()))
      )

  }
  useEffect(() => {
    setPage(1)
    fetchData(1)
  }, [count, sort, search])

  const sortArray = () => {

    return records.data.sort((a: any, b: any) => {

      let fa = +a.cellValues[sort];
      let fb = +b.cellValues[sort];
      if (sort === 'restaurant') {
        fa = a.cellValues[sort].toLowerCase().trim()
        fb = b.cellValues[sort].toLowerCase().trim();
      }
      if (sort === "avg_ratings") {
        if (fa > fb) {
          return -1;
        }
        if (fa < fb) {
          return 1;
        }
        return 0;
      } else {
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      }

    });

  }
  const fetchData = async (page: number) => {

    let data = records.data
    console.log(data[0]);

    if (sort && search) {

      data = await sortArray()
      console.log(data[0]);

      data = await filterData()
      console.log(data[0]);
    }
    if (sort) {
      data = await sortArray()
      console.log(data[0]);
    }
    if (search) {
      data = await filterData()
      console.log(data[0]);
    }

    setLoading(true);

    if (page === 1) {
      let __newRecord = data.slice(0, count)
      setItems(__newRecord);
      sendCount(__newRecord.length)
    }
    else {
      let ___newRecord = data.slice(((page ? page - 1 : page) * count), (page * count))
      setItems((prevItems): any => [...prevItems, ...___newRecord]);
      sendCount(___newRecord.length + items.length)
    }
    setLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <>
      <div style={{ marginTop: "20px" }} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4" >
        {items.map((record: any) => (
          <ItemComponent key={record.id} data={record.cellValues
          } />
        ))}

      </div>
      {loading &&

        <center>
          <div role="status">
            <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>Loading {1 + ((page) * count)} to {(page + 1) * count} records
          </div>
        </center>

      }
    </>
  );
};

export default GridLayout;