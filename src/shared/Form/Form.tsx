import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataEdit, Product } from "../../shared/type/type";

const Form = ({ text, formData }: { text: string; formData: Product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: formData,
  });

  const history = useNavigate();
  const onSubmit = async (data: Product) => {
    try {
      if (!data.id) {
        throw new Error("Product ID is missing");
      }

      const edit:DataEdit = {
        packsNumber:parseInt(data.packsNumber),
        packageType:data.packageType,
        isArchived:data.isArchived,
        description:data.description
      }
      
      const { createdAt, id, ...requestData } = data;
      const response = await axios.patch(
        `http://localhost:8081/productTypes/${data.id}`,
        edit
      );
      console.log("Product edited:", response.data);
      history("/");
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <h1 className=" font-bold text-3xl">{text}</h1>

        <form className="flex flex-col " onSubmit={handleSubmit(onSubmit)}>
          <label className=" mt-6 ">
            Кол-во пачек <span className="text-orange-600">*</span>
            <input
              className=" border pl-2 rounded-md"
              {...register("packsNumber", {
                required: true,
                pattern: /^[0-9]*$/i,
              })}
            />
            {errors.packsNumber && <p>Это поле обязательно</p>}
            {errors.packsNumber?.type === "pattern" && (
              <p>Пожалуйста, введите только цифры</p>
            )}
          </label>

          <label className=" mt-6">
            Тип упаковки <span className=" text-orange-600">*</span>
            <select {...register("packageType", { required: true })}>
              <option value="компрессия">компрессия</option>
              <option value="некомпрессия">некомпрессия</option>
            </select>
            {errors.packageType && <p>Это поле обязательно</p>}
          </label>
          <label className=" mt-6">
            Архивировано <span className=" text-orange-600">*</span>
            <input
              {...register("isArchived", { required: false })}
              type="checkbox"
            />
            {errors.isArchived && <p>Это поле обязательно</p>}
          </label>
          <label className=" mt-6">
            Описание <span className=" text-orange-600">*</span>
            <input
              className=" border pl-2 rounded-md widParam text-justify"
              {...register("description", {
                required: true,
                minLength: 5,
              })}
              type="text"
            />
            {errors.description && <p>Это поле обязательно</p>}
          </label>
          <button type="submit" className="pl-3">
            Сохранить
          </button>
          <button className="pl-3" onClick={() => history("/")}>
            Отмена
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
