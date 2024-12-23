import React from 'react'
import { H2, P } from '@/components/typography'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'

export const Contact = () => {
  return (
    <div>
      <div className="space-y-3 text-center">
        <H2>Contact Us</H2>
        <P className="text-muted-foreground">
          Reach Out to Discover How We Can Support Your Educational Goals
        </P>
      </div>

      <form className="mx-auto max-w-3xl space-y-6 px-4 py-10" action="">
        <div className="flex-1">
          <Label>Institution Name</Label>
          <Input placeholder="Eg: Dong Eui University" />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label>First Name</Label>
            <Input placeholder="Your First Name" />
          </div>
          <div className="flex-1">
            <Label>Last name</Label>
            <Input placeholder="Your Last Name" />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label>Email</Label>
            <Input type="email" placeholder="Your email here" />
          </div>
          <div className="flex-1">
            <Label>Phone</Label>
            <Input placeholder="Your phone here" />
          </div>
        </div>

        <div>
          <Label>Message</Label>
          <Textarea rows={5}></Textarea>
        </div>

        <div className="flex gap-2">
          <input id="terms" type="checkbox" />
          <Label htmlFor="terms">I accept the terms and conditions.</Label>
        </div>

        <Button className="mx-auto block">Submit</Button>
      </form>
    </div>
  )
}
