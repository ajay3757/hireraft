import React, { useState } from 'react';
import './table.css';

function Table() {
  const itemsPerPage = 4; // Adjust the number of items per page as needed
  const initialData = [
    { id: 1, name: 'Rohit Sharma', age: 36, email: 'rgsharma45@gmail.com' },
    { id: 2, name: 'Virat Kohli', age: 30, email: 'vk18@gmail.com' },
    { id: 3, name: 'Kl Rahul', age: 32, email: 'kl1@gmail.com' },
    { id: 4, name: 'Shreyas Iyer', age: 26, email: 'iyer32@gmail.com' },
    { id: 5, name: 'Shami', age: 31, email: 'shami31@gmail.com' },
    { id: 6, name: 'siraj', age: 36, email: 'miya97@gmail.com' },
    { id: 7, name: 'vishnu', age: 30, email: 'vishnu19@gmail.com' },
    { id: 8, name: 'dravid', age: 32, email: 'dravid4@gmail.com' },
    { id: 9, name: 'marsh', age: 26, email: 'marsh23@gmail.com' },
    { id: 10, name: 'jadeja', age: 31, email: 'jadeja8@gmail.com' },
    { id: 11, name: 'starc', age: 31, email: 'starc61@gmail.com' },
    { id: 12, name: 'cummins', age: 31, email: 'cummins51@gmail.com' },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [hiddenColumns, setHiddenColumns] = useState([]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    const filteredData = initialData.filter((item) => {
      return (
        item.id.toString().includes(value) ||
        item.age.toString().includes(value) ||
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
      );
    });

    setData(filteredData);
  };

  const handleHideColumn = (column) => {
    setHiddenColumns([...hiddenColumns, column]);
  };

  const isColumnHidden = (column) => {
    return hiddenColumns.includes(column);
  };

  const hideAllNames = () => {
    handleHideColumn('name');
  };

  const hideAllIDs = () => {
    handleHideColumn('id');
  };

  const hideAllAges = () => {
    handleHideColumn('age');
  };

  const hideAllEmail = () => {
    handleHideColumn('email');
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table className="tableStyle">
        <thead>
          <tr>
            <th className="thStyle" onClick={() => handleSort('id')}>
              ID {sortConfig.key === 'id' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th className="thStyle" onClick={() => handleSort('age')}>
              Age {sortConfig.key === 'age' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th className="thStyle" onClick={() => handleSort('name')}>
              Name {sortConfig.key === 'name' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th className="thStyle" onClick={() => handleSort('email')}>
              Email {sortConfig.key === 'email' && <span>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>}
            </th>
            <th className="thStyle">
              <button onClick={hideAllNames}>Hide All Names</button>
              <button onClick={hideAllIDs}>Hide All IDs</button>
              <button onClick={hideAllAges}>Hide All Ages</button>
              <button onClick={hideAllEmail}>Hide All Email</button>
            </th>
          </tr>
        </thead>
        <tbody className="tbodyStyle">
          {currentItems.map((item) => (
            <tr key={item.id}>
              {!isColumnHidden('id') && <td className="tdStyle">{item.id}</td>}
              {!isColumnHidden('age') && <td className="tdStyle">{item.age}</td>}
              {!isColumnHidden('name') && <td className="tdStyle">{item.name}</td>}
              {!isColumnHidden('email') && <td className="tdStyle">{item.email}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Table;
