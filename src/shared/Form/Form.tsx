import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Product } from "../type/type";
import { submitFormDataEdit } from "./SubmitForData";

const FormEdit = ({ text, formData }: { text: string; formData: Product }) => {
  const [formDataLocal, setFormDataLocal] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
  const history = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    console.log("Saved data from localStorage:", savedData);
    if (savedData) {
      setFormDataLocal(JSON.parse(savedData));
    } else {
      setFormDataLocal(formData);
    }
    setLoading(false); 
  }, [formData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>({
    defaultValues: formDataLocal ?? formData,
  });

  const onSubmit = handleSubmit((data: Product) => {
    submitFormDataEdit(
      data,
      (response: Product) => {
        localStorage.setItem("formData", JSON.stringify(data));
        setFormDataLocal(data);
        history("/");
      },
      (error: any) => {
        console.error("Error submitting form data:", error);
      }
    );
  });

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="form-wrapper">
      <h1 className="font-bold text-3xl">{text}</h1>

      <form className="flex flex-col" onSubmit={onSubmit}>
        <label className="mt-6">
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

        <label className="mt-6">
          Тип упаковки <span className="text-orange-600">*</span>
          <select {...register("packageType", { required: true })}>
            <option value="компрессия">компрессия</option>
            <option value="некомпрессия">некомпрессия</option>
          </select>
          {errors.packageType && <p>Это поле обязательно</p>}
        </label>
        <label className="mt-6">
          Архивировано <span className="text-orange-600">*</span>
          <input
            {...register("isArchived", { required: false })}
            type="checkbox"
          />
          {errors.isArchived && <p>Это поле обязательно</p>}
        </label>
        <label className="mt-6">
          Описание <span className="text-orange-600">*</span>
          <input
            className="border pl-2 rounded-md widParam text-justify"
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
  );
};

export default FormEdit;
