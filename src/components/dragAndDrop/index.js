import React, { useCallback, useState } from "react";
import { Button, Container, Typography, Paper, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux-toolkit/upload-imgs/uploadImgSlice";
import { useTheme } from "@emotion/react";
import CancelIcon from "@mui/icons-material/Cancel";
import { Alert, AlertTitle } from "@mui/material"; // Import Alert and AlertTitle
import "./drag.css";
import Header from "../Headers/PagesHeader";

const Pneumonia = () => {
  const theme = useTheme();
  const colors = theme.palette.mode || {};
  const [preview, setPreview] = useState(null);
  const [imageName, setImageName] = useState(null);
  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = new FileReader();

      file.onload = function () {
        setPreview(file.result);
        setImageName(acceptedFiles[0].name);
      };

      file.readAsDataURL(acceptedFiles[0]);
    },
    [setPreview, setImageName]
  );

  const handleCancel = () => {
    setPreview(null);
    setImageName(null);
  };

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      onDrop,
    });

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (typeof acceptedFiles[0] === "undefined") return;

    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    try {
      const response = await dispatch(uploadImage(formData));

      // Assuming your response has a 'pneumonia_prediction' property
      console.log(response.pneumonia_prediction);

      // Handle the 'pneumonia_prediction' object as needed
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  const { loading, error, uploadResult } = useSelector(
    (state) => state.pneumonia
  );

  return (
    <Container maxWidth="md" className="container" mt={4}>
      <Box margin="20px">
        <Header title="Pneumonia Prediction:" />
      </Box>
      <Typography
        variant="h4"
        color="primary"
        textAlign="center"
        mb={4}
      ></Typography>

      <Paper
        elevation={3}
        className={`mb-5 dropzone ${isDragActive || preview ? "active" : ""}`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography textAlign="center" variant="body1" mt={2} mb={2}>
            Drop the Image here ...
          </Typography>
        ) : preview ? (
          <div style={{ maxHeight: "150px", overflow: "hidden" }} mt={2} mb={2}>
            <img
              src={preview}
              alt="Upload preview"
              className="preview-image"
              style={{
                borderRadius: "8px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                width: "200px",
              }}
            />
          </div>
        ) : (
          <Header
            title="Drag And drop Your Image X-ray"
            subtitle="click Here to select files"
          />
        )}

        {preview && (
          <div className="mb-3">
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              mt={2}
              mb={2}
            >
              Image Name: {imageName}
            </Typography>

            <Header subtitle="  Click Predict to see Your result  " />
          </div>
        )}
      </Paper>

      {preview && (
        <div
          className="mb-5"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "10px",
            marginTop: "50px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            size="large"
            onClick={handleOnSubmit}
          >
            Predict pneumonia
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      )}

      {/* Display loading and error states */}
      {loading && (
        <Typography variant="body2" mt={2}>
          Loading...
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error" mt={2}>
          Error: {error}
        </Typography>
      )}
            <Box mb="80px" />

      {uploadResult && (
        <Alert
          severity={
            uploadResult.pneumonia_prediction === "NORMAL" ? "success" : "error"
          }
          // sx={{
          //   width: "50%",  // Set your desired width
          //   backgroundColor: uploadResult.cancer_prediction === "NO"
          //     ? colors.greenAccent[700]
          //     : colors.redAccent[500],
          //   color: colors.grey[100],
          //   marginLeft: "auto",
          //   marginRight: "auto",
          //   marginTop: "2rem",  // Adjust the margin-top as needed
          // }}
          className="mb-3"
        >
          <AlertTitle>
            {uploadResult.pneumonia_prediction === "NORMAL"
              ? "NORMAL"
              : "PNEUMONIA"}
          </AlertTitle>
          {uploadResult.pneumonia_prediction === "NORMAL"
            ? "This is a Nigative Resulte."
            : "This is an positive Resulte."}
        </Alert>
      )}
    </Container>
  );
};

export default Pneumonia;
