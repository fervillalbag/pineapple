import { LazyMotion, domAnimation } from "framer-motion";

import { WindowSizeProvider } from "./context";
import AppRoute from "./routes";

function App() {
  return (
    <LazyMotion strict features={domAnimation}>
      <WindowSizeProvider>
        <AppRoute />
      </WindowSizeProvider>
    </LazyMotion>
  );
}

export default App;
