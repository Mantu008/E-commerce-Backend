import { useNavigate } from "react-router-dom";
import "./AddProducts.css";
import { useRef, useState } from "react";

const AddProducts = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const companyRef = useRef();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(false);

  const handleaddProduct = async () => {
    setName(nameRef.current.value);
    setPrice(priceRef.current.value);
    setCategory(categoryRef.current.value);
    setCompany(companyRef.current.value);
    setUserId(JSON.parse(localStorage.getItem("user"))._id);

    if (!name || !price || !category || !company || !userId) {
      setError(true);
    } else {
      let result = await fetch("http://localhost:3000/add-product", {
        method: "post",
        body: JSON.stringify({ name, price, category, userId, company }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      alert("Item add Sucessfull.....");
      navigate("/products");
    }
  };

  return (
    <div className="products">
      <h1>Add Products</h1>
      <input
        type="text"
        ref={nameRef}
        className="product-input"
        placeholder="Enter Product Name"
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid Name</span>
      )}
      <input
        type="text"
        ref={priceRef}
        className="product-input"
        placeholder="Enter Product Price"
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid Price</span>
      )}
      <input
        type="text"
        ref={categoryRef}
        className="product-input"
        placeholder="Enter Product Category"
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid Category</span>
      )}
      <input
        type="text"
        ref={companyRef}
        className="product-input"
        placeholder="Enter Product Company"
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid Company</span>
      )}
      <button className="add-btn" onClick={handleaddProduct}>
        Add Product
      </button>
    </div>
  );
};

export default AddProducts;
