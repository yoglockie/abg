import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const PreviousWithoutLogin = () => {
  
  const navigate = useNavigate();
  const [dataSet, setData] = useState([]);
  const [showPopup,setShowPopup]=useState(false);
  const [fromDate,setFromDate]=useState("");
  const [toDate,setToDate]=useState("");
  const [visibleRows,setVisibleRows]=useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
           const response = await axios.post('https://mandelbulbtech.in/kql',{user:"none",userid:0,from:null,to:null});
           const data = response.data;
            //console.log(data);
            //console.log(data.Tables);
           
           setData(data.Tables[0].Rows)
           console.log(data.Tables[0].Rows);
           setVisibleRows(Math.min(5, data.Tables[0].Rows.length));
         
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async()=>{
        
       if(fromDate=="")
       {
        alert("Please Select from Date")
        return;
       }
       if(toDate==""){
         alert("Please Select to Date");
         return;
       }  
       if(toDate<fromDate)
       {
        alert("To date can't be less than from date");
        return
       }
       setShowPopup(false);
       console.log("From Date ",fromDate);
       console.log("To Date ",toDate);
       
       var inputDate = new Date(toDate);

     // Increment the date by one day
       inputDate.setDate(inputDate.getDate() + 1);
       
      // Format the result back to the string format
      var newDateStr = inputDate.toISOString().split('T')[0];
      console.log("new to date ",newDateStr);
      
      const response = await axios.post("https://mandelbulbtech.in/kql",{user:"none",userid:0,from:fromDate,to:newDateStr}) 
      const data = response.data
      // console.log(data);
      setData(data.Tables[0].Rows)
      // console.log(data.Tables[0].Rows);
      
      setFromDate("");
      setToDate("");
  }
  
  const arrayToCSV = (array,headers) => {
    let csvContent = "";
    csvContent += headers.join(",") + "\n";
    
    array.forEach((row, rowIndex) => {

      const temp = row[10];
      row[10] = row[11];
      row[11] = temp;

      // const temp2 = row[9];
      // row[9] = row[10];
      // row[10] = temp2;

      const modifiedRow = row.slice(1, 6).concat(row.slice(8));
      let rowStr = modifiedRow.join(",");
      csvContent += rowIndex < array.length ? rowStr + "\n" : rowStr;
    });

    return csvContent;
  };

  const handleCSVDownload = () => {
    if(dataSet==[])
    {
      alert("No records to download")
      return
    }
    const headers = [
      'User Name', 'Image Name', 'Current Date',  'From', 'To', 'Lab Result',
      'Total', 'M/MM', 'Good', 'Ok', 'Not Ok'
    ];
    const dataSetCopy = dataSet
    const csvContent = arrayToCSV(dataSetCopy,headers);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'Previous_Records.csv');
  };
  
  const homeLink =()=>{
    navigate('/home');
  }
   
  const loadMoreRows = () => {
    setVisibleRows(prevVisibleRows => {
      const nextVisibleRows = prevVisibleRows + 10;
      return Math.min(nextVisibleRows, dataSet.length); // Ensure not to exceed the dataset length
    });
  };

  return (
     <div style={{position:"relative"}}>
      <header className="header">
          <div className="s-nav" onClick={homeLink}>
            <img src="https://companieslogo.com/img/orig/GRASIM.NS_BIG-12105e87.png?t=1603311859" alt="logo" style={{width:"30px",height:"30px"}}/>
            Aditya Birla Grasim
          </div>
          
      </header>
      <div className='root-pre'>
       <div className='p-header'>
        
        <p>Previous Results</p>
        <div style={{display:"flex"}}>       
        <Link to="/"><button className="btn btnd">Login</button></Link>
        <button className="btn btnd" onClick={handleCSVDownload}>Download CSV</button>
        <button className="btn btnd" onClick={()=>{window.location.reload()}}>Refresh</button>
        <button className="btn btnd" onClick={()=>{setShowPopup(true)}}>Search By Date</button>
        </div> 
        
        
       </div>
       {showPopup?<div className='outer-popup'>
        <div className="datepopup">
            <span onClick={()=>{setShowPopup(false)}} style={{position:"absolute",top:"10px",right:"10px",borderRadius:"50%",boxShadow:"rgba(0, 0, 0, 0.55) 0px 5px 8px",border:"1px solid black", padding:"2px 6px",cursor:"pointer"}}>X</span>
            <label htmlFor=""><b>From</b></label>
            <input type="date" name="" id="" style={{marginBottom:"5px"}} onChange={(e)=>{setFromDate(e.target.value)}}/>
            <label htmlFor=""><b>To</b></label>
            <input type="date" onChange={(e)=>{setToDate(e.target.value)}}/>
            <button className="btn btnd" onClick={handleSearch}>Search</button>
       </div>
       </div>:""}
       <table className='content-table'>
         <thead>
             <tr>
                <th>User</th>
                <th>File Name</th>
                <th>Current Date</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Lab Result</th>
                {/* <th>Total</th> */}
                <th>M/MM</th>
                <th>Good</th>
                <th>Ok</th>
                <th>Not Ok</th>
                <th>View More</th>
             </tr>

         </thead>
          
         <tbody>
              
            {dataSet.slice(0, visibleRows).map((rowData, index) => (
            <tr key={index}>
              <td>{rowData[1]}</td>
              <td>{rowData[2]}</td>
              <td>{rowData[3]}</td>
              <td>{rowData[4]}</td>
              
              <td>{rowData[5]}</td>
              <td>{rowData[8]}%</td>
              {/* <td>{rowData[8]}</td> */}
              <td>{((rowData[11]/rowData[9])*100).toFixed(1)}%</td>
              <td>{((rowData[10]/rowData[9])*100).toFixed(1)}%</td>
              <td>{((rowData[12]/rowData[9])*100).toFixed(1)}%</td>
              <td>{((rowData[13]/rowData[9])*100).toFixed(1)}%</td>
              <td>
              <Link 
                to="/seedetailswl" 
                state={
                  {
                    id:rowData[0],
                    filename:rowData[2],
                    cdate:rowData[2],
                    fdate:rowData[4],
                    tdate:rowData[5],
                    labresult:rowData[8],
                    total:rowData[9],
                    mmm:rowData[11],
                    good:rowData[10],
                    ok:rowData[12],
                    bad:rowData[13],
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
       {visibleRows < dataSet.length &&
          <p style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }} onClick={loadMoreRows}>Load more</p>
        }
    </div>
    
     </div>
  )
}

export default PreviousWithoutLogin



