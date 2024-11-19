import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const rec = null;

function About() {
  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="w-full max-w-3xl p-8">
        <CardContent>
          <h3 className="text-4xl font-bold text-center text-primary dark:text-primary mb-4">
            About Restorex
          </h3>
          <p className="text-lg text-center mb-8">
            Welcome to our Restorex Store, where shopping meets convenience and
            quality! If you're looking for an online shopping experience like no
            other, you've come to the right place. Dive into a world of endless
            possibilities with us as we introduce you to who we are, what we
            offer, and why we stand out in the digital marketplace. Get ready to
            discover a seamless shopping experience tailored just for you!
          </p>

          <h6 className="text-2xl font-semibold text-left mb-4">About Us</h6>
          <p className="mb-8">
            At our Restorex store, we are more than just a platform to shop - we
            are a destination for curated collections and personalized
            experiences. Our mission is to redefine the online shopping
            landscape by offering a diverse range of products that cater to
            every taste and need. We pride ourselves on creating a seamless and
            user-friendly interface that enhances your shopping journey from
            start to finish. With a team dedicated to ensuring customer
            satisfaction, we strive to provide top-notch service with every
            click and purchase. Our commitment to quality shines through in our
            handpicked selection of products sourced from reputable vendors
            worldwide. From fashion essentials to home decor must-haves, we have
            something for everyone. Join us on this exciting shopping adventure
            where innovation meets convenience, and let's elevate your online
            shopping experience together!
          </p>

          <h6 className="text-2xl font-semibold text-left mb-4">Who We Are:</h6>
          <div className="flex items-center mb-8">
            <Avatar className="h-32 w-32 mr-8">
              <AvatarImage
                src={rec}
                srcSet={"placeholder.png"}
                alt="Sohaib Romee"
              />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="font-semibold text-lg mb-2">Sohaib Romee</p>
              <p className="text-lg mb-2">
                Restorex is a dynamic e-commerce site founded by Sohaib Romee,
                an innovative entrepreneur with a passion for delivering
                top-notch products to our customers. Our team is dedicated to
                providing excellent customer service and ensuring that your
                online shopping experience with us is seamless and enjoyable.
              </p>
              <p className="text-lg">
                At Restorex, our mission is to offer a diverse range of
                high-quality products that cater to all your needs, with a focus
                on quality, convenience, and customer satisfaction. We pride
                ourselves on our extensive selection of products, including
                fashion and beauty essentials, home decor, and electronics.
                Whether you're looking to stay stylish, transform your living
                space, or discover the latest gadgets, we have something for
                everyone.
              </p>
            </div>
          </div>

          <p className="mb-4">
            At our core, we value transparency, integrity, and trust. We believe
            in building long-lasting relationships with our customers based on
            mutual respect and understanding. Clear and honest communication,
            upholding the highest standards in all our interactions, and
            ensuring that our customers can rely on us for quality and service
            are fundamental to our business. When you shop with us, you can
            trust that you are not just another transaction – you are part of
            the family.
          </p>
          <p>
            We invite you to join us on this exciting shopping journey. As we
            continue to grow and expand our offerings, we remain committed to
            providing you with the best online shopping experience possible.
            Thank you for choosing Restorex as your go-to online shopping
            destination!
          </p>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-800 p-4 flex justify-center">
          <Link to={"/products"}>
            <Button className="w-full max-w-xs">Shop Now</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default About;
