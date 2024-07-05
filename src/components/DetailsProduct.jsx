import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tag, Tooltip, Button, Carousel } from "antd";
import { AiFillEdit } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import { findOneProduct } from "../apiService/productApi";
import "./DetailsProduct.css";
import BreadCrumb from "./BreadCrumb";

const DetailsProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  const { handleLAddProductCart } = useContext(CartContext);

  const handleGetProduct = async () => {
    try {
      const response = await findOneProduct(id);

      if (response.error) {
        console.error("Error al obtener producto:", response.error);
      } else {
        setProduct(response.data);
      }
    } catch (error) {
      console.error("Error al ejecutar findOneProduct:");
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BreadCrumb title='listProducts' />

      <div className='product-details'>
        <div className='product-image-container'>
          {product && product.images && (
            <Carousel autoplay>
              {product.images.map((images, index) => (
                <div key={index}>
                  <img src={images} alt={`Product image ${index + 1}`} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
        <div className='product-info-container'>
          <h1 className='product-title'>{product.product}</h1>
          <p className='product-subtitle'>
            {product.description.substring(0, 100)}
          </p>
          <div className='product-actions'>
            <Tooltip title='Edit Product'>
              <Button
                type='primary'
                onClick={() => navigate(`/editProduct/${id}`)}
              >
                <AiFillEdit className='icon-edit' />
              </Button>
            </Tooltip>
            <Tooltip title='Add Product to Cart'>
              <Button
                type='link'
                onClick={() => handleLAddProductCart(product)}
              >
                <AiFillPlusCircle size={35} color='lightblue' />
              </Button>
            </Tooltip>
          </div>
          <div className='product-details-container'>
            <div className='detail-item'>
              <label htmlFor='price'>Description</label>
              <p className='price'>{product.description} €</p>
            </div>
            <div className='detail-item'>
              <label htmlFor='price'>Price</label>
              <p className='price'>{product.price} €</p>
            </div>
            <div className='detail-item'>
              <label htmlFor='category'>Category</label>
              <p className='category'>{product.category}</p>
            </div>
            <div className='detail-item'>
              <label htmlFor='brand'>Brand</label>
              <p className='brand'>{product.brand}</p>
            </div>
            <div className='detail-item'>
              <label htmlFor='origin'>Origin</label>
              <p className='origin'>{product.origin}</p>
            </div>
            <div className='detail-item'>
              <label htmlFor='allergens'>Allergens</label>
              <div className='allergens'>
                {product.allergens.map((allergen, index) => (
                  <Tag color='red' key={index}>
                    {allergen}
                  </Tag>
                ))}
              </div>
            </div>
            <div className='detail-item'>
              <label htmlFor='ingredients'>Ingredients</label>
              <div className='ingredients'>
                {product.ingredients.map((ingredient, index) => (
                  <Tag color='blue' key={index}>
                    {ingredient}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsProduct;

// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Tag, Tooltip, Button } from "antd";
// import { AiFillEdit } from "react-icons/ai";
// import { AiFillPlusCircle } from "react-icons/ai";
// import { CartContext } from "../context/CartContext";
// import { findOneProduct } from "../apiService/productApi";
// import ImgCarousel from "./ImgCarousel";
// import "./DetailsProduct.css";

// const DetailsProduct = ({ imageUrls }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   const { handleLAddProductCart } = useContext(CartContext);

//   const handleGetProduct = async () => {
//     try {
//       const response = await findOneProduct(id);

//       if (response.error) {
//         console.error("Error al obtener producto:", response.error);
//       } else {
//         setProduct(response.data);
//       }
//     } catch (error) {
//       console.error("Error al ejecutar findOneProduct:");
//     }
//   };

//   useEffect(() => {
//     handleGetProduct();
//   }, [id]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='product-details'>
//       <div className='product-image-container'>
//         <ImgCarousel images={imageUrls} />
//       </div>
//       <div className='product-info-container'>
//         <h1 className='product-title'>{product.product}</h1>
//         <p className='product-subtitle'>
//           {product.description.substring(0, 100)}
//         </p>
//         <div className='product-actions'>
//           <Tooltip title='Edit Product'>
//             <Button
//               type='primary'
//               onClick={() => navigate(`/editProduct/${id}`)}
//             >
//               <AiFillEdit className='icon-edit' />
//             </Button>
//           </Tooltip>
//           <Tooltip title='Add Product to Cart'>
//             <Button type='link' onClick={() => handleLAddProductCart(product)}>
//               <AiFillPlusCircle size={35} color='lightblue' />
//             </Button>
//           </Tooltip>
//         </div>
//         <div className='product-details-container'>
//           <div className='detail-item'>
//             <label htmlFor='price'>Description</label>
//             <p className='price'>{product.description} €</p>
//           </div>
//           <div className='detail-item'>
//             <label htmlFor='price'>Price</label>
//             <p className='price'>{product.price} €</p>
//           </div>
//           <div className='detail-item'>
//             <label htmlFor='category'>Category</label>
//             <p className='category'>{product.category}</p>
//           </div>
//           <div className='detail-item'>
//             <label htmlFor='brand'>Brand</label>
//             <p className='brand'>{product.brand}</p>
//           </div>
//           <div className='detail-item'>
//             <label htmlFor='origin'>Origin</label>
//             <p className='origin'>{product.origin}</p>
//           </div>
//           <div className='detail-item'>
//             <label htmlFor='allergens'>Allergens</label>
//             <div className='allergens'>
//               {product.allergens.map((allergen, index) => (
//                 <Tag color='red' key={index}>
//                   {allergen}
//                 </Tag>
//               ))}
//             </div>
//           </div>
//           <div className='detail-item'>
//             <label htmlFor='ingredients'>Ingredients</label>
//             <div className='ingredients'>
//               {product.ingredients.map((ingredient, index) => (
//                 <Tag color='blue' key={index}>
//                   {ingredient}
//                 </Tag>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailsProduct;
