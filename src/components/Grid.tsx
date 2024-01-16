import React from 'react';
import Record from './GridItem';

const GridLayout = ({ records }: any) => {
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(50);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  React.useEffect(() => {
    fetchData();
  }, [page]);
  const fetchData = async () => {
    console.log("in");
    
    setLoading(true);
    if (page === 1) {
      setItems(records.slice(0, count));
    }
    else {

      setItems((prevItems): any =>
        [...prevItems, ...records.slice(((page ? page - 1 : page) * count), (page * count))]
      );
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4" >
      {items.map((record: any) => (
        <Record key={record.id} data={record.cellValues
        } />
      ))}
    </div>
  );
};

export default GridLayout;