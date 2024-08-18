// import React from 'react';

// function ProductPhoto({ imagePath }) {
//   // Correct the path to use forward slashes
//   const correctedPath = imagePath?.replace(/\\/g, '/');
  
//   return (
//     <div>
//       <img 
//         src={`D:/iti/react/FinalReact/backendreact/${correctedPath}`}///`http://localhost:5000/uploads/${correctedPath}`} ///uploads/photo-1723901659796.jpg
//                                   //D:\iti\react\FinalReact\backendreact\uploads\photo-1723901659796.jpg
//         alt="Product" 
//         style={{ width: '300px', height: 'auto' }} 
//       />
//     </div>
//   );
// }

// export default ProductPhoto;
import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';

const Dashboard = () => {
  const [file, setFile] = useState("");

  const handleFiles = files => {
    setFile(files.base64);
  }

  return (
    <div className="files">
      <ReactFileReader handleFiles={handleFiles}>
        <button className='btn'>Upload</button>
      </ReactFileReader>

      <p>Read</p>
      <iframe src={file} frameBorder="0" height="400" width="50%" />
    </div>
  );
};

export default Dashboard;
