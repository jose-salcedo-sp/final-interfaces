import {
  createRootRoute,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useAuthStore } from "@/stores/auth";

export const Route = createRootRoute({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated && location.pathname !== "/chatbot") {
      throw redirect({
        to: "/chatbot",
        search: {
          redirect: location.href, // optional: pass redirect path
        },
      });
    }
  },
  component: () => (
    <div className="h-[100vh] w-[100vw]">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
