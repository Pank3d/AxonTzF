import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  createColumnHelper,
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Product, TableData } from "../../../../shared/type/type";
import { useDispatch, useSelector } from "react-redux";
import { getProduct, deleteProductById } from "../../../../shared/api/api";
import { deleteProduct, selectProducts, setProducts } from "../../../../shared/store/productSlce";

interface TableDataWithId extends TableData {
  id: string;
}

const columnHelper = createColumnHelper<TableDataWithId>();

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const Table = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const [tableData, setTableData] = useState<TableDataWithId[]>([]);
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

    return () => {};
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
      const newData: TableDataWithId[] = sortedProduct.map(
        (item: Product, index: number) => ({
          id: item.id,
          number: index + 1,
          packsNumber: Number(item.packsNumber),
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

  const columns: ColumnDef<TableDataWithId, any>[] = [
    columnHelper.accessor("number", {
      cell: (info) => info.row.original.number,
      header: () => <span className="px-4 py-2">№</span>,
    }),
    columnHelper.accessor("packsNumber", {
      cell: (info) => info.row.original.packsNumber,
      header: () => <span className="px-4 py-2">Кол-во пачек</span>,
    }),
    columnHelper.accessor("packageType", {
      cell: (info) => info.row.original.packageType,
      header: () => <span className="px-4 py-2">Тип упаковки</span>,
    }),
    columnHelper.accessor("createdAt", {
      cell: (info) => formatDate(info.row.original.createdAt),
      header: () => <span className="px-4 py-2">Дата создания</span>,
    }),
    columnHelper.accessor("isArchived", {
      cell: (info) =>
        info.row.original.isArchived ? "Архивировано" : "Не архивировано",
      header: () => <span className="px-4 py-2">Статус</span>,
    }),
    columnHelper.accessor("description", {
      cell: (info) => (
        <div
          className="tooltip-container relative"
          onClick={() =>
            handleTooltip(info.row.original.id, info.row.original.description)
          }
        >
          <img
            className="w-6 h-6"
            src="../../../../../public/cont.svg"
            alt=""
          />
          {tooltipVisible[info.row.original.id] && (
            <span className="tooltip-text absolute top-full left-0 bg-white p-2">
              {tooltipContent[info.row.original.id]}
            </span>
          )}
        </div>
      ),
      header: () => <span className="px-4 py-2"></span>,
    }),
    columnHelper.accessor("actions", {
      cell: (info) => (
        <div>
          <button
            className="px-4 py-2"
            onClick={() => handleDeleteProduct(info.row.original.id)}
          >
            Delete
          </button>
          <Link
            to={`/editProduct/${info.row.original.id}`}
            className="px-4 py-2"
          >
            <img src="../../../../../public/cont1.svg" alt="Edit" />
          </Link>
        </div>
      ),
      header: () => <span className="px-4 py-2"></span>,
    }),
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 mt-10">
      <table className="w-full">
        <thead className="px-4 py-2 border border-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-gray-300"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 border border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
