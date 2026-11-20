import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../styles/CategoryCard.css';

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/quick-shopping?category=${category.slug}`} className="category-card">
      <div className="cat-img-wrapper">
        <img
          src={category.image}
          alt={category.name}
          className="cat-img"
          loading="lazy"
        />
        <div className="cat-overlay"></div>
        {category.popular && (
          <span className="cat-popular-pill">
            <Sparkles size={11} /> Popular
          </span>
        )}
      </div>

      <div className="cat-info">
        <div className="cat-header">
          <h3 className="cat-name">{category.name}</h3>
          <span className="cat-tamil">{category.tamilName}</span>
        </div>
        <p className="cat-desc">{category.description}</p>
        <div className="cat-footer">
          <span className="cat-count">{category.itemCount || '5 Varieties'}</span>
          <span className="cat-arrow">
            Explore <ArrowRight size={14} className="arrow-icon" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
