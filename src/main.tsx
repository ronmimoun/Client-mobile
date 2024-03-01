import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import store from "./store/index.ts";
import "./assets/scss/style.scss";
import { GlobalLoader } from "./components/feature/GlobalLoader/GlobalLoader.tsx";
import GlobalErrorBoundary from "./components/error-boundary/GlobalErrorBoundary.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GlobalErrorBoundary>
    <Provider store={store}>
      <React.Suspense fallback="Loading...">
        <GlobalLoader />
        <App />
      </React.Suspense>
    </Provider>
  </GlobalErrorBoundary>
);
