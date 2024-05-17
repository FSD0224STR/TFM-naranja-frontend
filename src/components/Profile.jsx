import React, { useState, useCallback, useEffect } from "react";
import "./Profile.css";

export default function Profile() {
  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    password: "",
    email: "",
    description: "",
    imageFileUrl: null,
  });

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleImageInputChange = useCallback((event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setUserData((prevState) => ({
      ...prevState,
      imageFileUrl: url,
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (userData.imageFileUrl) {
        URL.revokeObjectURL(userData.imageFileUrl);
      }
    };
  }, [userData.imageFileUrl]);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      // Preparando el data
      const formData = new FormData();
      formData.append("username", userData.username);
      formData.append("fullname", userData.fullname);
      formData.append("password", userData.password);
      formData.append("description", userData.description);
      if (userData.imageFile) {
        formData.append("image", userData.imageFile);
      }
      // enviando data al server
      try {
        const response = await fetch("/api/update-profile", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error("Vaya! your profile not updated");
        }
        const data = await response.json();
        console.log("Profile updated:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [userData]
  );

  return (
    <div className='styleAccount'>
      <div className='styleInfo'>
        <h1>User profile</h1>
        <p>Create your profile and change your personal infos</p>
      </div>
      <form className='styleBox' onSubmit={handleSubmit}>
        <div className='styleImg'>
          <input type='file' onChange={handleImageInputChange} />
          {userData.imageFileUrl && (
            <img
              src={userData.imageFileUrl}
              alt='Image'
              width={150}
              height={150}
              className='imageBox'
            />
          )}
          <p className='imagePara'>Upload your image</p>
        </div>
        <div className='accountForm'>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={userData.username}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='fullname'
            placeholder='Full Name'
            value={userData.fullname}
            onChange={handleInputChange}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={userData.password}
            onChange={handleInputChange}
          />
          <input
            type='email'
            name='email'
            placeholder='email'
            value={userData.email}
            onChange={handleInputChange}
          />
          <textarea
            name='description'
            placeholder='Description'
            value={userData.description}
            onChange={handleInputChange}
          />
          <button type='submit'>Update Profile</button>
        </div>
      </form>
    </div>
  );
}
// import React, { useState } from "react";
// import "./Profile.css";
// import { Button, Descriptions, Radio } from "antd";

// const borderedItems = [
//   {
//     key: "1",
//     label: "Product",
//     children: "Cloud Database",
//   },
//   {
//     key: "2",
//     label: "Billing",
//     children: "Prepaid",
//   },
//   {
//     key: "3",
//     label: "Time",
//     children: "18:00:00",
//   },
//   {
//     key: "4",
//     label: "Amount",
//     children: "$80.00",
//   },
//   {
//     key: "5",
//     label: "Discount",
//     children: "$20.00",
//   },
//   {
//     key: "6",
//     label: "Official",
//     children: "$60.00",
//   },
//   {
//     key: "7",
//     label: "Config Info",
//     children: (
//       <>
//         Data disk type: MongoDB
//         <br />
//         Database version: 3.4
//         <br />
//         Package: dds.mongo.mid
//         <br />
//         Storage space: 10 GB
//         <br />
//         Replication factor: 3
//         <br />
//         Region: East China 1
//         <br />
//       </>
//     ),
//   },
// ];

// const items = [
//   {
//     key: "1",
//     label: "Product",
//     children: "Cloud Database",
//   },
//   {
//     key: "2",
//     label: "Billing",
//     children: "Prepaid",
//   },
//   {
//     key: "3",
//     label: "Time",
//     children: "18:00:00",
//   },
//   {
//     key: "4",
//     label: "Amount",
//     children: "$80.00",
//   },
//   {
//     key: "5",
//     label: "Discount",
//     children: "$20.00",
//   },
//   {
//     key: "6",
//     label: "Official",
//     children: "$60.00",
//   },
// ];

// const Profile = () => {
//   const [size, setSize] = useState("default");
//   const onChange = (e) => {
//     console.log("size checked", e.target.value);
//     setSize(e.target.value);
//   };

//   return (
//     <div className="form-profile">
//       {/* <Radio.Group onChange={onChange} value={size}>
//         <Radio value="default">default</Radio>
//         <Radio value="middle">middle</Radio>
//         <Radio value="small">small</Radio>
//       </Radio.Group>
//       <br />
//       <br /> */}

//       <Descriptions
//         bordered
//         title="Custom Size"
//         size={size}
//         extra={<Button type="primary">Edit</Button>}
//         items={borderedItems}
//       />
//       <br />
//       <br />

//       <Descriptions
//         title="Custom Size"
//         size={size}
//         extra={<Button type="primary">Edit</Button>}
//         items={items}
//       />
//     </div>
//   );
// };
// export default Profile;
