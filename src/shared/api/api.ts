import axios from "axios";

const BASE_URL = "http://localhost:8081/productTypes";

export const getProduct  =  async () => {
    try {
        const res = await axios({
            url:`${BASE_URL}`,
            method:"GET"
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const deleteProductById = async (productId: string) => {
  try {
    // Отправляем DELETE-запрос по указанному URL, заменяя {productId} на конкретный идентификатор продукта
    await axios.delete(`http://localhost:8081/productTypes/${productId}`);
    console.log("Product deleted successfully");
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw error; // Пробрасываем ошибку выше для обработки в вызывающем компоненте
  }
};