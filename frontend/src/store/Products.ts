import { create } from "zustand";
import axios from "axios";
import Product from "../component/Product";
import toast from "react-hot-toast";
const baseUrl = "http://localhost:5001/api";
interface product {
  id: number;
  name: string;
  image: string;
  price: string;
  created_at: string;
}
interface productStore {
  products: product[];
  loading: boolean;
  error: unknown;
  formData:formDataI;
  currentProduct:formDataI | null;
  fetchProduct: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  addProduct:(e:any)=>Promise<void>;
  setFormData:(formData:formDataI)=>void;
  resetForm:()=>void;
  getProduct:(id:number)=>void;
  updateProduct:(e: React.FormEvent<HTMLFormElement>, id: number)=>void;

}
interface formDataI{
  name:string;
  image:string;
  price:string;
}
export const useProduct = create<productStore>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  formData:{
    name:"",
    image:"",
    price:""
  },
  currentProduct:null,
  setFormData:(formData:formDataI)=>set({formData}),
  resetForm: () => set({ formData: { name: "", image: "", price: "" } }),
  addProduct: async (e:any)=>{
    e.preventDefault();
    set({loading:true});
    try{
      const{formData}=get();
      await axios.post(`${baseUrl}/products/create-product`,formData)
      await get().fetchProduct();
      get().resetForm();
      toast.success('product created sucessfully')
      

  }catch(e){
    console.log('error in adding product', e);
    toast.error("erro in saving product");

    }finally{
set({loading:false})
    }

  },
  fetchProduct: async () => {
    set({ loading: true });
    try {
      const fetchedProducts = await axios.get(
        `${baseUrl}/products/get-all-products`
      );
      set({
        products: fetchedProducts.data.data,
        error: null,
      });
    } catch (err: unknown) {
      console.error("Fetch Error:", err);
      if (axios.isAxiosError(err) && err.response?.status === 429)
        set({ error: "Rate limit exceeded ", products: [] });
      else set({ error: "Something went wrong", products: [] });
    } finally {
      set({ loading: false });
    }
  },
  deleteProduct: async (id: number) => {
    set({ loading: true });
    try {
      axios.delete(`${baseUrl}/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
      }));
      toast.success("product deleted successfully");
    } catch (err) {
      console.log("error in delete product", err);
      toast.error("error in delete product");
    } finally {
      set({ loading: false });
    }
  },
  getProduct: async(id : number)=>{
    set({loading:true});
    try{
      const response = await axios.get(`${baseUrl}/products/${id}`);
      set({
        currentProduct:response.data.data,
        formData:response.data.data,
        error:null,
  
      })
    }catch(e){
      console.log("error in fetch product", e);
      set({error:"some thing went wrong", currentProduct:null})

    }finally{
      set({loading:false})

    }

  },
  updateProduct: async(e: React.FormEvent<HTMLFormElement>, id: number)=>{
    e.preventDefault();
    set({loading:true})
    try{
      const{formData} = get();
      const response = await axios.put(`${baseUrl}/products/${id}`,formData);
      set({currentProduct:response.data.data})
      toast.success("product updated sucessfully")
      }
    catch(e){
      toast.error("something went wrong")
      console.log("error in product update function")

    }finally{
      set({loading:false})

    }
  }
}));
