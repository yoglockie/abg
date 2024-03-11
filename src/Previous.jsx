import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const Previous = () => {
   
  const [dataSet, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
           const response = await axios.post('https://mandelbulbtech.in/kql');
           const data = response.data;
           setData(data.Tables[0].Rows)
          //  console.log(data.Tables[0].Rows);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='root-pre'>
       <div className='p-header'>
       <Link to="/"><button className="btn btnd">← Home</button></Link>
        <p>Previous Results</p>
        <button className="btn btnd" onClick={()=>{window.location.reload()}}>Refresh</button>
       </div>
       <table className='content-table'>
         <thead>
             <tr>
             <th>User Id</th>
                <th>File Name</th>
                <th>Current Date</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Lab Result</th>
                <th>Total</th>
                <th>M/MM</th>
                <th>Good</th>
                <th>Ok</th>
                <th>Not Ok</th>
                <th>View More</th>
             </tr>

         </thead>
          
         <tbody>
              {/* <tr>
                  <td>2024-03-05 14:43</td>
                  <td>abc.jpg</td>
                   <td>100</td>
                   <td>70</td>
                   <td>35</td>
                   <td>35</td>
                   <td>30</td>
                   <td>
                    <button className="btn btnd">
                    See Details
                   </button></td>
                   
              </tr>

              <tr>
                  <td>2024-03-05 14:43</td>
                  <td>abc.jpg</td>
                   <td>100</td>
                   <td>70</td>
                   <td>35</td>
                   <td>35</td>
                   <td>30</td>
                   <td>
                    <button className="btn btnd">
                    See Details
                   </button></td>
                   
              </tr>

              <tr>
                  <td>2024-03-05 14:43</td>
                  <td>abc.jpg</td>
                   <td>100</td>
                   <td>70</td>
                   <td>35</td>
                   <td>35</td>
                   <td>30</td>
                   <td>
                    <button className="btn btnd">
                    See Details
                   </button></td>
                   
              </tr>

              <tr>
                  <td>2024-03-05 14:43</td>
                  <td>abc.jpg</td>
                   <td>100</td>
                   <td>70</td>
                   <td>35</td>
                   <td>35</td>
                   <td>30</td>
                   <td>
                    <button className="btn btnd">
                    See Details
                   </button></td>
                   
              </tr>

              <tr>
                  <td>2024-03-05 14:43</td>
                  <td>abc.jpg</td>
                   <td>100</td>
                   <td>70</td>
                   <td>35</td>
                   <td>35</td>
                   <td>30</td>
                   <td>
                    <button className="btn btnd">
                    See Details
                   </button></td>
                   
              </tr> */}
            {dataSet.map((rowData, index) => (
            <tr key={index}>
              <td>{rowData[0]}</td>
              <td>{rowData[1]}</td>
              <td>{rowData[2]}</td>
              <td>{rowData[5]}</td>
              
              <td>{rowData[4]}</td>
              <td>{rowData[3]}</td>
              <td>{rowData[8]}</td>
              <td>{rowData[10]}</td>
              <td>{rowData[9]}</td>
              <td>{rowData[11]}</td>
              <td>{rowData[12]}</td>
              <td>
              <Link 
                to="/seedetails" 
                state={
                  {
                    id:rowData[0],
                    filename:rowData[1],
                    cdate:rowData[2],
                    fdate:rowData[5],
                    tdate:rowData[4],
                    labresult:rowData[3],
                    total:rowData[8],
                    mmm:rowData[10],
                    good:rowData[9],
                    ok:rowData[11],
                    bad:rowData[12],
                    iimg:rowData[6],
                    oimg:rowData[7]
                  }}>
                <button className="btn btnd">
                See Details</button>
                </Link>
              </td>
            </tr>
          ))}

         </tbody>
       </table>
    </div>
  )
}

export default Previous


{/* <Link
     
to="/productpage"
state={{
       id:props.id,
       title:props.title,
       imgurl:props.imgurl,
       price:props.price,
}} */}