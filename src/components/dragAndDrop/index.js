import React, { useCallback, useState } from "react";
import { Button, Container } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import "./drag.css";
import { useTheme } from "@emotion/react";
import { Tokens } from "../../utils/colors/Colors";
import { uploadImage } from "../../redux-toolkit/upload-imgs/uploadImgSlice";

function Pneumonia() {
  const theme = useTheme();
  const colors = Tokens(theme.palette.mode) || {};
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

    // Create a FormData object and append the file to it
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    // Dispatch the async thunk to upload the image
    try {
      await dispatch(uploadImage(formData));
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  // Access the upload result, loading, and error from the Redux store
  const { loading, error, uploadResult } = useSelector(
    (state) => state.pneumonia
  );

  // Log the results
  console.log("Loading:", loading);
  console.log("Error:", error);
  console.log("Upload Result:", uploadResult);

  return (
    <Container className="container">
      <h1 className="text-6xl font-black text-center text-slate-900 mb-20">
        Pneumonia
      </h1>

      <form
        className="max-w-md border border-gray-200 rounded p-6 mx-auto"
        onSubmit={handleOnSubmit}
      >
        <div
          className={`mb-5 dropzone ${isDragActive ? "active" : ""}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the Image here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
        {preview && (
          <div className="mb-5">
            <img src={preview} alt="Upload preview" className="preview-image" />
            <Button
              sx={{
                backgroundColor:
                  colors.greenAccent?.[500] || colors.greenAccent || "",
                color: colors.grey?.[100] || colors.grey || "",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
                mt: 3,
                display: "inline-block",
                marginLeft: "10px",
              }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
        <Button
          sx={{
            backgroundColor:
              colors.greenAccent?.[700] || colors.greenAccent || "",
            color: colors.grey?.[100] || colors.grey || "",
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            mt: 3,
            display: "inline-block",
          }}
          type="submit"
        >
          Predict Lung Cancer
        </Button>
      </form>
    </Container>
  );
}

export default Pneumonia;
