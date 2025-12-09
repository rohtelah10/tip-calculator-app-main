import { ScreenProvider } from "./ScreenContext";
import Layout from "./layout/Layout";

const App = () => {
  return(
    <>
      <ScreenProvider>
        <Layout/>
      </ScreenProvider>
    </>
  )
}

export default App;