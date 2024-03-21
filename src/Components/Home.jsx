import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
const Home = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [good,setGood]=useState(0);
    const [bad,setBad]=useState(0);
    const [mm,setMm]=useState(0);
    const [ok,setOk]=useState(0);
    const [total,setTotal]=useState(0);
    const [inputImageBlob,setinputImageBlob]=useState("");
    const [outputImageBlob,setoutputImageBlob]=useState("");
    const [isInputLoading, setIsInputLoading] = useState(false);
    const [isOutputLoading, setIsOutputLoading] = useState(true);
    const [fromdate, setFromDate]=useState("");
    const [fromtime,setFromTime]=useState("");
    const [fileN,setFileN]=useState("");
    // const [todate, setToDate]=useState("");
    const [totime,setToTime]=useState("");
    const [labResult,setLabResult]=useState("")
  

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      
      if (file) {
        
        const reader = new FileReader();
  
        reader.onload = (event) => {
          const base64String = event.target.result;
          setImageUrl(base64String);
          setFileN(file.name);
        };
  
        reader.readAsDataURL(file);
      }
    };
    
    const uploadFile = () => {
      
      if(totime==""||labResult=="" || fromdate=="" || fromtime=="")
      {
        alert("Please fill all values")
        return
      }
     
  
      let from = fromdate+" "+fromtime;
      let to = fromdate+" "+totime
      console.log(from);
      console.log(to);
      
      const fromST = new Date(`${fromdate} ${fromtime}`)
      const toST = new Date(`${fromdate} ${totime}`) 
      
      

      const fileInput = document.getElementById('formFile');
      const file = fileInput.files[0];
      
     
      if (file) {
        
        let fileName = file.name;
        //console.log(fileName);
        
        setIsOutputLoading(false);
        const reader = new FileReader();
        
        reader.onload = (event) => {
         
          const base64String = event.target.result;
          const base64Content = base64String.split(',')[1];
          // Set the uploaded image URL
          // setImageUrl(base64String);
         // console.log(base64Content);
          
         // Send the base64String to the server
          fetch('https://mandelbulbtech.in/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ image: base64Content, filename:fileName, from:from, to:to, mmm:labResult }),
          })
            .then(response => {
              if (!response.ok) {
                
                console.log(response);
                throw new Error('File upload failed');
              }
              return response.json(); // Assuming server response is JSON, adjust accordingly
            })
            .then(data => {
              
              // Set the server response image URL
              //console.log(data);
              setBad(data.bad)
              setGood(data.good)
              setTotal(data.total)
              setinputImageBlob(data.inputImageBlob)
              setoutputImageBlob(data.processedImageBase64)
              setOk(data.ok)
              setMm(data.modal)
              setIsOutputLoading(true);
            })
            .catch(error => {
              console.error('Error:', error);
            });
        
          };
        // Read the file as data URL
        reader.readAsDataURL(file);
  
       
  
      } else {
        alert("Select the input image")
        console.error('No file selected.');
      }
    };
    
  const downloadFile = () => {
      if(!outputImageBlob)
      {
          alert("Please wait for output image to appear")
          return
      }
    
      const lowerBodyDiv = document.querySelector('.home-root');
      //html2canvas
      window.scrollTo(0, 0);
      html2canvas(lowerBodyDiv,{
        allowTaint : true,
        useCORS:true,
        foreignObjectRendering:true
     }).then(canvas => {
        // Convert the canvas to a data URL
        const dataUrl = canvas.toDataURL('image/png');
    
        // Create a blob from the data URL
        const byteCharacters = atob(dataUrl.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/png' });
    
        // Create a download link for the snapshot
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'layout_snapshot.png';
        link.click();
      });
      
    }; 
    
    

  return (
    <div className='home-root' id='node'>
        <header className="headers">
          <div className="s-nav">
            <img src="https://companieslogo.com/img/orig/GRASIM.NS_BIG-12105e87.png?t=1603311859" alt="" style={{width:"30px",height:"30px",textIndent: "-10000px"}} />
            Aditya Birla Grasim
          </div>
          
      </header>
      
      <div className="lower-body">
      

        <div className="t-container">
               <img
                   src={imageUrl}
                   id="uploadedImage"
                   // alt="Select Input Image ↑"
                  //  onerror="this.style.opacity='0'"
                   width="200"
                   height="200"
                   className="rounded aspect-image overflow-hidden object-cover object-center dark:border-gray-800 dark:border-gray-800"
                   style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginBottom:"20px" }}
                 />
               <label class="custom-file-upload">
                 <input type="file"  id="formFile" onChange={handleFileChange}/>
                 
               </label>
               <div className='datetimemm'><p><span>Date</span><span>Time</span></p></div>
               <label class="custom-file-upload dateup">
                 <input type="date" id="formDate" value={fromdate} onChange={(e)=>{setFromDate(e.target.value)}}/>
                 <input type="time" id="formTime" value={fromtime} onChange={(e)=>{setFromTime(e.target.value)}}/>
                  <span>to</span>
                 <input type="time" id="formTime" value={totime} onChange={(e)=>{setToTime(e.target.value)}}/>
               </label>
               
               {/* <div className='datetimemm'><p>To (Date & Time) </p></div>
               <label class="custom-file-upload dateup">
                 <input type="date" id="formDate" onChange={(e)=>{setToDate(e.target.value)}}/>
                 <input type="time" id="formTime" onChange={(e)=>{setToTime(e.target.value)}}/>
               </label> */}

               <div className='datetimemm'><p>Lab Result</p></div>
               <label class="custom-file-upload dateup">
               <input type="text" id="formMMM" placeholder='M/MM' value={labResult} onChange={(e)=>{setLabResult(e.target.value)}}/>
                 
               </label>

               <button
                 onClick={uploadFile}
                 className="btn"
               >
                 Upload File
               </button>
        </div>

        <div className="t-container">
             {isOutputLoading?<img
                 src={`data:image/png;base64,${outputImageBlob}`}
                //  onerror="this.style.opacity='0'"
                 id="uploadedImage"
                 // alt="Output image"
                 width="200"
                 height="200"
                 className="rounded aspect-image overflow-hidden object-cover object-center dark:border-gray-800 dark:border-gray-800"
                 style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
               />:
               <div className='hello'>
                 <p><b>Output Image Loading</b></p>
                 <div className="loading-spinner"></div>
               </div>
               }
                <h3 style={{padding:"10px",fontSize:"18px"}}>Output Image</h3>
                
               <button
               onClick={downloadFile}
               className="btn"
               >
                Download File
               </button>
               

        </div>
        <div className="t-container">
        <div className="output-percentage">
          {/* Output percentage */}
          
          <div className="ele">
                  <div className='el'>
                    <p>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>{total}</p>
                    <p>100.00%</p>
                  </div>
                  <div className='el' style={{color:"#43C343"}}>
                    <p>M/MM&nbsp;&nbsp;</p>
                    <p>  {mm}</p>
                    <p>{((mm/total)*100).toFixed(2)}%</p> 
                  </div>
                  <div className='el' style={{color:"#43C343"}}>
                    <p>Good&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>  {good}</p>
                    <p>{((good/total)*100).toFixed(2)}%</p> 
                  </div>
                  <div className='el' style={{color:"#4C4CCC"}}>
                    <p>Ok&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <p>  {ok}</p>
                    <p>{((ok/total)*100).toFixed(2)}%</p>
                  </div>
                  <div className='el' style={{color:"#CF4F4F"}}>
                    <p>Not Ok&nbsp;&nbsp;</p>
                    <p>{bad}</p>
                    <p>{((bad/total)*100).toFixed(2)}%</p>
                  </div>
   
            </div>
        </div>
        <h3 style={{padding:"10px",fontSize:"18px"}}>Output Insights</h3>
        <Link to="/previous">
             <button
               
               className="btn"
               >
                See Previous Results
               </button>
          </Link>
        </div>          
             

      </div>
    </div>
  )
}

export default Home



  //download output image
      // const byteCharacters = atob(outputImageBlob);
      // const byteNumbers = new Array(byteCharacters.length);
      // for (let i = 0; i < byteCharacters.length; i++) {
      //   byteNumbers[i] = byteCharacters.charCodeAt(i);
      // }
      // const byteArray = new Uint8Array(byteNumbers);
  
      // const blob = new Blob([byteArray], { type: 'image/png' });
  
      // const link = document.createElement('a');
      // link.href = URL.createObjectURL(blob);
      // link.download = 'output_image.png';
      // link.click();