import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "Processing" ? (
          <h1 className="text-[20px]">Your Application is processing by Admins.</h1>
        ) : data?.status === "Document Reviewing" ? (
          <h1 className="text-[20px]">
            Your Application is on Document Reviewing.
          </h1>
        ) : data?.status === "Accepted" ? (
          <h1 className="text-[20px]">
            Your Application is Accepted! Congratulations 😍
          </h1>
        ) : data?.status === "Rejected" ? (
          <h1 className="text-[20px]">
            Sorry Your Application is not accepted for this time!
          </h1>
        ): null}
      </>
    </div>
  );
};

export default TrackOrder;
