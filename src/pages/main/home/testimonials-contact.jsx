import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, ChevronLeft, ChevronRight, Mail, Phone } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content:
      "This product has revolutionized our workflow. It's intuitive, powerful, and has saved us countless hours. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    content:
      "I'm impressed with the quality and attention to detail. The customer support is top-notch too. It's been a game-changer for our team.",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content:
      "As a small business owner, I appreciate the value this brings. It's affordable yet packed with features that have helped us grow.",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5,
  },
];

const TestimonialsCard = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <>
      <div className="mt-20">
        <h2 className="text-4xl font-bold text-center text-primary dark:text-primary mb-8">
          Testimonials
        </h2>
        <p className="text-xl text-center text-primary dark:text-primary mb-12">
          What our user say!
        </p>
      </div>
      <Card className="w-full max-w-2xl mx-auto mb-20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
              />
              <AvatarFallback>
                {testimonials[currentTestimonial].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {testimonials[currentTestimonial].name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>
          <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
            "{testimonials[currentTestimonial].content}"
          </blockquote>
          <div className="flex items-center justify-between">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < testimonials[currentTestimonial].rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-500"
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="text-gray-500 dark:text-gray-400"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="text-gray-500 dark:text-gray-400"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <div>
            <Badge
              variant="secondary"
              className="mb-2 text-gray-900 dark:text-gray-200"
            >
              Trusted by 10,000+ customers
            </Badge>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Ready to get started?
            </h4>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="">Contact Us</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-gray-900 dark:text-white">
                  Contact Us
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center mb-2">
                  <Phone className="h-4 w-4 mr-2" /> 92 318-7101450
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> support@restorex.com{" "}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  );
};

export default TestimonialsCard;
