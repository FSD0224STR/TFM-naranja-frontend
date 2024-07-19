import { useState } from "react";
import { Card, Tooltip, message } from "antd";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaCopy, FaRegCopy } from "react-icons/fa";
import Button from "./Button";

const ProductCard = ({ item, handleLViewProduct, handleLAddProductCart }) => {
  const [isCopied, setIsCopied] = useState(false);
  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[0]
      : "https://www.olivaoliva.com/4740-thickbox_default/numun-seleccion-vino-tinto-botella-de-vidrio-750-ml.jpg";

  const handleCopyProduct = () => {
    const productLink = `http://localhost:5173/detailsProduct/${item.slug}`;
    navigator.clipboard
      .writeText(productLink)
      .then(() => {
        message.success("Product link copiado");
      })
      .catch((err) => {
        message.error("Copiar el product link falla.");
      });
    setIsCopied(!isCopied);
  };

  return (
    <Card
      hoverable
      key={item.slug}
      title={
        <h2
          style={{
            fontSize: "22px",
            color: "#023859",
            textAlign: "center",
            textShadow: "0 4px #fff",
          }}
        >
          {item.product}
        </h2>
      }
      style={{
        width: "100%",
        maxHeight: "350px",
        margin: "20px auto",
        maxWidth: "450px",
        borderRadius: "0px",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Tooltip title="Copy Product Link">
        <span style={{ marginLeft: 10 }}>
          {isCopied ? (
            <FaCopy size={20} color="#FF69B4" />
          ) : (
            <FaRegCopy size={20} color="#FF69B4" onClick={handleCopyProduct} />
          )}
        </span>
      </Tooltip>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px 16px",
          backgroundColor: "rgba(0,0,0,0.25)",
          color: "#2d83a6",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          color="white"
          type="primary"
          onClick={() => handleLViewProduct(item.slug)}
          style={{
            display: "flex",
            marginRight: "12px",
            backgroundColor: "#007BFF",
            borderColor: "#007BFF",
          }}
        >
          View Details
        </Button>

        <Tooltip style={{ color: "#1877f2" }} title="Add Product to Compare">
          <span>
            <AiFillPlusCircle
              onClick={() => handleLAddProductCart(item)}
              size={26}
              color="#1877f2"
            />
          </span>
        </Tooltip>
      </div>
    </Card>
  );
};

export default ProductCard;
