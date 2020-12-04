import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Grommet } from "grommet";

import App from "./App";
import theme from "./commons/grommet-theme";
import configureStore from "./store/redux/redux-store";
const store = configureStore();

// const theme = {
//   global: {
//     font: {
//       family: "Roboto",
//       size: "18px",
//       height: "20px",
//     },
//   },
// };

ReactDOM.render(
  <Grommet theme={theme} className="full">
    <Provider store={store}>
      <App />
    </Provider>
  </Grommet>,
  document.getElementById("root")
);
