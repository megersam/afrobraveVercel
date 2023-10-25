import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
import { deleteProduct } from "../../redux/actions/product";
import Loader from "../Layout/Loader";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    window.location.reload();
  };

  const columns = [
    { field: "id", headerName: "Program Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Program Name",
      minWidth: 150,
      flex: 1.4,
    },
    {
      field: "category",
      headerName: "Title",
      minWidth: 150,
      flex: 0.6,
    },
    {
      field: "tags",
      headerName: "Year",
      type: "text",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "originalPrice",
      headerName: "Admission",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },
    {
      field: "discountPrice",
      headerName: "Tuition",
      type: "number",
      minWidth: 150,
      flex: 0.5,
    },

    // {
    //   field: "sold",
    //   headerName: "status",
    //   type: "number",
    //   minWidth: 150,
    //   flex: 0.6,
    // },
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
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  products &&
    products.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        category: item.category,
        tags:item.tags,
        originalPrice: item.originalPrice,
        discountPrice:item.discountPrice,
      });
    });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
      )}
    </>
  );
};

export default AllProducts;
