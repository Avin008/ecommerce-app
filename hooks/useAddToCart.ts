import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStatus } from "../hooks";
import { addToCart } from "../services";
import { ProductData } from "../types";
import { toast } from "react-hot-toast";

const useAddToCart = (productData: ProductData, size: string | undefined) => {
  const { isAuth, authToken } = useAuthStatus();

  const queryClient = useQueryClient();

  const {
    mutate: addToCartFunc,
    isLoading: isAddToCartLoading,
    isError: isAddToCartError,
  } = useMutation(
    async () => {
      return addToCart(authToken!, { ...productData, qty: 1, size: size });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        toast.success("product added to bag!");
      },
    }
  );

  return { addToCartFunc, isAddToCartLoading, isAddToCartError };
};

export default useAddToCart;
