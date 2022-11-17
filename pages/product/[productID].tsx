import { useRouter } from "next/router";
import { LoadingSpinner } from "../../components";
import SingleProductPage from "../../components/SingleProductPage";
import { useGetSingleProduct } from "../../hooks";

const Product = () => {
  const router = useRouter();

  const productID = router.query.productID as string;

  const { data, isLoading, isError } = useGetSingleProduct(productID);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative mx-auto mt-20 w-4/5">
      <SingleProductPage productData={data} />
    </div>
  );
};

export default Product;
