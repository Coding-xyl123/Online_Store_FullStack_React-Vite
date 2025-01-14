/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/cart/productSlice";
import axios from "axios";

const CreateProduct = ({ onProductCreated }) => {
  axios.defaults.baseURL = "http://localhost:5005/";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState({});
  const [imageFile, setImageFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (!validateForm()) {
      console.log("Form validation failed");
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Attempting to create product...");
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("stock", formData.stock);
      formDataToSend.append("image", imageFile);

      const response = await axios.post(
        "/api/books/create-books",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product created successfully:", response.data);

      dispatch(addProduct(response.data));
      console.log("Product added to Redux store");

      navigate("/p", { replace: true });
      console.log("Navigation triggered");

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        imageUrl: "",
      });
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 h-full ">
      <div className="max-w-3xl mx-auto p-6 sm:p-8">
        <h1 className="text-2xl text-center font-semibold mb-4 sm:mb-6 md:text-left">
          Create Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 sm:p-8 rounded-md shadow-lg"
        >
          <div className="rounded-md">
            <label className="block text-sm mb-2">Product name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border rounded-md p-2 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="iWatch"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-2">Product Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 h-32"
              placeholder="Enter product description..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
              >
                <option value="">Select Category</option>
                <option value="category1">Category1</option>
                <option value="category2">Category2</option>
                <option value="category3">Category3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                placeholder="50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">In Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2"
                placeholder="100"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Add Image Link</label>
              <div className="flex relative">
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className="flex-1 border rounded-md p-2"
                />
              </div>
            </div>
          </div>

          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-48 w-full object-cover mx-auto"
              />
            ) : (
              <div className="text-gray-400">Image preview</div>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors w-full sm:w-auto text-left"
              style={{ margin: "0 auto 0 0", display: "block" }}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
