
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddProduct() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category, setCategory] = useState([]);
  const [selectedLevel1, setSelectedLevel1] = useState("");
  const [selectedLevel2, setSelectedLevel2] = useState("");
  const [selectedLevel3, setSelectedLevel3] = useState("");

  const sizes = ["S", "M", "L", "XL", "XXL"];

  /* ---------------- VALIDATION SCHEMA ---------------- */

  const validateSchema = {
    titleValidator: {
      required: {
        value: true,
        message: "Product title is required",
      },
      minLength: {
        value: 3,
        message: "Title must be at least 3 characters",
      },
    },

    descriptionValidator: {
      required: {
        value: true,
        message: "Description is required",
      },
      minLength: {
        value: 10,
        message: "Description must be at least 10 characters",
      },
    },

    priceValidator: {
      required: {
        value: true,
        message: "Price is required",
      },
      min: {
        value: 1,
        message: "Price must be greater than 0",
      },
    },

    quantityValidator: {
      required: {
        value: true,
        message: "Quantity is required",
      },
      min: {
        value: 1,
        message: "Quantity must be at least 1",
      },
    },

    colorsValidator: {
      required: {
        value: true,
        message: "Colors are required",
      },
    },

    skuValidator: {
      required: {
        value: true,
        message: "SKU is required",
      },
      minLength: {
        value: 3,
        message: "SKU must be at least 3 characters",
      },
    },

    sizeValidator: {
      required: {
        value: true,
        message: "Select at least one size",
      },
    },
  };

  /* ---------------- FETCH CATEGORIES ---------------- */

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

  /* ---------------- FILTER CATEGORIES ---------------- */

  const lvl1FilteredCategory = category.filter((cat) => cat.level === 1);

  const lvl2FilteredCategory = category.filter(
    (cat) =>
      cat.parentCategoryId &&
      cat.parentCategoryId._id === selectedLevel1
  );

  const lvl3FilteredCategory = category.filter(
    (cat) =>
      cat.parentCategoryId &&
      cat.parentCategoryId._id === selectedLevel2
  );

  /* ---------------- SUBMIT HANDLER ---------------- */

  const submitHandler = async (data) => {

    if (!selectedLevel1) {
      toast.error("Please select a category");
      return;
    }

    data.colors = data.colors.split(",").map((color) => color.trim());

    data.categoryId =
      selectedLevel3 || selectedLevel2 || selectedLevel1;

    try {

      const response = await axios.post("/product/product", data);

      if (response.status === 201) {
        toast.success(response.data.message);
      }

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full p-8 md:p-12">

        <h2 className="text-3xl font-semibold text-teal-600 mb-8 text-center">
          Add Product
        </h2>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-6"
        >

          {/* TITLE */}

          <div>
            <input
              type="text"
              placeholder="Product Title"
              {...register("title", validateSchema.titleValidator)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div>
            <input
              type="text"
              placeholder="Product Description"
              {...register(
                "description",
                validateSchema.descriptionValidator
              )}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-500"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <select
              value={selectedLevel1}
              onChange={(e) => {
                setSelectedLevel1(e.target.value);
                setSelectedLevel2("");
                setSelectedLevel3("");
              }}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">Select Category</option>

              {lvl1FilteredCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel2}
              onChange={(e) => {
                setSelectedLevel2(e.target.value);
                setSelectedLevel3("");
              }}
              disabled={!selectedLevel1}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">Select Subcategory</option>

              {lvl2FilteredCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel3}
              onChange={(e) =>
                setSelectedLevel3(e.target.value)
              }
              disabled={!selectedLevel2}
              className="border border-gray-300 rounded-lg px-4 py-3"
            >
              <option value="">Select Subcategory 2</option>

              {lvl3FilteredCategory.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>

          </div>

          {/* PRICE + QUANTITY */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <input
                type="number"
                placeholder="Price"
                {...register("price", validateSchema.priceValidator)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Quantity"
                {...register(
                  "quantity",
                  validateSchema.quantityValidator
                )}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>

          </div>

          {/* SIZES */}

          <div>

            <div className="flex flex-wrap gap-4">

              {sizes.map((size, index) => (
                <label
                  key={index}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={size}
                    {...register("size", validateSchema.sizeValidator)}
                  />
                  <span>{size}</span>
                </label>
              ))}

            </div>

            {errors.size && (
              <p className="text-red-500 text-sm mt-1">
                {errors.size.message}
              </p>
            )}

          </div>

          {/* COLORS */}

          <div>
            <input
              type="text"
              placeholder="Colors (comma separated)"
              {...register("colors", validateSchema.colorsValidator)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

            {errors.colors && (
              <p className="text-red-500 text-sm mt-1">
                {errors.colors.message}
              </p>
            )}
          </div>

          {/* SKU */}

          <div>
            <input
              type="text"
              placeholder="SKU"
              {...register("sku", validateSchema.skuValidator)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3"
            />

            {errors.sku && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sku.message}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}

          <div className="text-center mt-8">

            <button
              type="submit"
              className="bg-teal-700 hover:bg-teal-800 text-white font-semibold px-8 py-3 rounded-lg transition"
            >
              Add Product
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

