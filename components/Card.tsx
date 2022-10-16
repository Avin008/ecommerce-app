import Image from "next/image";
import { MdFavoriteBorder, MdFavorite } from "../icons";
import { useToggle } from "../hooks/useToggle";
import SelectSize from "./SelectSize";
import { useSelectSize } from "../hooks/useSelectSize";
import useAddToWishlist from "../hooks/useAddToWishlist";
import { CardProps } from "../types";
import useAuthStatus from "../hooks/useAuthStatus";
import useRemoveFromWishlist from "../hooks/useRemoveFromWishlist";
import { useRouter } from "next/router";
import useAddToCart from "../hooks/useAddToCart";
import { isProductInWishlist, isProductInCart } from "../utility";

const Card = ({ productData, userData }: CardProps): React.ReactElement => {
  const {
    toggle: sizeBar,
    toggleTrue: displaySizeBar,
    toggleFalse: hideSizeBar,
  } = useToggle();

  const { size, sizeSetter } = useSelectSize();

  const { authToken, isAuth } = useAuthStatus();
  const { addToWishlistFunc } = useAddToWishlist(productData, userData?.id);
  const { removeFromWishlistFunc } = useRemoveFromWishlist(
    productData,
    userData?.id
  );

  const { addToCartFunc } = useAddToCart(productData);

  const router = useRouter();

  return (
    <div
      className="relative h-fit w-full select-none hover:cursor-pointer"
      onMouseEnter={() => displaySizeBar()}
      onMouseLeave={() => hideSizeBar()}
    >
      <span className="absolute right-5 top-3 z-10 rounded-full bg-gray-50 p-1 opacity-70 shadow-lg transition-transform hover:bg-gray-300 hover:text-gray-900">
        {isAuth && isProductInWishlist({ userData, productData }) ? (
          <MdFavorite
            size={25}
            onClick={() => {
              isAuth ? removeFromWishlistFunc() : router.push("/login");
            }}
          />
        ) : (
          <MdFavoriteBorder
            size={25}
            onClick={() => {
              isAuth ? addToWishlistFunc() : router.push("/login");
            }}
          />
        )}
      </span>
      <div className="relative h-40 w-full">
        <Image
          src={productData.img}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
        {sizeBar && (
          <SelectSize data={{ sizes: productData.sizes, size, sizeSetter }} />
        )}
      </div>
      <div className="relative flex flex-col justify-center p-2 leading-5">
        <h1 className="text-sm font-semibold">{productData.name}</h1>
        <h3 className="text-[#7F7F7F]">Rs. {productData.price}</h3>
        <div className="mt-1 transition-all">
          {isAuth && isProductInCart(productData, userData) ? (
            <button
              className="flex w-full items-center justify-center gap-1 rounded-md border border-white bg-gray-900 py-2 px-1 text-white opacity-90 transition-all hover:opacity-90"
              onClick={() => {
                isAuth ? router.push("/cart") : router.push("/login");
              }}
            >
              <span className="text-sm">GO TO BAG</span>
            </button>
          ) : (
            <button
              className="flex w-full items-center justify-center gap-1 rounded-md border border-white bg-gray-900 py-2 px-1 text-white opacity-80 transition-all hover:opacity-90"
              onClick={() => {
                isAuth ? addToCartFunc() : router.push("/login");
              }}
            >
              <span className="text-sm">ADD TO BAG</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
