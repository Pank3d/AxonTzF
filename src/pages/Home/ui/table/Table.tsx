import { Link } from "react-router-dom";
import {
  createColumnHelper,
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { formatDate } from "./utils/formatData";
import { TableData } from "../../../../shared/type/type";
import { useProductData } from "./utils/UseProductData";

const columnHelper = createColumnHelper<TableData>();

const Table = () => {
  const {
    tableData,
    tooltipContent,
    tooltipVisible,
    handleTooltip,
    handleDeleteProduct,
  } = useProductData();

  const columns: ColumnDef<TableData, any>[] = [
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
    <>
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
                  <td
                    key={cell.id}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
