import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import GoBack from "../../components/layout/admin/GoBack";
import CategorySelection from "./products/CategorySelection";
import { pinataUpload } from "@/utils/uploads";

const AddProductPage = () => {
  const navigate = useNavigate();
  const { addProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discount, setDiscount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [colorSizeImages, setColorSizeImages] = useState([]);
  const [imgCover, setImgCover] = useState("");
  const [imgCoverPreview, setImgCoverPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(-1);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null); // Reset subcategory when a new category is selected
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Upload file to Pinata and get the URL
        setImagesUploading(index);
        const uploadedUrl = await pinataUpload(file);
        setImagesUploading(-1);
        const updatedColorSizeImages = [...colorSizeImages];
        updatedColorSizeImages[index] = {
          ...updatedColorSizeImages[index],
          image: uploadedUrl,
          file,
          preview: URL.createObjectURL(file),
          mode: "upload",
        };
        setColorSizeImages(updatedColorSizeImages);
      } catch (error) {
        console.error("Error uploading image to Pinata:", error);
      }
    }
  };

  const addColorSizeImageField = () => {
    setColorSizeImages([
      ...colorSizeImages,
      {
        color: "",
        size: "",
        image: null,
        preview: "",
        price: "",
        quantity: "",
        mode: "upload",
      },
    ]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedColorSizeImages = colorSizeImages.map((image) =>
        image.mode === "upload" ? image.image : image.preview
      );

      const newProduct = {
        title,
        description,
        price,
        quantity,
        discount,
        color: colors?.split(",").map((color) => color.trim()),
        size: sizes?.split(",").map((size) => size.trim()),
        category: selectedCategory,
        subcategory: selectedSubCategory,
        imgCover,
        imagesArray: updatedColorSizeImages.map((item, index) => ({
          images: item,
          sizes: colorSizeImages[index]?.size
            ? [colorSizeImages[index].size]
            : sizes?.split(",").map((size) => size.trim()),
          colors: colorSizeImages[index]?.color
            ? [colorSizeImages[index].color]
            : colors?.split(",").map((color) => color.trim()),
          price: parseInt(colorSizeImages[index].price),
          quantity: colorSizeImages[index].quantity,
        })),
      };

      await addProduct(newProduct);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-screen-lg mx-auto">
      <GoBack to="/admin/products" />
      <Card>
        <CardHeader>
          <CardTitle className={"text-2xl"}>Add Product</CardTitle>
          <CardDescription>Add a new product to the inventory.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title (min 3 characters)"
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => {
                    if (e.target.value?.length <= 400) {
                      setDescription(e?.target?.value);
                    }
                  }}
                  placeholder="Enter a description (10-100 characters)"
                  required
                  maxLength={400}
                />
                <p className="text-sm text-gray-500 my-2 placeholder:text-xs">
                  {description?.length || 0}/400 characters
                </p>
                {description?.length < 10 && (
                  <p className="text-sm text-red-500 my-2">
                    Minimum 10 characters required.
                  </p>
                )}
              </div>

              <CategorySelection
                onCategoryChange={handleCategoryChange}
                onSubCategoryChange={handleSubCategoryChange}
              />

              <div>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter the price"
                  required
                />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter the quantity"
                  required
                />
              </div>
              <div>
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter the discount"
                  required
                />
              </div>

              <div>
                <Label>Main Image</Label>
                {fileUploading ? (
                  "Uploading..."
                ) : (
                  <Input
                    type="file"
                    onChange={(e) => {
                      setFileUploading(true);
                      const file = e.target.files[0];
                      pinataUpload(file).then((uploadedUrl) => {
                        setImgCover(uploadedUrl);
                        setImgCoverPreview(URL.createObjectURL(file));
                        setFileUploading(false);
                      });
                    }}
                  />
                )}
                {imgCoverPreview && (
                  <img src={imgCoverPreview} alt="Main" className="w-24 h-24" />
                )}
              </div>

              <div>
                <Label>Colors (comma separated)</Label>
                <Input
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="Red, Blue, Green"
                />
              </div>

              <div>
                <Label>Sizes (comma separated)</Label>
                <Input
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="Small, Medium, Large"
                />
              </div>

              {/* Color and Size Images Section */}
              <div>
                <Label>Color and Size Images</Label>
                {colorSizeImages.map((image, index) => (
                  <div key={index} className="space-y-2 flex items-center">
                    <div className="flex space-x-2 items-center flex-col my-2 sm:flex-row border rounded-md p-2">
                      <Input
                        type="number"
                        value={image.price || 0}
                        onChange={(e) =>
                          setColorSizeImages(
                            colorSizeImages.map((img, idx) =>
                              idx === index
                                ? { ...img, price: e.target.value }
                                : img
                            )
                          )
                        }
                        placeholder="Enter the price"
                        required
                      />

                      {/* Color Select Dropdown */}
                      <Select
                        value={image.color}
                        onValueChange={(value) =>
                          setColorSizeImages(
                            colorSizeImages.map((img, idx) =>
                              idx === index ? { ...img, color: value } : img
                            )
                          )
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Colors</SelectLabel>
                            {colors
                              .split(",")
                              .map((color) => color.trim())
                              .filter((color) => color !== "")
                              .map((color, i) => (
                                <SelectItem key={i} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* Size Select Dropdown */}
                      <Select
                        value={image.size}
                        onValueChange={(value) =>
                          setColorSizeImages(
                            colorSizeImages.map((img, idx) =>
                              idx === index ? { ...img, size: value } : img
                            )
                          )
                        }
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sizes</SelectLabel>
                            {sizes
                              .split(",")
                              .map((size) => size.trim())
                              .filter((size) => size !== "")
                              .map((size, i) => (
                                <SelectItem key={i} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* Image Upload */}
                      {imagesUploading === index ? (
                        "Uploading..."
                      ) : (
                        <Input
                          type="file"
                          onChange={(e) => handleImageChange(index, e)}
                        />
                      )}
                      {image.preview && (
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="w-24 h-24"
                        />
                      )}
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addColorSizeImageField}>
                  Add Color-Size Image
                </Button>
              </div>

              <Button type="submit" disabled={isSubmitting} className="mt-4">
                {isSubmitting ? "Adding..." : "Add Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;
