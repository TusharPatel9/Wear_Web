import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance";
import Table from "../UI/Table";
import Button from "../UI/Button";
import ConfirmDialog from "../UI/ConfirmDialog";
import Modal from "../UI/Modal";
import { MdEdit, MdDelete, MdAdd } from "react-icons/md";

function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [level, setLevel] = useState(1);
  const [parentCategoryId, setParentCategoryId] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/admin/categories");
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- ADD ----------------
  const handleAddClick = () => {
    setModalMode("add");
    setName("");
    setLevel(1);
    setParentCategoryId("");
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  // ---------------- EDIT ----------------
  const handleEditClick = (category) => {
    setModalMode("edit");
    setSelectedCategory(category);
    setName(category.name);
    setLevel(category.level);
    setParentCategoryId(category.parentCategoryId?._id || "");
    setIsModalOpen(true);
  };

  // ---------------- DELETE ----------------
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosInstance.delete(`/admin/categories/${selectedCategory._id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      level: Number(level),
      parentCategoryId: parentCategoryId || null,
    };

    try {
      if (modalMode === "add") {
        await axiosInstance.post("/admin/categories", payload);
      } else {
        await axiosInstance.put(
          `/admin/categories/${selectedCategory._id}`,
          payload
        );
      }

      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // ---------------- TABLE ----------------
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Level", accessor: "level" },
    {
      header: "Parent",
      render: (row) => row.parentCategoryId?.name || "-",
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditClick(row)}
          >
            <MdEdit />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeleteClick(row)}
          >
            <MdDelete className="text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Category Management</h2>
          <p className="text-gray-500 text-sm">
            Manage your product categories
          </p>
        </div>

        <Button onClick={handleAddClick}>
          <MdAdd className="mr-1" /> Add Category
        </Button>
      </div>

      {/* TABLE */}
      {loading ? (
        <p className="text-center py-10">Loading...</p>
      ) : (
        <Table columns={columns} data={categories} />
      )}

      {/* MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Add Category" : "Edit Category"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            min="1"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <select
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">No Parent</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {modalMode === "add" ? "Create" : "Update"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* DELETE CONFIRM */}
      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Category"
        message={`Delete "${selectedCategory?.name}"?`}
      />
    </div>
  );
}

export default CategoryManagement;