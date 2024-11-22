import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import GoBack from "@/components/layout/admin/GoBack";
import { useCategories } from "../../../hooks/useCategories";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AddSubCategoryPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { addSubCategory, loadingCategories, getCategories } = useCategories();

  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Track the selected category
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [getCategories]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newSubCategory = {
        name: subCategoryName,
        category: categoryId,
      };

      await addSubCategory(newSubCategory);
      toast({
        title: "Success",
        description: "SubCategory added successfully!",
        variant: "default",
      });
      navigate("/admin/subcategories"); // Redirect to SubCategories page
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add SubCategory. Please try again.",
        variant: "destructive",
      });
      console.error("Error adding SubCategory:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <GoBack to="/admin/subcategories" />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add SubCategory</CardTitle>
          <CardDescription>
            Add a new subcategory by providing the details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>SubCategory Name</Label>
                <Input
                  value={subCategoryName}
                  onChange={(e) => setSubCategoryName(e.target.value)}
                  placeholder="Enter subcategory name"
                  required
                />
              </div>

              <div>
                <Label>Category</Label>
                {categories?.length === 0 ? (
                  <div>No categories available</div> // Handle empty state
                ) : (
                  <Select
                    value={categoryId}
                    onValueChange={(value) => setCategoryId(value)}
                    disabled={loadingCategories}
                  >
                    <SelectTrigger id="category" className="w-full">
                      <SelectValue
                        placeholder={
                          categories?.find((cat) => cat._id === categoryId)
                            ?.name || "Select Category"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingCategories ? (
                        <SelectItem>Loading...</SelectItem>
                      ) : (
                        categories?.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add SubCategory"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddSubCategoryPage;
