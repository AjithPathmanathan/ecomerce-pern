import { Edit, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../store/Products";

const Product = ({ name, image, price, id }) => {
  const { deleteProduct,getProduct } = useProduct();
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative pt-[56.25%]">
        <img className="absolute top-0 left-0 w-full h-full object-cover" src={image} alt={name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize">{name}</h2>
        <p>{price}</p>
        <div className="card-actions justify-end">
          <Link to={`/product/${id}`}>
            <button  className="btn btn-primary">
              <Edit />
            </button>
          </Link>

          <button className="btn btn-primary" onClick={() => deleteProduct(id)}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
