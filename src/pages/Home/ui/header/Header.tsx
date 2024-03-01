import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between mt-14">
      <p className=" font-bold text-2xl">Список выпускаемой продукции</p>
      <Link to={"/MakeProduct/"}>
        <button className=" font-bold text-2xl ">Создать тип продукции</button>
      </Link>
    </div>
  );
};

export default Header;
