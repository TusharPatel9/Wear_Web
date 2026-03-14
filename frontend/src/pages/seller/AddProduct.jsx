import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddProduct() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [category, setCategory] = useState([]);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const submitHandler = (data) => {
    data.colors = data.colors.split(", ");
    console.log(data)
  }



  const getCategories = async () => {
    try {
      const response = await axios.get("/category/categories");
      // console.log(response.data.data)
      setCategory(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const lvl1FilteredCategory = category.filter(cat => cat.level === 1);
  const lvl2FilteredCategory = category.filter(cat => cat.level === 2);

  console.log(lvl1FilteredCategory)
  useEffect(() => {
    getCategories();
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div>
          <label>Title</label>
          <input type="text" {...register("title")} />
        </div>
        <div>
          <label>Description</label>
          <input type="text" {...register("description")} />
        </div>
        <div>
          <label>Category</label>
          <select>
            <option default >---Select Category---</option>
            {
              lvl1FilteredCategory.map(cat => (
                <option>{cat.name}</option>
              ))
            }
            {console.log(category)}
          </select>

        </div>
        <div>
          <label>Category</label>
          <select>
            <option default >---Select Category---</option>
            {
              lvl2FilteredCategory.map(cat => (
                <option>{cat.name}</option>
              ))
            }
            {console.log(category)}
          </select>

        </div>
        <div>
          <label>Price</label>
          <input type="number" {...register("price")} />
        </div>
        <div>
          <label>Quantity</label>
          <input type="text" {...register("quantity")} />
        </div>
        <div>
          <label>Size</label>
          {sizes.map((size, index) => (
            <label key={index}>
              <input
                type="checkbox"
                {...register("size")}
                value={size}
              />
              {size}
            </label>
          ))}
        </div>
        <div>
          <label>Colors</label>
          <input type="text" {...register("colors")} />
        </div>

        <div>
          <label>SKU</label>
          <input type="text" {...register("sku")} />
        </div>
        {/* <div>
          <label>Images</label>
          <input type="file" {...register("images")} />
        </div> */}
        <div>
          <button type='submit'>Add Product</button>
        </div>
      </form>
    </>
  )
}
