import React, { useEffect } from "react";
import { useProduct } from "../store/Products";
import {
  ArrowLeftIcon,
  Backpack,
  DollarSign,
  Image,
  Package2,
  SendToBack,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const Prouduct = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Explicitly define the expected type
  const productId: number = Number(id);
  const {
    products,
    loading,
    error,
    fetchProduct,
    deleteProduct,
    formData,
    addProduct,
    setFormData,
    resetForm,
    currentProduct,
    getProduct,
    updateProduct,
  } = useProduct();
  const handleClick = (id: number) => {
    deleteProduct(id);
    resetForm();
    navigate("/");
  };
  useEffect(() => {
    getProduct(productId);
  }, [getProduct, productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{JSON.stringify(error)}</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => {
          navigate("/");
          resetForm();
        }}
        className="btn btn-ghost mb-8"
      >
        <ArrowLeftIcon className="size-4 mr-2" />
        Back to Products
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        <div className="rounded-lg shadow-lg overflow-hidden">
          <img
            className="size-full object-cover "
            src={currentProduct?.image}
            alt=""
          />
        </div>
        <div className="card shadow-lg p-5">
          <form
            onSubmit={(e) => updateProduct(e, productId)}
            className="flex flex-col gap-3"
          >
            <div className="flex-col gap-y-2">
              <label className="lable"> Product Name</label>
              <div className="relative ">
                <div className="absolute inset-y-0 pl-3 flex items-center  text-base-content/50 ">
                  <Package2 className="size-5" />
                </div>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  type="text"
                  value={formData.name}
                  className=" input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200 "
                  placeholder=" enter the product name"
                />
              </div>
            </div>

            <div className="">
              <label> Price</label>
              <div className="relative">
                <div className="absolute flex items-center inset-y-0 pl-3 text-base-content/50">
                  <DollarSign className="size-5" />
                </div>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  type="text"
                  value={formData.price}
                  className="input input-bordered w-full focus:input-primary pl-10 transition-colors duration-200 "
                  placeholder=" enter the product price"
                />
              </div>
            </div>
            <div>
              <label> Image</label>
              <div className="relative">
                <div className="absolute inset-y-0 flex items-center pl-3 text-base-content/50">
                  <Image className="size-5" />
                </div>
                <input
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  value={formData.image}
                  type="text"
                  className="input input-bordered w-full focus:input-primary pl-10 transition-colors duration-200  "
                  placeholder=" image adddres"
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary min-w-[120px]"
              disabled={
                !formData.name || !formData.price || !formData.image || loading
              }
            >
              update
            </button>
            <form method="dialog">
              <button
                className="btn btn-primary w-full min-w-[120px] "
                onClick={() => handleClick(productId)}
              >
                delete
              </button>
            </form>
          </form>
        </div>
      </div>
    </div>
  );
};
