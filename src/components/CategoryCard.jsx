import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

const CategoryCard = ({ category }) => {
  return (
    <Card
      hoverable
      style={{ width: 240, margin: '1rem', borderRadius: 10 }}
      cover={<img alt={category.name} src={category.image} />}
    >
      <Meta title={category.name} description={category.description} />
    </Card>
  );
};

export default CategoryCard;
