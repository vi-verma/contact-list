import React, { useState } from 'react'
// import { storage } from "../../firebase";
// import { ref, uploadBytes } from 'firebase/storage'

const UploadImage = ({imgName,uploadImage=()=>{} }) => {
    // const [imageUpload, setImageUpload] = useState('');



    // uploadImage = () => {
    //     if(imageUpload == null || imageUpload == '' ) {
    //         alert('Select image to upload.');
    //         return;
    //     }

    //     try{
    //         const imageRef =   ref(storage, `images/${imgName}`);
    //         let res = uploadBytes(imageRef, imageUpload);
    //         console.log("res",res)
    //         setImageUpload('')
    //         alert('Image uploaded successfully');

    //     }catch(error){
    //         console.error(error);
    //     };
    // };


  return (
    <div style={{padding: '12px'}}>
        <input
         type='file' 
        //  size={'<1024kb'} 
         accept="image/png, image/jpeg" 
         name="avatar" 
        //  value={imageUpload}
        //  onChange={(e)=> setImageUpload(e.target.files[0])}
        />
        {/* <button type='button' onClick={uploadImage} >
            Upload image
        </button> */}
    </div>
  );
};

export default UploadImage;