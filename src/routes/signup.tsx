import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { EyeIcon, EyeOffIcon, LogInIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Signup() {
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    onSubmit: async ({ value }) => {
      await authStore.signup(value);
    },
  });

  return (
    <div className="flex flex-col gap-6 h-full justify-center">
      <form
        className="p-6 md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-balance text-muted-foreground">
              Sign up to start chatting
            </p>
          </div>

          <form.Field
            name="full_name"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(3, "Full name must be at least 3 characters long")
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="full_name">Full name</Label>
                <Input
                  id="full_name"
                  type="text"
                  placeholder="Enter your full name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .email("Invalid email address")
                  .endsWith("@up.edu.mx", {
                    message: "Must be an UP institutional email",
                  })
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@up.edu.mx"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                const result = z
                  .string()
                  .min(6, {
                    message: "Password must be at least 6 characters long",
                  })
                  .max(20, {
                    message: "Password must be at most 20 characters long",
                  })
                  .safeParse(value);
                return result.success
                  ? undefined
                  : result.error.issues[0].message;
              },
            }}
          >
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="password">Create password</Label>
                <div className="flex w-full items-center gap-2">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field
            name="confirm_password"
            validators={{
              onChange: ({ value }) =>
                value === form.state.values.password
                  ? undefined
                  : "Password must match",
            }}
          >
            {(field) => (
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <div className="flex w-full items-center gap-2">
                  <Input
                    id="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password..."
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <Button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </Button>
                </div>
                {field.state.meta.errors?.[0] && (
                  <p className="text-sm text-red-500">
                    {field.state.meta.errors[0]}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>

          <Button variant={"outline"} onClick={() => navigate("/login")}>
            <LogInIcon />
            Already have an account?{" "}
            <span className="underline underline-offset-4">Log in</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
