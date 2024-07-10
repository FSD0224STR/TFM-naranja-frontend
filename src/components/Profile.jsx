import React, { useState, useCallback, useEffect } from "react";
import "./Profile.css";
import Button from "./Button";
import { updateUser } from "../apiService/userApi";
// import ImageUploader from "./ImageUploader";

export default function Profile() {
  const [userData, setUserData] = useState({
    id: "", // Add id property to store the user's ID
    username: "",
    fullname: "",
    password: "",
    email: "",
    description: "",
    imageFileUrl: null,
    imageFile: null,
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleImageUpload = useCallback((uploadedFile) => {
    setUserData((prevState) => ({
      ...prevState,
      imageFileUrl: uploadedFile.secure_url,
      imageFile: uploadedFile, // Store the uploaded file
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // Preparando el data
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("fullname", userData.fullname);
      formData.append("password", userData.password);
      formData.append("description", userData.description);
      if (userData.imageFile && userData.imageFile instanceof File) {
        formData.append("image", userData.imageFile); // Send the File object
      }

      try {
        const response = await updateUser(userData.id, formData);
        if (response.error) {
          console.error(`Error updating user: ${response.error}`);
        } else {
          alert(`User updated successfully!`);
        }
      } catch (error) {
        console.error(`Error updating user: ${error.message}`);
      }
    },
    [userData]
  );

  useEffect(() => {
    // Fetch user data from API or local storage
    const userId = localStorage.getItem("userId");
    if (userId) {
      setUserData((prevState) => ({ ...prevState, id: userId }));
    }
  }, []);

  return (
    <div className="styleAccount">
      <div className="styleInfo">
        <h1>User profile</h1>
        <p>Create your profile and change your personal infos</p>
      </div>
      <form className="styleBox" onSubmit={handleSubmit}>
        <div className="styleImg">
          {/* <input
            onUpload={(file) => handleImageUpload(file)}
            label='Upload your image'
          /> */}
          {userData.imageFileUrl && (
            <img
              src={userData.imageFileUrl}
              alt="Image"
              width={150}
              height={150}
              className="imageBox"
            />
          )}
          <p className="imagePara">Upload your image</p>
        </div>
        <div className="accountForm">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userData.username}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={userData.fullname}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            value={userData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={handleInputChange}
          />

          <Button type="submit">Update Profile</Button>
        </div>
        <div className="userInfo">
          <h2>User Information</h2>
          <p>Username: {userData.username}</p>
          <p>Full Name: {userData.fullname}</p>
          <p>Email: {userData.email}</p>
          {userData.imageFileUrl && (
            <img
              src={userData.imageFileUrl}
              alt="Image"
              width={100}
              height={100}
              className="imageBox"
            />
          )}
        </div>
      </form>
    </div>
  );
}
