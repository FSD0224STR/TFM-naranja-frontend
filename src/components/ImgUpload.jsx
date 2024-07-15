import React, { useState } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const ImgUpload = ({ onSetImages }) => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrls, setImageUrls] = useState([]); // new state to store image URLs
  const upload_preset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (info) => {
    console.log(info, "a1");
    const newImages = info.fileList;
    setImages(newImages);
    const newPreviews = newImages.map((image) =>
      URL.createObjectURL(image.originFileObj)
    );
    setImagesPreview(newPreviews);
    uploadImage();
  };

  const uploadImage = async () => {
    setUploading(true);
    setUploadProgress(0);

    try {
      const imageUrls = await Promise.all(
        images.map((image) => {
          const formData = new FormData();
          formData.append("file", image.originFileObj);
          formData.append("upload_preset", upload_preset);
          formData.append("cloud_name", "hgtrcelj");
          formData.append("api_key", "941249298226671");
          formData.append("timestamp", Date.now() / 1000);

          return fetch(
            `https://api.cloudinary.com/v1_1/${"hgtrcelj"}/image/upload`,
            {
              method: "POST",
              body: formData,
              onUploadProgress: (event) => {
                const progress = Math.round((event.loaded * 100) / event.total);
                setUploadProgress(progress);
              },
            }
          )
            .then((response) => response.json())
            .then((imgData) => imgData.url);
        })
      );

      setImageUrls(imageUrls);
      setImages([]);
      setImagesPreview([]);
      onSetImages(imageUrls);
      console.log("Image URLs:", imageUrls);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  return (
    <>
      <Upload.Dragger
        multiple={true}
        accept='.jpg,.jpeg,.png'
        onChange={handleImageChange}
        onRemove={(file) => {
          setImages((prevImages) =>
            prevImages.filter((img) => img.uid !== file.uid)
          );
          setImagesPreview((prevPreviews) =>
            prevPreviews.filter((preview, index) => index !== file.uid)
          );
        }}
      >
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
        <p className='ant-upload-hint'>Support for a single or bulk upload.</p>
      </Upload.Dragger>
      <p>{uploading ? `Uploading... ${uploadProgress}%` : <span />}</p>
      <div className='image-previews'>
        {imagesPreview.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt='product images'
            style={{
              width: 100,
              height: 100,
              marginRight: 10,
              objectFit: "cover",
            }}
          />
        ))}
      </div>
      <p>Uploaded images:</p>
      <ul>
        {imageUrls.map((url, index) => (
          <li key={index}>
            <a href={url} target='_blank' rel='noopener noreferrer'>
              {url}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImgUpload;
//-----------------------------------//
// import React, { useState } from "react";
// import { Upload, message } from "antd";
// import { InboxOutlined } from "@ant-design/icons";
// // import cloudinary from "cloudinary/react";

// const ImgUpload = () => {
//   const [images, setImages] = useState([]);
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const upload_preset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET;

//   const handleUpload = async ({ images, onSuccess, onError }) => {
//     setUploading(true);
//     setUploadProgress(0); // Reset progress for each upload

//     const formData = new FormData();
//     formData.append("file", images);
//     formData.append("upload_preset", upload_preset);
//     formData.append("cloud_name", "hgtrcelj");
//     formData.append("api_key", "941249298226671");
//     formData.append("timestamp", Date.now() / 1000);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${"hgtrcelj"}/image/upload`,
//         {
//           method: "POST",
//           body: formData,
//           onUploadProgress: (event) => {
//             // Track upload progress
//             const progress = Math.round((event.loaded * 100) / event.total);
//             setUploadProgress(progress);
//           },
//         }
//       );

//       const data = await response.json();
//       onSuccess(data.secure_url);
//       setImages((prevImages) => [...prevImages, data.secure_url]);
//       setImageUrl(data.secure_url);
//       alert(data.secure_url);
//       message.success("Image uploaded successfully!");
//     } catch (error) {
//       onError(error);
//       message.error(`Error uploading image: ${error.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemove = (file) => {
//     setImages((prevImages) => prevImages.filter((image) => image !== file));
//   };

//   return (
//     <Upload.Dragger
//       name='file'
//       multiple={true}
//       accept='.jpg,.jpeg,.png'
//       beforeUpload={(file) => {
//         const isImage = file.type.indexOf("image/") === 0;
//         if (!isImage) {
//           message.error(`${file.name} is not a valid image file`);
//           return false;
//         }
//         return true;
//       }}
//       customRequest={handleUpload}
//       onRemove={handleRemove}
//       showUploadList={{
//         renderItem: (item) => (
//           <li key={item.uid}>
//             {item.status === "uploading" ? (
//               <div className='upload-progress'>
//                 <p>{item.name}</p>
//                 <p>{uploadProgress}%</p>
//               </div>
//             ) : (
//               <div>
//                 <img src={item.url} alt={item.name} style={{ width: 100 }} />
//                 <a href={item.url} download={item.name}>
//                   Download
//                 </a>
//               </div>
//             )}
//           </li>
//         ),
//       }}
//     >
//       <p className='ant-upload-drag-icon'>
//         <InboxOutlined />
//       </p>
//       <p className='ant-upload-text'>Click or drag image files to upload</p>
//       <p className='ant-upload-hint'>Supports JPG, JPEG, PNG files</p>
//     </Upload.Dragger>
//   );
// };

// export default ImgUpload;
