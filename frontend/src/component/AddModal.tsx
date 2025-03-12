import React, { useEffect } from "react";
import { useProduct } from "../store/Products";
import { DollarSign, Image, Package2 } from "lucide-react";

const AddModal = ({
  referance,
}: {
  referance: React.RefObject<HTMLDialogElement | null>;
}) => {
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
  } = useProduct();

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={referance} id="my_modal_2" className="modal">
        <div className="modal-box flex-col gap-2 ">
          <h3 className="font-bold text-lg">Add Product</h3>
          <div>
            <form onSubmit={addProduct} className="flex flex-col gap-3">
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
                onClick={() => referance.current?.close()}
                type="submit"
                className="btn btn-primary min-w-[120px]"
                disabled={
                  !formData.name ||
                  !formData.price ||
                  !formData.image ||
                  loading
                }
              >
                submit
              </button>
              <form method="dialog">
                <button
                  className="btn btn-primary w-full min-w-[120px] "
                  onClick={() => {
                    referance.current?.close();
                    resetForm();
                  }}
                >
                  {" "}
                  cancel
                </button>
              </form>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default AddModal;
