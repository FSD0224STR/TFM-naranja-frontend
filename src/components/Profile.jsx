import React, { useState, useEffect } from "react";
import { Form, Input, Avatar, message } from "antd";
import { updateUser } from "../apiService/userApi";
import { useAuth } from "../context/LogContext";
import Breadcrumb from "./BreadCrumb";
import ImgUpload from "./ImgUpload";
import Button from "./Button";
import "./Profile.css";

const Profile = () => {
  const { userData, getDataUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(userData.image);
  const [formData, setFormData] = useState(userData);
  const [form] = Form.useForm();

  useEffect(() => {
    setProfilePicture(userData.image);
    form.setFieldsValue({
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
    });
  }, [userData, form]);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const response = await updateUser(userData._id, {
        firstname: formData.firstname,
        lastname: formData.lastname,
        image: profilePicture,
      });

      if (response.error) {
        message.error("Error al editar usuario en BBDD.");
      } else {
        try {
          await getDataUser(userData.email);
          message.success("Usuario actualizado correctamente");
          setIsEditing(false);
        } catch (error) {
          message.error(
            "ocurrio un error mientras se recuperaba los datos del usuario"
          );
        }
      }
    } catch (error) {
      message.error("ocurrio un error mientras se actualizaba el usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
    form.resetFields();
    setProfilePicture(userData.image);
  };

  const handleImageUpload = (imageUrl) => {
    setProfilePicture(imageUrl);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <>
      <Breadcrumb title="Profile" />

      <div className="profile-container">
        <h1 className="profile-title">User Profile</h1>
        {isEditing ? (
          <Form
            form={form}
            onFinish={handleUpdate}
            layout="vertical"
            className="profile-form"
          >
            <Form.Item label="First Name">
              <Input
                className="profile-input"
                value={formData.firstname}
                onChange={handleInputChange}
                name="firstname"
              />
            </Form.Item>
            <Form.Item label="Last Name">
              <Input
                className="profile-input"
                value={formData.lastname}
                onChange={handleInputChange}
                name="lastname"
              />
            </Form.Item>
            <Form.Item label="Email">
              <Input
                disabled
                className="profile-input"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
              />
            </Form.Item>
            <Form.Item label="Profile Picture">
              <ImgUpload
                onSetImages={handleImageUpload}
                currentImage={profilePicture}
                className="profile-image-upload"
              />
            </Form.Item>
            <Form.Item>
              <Button
                color="white"
                type="primary"
                htmlType="submit"
                loading={loading}
                className="profile-button"
              >
                Update
              </Button>
              <Button
                color="red"
                type="default"
                onClick={handleCancel}
                className="profile-button"
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div className="profile-view">
            <Avatar
              size={100}
              src={profilePicture}
              className="profile-avatar"
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
              color="white"
              type="primary"
              onClick={handleEdit}
              className="profile-button"
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
