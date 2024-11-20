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
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import imageCompression from "browser-image-compression";

const UpdateProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getProductById, updateProduct } = useProducts();

  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [imgCover, setImgCover] = useState(null);
  const [imgCoverPreview, setImgCoverPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductById(id);
      setProduct(data);
      setTitle(data.title);
      setDescription(data.description);
      setColor(data.color.join(", "));
      setSize(data.size.join(", "));
      setPrice(data.price);
      setImages(data.images.map((url) => ({ url, file: null, mode: "url" })));
      setImgCoverPreview(data.imgCover);
      setIsLoading(false);
    };
    fetchProduct();
  }, [id]);

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

  const handleMainImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await handleImageUpload(file);
      setImgCover(base64);
      setImgCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImageChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await handleImageUpload(file);
      const updatedImages = [...images];
      updatedImages[index] = {
        file,
        preview: URL.createObjectURL(file),
        base64,
        mode: "upload",
      };
      setImages(updatedImages);
    }
  };

  const addImageField = () => {
    setImages([
      ...images,
      { file: null, preview: "", base64: null, mode: "upload" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedImages = await Promise.all(
        images.map((image) =>
          image.mode === "upload" ? image.base64 : image.url
        )
      );

      const updatedProduct = {
        title,
        description,
        color: color.split(",").map((c) => c.trim()),
        size: size.split(",").map((s) => s.trim()),
        price,
        imgCover,
        images: updatedImages,
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
      <div className="p-6 space-y-4">
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
    <div className="p-6 space-y-4">
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
                    if (e.target.value?.length <= 100) {
                      setDescription(e?.target?.value);
                    }
                  }}
                  placeholder="Enter a description (10-100 characters)"
                  required
                  maxLength={100} // Enforces max characters at the HTML level
                />
                <p className="text-sm text-gray-500 my-2">
                  {description?.length || 0}/100 characters
                </p>
                {description?.length < 10 && (
                  <p className="text-sm text-red-500 my-2">
                    Minimum 10 characters required.
                  </p>
                )}
              </div>

              <div>
                <Label>Color</Label>
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Comma-separated colors (e.g., Red, Blue)"
                />
              </div>
              <div>
                <Label>Size</Label>
                <Input
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="Comma-separated sizes (e.g., S, M, L)"
                />
              </div>
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
                <Label>Main Image</Label>
                <Input
                  type="file"
                  onChange={handleMainImageChange}
                  aria-Label="Upload a main image"
                />
                {imgCoverPreview && (
                  <img src={imgCoverPreview} alt="Main" className="w-24 h-24" />
                )}
              </div>
              <div>
                <Label>Additional Images</Label>
                {images.map((image, index) => (
                  <div key={index}>
                    <Input
                      type="file"
                      onChange={(e) => handleAdditionalImageChange(index, e)}
                      aria-Label={`Upload additional image ${index + 1}`}
                    />
                    {image.preview && (
                      <img
                        src={image.preview}
                        alt={`Preview ${index}`}
                        className="w-24 h-24"
                      />
                    )}
                  </div>
                ))}
                <Button type="button" onClick={addImageField}>
                  Add More Images
                </Button>
              </div>
              <Button type="submit" disabled={isSubmitting}>
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
