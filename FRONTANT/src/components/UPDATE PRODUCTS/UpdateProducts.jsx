import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef();
  const priceRef = useRef();
  const categoryRef = useRef();
  const companyRef = useRef();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch(
        `https://e-commerce-backend-qljw.vercel.app/getUpdateproduct/${id}`,
        {
          headers: {
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      const data = await response.json();
      setProduct(data);
    } catch (err) {
      console.error("Failed to fetch product:", err);
    }
  };

  const handleUpdateProduct = async () => {
    const name = nameRef.current.value.trim();
    const price = priceRef.current.value.trim();
    const category = categoryRef.current.value.trim();
    const company = companyRef.current.value.trim();
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    if (!name || !price || !category || !company || !userId) {
      setError(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://e-commerce-backend-qljw.vercel.app/update-product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
          body: JSON.stringify({ name, price, category, company, userId }),
        }
      );
      await response.json();
      alert("Product updated successfully!");
      navigate("/products");
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Update Product
        </h1>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              ref={nameRef}
              defaultValue={product.name}
              placeholder="Product Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !nameRef.current?.value && (
              <p className="text-red-500 text-sm mt-1">Enter valid name</p>
            )}
          </div>

          <div>
            <input
              type="text"
              ref={priceRef}
              defaultValue={product.price}
              placeholder="Product Price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !priceRef.current?.value && (
              <p className="text-red-500 text-sm mt-1">Enter valid price</p>
            )}
          </div>

          <div>
            <input
              type="text"
              ref={categoryRef}
              defaultValue={product.category}
              placeholder="Product Category"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !categoryRef.current?.value && (
              <p className="text-red-500 text-sm mt-1">Enter valid category</p>
            )}
          </div>

          <div>
            <input
              type="text"
              ref={companyRef}
              defaultValue={product.company}
              placeholder="Product Company"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error && !companyRef.current?.value && (
              <p className="text-red-500 text-sm mt-1">Enter valid company</p>
            )}
          </div>
        </div>

        <button
          onClick={handleUpdateProduct}
          className={`mt-6 w-full bg-blue-600 text-white py-2 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition duration-200 ${loading ? "cursor-not-allowed opacity-75" : ""
            }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" /> Updating Product...
            </>
          ) : (
            "Update Product"
          )}
        </button>
      </div>
    </div>
  );
};

export default UpdateProducts;
