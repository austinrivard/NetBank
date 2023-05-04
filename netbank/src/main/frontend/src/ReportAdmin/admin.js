import React, { useState, useEffect } from 'react';
import { getUserToken } from '../firebase';
import { useNavigate } from 'react-router-dom';

function AdminView() {
    const navigate = useNavigate();

    const [averageBalance, setAverageBalance] = useState(0);
    const [mostCommonZipcode, setMostCommonZipcode] = useState('');

    const navigate = useNavigate();
    
    async function handleRefresh() {
        const token = await getUserToken(() => navigate('/'));
        fetch('/api/report', {headers: {'Authorization': `Bearer ${token}`}})
          .then(response => response.json())
          .then(data => {
            setAverageBalance(data.averageAccountBalance);
            setMostCommonZipcode(data.mostCommonZipcode);
          })
          .catch(error => console.error(error));
      }
  
    useEffect(() => {
      handleRefresh();
    }, []);
  
    return (
      <div>
        <h1>Admin View</h1>
        <p>Average Balance: ${averageBalance}</p>
        <p>Most Common Zipcode: {mostCommonZipcode}</p>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    );
  }
  
  export default AdminView;