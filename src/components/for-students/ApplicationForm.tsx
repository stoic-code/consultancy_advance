"use client";

import { Label } from "@radix-ui/react-label";
import CompulsoryLabel from "../form/CompulsoryLabel";
import { Input } from "../ui/input";
import { useLocalStorage } from "@uidotdev/usehooks";

const ApplicationForm = () => {
  const [formData, setFormData] = useLocalStorage("student-form", null);
  return (
    <form action="" className="mx-auto max-w-3xl text-left">
      <div className="grid  gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <CompulsoryLabel>First Name</CompulsoryLabel>
          <Input placeholder="Enter Your First Name" />
        </div>
        <div>
          <Label>Middle Name</Label>
          <Input placeholder="Enter Your Middle Name" />
        </div>
        <div>
          <CompulsoryLabel>Last Name</CompulsoryLabel>
          <Input placeholder="Enter Your Last Name" />
        </div>
      </div>
    </form>
  );
};

export default ApplicationForm;
