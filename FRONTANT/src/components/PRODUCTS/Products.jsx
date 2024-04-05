import React, { useEffect, useState } from "react";
import "./Products.css";
import { useNavigate } from "react-router-dom";
const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))._id;
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let data = await fetch("http://localhost:3000/get-products", {
      method: "post",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    if (products.resp != false) {
      setProducts(data);
    }
  };

  const deleteProduct = async (id) => {
    let data = await fetch(`http://localhost:3000/delete-product/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    data = await data.json();
    if (data) {
      alert("product is deleted");
      getProducts();
    }
  };

  const hanldeUpdate = async (id) => {
    navigate(`/updateproduct/${id}`);
  };

  const handleOnchenge = async (event) => {
    const key = event.target.value;
    if (!key || key === " ") {
      getProducts();
    } else {
      let data = await fetch(
        `http://localhost:3000/search/${key}?userId=${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(key, userId);
      data = await data.json();
      if (data) {
        const filteredProduct = data.filter((item) => item.userId == userId);
        setProducts(filteredProduct);
      }
    }
  };

  return (
    <div className="product-list">
      <h1>Products</h1>
      <input
        type="text"
        className="search-box"
        placeholder="Search Here"
        onChange={handleOnchenge}
      />
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((product, index) => (
          <ul key={index}>
            <li>{index + 1}</li>
            <li>{product.name}</li>
            <li>
              <b>$</b>
              {product.price}
            </li>
            <li>{product.category}</li>
            <li>{product.company}</li>
            <li>
              <button
                type="button"
                className="btn btn-danger k"
                onClick={() => deleteProduct(product._id)}
              >
                Delete
              </button>
              {"    "}
              <button
                type="button"
                className="btn btn-info k"
                onClick={() => hanldeUpdate(product._id)}
              >
                Update
              </button>
            </li>
          </ul>
        ))
      ) : (
        <h1 className="no-product">Not Result Found</h1>
      )}
    </div>
  );
};

export default Products;
