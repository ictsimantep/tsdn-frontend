import React, { useMemo } from "react";
import { IHealth } from "../../../interface/admin/health";
import { useHealthTable } from "../../../hooks/data/useHealthData";
import { useHealthForm } from "../../../hooks/forms/admin/useHealthForm";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableContainer,
} from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import Swal, { SweetAlertResult } from "sweetalert2";
import { useDeleteHealth } from "../../../hooks/mutation/admin/health/useDeleteHealth";

// Action buttons for each row
const ActionColumn = ({
  row,
  refetch,
}: {
  row: IHealth;
  refetch: () => void;
}) => {
  const { setSelected, setOpen } = useHealthForm();
  const { mutateAsync } = useDeleteHealth();

  const onEdit = () => {
    setSelected(String(row.uuid));
    setOpen(true);
  };

  const onDelete = () => {
    const SwalWithReactContent = withReactContent(Swal);
    SwalWithReactContent.fire({
      title: "Are you sure?",
      text: "The process cannot be undone",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, proceed!",
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    }).then((result: SweetAlertResult) => {
      if (result.isConfirmed) {
        mutateAsync(String(row.uuid));
        refetch();
      }
    });
  };

  return (
    <div className="flex gap-2">
      {/* <Button variant="contained" color="warning" onClick={onEdit}>
        Edit
      </Button> */}
      {/* <Button variant="contained" color="error" onClick={onDelete}>
        Delete
      </Button> */}
    </div>
  );
};

export default function HealthTable() {
  const {
    data,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalData,
    refetch,
  } = useHealthTable();

  const tableData = useMemo(() => data?.data || [], [data]);

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset to first page when page size changes
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Systol</TableCell>
              <TableCell>Diastol</TableCell>
              <TableCell>Heart Rate</TableCell>
              <TableCell>Profesion</TableCell>
              <TableCell>Risk</TableCell>
              <TableCell>BMI</TableCell>
              <TableCell>Recommendation Food</TableCell>
              <TableCell>Recommendation Sport</TableCell>
              <TableCell>Recommendation Medicine</TableCell>
              {/* <TableCell>Actions</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row: IHealth) => (
              <TableRow key={row.id}>
                <TableCell>{row.nama}</TableCell>
                <TableCell>{row.jenis_kelamin}</TableCell>
                <TableCell>{row.umur}</TableCell>
                <TableCell>{row.bb}</TableCell>
                <TableCell>{row.tb}</TableCell>
                <TableCell>{row.systol}</TableCell>
                <TableCell>{row.diastol}</TableCell>
                <TableCell>{row.heart_rate}</TableCell>
                <TableCell>{row.profesi}</TableCell>
                <TableCell>{row.risk}</TableCell>
                <TableCell>{row.bmi}</TableCell>
                <TableCell>{row.recommendation_food}</TableCell>
                <TableCell>{row.recommendation_sport}</TableCell>
                <TableCell>{row.recommendation_medicine}</TableCell>
                {/* <TableCell>
                  <ActionColumn row={row} refetch={refetch} />
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination controls */}
      <TablePagination
        component="div"
        count={totalData} // Total number of rows
        page={currentPage} // Current page
        onPageChange={handleChangePage} // Function to handle page change
        rowsPerPage={pageSize} // Rows per page
        onRowsPerPageChange={handleChangeRowsPerPage} // Handle changing rows per page
        rowsPerPageOptions={[10, 25, 50]} // Options for number of rows per page
      />
    </Paper>
  );
}
