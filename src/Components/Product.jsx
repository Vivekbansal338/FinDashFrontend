import React from "react";
import "./Product.css";

const Product = ({ product }) => {
  const {
    title,
    category,
    description,
    price,
    discountPercentage,
    stock,
    images,
  } = product;

  return (
    <div className="product">
      <div className="product-image">
        <img src={images[0]} alt={title} />
      </div>
      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-category">{category}</p>
        <p className="product-description">{description}</p>
        <div className="product-price-container">
          <p className="product-price">${price.toFixed(2)}</p>
          {discountPercentage > 0 && (
            <p className="product-discount">{discountPercentage}% OFF</p>
          )}
        </div>
        <p className="product-stock">In Stock: {stock} units</p>
      </div>
    </div>
  );
};

export default Product;
