import { PaperClipIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { server } from "../../../server";
import { backend_url } from "../../../server";
import axios from 'axios';
import Loader from '../../Layout/Loader';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const ViewUser = () => {
    const { id } = useParams();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const { users } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${server}/user/user-info/${id}`, { withCredentials: true });
                const { data } = response;
                console.log(data); // Log the response data to the console
                setUser(data.user);
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

    if (!user) {
        return <div>User not found.</div>;
    }

    // handle delete function.
    const handleDelete = async (_id) => {
        try {
            await axios.delete(`${server}/user/delete-user/${_id}`, { withCredentials: true });
            toast.success("User deleted successfully");
            // Perform any additional actions after successful deletion
            // Close the window tab
            window.close();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };
    // cancel function handled by cancel btn on dialog box
    const handleCancel = () => {
        // Cancel button clicked, close the dialog
        setShowDialog(false);
    };

    // confirm handle delete
    const confirmDelete = () => {
        setShowDialog(true);
    };
    // handle delete confirmation
    const handleConfirmation = () => {
        handleDelete(user._id);
        setShowDialog(false);
    };
    // 

    // users &&
    //     users.forEach((item) => {
    //         user.push({
    //             id: item._id,
    //             name: item.name,
    //             email: item.email,
    //             role: item.role,
    //             avatar: item.avatar,
    //             phone: item.phone,
    //             joinedAt: item.createdAt.slice(0, 10),
    //         });
    //     });



    return (
        <div>
            <div className="px-4 sm:px-0 flex justify-center items-center">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold leading-7 text-gray-900">
                        User Information
                    </h3>
                    <p className="mt-1 max-w-2xl text-lg leading-6 text-gray-500">
                        Personal details.
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
                                    src={`${backend_url}${user?.avatar}`}
                                    alt=""
                                />
                            </div>
                            <div className="w-1/2 ml-40">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 " style={{ width: '200%' }}>
                                        Full name:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0" style={{ width: '200%' }}>
                                        <span className="inline-block max-w-full">{user.name ? user.name : "N/A"}
                                        </span>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">
                                        Email:
                                    </dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                        {user.email ? user.email : "N/A"}
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
                            {user.phoneNumber ? user.phoneNumber : "N/A"}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Role:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.role ? user.role : "N/A"}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Created At:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {user.createdAt ? user.createdAt : "N/A"}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 ml-32">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                            Address:
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                            {/* {user.address} */}
                            <ul>
                                {user.addresses.map((address, index) => (
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
                        <dt className="text-sm font-medium leading-6 text-gray-900 ml-32">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0 ml-30">
                            <ul>
                                {user.documents.map((document, index) => (
                                    <li key={index}>

                                    </li>
                                ))}
                            </ul>
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 mr-30">
                                {user.documents.map((document, index) => (
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
                <div className="flex justify-end">
                    <button
                        className="w-80 h-12 rounded-full bg-red-500 hover:bg-red-700 text-white"
                        onClick={confirmDelete}
                    >
                        Delete User
                    </button>
                    {showDialog && (
                        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-4 rounded shadow">
                                <p>Are you sure you want to delete the user?  {user.name}</p>
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

export default ViewUser;
