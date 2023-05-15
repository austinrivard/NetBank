import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserToken } from '../firebase';

function AdminView() {
    const navigate = useNavigate();

    const [averageBalance, setAverageBalance] = useState(0);
    const [mostCommonZipcode, setMostCommonZipcode] = useState('');
    
    async function handleRefresh() {
        const token = await getUserToken(() => navigate('/'));
        const data = await fetch('/api/report', {headers: {'Authorization': `Bearer ${token}`}})
          .then(response => response.json())
          .catch(error => console.error(error));
        
        console.log(data);
        setAverageBalance(data.averageAccountBalance);
        setMostCommonZipcode(data.mostCommonZipCode);
      }
  
    useEffect(() => {
      handleRefresh();
    }, []);
  
    return (
      <div>
        <h1>Admin View</h1>
        <p>Average Balance: ${averageBalance.toFixed(2)}</p>
        <p>Most Common Zipcode: {mostCommonZipcode}</p>
        <button onClick={handleRefresh}>Refresh</button>
      </div>
    );
  }
  
  export default AdminView;