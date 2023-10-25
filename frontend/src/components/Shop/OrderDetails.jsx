import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Application updated!");
        navigate("/dashboard-applications");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
    .put(
      `${server}/order/order-refund-success/${id}`,
      {
        status,
      },
      { withCredentials: true }
    )
    .then((res) => {
      toast.success("Application updated!");
      dispatch(getAllOrdersOfShop(seller._id));
    })
    .catch((error) => {
      toast.error(error.response.data.message);
    });
  }

  console.log(data?.status);


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
           
          <h1 className="pl-2 text-[25px]">Application Details</h1>
        </div>
        <Link to="/dashboard-applications">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Application List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
        Application ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Date on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}/${item.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} / year
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Application Fee: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      {/* user profile */}
      <div className="px-4 sm:px-0 flex justify-center items-center">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">
                        Applicant Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">
                        Personal details.
                    </p>
                </div>
            </div>
      
      <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="flex items-center">
                        <div className="flex items-center ml-32">
                            <div className="w-1/2 flex-shrink-20 -space-x-2 overflow-hidden ml-30">
                                <img
                                    className="inline-block w-48 rounded-full ring-2 ring-white ml-30"
                                    src={`${backend_url}${data?.user?.avatar}`}
                                    alt=""
                                />
                            </div>
                            <div className="w-1/2 ml-40">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 " style={{ width: '200%' }}>
                                    Full name:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" style={{ width: '200%' }}>
                                        <span className="inline-block max-w-full">{data?.user?.name ? data?.user?.name : "N/A"}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                    Applicant Email:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {data?.user?.email ? data?.user?.email : "N/A"}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Applicant Phone:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {data?.user?.phoneNumber ? data?.user?.phoneNumber : "N/A"}
                        </dd>
                    </div>
                   
                   {/* user address in mapping */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                        Applicant  Address:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* {user.address} */}
                            <ul>
                                {data?.user?.addresses.map((address, index) => (
                                    <li key={index}>
                                        {address.addressType ? `${address.addressType}, ` : "N/A, "}
                                        {address.address1 ? `${address.address1}, ` : "N/A, "}
                                        {address.address2 ? `${address.address2}, ` : "N/A, "}
                                        {address.city ? `${address.city}, ` : "N/A, "}
                                        {address.country ? `${address.country}, ` : "N/A, "}
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900 ml-32">Uploaded Documents</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0 ml-30">
                            <ul>
                                {data?.user?.documents.map((document, index) => (
                                    <li key={index}>

                                    </li>
                                ))}
                            </ul>
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 mr-30">
                                {data?.user?.documents.map((document, index) => (
                                    <li key={index} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                    {document.documentType ? document.documentType : "N/A"}</span>
                                            </div>
                                            <svg
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                {/* // src={`${backend_url}${user?.avatar}`} */}
                                                <span className="truncate font-medium">
                                                    {document.pdfFile ? document.pdfFile : "N/A"}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <a href={`${backend_url}${document.pdfFile}`} target="_blank" rel="noopener noreferrer" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                View
                                            </a>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </dd>
                    </div>
                </dl>
                 
            </div>
       
      {/* Payment */}
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Application Status:</h4>
      {data?.status !== "Processing refund" && data?.status !== "Refund Success" && (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
          {[
            "Processing",
            "Document Reviewing",
            "Accepted",
            "Rejected", 
          ]
            .slice(
              [
                "Processing",
               "Document Reviewing",
               "Accepted",
               "Rejected", 
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
        </select>
      )}
      {
        data?.status === "Processing refund" || data?.status === "Refund Success" ? (
          <select value={status} 
       onChange={(e) => setStatus(e.target.value)}
       className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
      >
        {[
            "Processing refund",
            "Refund Success",
          ]
            .slice(
              [
                "Processing refund",
                "Refund Success",
              ].indexOf(data?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      }

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={data?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler}
      >
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
