import { cn } from "@/utils/cn";

function Table({
  children,
  className,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table
        className={cn(
          "min-w-full",
          className
        )}
      >
        {children}
      </table>
    </div>
  );
}

function Head({ children }) {
  return (
    <thead className="bg-slate-100">
      {children}
    </thead>
  );
}

function Body({ children }) {
  return <tbody>{children}</tbody>;
}

function Row({ children }) {
  return (
    <tr className="border-b transition-colors hover:bg-slate-50">
      {children}
    </tr>
  );
}

function HeaderCell({ children }) {
  return (
    <th
      scope="col"
      className="px-6 py-4 text-left text-sm font-semibold"
    >
      {children}
    </th>
  );
}

function Cell({ children }) {
  return (
    <td className="px-6 py-4 text-sm">
      {children}
    </td>
  );
}

Table.Head = Head;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export default Table;