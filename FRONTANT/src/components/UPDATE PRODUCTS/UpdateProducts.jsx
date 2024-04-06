import { useNavigate, useParams } from "react-router-dom";
import "./UpdateProducts.css";
import { useEffect, useRef, useState } from "react";

const UpdateProducts = () => {
  useParams();
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
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    getProductDetail();
  }, []);

  const getProductDetail = async () => {
    let data = await fetch(
      `https://e-commerce-backend-qljw.vercel.app/getUpdateproduct/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    data = await data.json();
    setData(data);
  };

  const handleUpdateProduct = async () => {
    setName(nameRef.current.value);
    setPrice(priceRef.current.value);
    setCategory(categoryRef.current.value);
    setCompany(companyRef.current.value);
    setUserId(JSON.parse(localStorage.getItem("user"))._id);
    if (!name || !price || !category || !company || !userId) {
      setError(true);
    } else {
      console.log(name, price, category, company, userId);
      let result = await fetch(
        `https://e-commerce-backend-qljw.vercel.app/update-product/${params.id}`,
        {
          method: "put",
          body: JSON.stringify({ name, price, category, userId, company }),
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      result = await result.json();
      alert("Item Update Sucessfull.....");
      navigate("/products");
    }
  };

  return (
    <div className="products">
      <h1>Update Product</h1>
      <input
        type="text"
        ref={nameRef}
        className="product-input"
        placeholder={data.name}
      />
      {error && !name && (
        <span className="invalid-input">Enter Valid Name</span>
      )}
      <input
        type="text"
        ref={priceRef}
        className="product-input"
        placeholder={data.price}
      />
      {error && !price && (
        <span className="invalid-input">Enter Valid Price</span>
      )}
      <input
        type="text"
        ref={categoryRef}
        className="product-input"
        placeholder={data.category}
      />
      {error && !category && (
        <span className="invalid-input">Enter Valid Category</span>
      )}
      <input
        type="text"
        ref={companyRef}
        className="product-input"
        placeholder={data.company}
      />
      {error && !company && (
        <span className="invalid-input">Enter Valid Company</span>
      )}
      <button className="add-btn" onClick={handleUpdateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProducts;
