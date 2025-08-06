import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const initilaState = {
  name: "",
  description: "",
  price: "",
  category: "",
  quantity: "",
};

function AddProducts() {
  const [product, setProduct] = useState(initilaState);
  const [image, setImage] = useState(null);
  const token = useSelector((state) => state.auth.token);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  }

  function handleImageChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("quantity", product.quantity);
    formData.append("photo", image);

    try {
      await axios.post(
        "https://furnishop-d6qb.onrender.com/api/v1/products/createProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("product Added Successfully✨✨✨");
    } catch (error) {
      console.error("There was an error creating the product:", error);
    } finally {
      setProduct(initilaState);
      setImage(null);
    }
  }

  return (
    <section className="h-[75vh]">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 h-[50vh]">
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              rows="1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="photo"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="category"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="price"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="quantity"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 p-2 bg-orange-500 text-white rounded hover:bg-orange-600"
        >
          Add Product
        </button>
      </form>
    </section>
  );
}

export default AddProducts;
