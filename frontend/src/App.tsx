import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ExpectedDate from "./pages/ExpectedDate";
import ActualDate from "./pages/ActualDate";
import BabyInfo from "./pages/BabyInfo";
import Chat from "./pages/Chat";
import ChatConversation from "./pages/ChatConversation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/expected-date" element={<ExpectedDate />} />
          <Route path="/actual-date" element={<ActualDate />} />
          <Route path="/baby-info" element={<BabyInfo />} />
          <Route path="/chat" element={<Chat />} />
          {/* <Route path="/conversation" element={<ChatConversation />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
