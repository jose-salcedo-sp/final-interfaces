import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase"; // ← Asegúrate de exportar `db` desde firebase.ts
import { redirect } from "@tanstack/react-router";
import { doc, getDoc, setDoc } from "firebase/firestore";

const provider = new GoogleAuthProvider();

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
  loginWithGoogle: () => Promise<void>;
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

          redirect({ to: "/about" });
        } catch (err) {
          console.error("Login error:", err);
        }
      },
      loginWithGoogle: async () => {
        try {
          const credential = await signInWithPopup(auth, provider);
          const firebaseUser = credential.user;

          const user: PublicUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          };

          // Optional: create user document if it doesn't exist
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);
          if (!snap.exists()) {
            await setDoc(userRef, user);
          }

          set({ user, isAuthenticated: true });
          redirect({ to: "/about" });
        } catch (err) {
          console.error("Google login error:", err);
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
          redirect({ to: "/about" });
        } catch (err) {
          console.error("Signup error:", err);
        }
      },
      logout: async () => {
        await signOut(auth);
        set({ user: null, isAuthenticated: false });
        redirect({ to: "/login" });
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
