import { Provider } from "react-redux";
// I don't like that we pass store here but whatever
import { store, persistor } from "../store";
import { PersistGate } from "redux-persist/integration/react";

export const withPersistor = (component: () => React.ReactNode) => () =>
  <PersistGate loading={null} persistor={persistor}>{component()}</PersistGate>;
