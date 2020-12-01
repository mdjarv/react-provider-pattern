import React from 'react';
import DemoView from "./DemoView";
import {DemoProvider} from "./providers/DemoProvider";

function App() {
  return (<DemoProvider><DemoView/></DemoProvider>);
  // return (<DemoView/>);
}

export default App;
