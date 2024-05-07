import React, { useState } from "react";
import { getResults } from "../../../../apiService/productApi";

const SearchComparator = () => {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input1Results, setInput1Results] = useState([]);

  const onImput1Change = async (target) => {
    setInput1(target.value);
    const result = await getResults(target.value);
    setInput1Results(result);
  };

  const onImput2Change = async (target) => {
    setInput2(target.value);
    const result = await getResults;
  };

  return (
    <>
      <input value={input1} onChange={onImput1Change} />
      <input value={input2} onChange={onImput2Change} />
    </>
  );
};

export default { SearchComparator };

/*import React, { useState } from "react";

const ProductComparator = ({ productList, selectedProducts }) => {
  const [productsToCompare, setProductsToCompare] = useState([]);

  const compareProducts = () => {
    const productsToCompare = productList.filter(product =>
      selectedProducts.includes(product)
    );
    setProductsToCompare(productsToCompare);
  };*/
