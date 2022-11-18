import { useRouter } from "next/router";
import { LoadingSpinner, SingleProductCard } from "../../components";
import { useGetSingleProduct, useGetUserData } from "../../hooks";

const Product = () => {
  const router = useRouter();

  const productID = router.query.productID as string;

  const { data, isLoading, isError } = useGetSingleProduct(productID);
  const { userData } = useGetUserData();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative mx-auto mt-20 w-4/5">
      <SingleProductCard productData={data} userData={userData} />
    </div>
  );
};

export default Product;
