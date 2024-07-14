import React, { useState, useContext, useEffect } from "react";
import { getFilterProducts } from "../apiService/productApi";
import { ProductContext } from "../context/ProductContext";
import "./FilterProducts.css";

const FilterProducts = ({ setProducts, setTotalProducts, defaultCategory }) => {
  const valueMinPrice = 1;
  const valueMaxPrice = 300;

  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(valueMinPrice);
  const [maxPrice, setMaxPrice] = useState(valueMaxPrice);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { categoryOptions, handleLFindCategories } = useContext(ProductContext);

  const handleFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await getFilterProducts({
        product,
        category,
        minPrice,
        maxPrice,
      });
      setProducts(response.data);
      setTotalProducts(response.data.length);
      resetFilter();
    } catch (err) {
      setError("Error fetching products: ", err);
    } finally {
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setProduct("");
    if (!defaultCategory) {
      setCategory("");
    }
    setMinPrice(valueMinPrice);
    setMaxPrice(valueMaxPrice);
  };

  useEffect(() => {
    handleLFindCategories();
    if (defaultCategory) {
      setCategory(defaultCategory);
    }
  }, []);

  return (
    <div className="container-filter">
      <form onSubmit={handleFilter}>
        <div className="input-filter-name">
          <label>
            Name:
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </label>
        </div>
        <div className="input-filter-category">
          <label>
            Category:
            <select
              disabled={defaultCategory ? true : false}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {defaultCategory ? (
                <option value={defaultCategory} disabled>
                  {defaultCategory}
                </option>
              ) : (
                <option value="" disabled>
                  Please select category
                </option>
              )}
              {categoryOptions.map((categ) => (
                <option key={categ._id} value={categ._id}>
                  {defaultCategory ? defaultCategory : categ.category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="input-filter-minPrice">
          <label>
            Min Price: {minPrice}
            <input
              type="range"
              min={valueMinPrice}
              max={valueMaxPrice}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
        </div>
        <div className="input-filter-maxPrice">
          <label>
            Max Price: {maxPrice}
            <input
              type="range"
              min={valueMinPrice}
              max={valueMaxPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </label>
        </div>
        <button className="button-filter" type="submit">
          Filter
        </button>
        <button
          className="button-filter-reset"
          type="url"
          onClick={resetFilter}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default FilterProducts;
