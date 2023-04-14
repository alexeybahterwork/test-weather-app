import compose from "compose-function";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";
import { withPersistor } from "./with-persistor";

export const withProviders = compose(withRouter, withPersistor, withStore);
