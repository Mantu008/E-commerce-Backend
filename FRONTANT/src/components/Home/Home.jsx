
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    price: "₹1,29,900",
    image: "https://images.pexels.com/photos/18525574/pexels-photo-18525574/free-photo-of-unboxing-iphone-15-pro-max-box-in-natural-titanium-color-mention-zana_qaradaghy-on-instagram-while-use-this-photo-follow-on-instagram-zana_qaradaghy.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Nike Air Max",
    price: "₹8,999",
    image: "https://images.pexels.com/photos/9537432/pexels-photo-9537432.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    price: "₹29,990",
    image: "https://images.pexels.com/photos/3693700/pexels-photo-3693700.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

const categories = [
  "Electronics",
  "Fashion",
  "Home Appliances",
  "Books",
  "Toys",
  "Sports",
];

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-6">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white rounded-xl p-6 text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome to E-Shop</h1>
        <p className="text-lg">Find the best products at unbeatable prices!</p>
      </div>

      {/* Categories Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-lg transition cursor-pointer text-center"
            >
              <p className="font-medium text-gray-700">{category}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold mt-2">{product.price}</p>
                <Link
                  to="/products"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
