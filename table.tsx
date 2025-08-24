import React from "react";
import DataTable from "react-data-table-component";

interface BookTableProps {
  data: Record<string, string | number>[];
}

const columns = [
  { name: "Title", selector: (row: any) => row.title, sortable: true },
  { name: "Author", selector: (row: any) => row.authors, sortable: true },
  { 
    name: "Average Rating", 
    selector: (row: any) => row.prediction,
    cell: (row: any) => <strong>{row.prediction}</strong>, 
    sortable: true,
  },
];

const BookTable: React.FC<BookTableProps> = ({ data }) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      responsive
      highlightOnHover
      striped
    />
  );
};

export default BookTable;
