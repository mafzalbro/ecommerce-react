import React from "react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Shadcn Dialog
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
        At Restorex, we value every customer and strive to provide exceptional
        support. Whether you have a question, need assistance, or want to
        provide feedback, we're here to help. Reach out to us using the contact
        details below, and our dedicated team will respond promptly.
      </p>
      <div className="contact-info mb-12 flex justify-center space-x-12">
        <div className="contact-detail flex items-center space-x-2">
          <Mail className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          <a
            href="mailto:support@restorex.com"
            className="text-lg text-blue-600 dark:text-blue-400"
          >
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
        For any specific queries related to our services, feel free to send us
        an email, and our support team will ensure your concerns are addressed
        swiftly. We look forward to hearing from you and appreciate your trust
        in Restorex.
      </p>
    </div>
  );
}

export default ContactUs;
