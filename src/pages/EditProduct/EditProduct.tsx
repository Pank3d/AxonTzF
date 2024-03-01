import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "../../shared/Form/Form";
import { Product } from "../../shared/type/type";
import { selectProducts } from "../../shared/store/productSlce";
function EditProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [productData, setProductData] = useState<Product | undefined>();
  useEffect(() => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      setProductData(product);
    }
  }, [productId, products, dispatch]);

  return (
    <div>
      {productData && (
        <Form text={"Редактирование Продукта"} formData={productData} />
      )}
    </div>
  );
}

export default EditProduct;
