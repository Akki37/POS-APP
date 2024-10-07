import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Search from './Search';
import BillsTable from './BillsTable';
import '../stylesheets/Bills.css';
import SweetAlert2 from 'react-sweetalert2';
import { useHistory } from 'react-router';

function Bills(props) {
  let history = useHistory();
  const [search, setSearch] = useState([]);
  const bills = useSelector((state) => state.BusinessData.bills);

  useEffect(() => {
    if (!localStorage.getItem('pos_token')) {
      history.push('/login');
      SweetAlert2({
        text: 'Please Log-in first.',
        icon: 'error',
        timer: 500,
        button: false,
      });
    }
  }, [history]);

  const getSearch = (data) => {
    setSearch(data);
  };

  return (
    <div>
      <Search
        data={bills}
        getSearch={getSearch}
        clue='bill'
        placeHolder='Search bill by name/mobile...'
      />
      {search.length ? (
        search === 'empty' ? (
          <BillsTable data={[]} />
        ) : (
          <BillsTable data={search} />
        )
      ) : (
        <BillsTable data={bills} />
      )}
    </div>
  );
}

export default Bills;
