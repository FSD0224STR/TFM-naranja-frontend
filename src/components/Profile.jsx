import React, { useState, useEffect } from "react";
import { Form, Input, Avatar } from "antd";
import { updateUser, getUser } from "../apiService/userApi";
import { useAuth } from "../context/LogContext";
import Breadcrumb from "./BreadCrumb";
import ImgUpload from "./ImgUpload";
import Button from "./Button";
import "./Profile.css";

const Profile = () => {
  const { userData, getDataUser, setUserData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(userData.image);
  const [formData, setFormData] = useState(userData);

  useEffect(() => {
    const fetchData = async () => {
      const email = userData.email;
      const response = await getDataUser(email);
      if (!response.error) {
        setUserData(response.data);
        setProfilePicture(response.data.image);
      } else {
        console.error("Error fetching user data:", response.error);
      }
    };

    fetchData();
  }, [getDataUser, setUserData, userData.email]);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleUpdate = async () => {
    setLoading(true);
    const response = await updateUser(userData._id, {
      ...formData,
      image: profilePicture,
    });
    setLoading(false);
    if (!response.error) {
      const updatedUser = await getDataUser(userData.email);
      if (!updatedUser.error) {
        setUserData(updatedUser.data);
        setProfilePicture(updatedUser.data.image);
      } else {
        console.error("Error fetching updated user data:", updatedUser.error);
      }
      setIsEditing(false);
      alert("User updated successfully!");
    } else {
      alert("Error updating user: " + response.error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
  };

  const handleImageUpload = (imageUrl) => {
    setProfilePicture(imageUrl);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  useEffect(() => {
    console.log("userData:", userData);
    console.log("formData:", formData);
    console.log("profilePicture:", profilePicture);
  }, [userData, formData, profilePicture]);

  return (
    <>
      <Breadcrumb title='Profile' />

      <div className='profile-container'>
        <h1 className='profile-title'>User Profile</h1>
        {isEditing ? (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleUpdate();
            }}
            layout='vertical'
            className='profile-form'
          >
            <Form.Item label='First Name'>
              <Input
                className='profile-input'
                value={formData.firstname}
                onChange={handleInputChange}
                name='firstname'
              />
            </Form.Item>
            <Form.Item label='Last Name'>
              <Input
                className='profile-input'
                value={formData.lastname}
                onChange={handleInputChange}
                name='lastname'
              />
            </Form.Item>
            <Form.Item label='Email'>
              <Input
                disabled
                className='profile-input'
                value={formData.email}
                onChange={handleInputChange}
                name='email'
              />
            </Form.Item>
            <Form.Item label='Profile Picture'>
              <ImgUpload
                onSetImages={handleImageUpload}
                currentImage={profilePicture}
                className='profile-image-upload'
              />
            </Form.Item>
            <Form.Item>
              <Button
                color='white'
                type='primary'
                htmlType='submit'
                loading={loading}
                className='profile-button'
              >
                Update
              </Button>
              <Button
                color='red'
                type='default'
                onClick={handleCancel}
                className='profile-button'
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className='profile-view'>
            <Avatar
              size={100}
              src={profilePicture}
              className='profile-avatar'
            />
            <p>
              <strong>First Name:</strong> {userData.firstname}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.lastname}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <Button
              color='white'
              type='primary'
              onClick={handleEdit}
              className='profile-button'
            >
              Edit
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
