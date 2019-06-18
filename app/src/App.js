import React from "react";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
import options from "./drizzleOptions";
import Home from "./Home";

function App() {
  return (
    <DrizzleProvider options={options}>
      <LoadingContainer>
        <Home />
      </LoadingContainer>
    </DrizzleProvider>
  );
}

export default App;
