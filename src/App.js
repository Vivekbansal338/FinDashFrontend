import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import SearchResults from "./Pages/SearchResults";
import Borrowers from "./Pages/Borrowers";
import DetailBorrower from "./Pages/DetailBorrower";
import Loans from "./Pages/Loans";
import DetailLoan from "./Pages/DetailLoan";
import AppLayout from "./Components/Layout/AppLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store, persistor } from "./Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import PageNotFound from "./Pages/PageNotFound";

const queryClient = new QueryClient();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <BrowserRouter>
            <ToastContainer
              position="top-center"
              autoClose={250}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="search/:searchquery" element={<SearchResults />} />
                <Route path="/borrowers" element={<Borrowers />} />
                <Route path="/borrowers/:id" element={<DetailBorrower />} />
                <Route path="/loans" element={<Loans />} />
                <Route path="/loans/:id" element={<DetailLoan />} />
                <Route path="*" element={<PageNotFound />} />
              </Route>
              <Route path="login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
