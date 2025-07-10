import { Routes, Route } from "react-router-dom";
import SignupPage from "./routes/signup";
import LoginPage from "./routes/login";
import AboutPage from "./routes/about";
import ChatbotPage from "./routes/chatbot";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
      <Toaster />
    </>
  );
}
