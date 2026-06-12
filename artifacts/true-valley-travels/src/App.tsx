import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PackageDetail from "@/pages/PackageDetail";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import ThankYou from "@/pages/ThankYou";
import { SeasonProvider } from "@/context/SeasonContext";
import { BookingPreFillProvider } from "@/context/BookingPreFillContext";
import { EnquiryPopupProvider } from "@/context/EnquiryPopupContext";
import ContactPopup from "@/components/ui/ContactPopup";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/packages/:slug" component={PackageDetail} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/terms-and-conditions" component={Terms} />
      <Route path="/privacy-policy" component={Privacy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SeasonProvider>
          <BookingPreFillProvider>
            <EnquiryPopupProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
                <ContactPopup />
              </WouterRouter>
            </EnquiryPopupProvider>
          </BookingPreFillProvider>
          <Toaster />
        </SeasonProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
