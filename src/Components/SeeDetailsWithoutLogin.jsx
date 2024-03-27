import React, { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SeeDetailsWithoutLogin = () => {

    const [inputImageBuffer, setInputImageBuffer] = useState(null);
    const [outputImageBuffer, setOutputImageBuffer] = useState(null);
    const navigate = useNavigate();
    const location = useLocation()
    const propsdata = location.state
    const sastoken = "sp=r&st=2024-03-19T05:00:43Z&se=2025-03-30T13:00:43Z&sv=2022-11-02&sr=c&sig=tZU7EQ5OD7Umaqylzh3cR%2BHWx3lJruBBpVbbUKX4A34%3D"
    
    


    // making api request 
    const convertUrlToBuffer = async (imageUrl) => {
        try {
          const response = await fetch(imageUrl);
      
          if (!response.ok) {
            throw new Error(`Failed to fetch image. Status: ${response.status}`);
          }
      
          const imageBuffer = await response.arrayBuffer();
         
         
         const uint8Array = new Uint8Array(imageBuffer); 
        
        const blob = new Blob([uint8Array], { type: 'image/png' });

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            };
            reader.readAsDataURL(blob);
        });
        } catch (error) {
          console.error('Error fetching image:', error.message);
          // Handle the error as needed (e.g., show a placeholder image)
          return null;
        }
      };
    useEffect(() => {
        const loadImages = async () => {
          try {
            const inputBuffer = await convertUrlToBuffer(`https://stgaml.blob.core.windows.net/images/${propsdata.iimg}?${sastoken}`);
            
            setInputImageBuffer(inputBuffer);
             
            const outputBuffer = await convertUrlToBuffer(`https://stgaml.blob.core.windows.net/images/${propsdata.oimg}?${sastoken}`);
            
            setOutputImageBuffer(outputBuffer);
            
          } catch (error) {
            console.error('Error loading images:', error.message);
          }
        };
      
        loadImages();
      }, [propsdata.iimg, propsdata.oimg, sastoken]);



    const downloadFile = () => {
      
      const lowerBodyDiv = document.querySelector('.slower-body');
      window.scrollTo(0, 0);
      html2canvas(lowerBodyDiv,{
          allowTaint : true,
          useCORS:true,
          foreignObjectRendering: true
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
      
      const homeLink =()=>{
        navigate('/home');
    }
      
      
      
  return (
    <div className='sd-root'>
         <header className="header">
          <div className="s-nav" onClick={homeLink}>
            <img src="https://companieslogo.com/img/orig/GRASIM.NS_BIG-12105e87.png?t=1603311859" alt="logo" style={{width:"30px",height:"30px"}}/>
            Aditya Birla Grasim
          </div>
          
         </header>
        <div className="slower-body">
             <div className="s-container">
             <span>Input Image</span>
                <img
                   src={inputImageBuffer}
                   // alt="Select Input Image ↑"
                   onerror="this.style.opacity='0'"
                   width="200"
                   height="200"
                   className="simg"
                   style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginBottom:"20px" }}
                   
                 />
                
             </div>
             <div className="s-container">
             <span>Output Image</span>
                <img
                   src={outputImageBuffer}
                   id="uploadedImage"
                   // alt="Select Input Image ↑"
                   onerror="this.style.opacity='0'"
                   width="200"
                   height="200"
                   className="rounded aspect-image overflow-hidden object-cover object-center dark:border-gray-800 dark:border-gray-800 simg"
                   style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px', marginBottom:"20px" }}
                 />
             </div>
             <div className="s-container">
                
                <div className="soutput-percentage">
          
                
                   <div className="sele">
                           <div className='el'>
                             <div><p>Total&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
                             <div><p>{propsdata.total}</p></div>
                             <div><p>100.00%</p></div>
                           </div>
                           <div className='el' style={{color:"#43C343"}}>
                             <div><p>Lab Result</p></div>
                             <div><p>---</p></div>
                             <div><p>{propsdata.labresult}%</p> </div>
                           </div>
                           <div className='el' style={{color:"#43C343"}}>
                             <p>M/MM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                             <p>{propsdata.mmm}</p>
                             <p>{((propsdata.mmm/propsdata.total)*100).toFixed(2)}%</p> 
                           </div>
                           <div className='el' style={{color:"#43C343"}}>
                             <p>Good&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                             <p>{propsdata.good}</p>
                             <p>{((propsdata.good/propsdata.total)*100).toFixed(2)}%</p> 
                           </div>
                           <div className='el' style={{color:"#4C4CCC"}}>
                             <p>Ok&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                             <p>{propsdata.ok}</p>
                             <p>{((propsdata.ok/propsdata.total)*100).toFixed(2)}%</p>
                           </div>
                           <div className='el' style={{color:"#CF4F4F"}}>
                             <p>Not Ok&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                             <p>{propsdata.bad}</p>
                             <p>{((propsdata.bad/propsdata.total)*100).toFixed(2)}%</p>
                           </div>
                    </div>
                </div>
             </div>
        </div>
        <div className='dbtn'>
        {/* <Link to='/'>
        <button
            className="btn"
        >
        Login
        </button>
        </Link> */}
        <button
            className="btn"
            onClick={downloadFile}
        >
         Download Result
        </button>
        <Link to='/previouswl'>
        <button
            className="btn"
            
        >
        Previous Results
        </button>
        </Link>
        
        
        
        </div>
    </div>
  )
}

export default SeeDetailsWithoutLogin  