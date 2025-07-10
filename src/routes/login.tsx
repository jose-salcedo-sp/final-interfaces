import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth";
import { Label } from "@radix-ui/react-label";
import { useForm } from "@tanstack/react-form";
import { LogInIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export default function Login() {
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const [msg, setMsg] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await authStore.login(value);

      setMsg(JSON.stringify(authStore.user));

      authStore.isAuthenticated ? navigate("/about") : alert("Can't login");
    },
  });

  return (
    <div className="flex flex-col gap-6 h-full justify-center">
      <pre>{msg}</pre>
      <form
        className="p-6 md:p-8 flex flex-col gap-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-balance text-muted-foreground">
            Login to your Chat UP account
          </p>
        </div>

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
                .min(4, {
                  message: "Password must be at least 4 characters long",
                })
                .max(10, {
                  message: "Password must be at most 10 characters long",
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
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

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>

      <div className="px-6 md:p-8 flex flex-col gap-6">
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>

        <Button variant={"outline"} onClick={() => navigate("/signup")}>
          <LogInIcon />
          Don't have an account?{" "}
          <span className="underline underline-offset-4">Sign up</span>
        </Button>
      </div>
    </div>
  );
}
