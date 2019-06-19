import React from "react";
import { Drizzle } from "drizzle";
import { drizzleReactHooks } from "drizzle-react";
// import { LoadingContainer } from "drizzle-react-components";
import LoadingContainer from "./components/LoadingContainer";
import Loading from "./components/Loading";
import DrizzleError from "./components/DrizzleError";
import options from "./drizzleOptions";
import AppContainer from "./components/AppContainer";

const drizzle = new Drizzle(options);

function App() {
  return (
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      {/* <drizzleReactHooks.Initializer> */}
      <LoadingContainer>
        <AppContainer />
      </LoadingContainer>
      {/* </drizzleReactHooks.Initializer> */}
    </drizzleReactHooks.DrizzleProvider>
  );
}

export default App;
