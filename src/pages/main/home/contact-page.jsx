import React from 'react';
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; // Shadcn Dialog
import { Phone, Mail, Globe } from "lucide-react"; // Icons from lucide
import { Badge } from "@/components/ui/badge"; // Shadcn Badge
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Shadcn Avatar

function ContactUs() {
  return (
    <div className="contact-us-container mt-20 mx-auto max-w-screen-md">
      <h1 className="text-4xl font-bold text-center text-primary dark:text-primary mb-8">
        Contact Us
      </h1>
      <p className="intro-paragraph text-center text-xl text-primary dark:text-primary mb-12">
        At Restorex, we value every customer and strive to provide exceptional support. Whether you have a question, need assistance, or want to provide feedback, we're here to help. Reach out to us using the contact details below, and our dedicated team will respond promptly.
      </p>
      <div className="contact-info mb-12 flex justify-center space-x-12">
        <div className="contact-detail flex items-center space-x-2">
          <Mail className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          <a href="mailto:support@restorex.com" className="text-lg text-blue-600 dark:text-blue-400">
            support@restorex.com
          </a>
        </div>
        <div className="contact-detail flex items-center space-x-2">
          <Phone className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          <p className="text-lg">+92 318-7101450</p>
        </div>
        <div className="contact-detail flex items-center space-x-2">
          <Globe className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          <p className="text-lg">UAN for Pakistan</p>
        </div>
      </div>
      <p className="closing-paragraph text-center text-lg text-primary dark:text-primary mb-12">
        For any specific queries related to our services, feel free to send us an email, and our support team will ensure your concerns are addressed swiftly. We look forward to hearing from you and appreciate your trust in Restorex.
      </p>

      {/* Contact Us Button with Dialog */}
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700">
              Get in Touch
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center text-gray-900 dark:text-white">
                Contact Us
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center mb-2">
                <Phone className="h-4 w-4 mr-2" /> +92 318-7101450
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center">
                <Mail className="h-4 w-4 mr-2" /> support@restorex.com
              </p>
              <div className="flex items-center mt-4">
                <Badge variant="secondary" className="text-gray-900 dark:text-gray-200">
                  Trusted by 10,000+ customers
                </Badge>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ContactUs;
