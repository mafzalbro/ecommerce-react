import { useState } from 'react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Star, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Manager",
    content: "This product has revolutionized our workflow. It's intuitive, powerful, and has saved us countless hours. Highly recommended!",
    avatar: "https://i.pravatar.cc/150?img=1",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Developer",
    content: "I'm impressed with the quality and attention to detail. The customer support is top-notch too. It's been a game-changer for our team.",
    avatar: "https://i.pravatar.cc/150?img=2",
    rating: 4
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    content: "As a small business owner, I appreciate the value this brings. It's affordable yet packed with features that have helped us grow.",
    avatar: "https://i.pravatar.cc/150?img=3",
    rating: 5
  }
]

const TestimonialsCard = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} />
            <AvatarFallback>{testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="text-right">
            <h3 className="text-lg font-semibold">{testimonials[currentTestimonial].name}</h3>
            <p className="text-sm text-gray-500">{testimonials[currentTestimonial].role}</p>
          </div>
        </div>
        <blockquote className="text-lg italic text-gray-700 mb-4">
          "{testimonials[currentTestimonial].content}"
        </blockquote>
        <div className="flex items-center justify-between">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between items-center">
        <div>
          <Badge variant="secondary" className="mb-2">
            Trusted by 10,000+ customers
          </Badge>
          <h4 className="text-lg font-semibold">Ready to get started?</h4>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Contact Us</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Contact Us</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea id="message" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500 flex items-center"><Phone className="h-4 w-4 mr-2" /> +1 (555) 123-4567</p>
                <p className="text-sm text-gray-500 flex items-center"><Mail className="h-4 w-4 mr-2" /> support@example.com</p>
              </div>
              <Button type="submit">Send Message</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}

export default TestimonialsCard