import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { submitFormDataMake } from "./SubmitForData";

const FormForMake = ({ text }: { text: string}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      packsNumber: null,
      packageType: "",
      isArchived: false,
      description: "",
    },
  });
  const history = useNavigate();

  const onSubmit = (data: any) => {
    submitFormDataMake(data, () => {
      history("/");
    });
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
            <input
              type="checkbox"
              {...register("isArchived", { required: false })}
            />
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
          <button type="button" className="pl-3" onClick={() => history("/")}>
            Отмена
          </button>
        </form>
      </div>
    </>
  );
};

export default FormForMake;
