import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import React from "react";
import { useHealthForm } from "../../../hooks/forms/admin/useHealthForm";
import AdminHealthForm from "./Form";
import Table from "./Table";

export default function ViewAdminHealth() {
  const { setOpen, open, setSelected } = useHealthForm();

  const handleFormOpen = () => {
    setSelected("");
    setOpen(!open);
  };
  return (
    <Grid container columnGap={open ? 4 : 0} rowGap={open ? 4 : 0}>
      {open ? (
        <Grid item xs={12} lg={12} md={12}>
          <AdminHealthForm />
        </Grid>
      ) : null}
      <Grid item xs={12} lg={12} md={12}>
        <Card
          sx={{
            width: "100%",
          }}
        >
          <CardHeader
            title="Health Management"
            action={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ padding: "8px 40px", gap: "4px" }}
                  onClick={handleFormOpen}
                >
                  Add Health
                </Button>
              </Box>
            }
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            ></Box>
          </CardHeader>
          <CardContent>
            <Table />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
