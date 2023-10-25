import { PaperClipIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { server } from "../../../server";
import { backend_url } from "../../../server";
import axios from 'axios';
import Loader from '../../Layout/Loader';
import { toast } from 'react-toastify';

const ViewSchool = () => {
    const { id } = useParams();
    const location = useLocation();
    const [shop, setShop] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${server}/shop/get-shop-info/${id}`, { withCredentials: true });
                const { data } = response;
                console.log(data); // Log the response data to the console
                setShop(data.shop);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

    if (isLoading) {
        return <div><Loader /></div>;
    }

    if (!shop) {
        return <div>School not found.</div>;
    }

    const handleDelete = async (_id) => {
        try {
            await axios
                .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
            toast.success("School deleted successfully");
            // Perform any additional actions after successful deletion
            // Close the window tab
            window.close();
        } catch (error) {
            console.error("Error deleting School:", error);
            toast.error("Failed to delete School");
        }
    }
    // cancel function handled by cancel btn on dialog box
    const handleCancel = () => {
        // Cancel button clicked, close the dialog
        setShowDialog(false);
    };
    // confirm handle delete
    const confirmDelete = () => {
        setShowDialog(true);
    };
    const handleConfirmation = () => {
        handleDelete(shop._id);
        setShowDialog(false);
    };


    return (
        <div>
            <div className="px-4 sm:px-0 flex justify-center items-center">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">
                        School Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">
                        School details.
                    </p>
                </div>
            </div>
            {/* profile image */}
            <div className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="flex items-center">
                        <div className="flex items-center ml-32">
                            <div className="w-1/2 flex-shrink-20 -space-x-2 overflow-hidden ml-30">
                                <img
                                    className="inline-block w-48 rounded-full ring-2 ring-white ml-30"
                                    src={`${backend_url}${shop?.avatar}`}
                                    alt=""
                                />
                            </div>
                            <div className="w-1/2 ml-40">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 " style={{ width: '200%' }}>
                                        Name:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" style={{ width: '100%' }}>
                                        <span className="inline-block max-w-full">{shop.name}</span>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Email:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {shop.email}
                                    </dd>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Phone:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {shop.phoneNumber}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Role:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {shop.role === "Seller" ? "School Admin" : shop.role}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Created At:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {shop.createdAt}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Address:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {shop.address ? shop.address : "N/A"}
                        </dd>
                    </div>
                </dl>
                <div className="flex justify-end">
                    <button
                        className="w-80 h-12 rounded-full bg-red-500 hover:bg-red-700 text-white"
                        onClick={confirmDelete}
                    >
                        Delete School
                    </button>
                    {showDialog && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded shadow">
                                <p>Are you sure you want to delete the user?  {shop.name}</p>
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
                </div>
            </div>
        </div>



    );
};

export default ViewSchool;
