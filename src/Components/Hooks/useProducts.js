import { useEffect, useState } from "react";

function useProducts() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/parts`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [products]);

  return [products];
}

export default useProducts;
