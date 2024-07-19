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
    } catch (error) {
      message.error("Error cargando imagenes en cloudinary");
      setUploading(false);
    }
  };

  return (
    <>
      <Upload.Dragger
        multiple={true}
        accept=".jpg,.jpeg,.png"
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
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
      </Upload.Dragger>
      <p>{uploading ? `Uploading... ${uploadProgress}%` : <span />}</p>
      <div className="image-previews">
        {imagesPreview.map((preview, index) => (
          <img
            key={index}
            src={preview}
            alt="product images"
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
            <a href={url} target="_blank" rel="noopener noreferrer"></a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ImgUpload;
