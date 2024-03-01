import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FormForMake = ({ text }: { text: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      packsNumber: "",
      packageType: "",
      isArchived: false,
      description: "",
    },
  });
  const history = useNavigate()

 const onSubmit = async (data: any) => {
   try {
     const newData = {
       packsNumber: Number(data.packsNumber), 
       packageType: data.packageType,
       isArchived: data.isArchived,
       description: data.description,
     };

     const response = await axios.post(
       "http://localhost:8081/productTypes",
       newData
     );

     console.log("New product added:", response.data);
     history("/");
   } catch (error) {
     console.error("Error adding product:", error);
   }
 };

  return (
    <>
      <div className="form-wrapper">
        <h1 className=" font-bold text-3xl">{text}</h1>

        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className=" mt-6 ">
            Кол-во пачек <span className="text-orange-600">*</span>
            <input
              className="border pl-2 rounded-md"
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
            <input type="checkbox" {...register("isArchived", {required:false})} />
            {errors.isArchived && <p>Это поле обязательно</p>}
          </label>

          <label className=" mt-6">
            Описание <span className=" text-orange-600">*</span>
            <textarea
              className="border pl-2 rounded-md widParam text-justify"
              {...register("description", {
                required: true,
                minLength: 5,
              })}
            />
            {errors.description && <p>Это поле обязательно</p>}
          </label>

          <button type="submit" className="pl-3 pt-4">
            Сохранить
          </button>
          <button type="button" className="pl-3" onClick={() => history('/')}>
            Отмена
          </button>
        </form>
      </div>
    </>
  );
};

export default FormForMake;
