"use client";
import CompulsoryLabel from "@/components/form/CompulsoryLabel";
import { H2 } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const page = () => {
  return (
    <div className="grid grid-cols-2 py-10">
      <div>
        <H2 className="pb-4 text-center">Apply Now</H2>
        <p className="mx-auto max-w-3xl text-muted-foreground">
          Please fill out the form below with accurate information. After
          submission you will{" "}
          <span className="font-bold text-black">get an email</span> containing
          your <span className="font-bold text-black">login credentials</span>.
          Once submitted, our team will review your application thoroughly.{" "}
        </p>

        <form action="" className="mx-auto max-w-3xl space-y-4 pt-10">
          <div className="grid grid-cols-3 gap-5">
            <div>
              <CompulsoryLabel>First Name</CompulsoryLabel>
              <Input placeholder="Enter First Name" />
            </div>
            <div>
              <Label>Middle Name</Label>
              <Input placeholder="Enter Middle Name" />
            </div>
            <div>
              <CompulsoryLabel>Last Name</CompulsoryLabel>
              <Input placeholder="Enter Last Name" />
            </div>
          </div>
          <div>
            <div>
              <CompulsoryLabel>Email</CompulsoryLabel>
              <Input placeholder="Enter Your Email" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
