"use client";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";
import BG from "@/assets/svg/signupbg.svg"

declare module "@material-tailwind/react" {
  interface InputProps {
    crossOrigin?: string;
  }
  interface TypographyProps {
    placeholder?: string;
  }
  interface CheckboxProps {
    crossOrigin?: string;
  }
  interface ButtonProps {
    placeholder?: string;
  }
}

export default function page() {
  return (
    <div>

<section className="m-8 flex item-center justify-center h-[100svh]">

      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold text-2xl mb-4 text-[#CECEC5]">Recovery</Typography>
          <Typography variant="paragraph"  className="text-lg font-normal text-[#CECEC5]"> Hey take the next step in recovering your account.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography   className="-mb-3 font-medium border-gray-100 text-[#CECEC5]">
              Your email
            </Typography>
            <input placeholder="name@mail.com"
          className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-[#CECEC5] outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50" />
          </div>
          
          <Button className="mt-6 bg-[#0FADF9]" fullWidth>
            Submit
          </Button>

          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            remeber your password?
            <Link href="/auth/signin" className="text-[#ffff] ml-1 text-sm underline">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
    </div>
  );
}
