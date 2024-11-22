import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import imageCompression from "browser-image-compression";
import GoBack from "@/components/layout/admin/GoBack";
import { useCategories } from "@/hooks/useCategories";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AddCategoryPage = () => {
  const { addCategory } = useCategories();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [categoryImagePreview, setCategoryImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async (file) => {
    const options = {
      maxSizeMB: 0.05,
      maxWidthOrHeight: 360,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = () => reject("Error converting file to base64");
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error("Error compressing image:", error);
      throw new Error("Image compression failed");
    }
  };

  const handleCategoryImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await handleImageUpload(file);
      setCategoryImage(base64);
      setCategoryImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newCategory = {
        name: categoryName,
        Image: categoryImage,
      };

      await addCategory(newCategory);
      toast({
        title: "Success",
        description: "Category added successfully!",
        variant: "default",
      });
      navigate("/admin/categories"); // Navigate to categories page
    } catch (error) {
      console.error("Error adding category:", error);
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <GoBack to="/admin/categories" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add New Category</CardTitle>
          <CardDescription>
            Fill in the details to add a new category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>Category Name</Label>
                <Input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  required
                />
              </div>

              <div>
                <Label>Category Image (Optional)</Label>
                <Input type="file" onChange={handleCategoryImageChange} />
                {categoryImagePreview && (
                  <img
                    src={categoryImagePreview}
                    alt="Category Preview"
                    className="w-24 h-24 mt-2"
                  />
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Add Category"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategoryPage;
