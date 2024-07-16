import React from 'react'
import { createCategory } from '../../../services/operations/courseDetailsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form"
const AddCategory = () => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
      } = useForm();
      const handleAddCategory = async (data) => {
        console.log("add category Data - ", data)
        try {
          await createCategory(data,token)
          reset();
        } catch (error) {
          console.log("ERROR MESSAGE - ", error.message)
        }
      }
  return (
    <>
        <div className='flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleAddCategory)} className='flex flex-col gap-2 w-[50%]'>
            <label htmlFor="name" className="lable-style text-[#F1F2FF] text-[14px]">
                Category Name :
              </label>
              <input
                type={"text"}
                name="name"
                id="name"
                placeholder="Enter Category Name"
                className="form-style text-[#999DAA] bg-[#2C333F] px-3 rounded-md py-3"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Category Name.
                </span>
              )}
              <label htmlFor="description" className="lable-style text-[#F1F2FF] text-[14px]">
                Category Description :
              </label>
              <input
                type={"text"}
                name="description"
                id="description"
                placeholder="Enter Category Description"
                className="form-style text-[#999DAA] bg-[#2C333F] px-3 rounded-md py-3"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter Category Description.
                </span>
              )}
              <button type="submit" className="text-[#000814] bg-[#FFD60A] rounded-md py-2 px-5 font-normal text-center">
                Submit
            </button>
            </form>
        </div>
    </>
  )
}

export default AddCategory