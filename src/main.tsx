import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import { Provider } from "react-redux";
import "./index.css";
import { ProductProvider } from "./app/context/Context.tsx";
import { store } from "./shared/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ProductProvider>
      <App />
    </ProductProvider>
  </Provider>
);
