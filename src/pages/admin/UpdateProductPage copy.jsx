import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import GoBack from "../../components/layout/admin/GoBack";
import { pinataUpload } from "@/utils/uploads";
import CategorySelection from "./products/CategorySelection";

const UpdateProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);
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
  const [isLoading, setIsLoading] = useState(true);
  const [colors, setColors] = useState("");
  const [sizes, setSizes] = useState("");
  const [fileUploading, setFileUploading] = useState(false);
  const [imagesUploading, setImagesUploading] = useState(-1);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);

      if (!data) {
        console.error("Product not found!");
        navigate("/admin/products", { replace: true });
        return;
      }

      setProduct(data);
      setTitle(data?.title);
      setDescription(data?.description);
      setPrice(data?.price);
      setQuantity(data?.quantity);
      setDiscount(data?.discount);
      setImgCoverPreview(data?.imgCover);
      setImgCover(data?.imgCover);
      setSelectedCategory(data?.category);
      setSelectedSubCategory(data?.subcategory);
      setColors(data?.color?.join());
      setSizes(data?.size?.join());

      const colorSizeMappedImages = data?.imagesArray?.map((item) => ({
        color: item.colors,
        size: item.sizes,
        image: item.images,
        price: item.price,
        quantity: item.quantity,
        file: null,
        preview: item.images,
        mode: "url",
      }));

      setColorSizeImages(colorSizeMappedImages || []);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
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
        // openImagePreview(URL.createObjectURL(file));
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

  // const openImagePreview = (previewUrl) => {
  //   setCurrentImagePreview(previewUrl);
  // };

  // const closeImagePreview = () => {
  //   setCurrentImagePreview("");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedColorSizeImages = colorSizeImages.map((image) =>
        image.mode === "upload" ? image.image : image.preview
      );

      const updatedProduct = {
        title,
        description,
        price,
        quantity,
        discount,
        category: selectedCategory,
        subcategory: selectedSubCategory,
        imgCover,
        imagesArray: updatedColorSizeImages.map((item, index) => ({
          images: item,
          sizes: sizes?.split(",").map((size) => size.trim()),
          colors: colors?.split(",").map((color) => color.trim()),
          price: parseInt(colorSizeImages[index].price),
          quantity: colorSizeImages[index].quantity,
        })),
      };

      await updateProduct(id, updatedProduct);
      navigate("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-screen-lg mx-auto">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-32 w-full mb-4" />
            <Skeleton className="h-24 w-24 mb-4" />
            <Skeleton className="h-10 w-32" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4 max-w-screen-lg mx-auto">
      <GoBack to="/admin/products"></GoBack>
      <Card>
        <CardHeader>
          <CardTitle className={"text-2xl"}>Update Product</CardTitle>
          <CardDescription>
            Update the details for your product.
          </CardDescription>
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
                  maxLength={400} // Enforces max characters at the HTML level
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
                selectedSubCategory={selectedSubCategory}
                selectedCategory={selectedCategory}
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
                        value={image.color[0]} // Controlled value
                        onValueChange={(value) => {
                          // Avoid state updates that cause infinite loops
                          if (image.color !== value) {
                            setColorSizeImages(
                              colorSizeImages.map((img, idx) =>
                                idx === index ? { ...img, color: value } : img
                              )
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Colors</SelectLabel>
                            {colors
                              ?.split(",")
                              ?.filter((color) => color !== "")
                              ?.map((color, i) => (
                                <SelectItem key={i} value={color}>
                                  {color}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* Size Select Dropdown */}
                      <Select
                        value={image.size[0]} // Controlled value
                        onValueChange={(value) => {
                          // Avoid state updates that cause infinite loops
                          if (image.size !== value) {
                            setColorSizeImages(
                              colorSizeImages.map((img, idx) =>
                                idx === index ? { ...img, size: value } : img
                              )
                            );
                          }
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Sizes</SelectLabel>
                            {sizes
                              ?.split(",")
                              ?.filter((size) => size !== "")
                              ?.map((size, i) => (
                                <SelectItem key={i} value={size}>
                                  {size}
                                </SelectItem>
                              ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {/* Image Upload */}
                      {false ? (
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
                {isSubmitting ? "Updating..." : "Update Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProductPage;
