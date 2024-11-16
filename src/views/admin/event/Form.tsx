import React, { useEffect, useState } from "react";
import { useEventForm } from "@/hooks/forms/admin/useEventForm";
import { useCreateEvent } from "@/hooks/mutation/admin/event/useCreateEvent";
import { useUpdateEvent } from "@/hooks/mutation/admin/event/useUpdateEvent";
import { useEventTable } from "@/hooks/data/useEventData";
import { IEvent, IEventCategory, IUpdateEvent } from "@/interface/admin/event";
import { AdminEventValues } from "@/schema/admin/event";
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
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // import style Quill
import CustomTextField from "../../../@core/components/mui/TextField";
import { textToSlug } from "../../../utils/string";

export default function AdminEventForm() {
  const { form, selected, setOpen, data } = useEventForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync: addEvent } = useCreateEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const { refetch } = useEventTable();

  const { errors } = form.formState; // Get errors from form state

  // States
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    setImageUrl(data?.image_url);
  }, [selected, data]);

  // Hooks
  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
    form.setValue("image_url", acceptedFiles[0]); // Set the file in the form state
    setImageUrl("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
  });

  const onSubmit = async (values: AdminEventValues) => {
    setIsLoading(true);
    try {
      const updatedValues = {
        ...values,
        image_url: file,
        slug: textToSlug(values.title),
      };

      if (!selected) {
        await addEvent(updatedValues); // Panggil API dengan data yang telah diubah
      } else {
        await updateEvent(updatedValues);
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
      <CardHeader title={selected ? "Edit Event" : "Add Event"} />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <form onSubmit={form.handleSubmit(onSubmit)} {...form}>
            <Box sx={{ marginBottom: "1rem" }}>
              <Controller
                name="title"
                control={form.control}
                rules={{ required: "Title is required" }} // Add validation rule
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Title"
                    placeholder="Please input a title of event"
                    error={!!errors.title} // Show error state
                    helperText={errors.title?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>

            {/* Link Field with Error Handling */}
            <Box sx={{ marginBottom: "2rem" }}>
              <Controller
                name="content"
                control={form.control}
                render={({ field }) => (
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="Caption"
                    placeholder="Please input a caption of event"
                    error={!!errors.content} // Show error state
                    helperText={errors.content?.message} // Display error message
                    {...field}
                  />
                )}
              />
            </Box>
            <Box sx={{ marginBottom: "2rem" }}>
              <Controller
                name="description"
                control={form.control}
                rules={{ required: true }}
                render={({ field }) => (
                  <ReactQuill
                    {...field}
                    placeholder="Write something here..."
                    theme="snow" // Tema editor React Quill
                  />
                )}
              />
            </Box>

            {/* Image Upload with Error Handling */}
            <Box sx={{ marginBottom: "1rem", marginTop: "1.5rem" }}>
              {imageUrl && !file && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%", // Adjust based on container height
                  }}
                >
                  <img
                    src={imageUrl}
                    alt="Existing"
                    style={{
                      width: "450px",
                      height: "300px",
                      marginBottom: "10px",
                    }}
                  />
                </div>
              )}
              <Controller
                name="image_url"
                control={form.control}
                rules={{ required: "Image is required" }} // Add validation rule
                render={({ field }) => (
                  <>
                    <Box
                      {...getRootProps({ className: "dropzone" })}
                      {...(file && { sx: { height: 450 } })}
                      sx={{
                        borderRadius: "1px",
                        border: `1px dashed ${errors.image_url ? "red" : "white"}`,
                      }}
                    >
                      <input {...getInputProps()} />
                      {file ? (
                        <img
                          key={file.name}
                          alt={file.name}
                          className="single-file-image"
                          src={URL.createObjectURL(file)}
                        />
                      ) : (
                        <div className="flex items-center flex-col">
                          <Avatar
                            variant="rounded"
                            className="bs-12 is-12 mbe-9"
                          >
                            <i className="tabler-upload" />
                          </Avatar>
                          <Typography variant="h4" className="mbe-2.5">
                            Drop files here or click to upload.
                          </Typography>
                          <Typography>
                            Drop files here or click{" "}
                            <a
                              href="/"
                              onClick={(e) => e.preventDefault()}
                              className="text-textPrimary no-underline"
                            >
                              browse
                            </a>{" "}
                            through your machine
                          </Typography>
                        </div>
                      )}
                    </Box>
                    <Typography variant="h5">
                      {errors.image_url && `${errors.image_url.message}`}
                    </Typography>
                  </>
                )}
              />
            </Box>

            <Box sx={{ marginBottom: "2rem" }}>
              <Controller
                name="status"
                control={form.control}
                render={({ field }) => (
                  <>
                    <InputLabel>Active</InputLabel>
                    <FormControlLabel
                      label="Status"
                      control={
                        <Checkbox
                          checked={field.value === 1} // Mengonversi nilai menjadi boolean untuk Checkbox
                          onChange={(e) =>
                            field.onChange(e.target.checked ? 1 : 0)
                          } // Ubah boolean menjadi 1 atau 0
                        />
                      }
                    />
                    {errors.status && (
                      <FormHelperText>{errors.status.message}</FormHelperText>
                    )}
                  </>
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
                {!selected ? "Create Event" : "Update Event"}
              </Button>
            </Box>
          </form>
        </Box>
      </CardContent>
    </Card>
  );
}
