import React from "react";
import {deleteAddress, getAddress} from "../app/slices/addressSlice";
import {useDispatch} from "react-redux";
import {
  openModal,
  closeModal,
  setSelectedAddress,
} from "../app/slices/modalSlice";

export default function Addresses({addresses}) {
  const dispatch = useDispatch();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <div className="w-1/2 absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F5F5DC] p-5 rounded-lg shadow-lg ">
        <div className="border border-slate-400 p-4 rounded-xl space-y-3">
          <div className="relative flex justify-center items-center">
            <h3 className="font-medium text-xl text-center">Addresses</h3>
            <button
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => dispatch(closeModal())}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          {addresses.map(address => (
            <div key={address.id} className="border-b-2 p-2">
              <div onClick={() => dispatch(setSelectedAddress(address))}>
                <h4 className="font-bold">
                  {address.name} | +62{address.phone_number}
                </h4>
                <p>
                  {address.address}, {address.city}, {address.postal_code}
                </p>
              </div>
              <div className="flex gap-5">
                <button
                  className="hover:underline"
                  onClick={() => {
                    dispatch(getAddress(address.id));
                    dispatch(openModal({type: "updateAddress"}));
                  }}
                >
                  update
                </button>
                <button
                  className="hover:underline"
                  onClick={() => dispatch(deleteAddress(address.id))}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => dispatch(openModal({type: "addNewAddress"}))}
            className="w-full py-2 px-4 rounded-full bg-[#A5D6A7] hover:bg-[#96c497]"
          >
            Create new address
          </button>
        </div>
      </div>
    </div>
  );
}
