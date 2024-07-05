import React from "react";
import { Card, Typography, Row, Col } from "antd";
import "./CardComponent.css";
import Button from "./Button";
import { GiOlive } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <Link to={`/listProducts/${category._id}`}>
      <Card
        hoverable
        title={category.category}
        style={{
          width: "100%",
          font: "Outfit",
          height: "100%",
          backgroundImage: `url(${category.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={2}>{category.category}</Typography.Title>
        {/* <Typography.Text>{text}</Typography.Text> */}
        <br />
        <br />

        <Button color="white" type="primary" style={{ marginTop: 90 }}>
          Ver ahora
          {/* {typeof subtitle === "tring"? (
            <span style={{ marginLeft: 10, color: "#FF69B4" }}>{subtitle}</span>
          ) : (
            subtitle
          )} */}
        </Button>
      </Card>
    </Link>
  );
};

export default CategoryCard;

// const App = () => {
//   return (
//     <div>
//       <Row gutter={[32, 64]} flexWrap='wrap'>
//         <Col xs={24} sm={24} md={24} lg={24} xl={24} span={6} flex={1}>
//           <CardComponent
//             title='OLIVE OIL'
//             text='Discover, Compare Extra virgin olive oil and choose the best.'
//             image='https://picsum.photos/id/1015/400/600'
//             discount={<GiOlive />}
//           />
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={24} xl={24} span={6} flex={1}>
//           <CardComponent
//             title='OLIVE OIL'
//             text='Discover, Compare Extra virgin olive oil and choose the best.'
//             image='https://picsum.photos/id/1016/400/600'
//             discount='-40%'
//             categoryId='olive-oil'
//           />
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={24} xl={24} span={6} flex={1}>
//           <CardComponent
//             title='OLIVE OIL'
//             text='Discover, Compare Extra virgin olive oil and choose the best.'
//             image='https://picsum.photos/id/1017/400/600'
//             discount='-40%'
//             categoryId='olive-oil'
//           />
//         </Col>
//       </Row>
//       <Row gutter={[32, 64]} flexWrap='wrap'>
//         <Col xs={24} sm={24} md={24} lg={24} xl={24} span={6} flex={1}>
//           <CardComponent
//             title='The Big Brand'
//             text='Hasta un 40% de descuento'
//             image='https://picsum.photos/id/1018/400/600'
//             discount='-40%'
//             categoryId='olive-oil'
//           />
//         </Col>
//         <Col xs={24} sm={24} md={24} lg={24} xl={24} span={6} flex={1}>
//           <CardComponent
//             title='The Big Brand'
//             text='Hasta un 40% de descuento'
//             image='https://picsum.photos/id/1019/400/600'
//             discount='-40%'
//             categoryId='olive-oil'
//           />
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default App;
