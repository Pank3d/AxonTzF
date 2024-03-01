import { ReactNode, createContext, useEffect, useState } from "react";
import { getProduct } from "../../shared/api/api";
import { RequestData } from "../../shared/type/type";

export const ProductContext = createContext<RequestData[] | null>(null);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<RequestData[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        const productData: RequestData[] = data.map((item: any) => ({
          id: item.id,
          packsNumber: item.packsNumber,
          packageType: item.packageType,
          isArchived: item.isArchived,
          description: item.description,
          createdAt: item.createdAt,
        }));
        setProduct(productData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  return (
    <ProductContext.Provider value={product}>
      {children}
    </ProductContext.Provider>
  );
};
