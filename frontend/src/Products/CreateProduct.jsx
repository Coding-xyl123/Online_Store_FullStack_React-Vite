/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddBookMutation } from "../redux/products/booksApi";
import Swal from "sweetalert2";
import InputField from "../dashboard/Add/InputField";
import SelectField from "../dashboard/Add/SelectField";

const CreateProduct = ({ onProductCreated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [addBook, { isLoading, isError }] = useAddBookMutation();
  const [imageFileName, setImageFileName] = useState("");

  const onSubmit = async (data) => {
    const newBookData = {
      ...data,
      coverImage: imageFileName,
    };
    try {
      await addBook(newBookData).unwrap();
      Swal.fire({
        title: "Product added",
        text: "Your Product is uploaded successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      reset();
      setImageFileName("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error(error);
      alert("Failed to add book. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full p-6 sm:p-8 bg-white rounded-md shadow-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">
          Create Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <InputField
              label="Title"
              name="title"
              placeholder="Enter book title"
              register={register}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Product Description
            </label>
            <InputField
              label="Description"
              name="description"
              placeholder="Enter book description"
              type="textarea"
              register={register}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <SelectField
                label="Category"
                name="category"
                options={[
                  { value: "", label: "Choose A Category" },
                  { value: "business", label: "Business" },
                  { value: "technology", label: "Technology" },
                  { value: "fiction", label: "Fiction" },
                  { value: "horror", label: "Horror" },
                  { value: "adventure", label: "Adventure" },
                ]}
                register={register}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Old Price
              </label>
              <InputField
                label="Old Price"
                name="oldPrice"
                type="number"
                placeholder="Old Price"
                register={register}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                New Price
              </label>
              <InputField
                label="New Price"
                name="newPrice"
                type="number"
                placeholder="New Price"
                register={register}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Add Image Link
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2 w-full"
                />
                {imageFileName && (
                  <p className="text-sm text-gray-500 ml-2">{imageFileName}</p>
                )}
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

          <div className="">
            <button
              type="submit"
              className="px-9 py-2 right-0 bg-blue-500 text-white font-bold rounded-md"
            >
              {isLoading ? (
                <span className="">Adding.. </span>
              ) : (
                <span>Add Book</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
