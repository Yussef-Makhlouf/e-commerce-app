import React from "react";
import "./CategoryCard.css"; 

const CategoryCard = ({ icon, category }) => {
  return (
    <div className="category-card text-center p-3">
      <i className={`fa ${icon} fa-2x`} aria-hidden="true"></i>
      <div className="mt-2 category-text">{category}</div>
    </div>
  );
};

export default CategoryCard;
