import { XCircleIcon } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

const Upload = ({ onClose, onSave }) => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    imageUrl: "", // Store the IPFS URL of the uploaded image
  });
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setIsUploading(true);

      try {
        // Create FormData to send to your backend
        const formData = new FormData();
        formData.append("file", file);

        // Upload the image to your backend
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const pinataResponse = await response.json();
          const imageUrl = pinataResponse.fileUrl;
          setCategoryData({ ...categoryData, imageUrl });
        } else {
          console.error("Error uploading image:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:3000/restorex/categories/addCategory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: categoryData.name,
            Image: categoryData.imageUrl, // Send the IPFS URL in the payload
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        onSave(result.newCategory);
        onClose();
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add New Category</h3>
          <button onClick={onClose}>
            <XCircleIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={categoryData.name}
              onChange={(e) =>
                setCategoryData({ ...categoryData, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image</label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 p-4 rounded text-center cursor-pointer"
            >
              <input {...getInputProps()} />
              {isUploading ? (
                <p>Uploading image...</p>
              ) : categoryData.imageUrl ? (
                <p>Image uploaded successfully!</p>
              ) : isDragActive ? (
                <p>Drop the image here...</p>
              ) : (
                <p>Drag & drop an image here, or click to select</p>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={isUploading || !categoryData.imageUrl}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Upload;
