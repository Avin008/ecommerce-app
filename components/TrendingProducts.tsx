import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getCollectionData, getSingleDoc } from "../services/firebaseFunc";
import LoadingSpinner from "./LoadingSpinner";
import useAuthStatus from "../hooks/useAuthStatus";

type Product = {
  img: string;
  name: string;
  price: number;
  id: number;
  sizes: string[];
};

export const products: Product[] = [
  {
    img: "https://images.unsplash.com/photo-1625910513413-c23b8bb81cba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBvbG8lMjBzaGlydHN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    name: "Allen Solly Tshirt",
    price: 990,
    id: 2,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: "https://images.unsplash.com/photo-1586363129094-d7a38564fae1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTl8fHNoaXJ0c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    name: "Polo Shirts",
    price: 750,
    id: 3,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: "https://images.unsplash.com/photo-1629353689974-af4d5c70440f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGphY2tldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    name: "Us Pollo Jacket",
    price: 860,
    id: 4,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60",
    name: "Nike Shoe",
    price: 449,
    id: 5,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8amVhbnN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    name: "Wrogn Jeans",
    price: 789,
    id: 6,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d2F0Y2h8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    name: "FastTrack Watch",
    price: 599,
    id: 7,
    sizes: ["S", "M", "L", "XL"],
  },
];

const TrendingProducts = (): React.ReactElement => {
  const { authToken, isAuth } = useAuthStatus();

  const { isLoading, data } = useQuery(
    ["products"],
    async () => await getCollectionData("products")
  );

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery(
    ["users"],
    async () => {
      return getSingleDoc("users", authToken!);
    },
    {
      enabled: isAuth,
    }
  );

  if (isLoading && isUserDataLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto w-11/12 space-y-5 px-3">
      <h1 className="text-lg font-bold">POPULAR PRODUCTS</h1>
      <div className="grid h-72 justify-items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
        {data.map((x) => (
          <ProductCard key={x.price} data={x} userData={userData} />
        ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
