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
  const sortArray = useCallback((data: []) => {
    return [...data].sort((a: any, b: any) => {
      const fa = sort === 'restaurant' ? a.cellValues[sort].toLowerCase().trim() : +a.cellValues[sort];
      const fb = sort === 'restaurant' ? b.cellValues[sort].toLowerCase().trim() : +b.cellValues[sort];

      if (sort === "avg_ratings") {
        return fb - fa;
      } else {
        return fa < fb ? -1 : fa > fb ? 1 : 0;
      }
    });
  }, [records.data, sort]);

  const filterData = useCallback((data: listType[]) => {
    return data.filter((item: listType) =>
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
      data = await sortArray(data)
      data = await filterData(data)
    } else {
      if (sort) {
        data = await sortArray(data)
      }
      if (search) {
        data = await filterData(data)
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
      {isAtTop && loading && pagingNo > 1 && <LoaderComponent />}
      <div
        ref={scrollRef}
        data-testid="mocked-item-component"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mt-4 h-[76vh] overflow-y-auto overflow-x-auto;"
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
      {isAtBottom && loading && <LoaderComponent />}
    </>
  );
};

export default GridLayoutComponent;