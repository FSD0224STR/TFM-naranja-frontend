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
      const values = await form.validateFields();
      const response = await updateUser(userData._id, {
        ...values,
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
    form.resetFields();
    setProfilePicture(userData.image);
  };

  const handleImageUpload = (imageUrl) => {
    setProfilePicture(imageUrl);
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
            initialValues={{
              firstname: userData.firstname,
              lastname: userData.lastname,
              email: userData.email,
            }}
          >
            <Form.Item label="First Name" name="firstname">
              <Input className="profile-input" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastname">
              <Input className="profile-input" />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled className="profile-input" />
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
