import React, { useRef, useEffect, useState, useCallback } from 'react';
import ItemComponent from 'components/GridItem/GridItem';
import LoaderComponent from 'components/Loader/Loader';

interface GridLayoutType {
  count: number,
  sort: string,
  sendCount: Function,
  search: string,
  records: any,
  records_string: string
}
interface listType {
  id: string,
  cellValues: {
    restaurant: string,
    avg_ratings: string,
    food_type: string,
    total_ratings: string,
    delivery_time: string,
    price: string,
    address: string,
    area: string,
    city: string,
  }
}
const GridLayoutComponent = ({ records, count, sort, sendCount, search, records_string }: GridLayoutType) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [isAtBottom, setIsAtBottom] = useState<boolean>(false);
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  // const [page, setPage] = React.useState(1);
  const [pagingNo, setPagingNo] = useState(1)

  const handleScroll = () => {
    if (scrollRef.current) {
      // Check if scroll is at the top
      setIsAtTop(scrollRef.current.scrollTop === 0);

      setIsAtBottom(scrollRef.current.scrollHeight - scrollRef.current.scrollTop <= scrollRef.current.clientHeight + 1);
      if (scrollRef.current.scrollTop === 0) {
        setPagingNo(prevPagingNo => Math.max(1, prevPagingNo - 1));
      } else if (scrollRef.current.scrollHeight - scrollRef.current.scrollTop <= scrollRef.current.clientHeight + 1) {
        setPagingNo(prevPagingNo => prevPagingNo + 1);
      }
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  const sortArray = useCallback(() => {
    return [...records.data].sort((a: any, b: any) => {
      let fa = +a.cellValues[sort];
      let fb = +b.cellValues[sort];

      if (sort === 'restaurant') {
        fa = a.cellValues[sort].toLowerCase().trim();
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
  }, [records.data, sort]);

  const filterData = useCallback(() => {
    return records.data.filter((item: listType) =>
      (item.cellValues.restaurant.toLowerCase().includes(search.toLowerCase()))
    );
  }, [records.data, search])

  useEffect(() => {

    fetchData(pagingNo)
  }, [pagingNo])
  useEffect(() => {

    setPagingNo(1)
    fetchData(1)
  }, [count, sort, search])

  const fetchData = useCallback(async (pageNo: number) => {
    setLoading(true);
    let data: any = records.data
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

    if (pageNo === 1) {
      let __newRecord = data.slice(0, count)
      setItems(__newRecord);
      sendCount(`Showing 1 to 50 records`)
    }
    else {
      let ___newRecord = data.slice((pageNo - 1) * 50, (pageNo + 1) * 50)
      setItems(___newRecord);
      sendCount(`Showing ${(pageNo - 1) * 50} to ${(pageNo + 1) * 50} records`)

      if (scrollRef.current) {
        const newScrollTop = scrollRef.current.scrollTop + (scrollRef.current.scrollHeight - scrollRef.current.clientHeight) / 2;
        console.log(newScrollTop);

        scrollRef.current.scrollTo({ top: newScrollTop / 2 });
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, [records.data, sort, search, count, setItems, sendCount, scrollRef]);
  return (
    <>
      {isAtTop && loading && pagingNo > 1 && <LoaderComponent page={pagingNo} count={count} />}
      <div
        ref={scrollRef}
        data-testid="mocked-item-component"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4"
        style={{ height: '70vh', overflow: 'auto' }}
      >

        {items.map((record: listType, index) => (
          <div
            key={index}
            className="grid-item"
            aria-rowindex={index}
            tabIndex={index + 2}

          >
            <ItemComponent data={record.cellValues} />

          </div>
        ))}

      </div>
      {isAtBottom && loading && <LoaderComponent page={pagingNo} count={count} />}
    </>
  );
};

export default GridLayoutComponent;