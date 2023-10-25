import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";
import axios from "axios";
import { server } from "../../server";
import { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const { users } = useSelector((state) => state.user);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    axios.get(`${server}/product/admin-all-products`, { withCredentials: true }).then((res) => {
      setData(res.data.products);

    })
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${server}/product/delete-shop-product/${id}`, { withCredentials: true });
      toast.success("Program deleted successfully");
      // Perform any additional actions after successful deletion

    } catch (error) {
      console.error("Error deleting Program:", error);
      toast.error("Failed to delete Program");
    }
  };
  // cancel function handled by cancel btn on dialog box
  const handleCancel = () => {
    // Cancel button clicked, close the dialog
    setShowDialog(false);
  };

  // confirm delete
  const confirmDelete = (params) => {
    //  setShowDialog(true);
    const rowData = params.getValue(params.id, "row");
    console.log(rowData);
  };
  // handle delete confirmation
  const handleConfirmation = (params) => {
    handleDelete(params);
    setShowDialog(false);
  };

  const columns = [

    {
      field: "name",
      headerName: "Program Name",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "schoolName",
      headerName: "School Name",
      minWidth: 100,
      flex: 1.4,
    },
    {
      field: "originalPrice",
      headerName: "Application fee",
      minWidth: 50,
      flex: 1.4,
    },
    {
      field: "discountPrice",
      headerName: "Tuition fee",
      minWidth: 90,
      flex: 1,
    },
    {
      field: "Stock",
      headerName: "Seats",
      type: "number",
      minWidth: 50,
      flex: 1,
    },

    {
      field: "Preview",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/program/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>

        );
      },
    },
    {
      field: "delete",
      flex: 0.8,
      minWidth: 100,
      headerName: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {/* <Link to={`/program/delete-shop-product/${params.id}`}> */}
            <Button >
              <MdDelete size={20} onClick={confirmDelete} />
            </Button>
            {showDialog && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow">
                  <p>Are you sure you want to delete ?
                  </p>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="mr-2 px-4 py-2 bg-red-500 hover:bg-red-700 text-white rounded"
                      onClick={handleConfirmation}
                    >
                      Yes
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        );
      },
    },
  ];

  const row = [];

  data &&
    data.forEach((item) => {

      row.push({
        id: item._id,
        name: item.name,
        price: "US$ " + item.discountPrice,
        Stock: item.stock,
        originalPrice: item?.originalPrice,
        discountPrice: item.discountPrice,
        schoolName: item.shop.name,

      });
    });

  return (
    <>
      <div className="w-full mx-8 pt-1 mt-10 bg-white">
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={10}
          disableSelectionOnClick
          autoHeight
        />
      </div>
    </>
  );
};

export default AllProducts;
