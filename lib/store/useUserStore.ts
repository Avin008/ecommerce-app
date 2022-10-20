import create from "zustand";
import { ProductData, UserData } from "../../types";

type UserDataExtends = UserData & {
  addToWishlist: (productData: ProductData[]) => void;
  removeFromWishlist: (productData: ProductData[]) => void;
};

const useUserStore = create<UserDataExtends>((set) => ({
  id: "",
  firstname: "",
  lastname: "",
  email: "",
  wishlist: [],
  cart: [],
  address: {},
  addToWishlist: (productData) => set({ wishlist: productData }),
  removeFromWishlist: (productData) => set({ wishlist: productData }),
}));

export default useUserStore;
