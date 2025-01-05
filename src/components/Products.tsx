import { useEffect, useState } from "react";
import axios from "../axios/config";
import { AxiosError } from "axios";
import Swal from "sweetalert2";
import newIcon from "/newProduct.png";
import { Link } from "react-router-dom";
import delete_btn from "/borrar.png";
import loading_gif from "/loading_gif.gif";

interface Product {
  _id: string;
  name: string;
  price: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/products");
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        setError("No products were found.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let sorted = [...products];
    if (sortOption === "asc") {
      sorted = sorted.sort((a, b) => a.price - b.price);
    } else if (sortOption === "desc") {
      sorted = sorted.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sorted);
  }, [sortOption, products]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        const { data } = await axios.delete(`/products/${id}`);
        Swal.fire({
          icon: "success",
          title: "Product Deleted",
          text: data,
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== id)
        );
        setFilteredProducts((prevFiltered) =>
          prevFiltered.filter((product) => product._id !== id)
        );
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: String((error as AxiosError).response?.data),
        });
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-[30px] flex justify-between items-center">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-roboto"
        >
          <option value="none">Unordered</option>
          <option value="asc">Price: lower</option>
          <option value="desc">Price: highest</option>
        </select>
        <Link to="/new/product">
          <img
            src={newIcon}
            alt="new_icon"
            className="w-[50px] cursor-pointer transition-all ease-in-out duration-[0.2s] hover:scale-[1.2]"
          />
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <img src={loading_gif} alt="Loading..." className="w-[400px]" />
        </div>
      ) : error ? (
        <p className="text-center text-gray-700">{error}</p>
      ) : (
        <div
          className={`flex flex-wrap gap-10 mb-[200px] ${
            filteredProducts.length < 4 ? "justify-center" : "justify-start"
          }`}
        >
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-6 bg-white shadow-md min-w-[250px] flex-grow relative"
            >
              <button
                onClick={() => handleDelete(product._id)}
                className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700"
              >
                <img
                  src={delete_btn}
                  alt="delete_btn"
                  className="w-[30px] cursor-pointer"
                />
              </button>
              <h2 className="text-xl font-semibold mb-4 font-roboto">
                {product.name}
              </h2>
              <p className="text-gray-700 mb-2">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
