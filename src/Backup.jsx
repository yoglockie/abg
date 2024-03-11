import React, { useState } from 'react';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [good,setGood]=useState(0);
  const [bad,setBad]=useState(0);
  const [notOk,setNotOk]=useState(0);
  const [total,setTotal]=useState(0);
  const [inputImageBlob,setinputImageBlob]=useState("");
  const [outputImageBlob,setoutputImageBlob]=useState("");
  const [isInputLoading, setIsInputLoading] = useState(false);
  const [isOutputLoading, setIsOutputLoading] = useState(true);

  const uploadFile = () => {
    setIsOutputLoading(false);
    const fileInput = document.getElementById('formFile');
    const file = fileInput.files[0];
   
    if (file) {
      

      const reader = new FileReader();
      
      reader.onload = (event) => {
       
        const base64String = event.target.result;
        const base64Content = base64String.split(',')[1];
        // Set the uploaded image URL
        setImageUrl(base64String);
        
        
       // Send the base64String to the server
        fetch('https://mandelbulbtech.in/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ image: base64Content }),
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
            console.log(data);
            setBad(data.bad)
            setGood(data.good)
            setTotal(data.total)
            setinputImageBlob(data.inputImageBlob)
            setoutputImageBlob(data.processedImageBase64)
            setIsOutputLoading(true);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      
        };
      // Read the file as data URL
      reader.readAsDataURL(file);

     

    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="header">
          <div className="s-nav">
            <img src="https://companieslogo.com/img/orig/GRASIM.NS_BIG-12105e87.png?t=1603311859" alt="logo" style={{width:"30px",height:"30px"}}/>
            Aditya Birla Grasim
          </div>
          
      </header>
      
      <div className="upper-part">
        <div className="mb-3">
         
        <label class="custom-file-upload">
          <input type="file" id="formFile"/>
          
        </label>
          <button
            onClick={uploadFile}
            className="btn"
          >
            Upload File
          </button>
          </div>
        </div>

      <div className="lower-part">
        <div className="img-container">
          {/* Uploaded image */}
          {/* {isInputLoading?
          :
          <div className='hello'>
            <p>Input Image Loading</p>
            <div className="loading-spinner"></div>
          </div>
        } */}
          <img
            src={imageUrl}
            id="uploadedImage"
            // alt="Select Input Image ↑"
            onerror="this.style.opacity='0'"
            width="200"
            height="200"
            className="rounded aspect-image overflow-hidden object-cover object-center dark:border-gray-800 dark:border-gray-800"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
          />
          
        </div>
         
        <div className="img-container">
          {/* Uploaded image */}
          {isOutputLoading?<img
            src={`data:image/png;base64,${outputImageBlob}`}
            onerror="this.style.opacity='0'"
            id="uploadedImage"
            // alt="Output image"
            width="200"
            height="200"
            className="rounded aspect-image overflow-hidden object-cover object-center dark:border-gray-800 dark:border-gray-800"
            style={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}
          />:
          <div className='hello'>
            <p>Output Image Loading</p>
            <div className="loading-spinner"></div>
          </div>
          }
          
          
        </div>


        <div className="output-percentage">
          {/* Output percentage */}
          <div className="grid gap-3" style={{ width: '350px' }}>
            
           
            <div className="ele">
                  <div className='el'>
                    <p>Total</p>
                    <p>{total}</p>
                    <p>100.00%</p>
                  </div>
                  <div className='el'>
                    <p>Good</p>
                    <p>  {good}</p>
                    <p>{((good/total)*100).toFixed(2)}%</p> 
                  </div>
                  <div className='el'>
                    <p>Ok</p>
                    <p>  {bad}</p>
                    <p>{((bad/total)*100).toFixed(2)}%</p>
                  </div>
                  <div className='el'>
                    <p>Not Ok</p>
                    <p>{bad}</p>
                    <p>{((bad/total)*100).toFixed(2)}%</p>
                  </div>
   
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;