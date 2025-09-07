import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "@/context/AuthProvider";
import { useLoader } from "@/context/LoaderProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AuthSocial } from "@/components/auth/social/auth";
import { toast } from "sonner";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MailIcon, EyeIcon, EyeOffIcon, Loader2Icon } from "lucide-react";

const signUpSchema = z
  .object({
    first_name: z.string().min(1, { message: "First name is required" }),
    last_name: z.string().min(1, { message: "Last name is required" }),
    display_name: z.string().min(1, { message: "Display name is required" }),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirm_password: z
      .string()
      .min(6, { message: "Confirm password is required" })
      .max(100),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FromSignUpSchema = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { SignUp } = useAuth();
  const { isLoaderBarAnimated, setLoaderBarAnimated } = useLoader();

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);
  const form = useForm<FromSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      display_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const firstName = useWatch({
    control: form.control,
    name: "first_name",
  });

  const lastName = useWatch({
    control: form.control,
    name: "last_name",
  });

  useEffect(() => {
    if (firstName && lastName) {
      form.setValue("display_name", `${firstName} ${lastName}`);
    } else if (firstName && !lastName) {
      form.setValue("display_name", firstName);
    } else if (!firstName && lastName) {
      form.setValue("display_name", lastName);
    } else {
      form.setValue("display_name", "");
    }
  }, [firstName, lastName, form]);

  const handleSubmit = async (data: FromSignUpSchema) => {
    try {
      setLoaderBarAnimated(true);
      await SignUp(data);
    } catch (error) {
      let errorMessage = "Registration failed";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else {
        errorMessage = String(error);
      }
      if (errorMessage.toLowerCase().includes("email")) {
        form.setError("email", {
          type: "manual",
          message: errorMessage,
        });
      } else {
        toast(errorMessage, {
          description: "Please try again later.",
        });
      }
    } finally {
      setTimeout(() => setLoaderBarAnimated(false), 2000);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-6"
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome</h1>
                  <p className="text-muted-foreground text-balance">
                    Create an account to get started with our services.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="First Name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="text"
                              placeholder="Last Name"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="display_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="text"
                            placeholder="Display Name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input type="text" placeholder="Email" {...field} />
                          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                            <MailIcon size={16} aria-hidden="true" />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                          />
                          <button
                            className="cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={
                              isVisible ? "Hide password" : "Show password"
                            }
                            aria-pressed={isVisible}
                            aria-controls="password"
                          >
                            {isVisible ? (
                              <EyeOffIcon size={16} aria-hidden="true" />
                            ) : (
                              <EyeIcon size={16} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={isVisible ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...field}
                          />
                          <button
                            className="cursor-pointer text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                            type="button"
                            onClick={toggleVisibility}
                            aria-label={
                              isVisible ? "Hide password" : "Show password"
                            }
                            aria-pressed={isVisible}
                            aria-controls="password"
                          >
                            {isVisible ? (
                              <EyeOffIcon size={16} aria-hidden="true" />
                            ) : (
                              <EyeIcon size={16} aria-hidden="true" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={isLoaderBarAnimated}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  Sign Up
                  {isLoaderBarAnimated && (
                    <Loader2Icon className="animate-spin" />
                  )}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <AuthSocial />
                <div className="text-center text-sm">
                  You have an account?{" "}
                  <Link
                    to="/auth/signin"
                    className="underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-background relative hidden md:block p-1">
              <img
                src="/bg-signup.svg"
                alt="Image"
                className=" h-full w-full "
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </form>
    </Form>
  );
}
