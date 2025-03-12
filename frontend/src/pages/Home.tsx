import { useEffect, useRef } from "react";
import { useProduct } from "../store/Products";
import Product from "../component/Product";
import { Plus, Proportions, RefreshCcw } from "lucide-react";
import AddModal from "../component/AddModal";

const Home = () => {
  const modalRef = useRef<HTMLDialogElement>(null); // ✅ Correct typing
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
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct, deleteProduct]);
  console.log(products, error);
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => modalRef.current?.showModal()}
          className="btn btn-primary"
        >
          <Plus />
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProduct}>
          <RefreshCcw />
        </button>
      </div>
      {typeof error === "string" && (
        <div className="alert alert-error mb-8">{error}</div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            );
          })}
        </div>
      )}
      <AddModal referance={modalRef} />
    </div>
  );
};

export default Home;
