import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaSearch } from "react-icons/fa";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://e-commerce-backend-qljw.vercel.app/get-products", {
        method: "POST",
        body: JSON.stringify({ userId }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await res.json();
      if (data?.resp !== false) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const res = await fetch(`https://e-commerce-backend-qljw.vercel.app/delete-product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    const data = await res.json();
    if (data) {
      alert("Product deleted successfully");
      getProducts();
    }
  };

  const hanldeUpdate = (id) => {
    navigate(`/updateproduct/${id}`);
  };

  const handleSearch = async (event) => {
    const key = event.target.value;
    setSearch(key);
    if (!key.trim()) {
      getProducts();
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`https://e-commerce-backend-qljw.vercel.app/search/${key}?userId=${userId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      const data = await res.json();
      if (data) {
        const filteredProduct = data.filter((item) => item.userId === userId);
        setProducts(filteredProduct);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Products</h1>

      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search products..."
          />
          <FaSearch className="absolute right-4 top-3 text-gray-400" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl">
            <thead className="bg-blue-600 text-white text-sm uppercase text-left">
              <tr>
                <th className="py-3 px-6">S.No</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Category</th>
                <th className="py-3 px-6">Company</th>
                <th className="py-3 px-6">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6 font-medium">{product.name}</td>
                    <td className="py-3 px-6">${product.price}</td>
                    <td className="py-3 px-6">{product.category}</td>
                    <td className="py-3 px-6">{product.company}</td>
                    <td className="py-3 px-6 flex gap-3">
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                      <button
                        onClick={() => hanldeUpdate(product._id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg flex items-center gap-2"
                      >
                        <FaEdit /> Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Products;
