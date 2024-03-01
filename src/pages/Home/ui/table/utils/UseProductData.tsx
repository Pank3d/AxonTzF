import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, deleteProductById } from "../../../../../shared/api/api";
import {
  deleteProduct,
  selectProducts,
  setProducts,
} from "../../../../../shared/store/productSlce";
import { Product, TableData } from "../../../../../shared/type/type";


export const useProductData = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [tooltipContent, setTooltipContent] = useState<{
    [key: string]: string;
  }>({});
  const [tooltipVisible, setTooltipVisible] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProduct();
        dispatch(setProducts(products));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (products) {
      const sortedProduct = products
        .slice()
        .sort(
          (
            a: { createdAt: string | number | Date },
            b: { createdAt: string | number | Date }
          ) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      const newData: TableData[] = sortedProduct.map(
        (item: Product, index: number) => ({
          id: item.id,
          number: index + 1,
          packsNumber: parseInt(item.packsNumber),
          packageType: item.packageType,
          createdAt: item.createdAt,
          isArchived: item.isArchived,
          description: item.description || "",
          actions: () => {},
        })
      );
      setTableData(newData);

      const initialTooltipContent: { [key: string]: string } = {};
      const initialTooltipVisible: { [key: string]: boolean } = {};
      sortedProduct.forEach((item: { id: string | number }) => {
        initialTooltipContent[item.id] = "";
        initialTooltipVisible[item.id] = false;
      });
      setTooltipContent(initialTooltipContent);
      setTooltipVisible(initialTooltipVisible);
    }
  }, [products]);

  const handleTooltip = (id: string, description: string) => {
    setTooltipContent({ ...tooltipContent, [id]: description });
    setTooltipVisible({ ...tooltipVisible, [id]: !tooltipVisible[id] });
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Произошла ошибка при удалении продукта.");
    }
  };

  return {
    tableData,
    tooltipContent,
    tooltipVisible,
    handleTooltip,
    handleDeleteProduct,
  };
};
