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
import BG from "@/assets/svg/signupbg.svg";
import React, { FormEvent } from "react";
import axiosInstance from "@/config/axios.config";
import ReactiveButton from "reactive-button";
import {
  EMAIL_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
  DOB_REGEX,
} from "@/utils/regex";

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
  const [state, setState] = React.useState("idle");
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [universalError, setUniversalError] = React.useState("");

  // Define initial validation state
  const [isValidData, setIsValidData] = React.useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible: boolean) => !prevVisible);
  };

  // Define initial form error state

  const [errorMessages, setErrorMessages] = React.useState({
    email: "",
    fullname: "",
    password: "",
  });

  function signUpValidate(
    fieldName: string,
    regex: RegExp,
    value: string,
    errorMessage: string
  ) {
    if (!regex.test(value)) {
      setUniversalError("");
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: errorMessage,
      }));
      setIsValidData(false);
    } else {
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
      setIsValidData(true);

      setUniversalError("");
    }
  }

  // Define Variable for allfield valid

  const allFieldsValid = Object.keys(errorMessages).every(
    (field) => !errorMessages[field as keyof typeof errorMessages]
  );

  const HandleInputChange = (e: any) => {
    const { name, value } = e.target;

    // For other fields, update the state as usual
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, 
    }));
    // Log the updated state
  };
  
  React.useEffect(()=>{
  setIsValidData(allFieldsValid);

  },[HandleInputChange])

  const [success, setSucess] = React.useState('')
  const [Eror, setError] = React.useState('')
  const Handlesubmit = async (e: any) => {
    e.preventDefault();
    setState('loading');
    const value = formData.email;
    const username = value.split("@")[0];
    setFormData((prevFormData: any) => {
      const updatedFormData = { ...prevFormData, username: username };
      console.log(updatedFormData);
      return updatedFormData;
    });
    try {
      const res = await axiosInstance.post("client/auth/signup", formData);
      if(res.status === 201){ 
        setState('success')
        setSucess(res.data.message)
      }
      console.log(res);
    } catch (error:any) {
      setState('error')
      console.log(error);
      setError(error.response.data.message)
    }
  };

  const allFieldsValids = Object.values(errorMessages).every((value) => !value);

  return (
    <div>
      <section className="m-8 flex ">
        <div className="w-2/5 h-[50%] hidden lg:block">
          <Image
            height={100}
            width={200}
            alt=""
            src={BG}
            draggable={false}
            className="h-full w-full object-cover rounded-3xl"
          />
        </div>
        <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
          <div className="text-center">
            <Typography
              variant="h2"
              className="font-bold text-2xl mb-4 text-gray-900"
            >
              Unlock Your Productivity? Sign Up Today
            </Typography>
            <Typography
              variant="paragraph"
              className="text-lg font-normal text-gray-900"
            >
              Enter your email and password to register.
            </Typography>
          </div>
          <form
            className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
            onSubmit={Handlesubmit}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography className="-mb-3 font-medium border-gray-100 text-gray-900">
                Your email
              </Typography>
              <input
                placeholder="name@mail.com"
                type="email"
                name="email"
                value={formData.email}
                required
                onChange={(e) => {
                  HandleInputChange(e);
                  signUpValidate(
                    "email",
                    EMAIL_REGEX,
                    e.target.value,
                    "Please enter a valid email address."
                  );
                }}
                className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-900  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
          {errorMessages.email && formData.email && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.email}
                  </span>
                )}
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography className="-mb-3 font-medium border-gray-100 text-gray-900">
                password
              </Typography>
              <div className="relative">
              <input
                placeholder="**********"
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                required
                onChange={(e) => {
                  HandleInputChange(e);
                  signUpValidate(
                    "password",
                    PASSWORD_REGEX,
                    e.target.value,
                    "Password must be 8 characters or more with at least one uppercase letter, one lowercase letter, one digit, and one special character (@#$%^&*!)"
                  );
                }}
                className="peer h-full w-full rounded-md border pr-7 border-blue-gray-200 border-t-transparent !border-t-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-gray-900  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              />
              <div onClick={togglePasswordVisibility} className="absolute right-2 bottom-3">

                    {passwordVisible ? (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#737373"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M12 5C5.63636 5 2 12 2 12C2 12 5.63636 19 12 19C18.3636 19 22 12 22 12C22 12 18.3636 5 12 5Z"
                            stroke="#737373"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                          <path
                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            stroke="#737373"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#737373"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
                            stroke="#737373"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>
                    )}
                  </div>
              </div>
              {errorMessages.password && formData.password && (
                  <span className="text-red-500 text-[13px]">
                    {errorMessages.password}
                  </span>
                )}
        
            </div>
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="white"
                  className="flex items-center justify-start font-medium "
                >
                  I agree the&nbsp;
                  <a
                    href="#"
                    className="font-normal text-[#CECEC5] transition-colors hover:text-#CECEC5] underline"
                  >
                    Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />

            {/* <ReactiveButton
      buttonState={state}
      idleText="Submit"
      loadingText="Loading"
      successText="Done"
      onClick={(e)=>Handlesubmit(e)}
    /> */}

<ReactiveButton
                  buttonState={state}
                  idleText="Log in"
                  loadingText="Loading..."
                  successText={success}
                  // errorText={error}
                  disabled={!allFieldsValids}
                  width="100%"
                  size="medium"
                  type="submit"
                  style={{
                    display: "block",
                    borderRadius: "0.5rem",
                    padding: "0.75rem 1.25rem",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    color: "white",
                    background: "#0FADF9",
                    cursor: `${allFieldsValids? "pointer" : "not-allowed"}`,
                  }}
                />
      

            <div className="space-y-4 mt-8">
              <Button
                size="lg"
                color="white"
                className="flex items-center gap-2 justify-center shadow-md bg-[#131313]"
                fullWidth
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1156_824)">
                    <path
                      d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                      fill="#34A853"
                    />
                    <path
                      d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                      fill="#EA4335"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1156_824">
                      <rect
                        width="16"
                        height="16"
                        fill="#131313"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[#CECEC5] bg-[#131313]">
                  Sign in With Google
                </span>
              </Button>
            </div>
            <Typography
              variant="paragraph"
              className="text-center text-blue-gray-500 font-medium mt-4"
            >
              Already have an account?
              <Link
                href="/auth/signin"
                className="text-[#ffff] ml-1 text-sm underline"
              >
                Sign in
              </Link>
            </Typography>
          </form>
        </div>
      </section>
    </div>
  );
}
