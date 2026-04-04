import React, { useEffect, useState } from "react";
import axiosInstance from "../../AxiosInstance";
import Table from "../UI/Table";
import Button from "../UI/Button";
import ConfirmDialog from "../UI/ConfirmDialog";
import { MdCheck, MdClose, MdBlock, MdInfoOutline } from "react-icons/md";
import Modal from "../UI/Modal";

function SellersManagement() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/sellers");
      if (response.data.success) {
        setSellers(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch sellers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActionClick = async (seller, action) => {
    const msg = `Are you sure you want to ${action} the seller account for ${seller.shopName}?`;
    if (!window.confirm(msg)) return;

    try {
      const id = seller._id;
      if (action === "approve") {
        await axiosInstance.put(`/admin/sellers/approve/${id}`);
      } else if (action === "reject") {
        await axiosInstance.put(`/admin/sellers/reject/${id}`);
      } else if (action === "suspend") {
        await axiosInstance.put(`/admin/sellers/suspend/${id}`);
      }
      fetchSellers();
      alert(`Seller ${action}d successfully`);
    } catch (error) {
      console.error(`Action ${action} failed`, error);
      alert(`Action failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleViewDetails = (seller) => {
    setSelectedSeller(seller);
    setIsDetailsOpen(true);
  }

  const columns = [
    { header: "Shop Name", accessor: "shopName" },
    { header: "Owner", render: (row) => row.userId?.name || "N/A" },
    { header: "Email", render: (row) => row.businessEmail },
    { header: "Verified Status",
      render: (row) => {
        const isVerified = row.isVerified;
        return (
          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
            {isVerified ? "Verified / Approved" : "Unverified / Pending"}
          </span>
        );
      } 
    },
    { header: "Actions", 
      render: (row) => (
        <div className="flex items-center gap-2">
          {!row.isVerified ? (
            <>
              <Button variant="outline" size="sm" onClick={() => handleActionClick(row, "approve")}>
                <MdCheck className="text-green-600" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleActionClick(row, "reject")}>
                <MdClose className="text-red-500" />
              </Button>
            </>
          ) : (
            <Button variant="outline" size="sm" onClick={() => handleActionClick(row, "suspend")}>
              <MdBlock className="text-orange-500 hover:text-orange-600" />
            </Button>
          )}

          <Button variant="outline" size="sm" onClick={() => handleViewDetails(row)}>
            <MdInfoOutline className="text-blue-500" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Seller Management</h2>
          <p className="text-gray-500 mt-1">Review registrations and manage existing sellers.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading sellers...</div>
      ) : (
        <Table columns={columns} data={sellers} />
      )}

      {/* Seller Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} title="Seller Details">
        {selectedSeller && (
          <div className="space-y-4 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-gray-900">Shop Name:</p>
              <p>{selectedSeller.shopName}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Owner Name:</p>
              <p>{selectedSeller.userId?.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Business Email:</p>
              <p>{selectedSeller.businessEmail}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">GST Number:</p>
              <p>{selectedSeller.gstNumber}</p>
            </div>
            {selectedSeller.bankDetails && (
               <div>
                  <p className="font-semibold text-gray-900">Bank Details:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>Name: {selectedSeller.bankDetails.name}</li>
                    <li>A/C: {selectedSeller.bankDetails.accountNumber}</li>
                    <li>IFSC: {selectedSeller.bankDetails.ifscCode}</li>
                  </ul>
               </div>
            )}
          </div>
        )}
      </Modal>

    </div>
  );
}

export default SellersManagement;
