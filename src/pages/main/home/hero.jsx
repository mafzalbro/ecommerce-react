import { Button } from "@/components/ui/button";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <img
              src="/vite.svg"
              width="550"
              height="550"
              alt="Product"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
            />
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Limited Time Offer
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Get 50% off our best-selling product
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Don&apos;t miss out on this incredible deal! Hurry, the
                  discount expires soon.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="text-3xl font-bold text-primary">
                    $49.99
                    <span className="ml-2 text-sm font-normal line-through text-muted-foreground">
                      $99.99
                    </span>
                  </div>
                  <div />
                </div>
                <Button className="w-full sm:w-auto">Buy Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
