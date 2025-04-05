import AddHobbyForm from "./components/AddHobbyForm"
import HobbyContextProvider from "./context/HobbyTrackerContext"

function App() {

  return (
    <>
      <HobbyContextProvider>
      <h1>Hobby tracker</h1>
      <AddHobbyForm/>
      </HobbyContextProvider>
    </>
  )
}

export default App
