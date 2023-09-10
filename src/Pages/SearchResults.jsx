import React from "react";
import Product from "../Components/Product";
import { useSearchResults } from "../Hooks/useSearchResults";

const SearchResults = () => {
  const { data, isLoading, error } = useSearchResults();

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Something went wrong</div>}
      {data?.products?.length === 0 && <div>No products found</div>}

      {data?.products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default SearchResults;
