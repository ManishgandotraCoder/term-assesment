import ItemComponent from 'components/Item';
import LoaderComponent from 'components/Loader';
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
    setLoading(true);
    let data = records.data
    if (sort && search) {
      data = await sortArray()
      data = await filterData()
    } else {
      if (sort) {
        data = await sortArray()
      }
      if (search) {
        data = await filterData()
      }
    }

    

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
    setTimeout(()=>{
      setLoading(false);
    },5000)
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
        <LoaderComponent page={page} count={count} />
      }
    </>
  );
};

export default GridLayout;