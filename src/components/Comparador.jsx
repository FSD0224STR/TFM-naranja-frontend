import React, { useState } from "react";

const ProductComparator = ({ productList, selectedProducts }) => {
  const [productsToCompare, setProductsToCompare] = useState([]);

  const compareProducts = () => {
    const productsToCompare = productList.filter(product =>
      selectedProducts.includes(product)
    );
    setProductsToCompare(productsToCompare);
  };

  return (
    <>
    
    </>
  );
};

