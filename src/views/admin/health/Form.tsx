import React, { useEffect, useState } from "react";
import { useHealthForm } from "@/hooks/forms/admin/useHealthForm";
import { useCreateHealth } from "@/hooks/mutation/admin/health/useCreateHealth";
import { useUpdateHealth } from "@/hooks/mutation/admin/health/useUpdateHealth";
import { useHealthTable } from "@/hooks/data/useHealthData";
import { IHealth, IUpdateHealth } from "@/interface/admin/health";
import { AdminHealthValues } from "@/schema/admin/health";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "../../../@core/components/mui/TextField";
import { useDropzone } from "react-dropzone";
import { useAtom } from "jotai";
import { alertOpenAtom } from "../../../components/alert/alertAtoms";

export default function AdminHealthForm() {
  const { form, selected, setOpen, data } = useHealthForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: addHealth } = useCreateHealth();
  const { mutateAsync: updateHealth } = useUpdateHealth();
  const { refetch } = useHealthTable();

  const { errors } = form.formState; // Get errors from form state

  // States
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [activeCheck, setActiveCheck] = useState<string>("");

  useEffect(() => {
  }, [selected, data]);

  // Hooks
  const onDrop = (acceptedFiles: File[]) => {
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const onSubmit = async (values: AdminHealthValues) => {
    setIsLoading(true);

    try {
      const updatedValues = {
        ...values,
      };

      if (!selected) {
        await addHealth(updatedValues); // Panggil API dengan data yang telah diubah
      } else {
        await updateHealth(updatedValues);
      }

      form.reset(); // Reset setelah mutasi berhasil
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    refetch();
    setFile(null);
    form.reset(); // Reset form setelah submit
  };

  return (
    <Card>
      <CardHeader title={selected ? "Edit Health" : "Add Health"} />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <form onSubmit={form.handleSubmit(onSubmit)} {...form}>
            {/* Title Field with Error Handling */}
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="nama"
                control={form.control}
                rules={{ required: "Name is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Name"
                    placeholder="Please input a name of person"
                    error={!!errors.nama} // Show error state
                    helperText={errors.nama?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            {/* Subtitle Field with Error Handling */}
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="jenis_kelamin"
                control={form.control}
                rules={{ required: "Gender is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Gender"
                    placeholder="Please input a gender, type L for Man and P for Woman"
                    error={!!errors.jenis_kelamin} // Show error state
                    helperText={errors.jenis_kelamin?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="umur"
                control={form.control}
                rules={{ required: "Age is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Age"
                    placeholder="Please input a age of person"
                    error={!!errors.umur} // Show error state
                    helperText={errors.umur?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="bb"
                control={form.control}
                rules={{ required: "Weight is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Weight"
                    placeholder="Please input a weight of person"
                    error={!!errors.bb} // Show error state
                    helperText={errors.bb?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="tb"
                control={form.control}
                rules={{ required: "Height is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Height"
                    placeholder="Please input a height of person"
                    error={!!errors.tb} // Show error state
                    helperText={errors.tb?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="systol"
                control={form.control}
                rules={{ required: "Systol is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Systol"
                    placeholder="Please input a systol of person"
                    error={!!errors.systol} // Show error state
                    helperText={errors.systol?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

             <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="diastol"
                control={form.control}
                rules={{ required: "Diastol is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Diastol"
                    placeholder="Please input a diastol of person"
                    error={!!errors.diastol} // Show error state
                    helperText={errors.diastol?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

             <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="heart_rate"
                control={form.control}
                rules={{ required: "Heart Rate is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Heart Rate"
                    placeholder="Please input a Hearth Rate of person"
                    error={!!errors.heart_rate} // Show error state
                    helperText={errors.heart_rate?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="profesi"
                control={form.control}
                rules={{ required: "Profession is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Profession"
                    placeholder="Please input a Profession of person"
                    error={!!errors.profesi} // Show error state
                    helperText={errors.profesi?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            <Divider sx={{ my: "20px" }} />
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <Button
                variant="contained"
                color="error"
                sx={{ marginRight: "1.5rem" }}
                type="button"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "primary.800" }}
                type="submit"
                disabled={isLoading}
              >
                {!selected ? "Create Health" : "Update Health"}
              </Button>
            </Box>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
