import axios from "axios";
import { DataEdit, Product } from "../type/type";

export const submitFormDataMake = async (data: any, onSuccess: () => void) => {
  try {
    const packsNumber = parseInt(data.packsNumber);
    if (packsNumber === 0) {
      console.error("Ошибка: Количество пачек не может быть равным нулю");
      return;
    }

    const newData = {
      packsNumber: packsNumber,
      packageType: data.packageType,
      isArchived: data.isArchived,
      description: data.description,
    };

    const response = await axios.post(
      "http://localhost:8081/productTypes",
      newData
    );

    console.log("New product added:", response.data);
    onSuccess();
  } catch (error) {
    console.error("Error adding product:", error);
  }
};

export const submitFormDataEdit = async (
  data: Product,
  onSuccess: (response: Product) => void, 
  onError: (error: any) => void
) => {
  try {
    if (!data.id) {
      throw new Error("Product ID is missing");
    }

    const edit: DataEdit = {
      packsNumber: parseInt(data.packsNumber),
      packageType: data.packageType,
      isArchived: data.isArchived,
      description: data.description,
    };

    const response = await axios.patch(
      `http://localhost:8081/productTypes/${data.id}`,
      edit
    );

    console.log("Product edited:", response.data);
    onSuccess(response.data);
  } catch (error) {
    console.error("Error editing product:", error);
    onError(error);
  }
};
