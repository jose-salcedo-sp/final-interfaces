import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PublicUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
};

type Credentials = {
  email: string;
  password: string;
};

type SignUpForm = {
  email: string;
  password: string;
  full_name: string;
};

type AuthState = {
  user: PublicUser | null;
  isAuthenticated: boolean;
  login: (user: Credentials) => Promise<void>;
  signup: (user: SignUpForm) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async ({ email, password }) => {
        try {
          const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const firebaseUser = credential.user;

          set({
            user: {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            },
            isAuthenticated: true,
          });

          toast.success(`Welcome back, ${firebaseUser.email || "user"}!`);
        } catch (err: any) {
          console.error("Login error:", err);
          toast.error(`Login failed: ${err.message || "An error occurred."}`);
        }
      },
      signup: async ({ email, password, full_name }) => {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
          );
          const user: PublicUser = {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: full_name,
          };

          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);

          if (!snap.exists()) {
            await setDoc(userRef, {
              email,
              full_name,
              createdAt: new Date(),
            });
          }

          set({ user, isAuthenticated: true });

          toast.success(`Account created for ${email}!`);
        } catch (err: any) {
          console.error("Signup error:", err);
          toast.error(`Signup failed: ${err.message || "An error occurred."}`);
        }
      },
      logout: async () => {
        try {
          await signOut(auth);
          set({ user: null, isAuthenticated: false });
          toast.success("You have been logged out.");
        } catch (err: any) {
          console.error("Logout error:", err);
          toast.error(`Logout failed: ${err.message || "An error occurred."}`);
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
