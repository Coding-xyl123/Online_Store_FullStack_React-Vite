/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import InputField from "../Add/InputField";
import SelectField from "../Add/SelectField";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  useFetchBookByIdQuery,
  useUpdateBookMutation,
} from "../../redux/products/booksApi";

import Swal from "sweetalert2";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

const AddBook = () => {
  const { id } = useParams();
  const {
    data: bookData,
    isLoading,
    isError,
    refetch,
  } = useFetchBookByIdQuery(id);
  const [updateBook] = useUpdateBookMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    if (bookData) {
      setValue("title", bookData.title);
      setValue("description", bookData.description);
      setValue("category", bookData?.category);
      setValue("trending", bookData.trending);
      setValue("oldPrice", bookData.oldPrice);
      setValue("newPrice", bookData.newPrice);
      setValue("coverImage", bookData.coverImage);
    }
  }, [bookData, setValue]);

  const onSubmit = async (data) => {
    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: Number(data.oldPrice),
      newPrice: Number(data.newPrice),
      coverImage: data.coverImage || bookData.coverImage,
    };
    try {
      console.log(
        "Sending update request to:",
        `${getBaseUrl()}/api/books/edit/${id}`
      );
      console.log("Update data:", updateBookData);
      await axios.put(`${getBaseUrl()}/api/books/edit/${id}`, updateBookData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      Swal.fire({
        title: "Book Updated",
        text: "Your book is updated successfully!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, It's Okay!",
      });
      await refetch();
    } catch (error) {
      console.log("Failed to update book:", error);
      alert("Failed to update book.");
    }
  };

  if (isError) return <div>Error fetching book data</div>;
  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Title"
          name="title"
          placeholder="Enter book title"
          register={register}
        />

        <InputField
          label="Description"
          name="description"
          placeholder="Enter book description"
          type="textarea"
          register={register}
        />

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
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("trending")}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">
              Trending
            </span>
          </label>
        </div>

        <InputField
          label="Old Price"
          name="oldPrice"
          type="number"
          placeholder="Old Price"
          register={register}
        />

        <InputField
          label="New Price"
          name="newPrice"
          type="number"
          placeholder="New Price"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
// axios.defaults.baseURL = "http://localhost:5005/";
// const navigate = useNavigate();
// const dispatch = useDispatch();
// const [imagePreview, setImagePreview] = useState(null);
// const [isSubmitting, setIsSubmitting] = useState(false);
// const [formData, setFormData] = useState({
//   name: "",
//   description: "",
//   category: "",
//   price: "",
//   stock: "",
//   imageUrl: "",
// });
// const [errors, setErrors] = useState({});
// const [imageFile, setImageFile] = useState(null);

// const handleFileChange = (e) => {
//   const file = e.target.files[0];
//   if (file) {
//     setImageFile(file);
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setImagePreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   }
// };

// const handleInputChange = (e) => {
//   const { name, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [name]: value,
//   }));
// };

// const validateForm = () => {
//   const newErrors = {};
//   if (!formData.name.trim()) newErrors.name = "Product name is required";
//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (isSubmitting) return;
//   setIsSubmitting(true);
//   if (!validateForm()) {
//     console.log("Form validation failed");
//     setIsSubmitting(false);
//     return;
//   }

//   try {
//     console.log("Attempting to create product...");
//     const formDataToSend = new FormData();
//     formDataToSend.append("name", formData.name);
//     formDataToSend.append("description", formData.description);
//     formDataToSend.append("category", formData.category);
//     formDataToSend.append("price", formData.price);
//     formDataToSend.append("stock", formData.stock);
//     formDataToSend.append("image", imageFile);

//     const response = await axios.post(
//       "/api/books/create-books",
//       formDataToSend,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     console.log("Product created successfully:", response.data);

//     dispatch(addProduct(response.data));
//     console.log("Product added to Redux store");

//     navigate("/p", { replace: true });
//     console.log("Navigation triggered");

//     setFormData({
//       name: "",
//       description: "",
//       category: "",
//       price: "",
//       stock: "",
//       imageUrl: "",
//     });
//     setImagePreview(null);
//     setImageFile(null);
//   } catch (error) {
//     console.error("Error creating product:", error);
//   } finally {
//     setIsSubmitting(false);
//   }
// };
