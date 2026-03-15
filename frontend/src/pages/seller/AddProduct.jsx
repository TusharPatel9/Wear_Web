import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function AddProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [category, setCategory] = useState([]);
  const [selectedLevel1, setSelectedLevel1] = useState("");
  const [selectedLevel2, setSelectedLevel2] = useState("");
  const [selectedLevel3, setSelectedLevel3] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Fetch categories from backend
  const getCategories = async () => {
    try {
      const response = await axios.get("/category/categories");
      setCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Filter categories by level and parent
  const lvl1FilteredCategory = category.filter(cat => cat.level === 1);
  const lvl2FilteredCategory = category.filter(
    cat => cat.parentCategoryId && cat.parentCategoryId._id === selectedLevel1
  );
  const lvl3FilteredCategory = category.filter(
    cat => cat.parentCategoryId && cat.parentCategoryId._id === selectedLevel2
  );

  // Form submit handler
  const submitHandler = async (data) => {
    data.colors = data.colors.split(",").map(color => color.trim());
    // send the most specific categoryId
    data.categoryId = selectedLevel3 || selectedLevel2 || selectedLevel1;

    try {
      console.log(data)
      const response = await axios.post("/product/product", data);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
   <div className="bg-gray-100 w-full py-3">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-6 md:p-8 mx-auto">
        <h2 className="text-3xl font-semibold text-teal-600 mb-8 text-center">Add Product</h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">

          {/* Title */}
          <input
            type="text"
            {...register("title", { required: true })}
            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Product Title *"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">Title is required</p>}

          {/* Description */}
          <input
            type="text"
            {...register("description", { required: true })}
            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Product Description *"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">Description is required</p>}

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <select
              value={selectedLevel1}
              onChange={(e) => { setSelectedLevel1(e.target.value); setSelectedLevel2(""); setSelectedLevel3(""); }}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Select Category *</option>
              {lvl1FilteredCategory.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedLevel2}
              onChange={(e) => { setSelectedLevel2(e.target.value); setSelectedLevel3(""); }}
              disabled={!selectedLevel1 || lvl2FilteredCategory.length === 0}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${(!selectedLevel1 || lvl2FilteredCategory.length === 0) ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
            >
              <option value="">Select Subcategory *</option>
              {lvl2FilteredCategory.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedLevel3}
              onChange={(e) => setSelectedLevel3(e.target.value)}
              disabled={!selectedLevel2 || lvl3FilteredCategory.length === 0}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${(!selectedLevel2 || lvl3FilteredCategory.length === 0) ? "bg-gray-100 cursor-not-allowed" : "border-gray-300"}`}
            >
              <option value="">Select Subcategory 2 *</option>
              {lvl3FilteredCategory.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="number"
              {...register("price", { required: true })}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
              placeholder="Price *"
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">Price is required</p>}

            <input
              type="number"
              {...register("quantity", { required: true })}
              className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${errors.quantity ? "border-red-500" : "border-gray-300"}`}
              placeholder="Quantity *"
            />
            {errors.quantity && <p className="text-red-500 text-sm mt-1">Quantity is required</p>}
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap gap-4">
            {sizes.map((size, index) => (
              <label key={index} className="inline-flex items-center space-x-2">
                <input type="checkbox" {...register("size")} value={size} className="form-checkbox text-teal-600" />
                <span>{size}</span>
              </label>
            ))}
          </div>

          {/* Colors */}
          <input
            type="text"
            {...register("colors", { required: true })}
            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${errors.colors ? "border-red-500" : "border-gray-300"}`}
            placeholder="Colors (comma separated) *"
          />
          {errors.colors && <p className="text-red-500 text-sm mt-1">Colors are required</p>}

          {/* SKU */}
          <input
            type="text"
            {...register("sku", { required: true })}
            className={`w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500 ${errors.sku ? "border-red-500" : "border-gray-300"}`}
            placeholder="SKU *"
          />
          {errors.sku && <p className="text-red-500 text-sm mt-1">SKU is required</p>}

          {/* Submit */}
          <div className="text-center mt-4">
            <button type="submit" className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-lg transition">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}