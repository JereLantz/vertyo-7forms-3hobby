import AddHobbyForm from "./components/AddHobbyForm"
import HobbyTracker from "./components/HobbyTracker"
import HobbyContextProvider from "./context/HobbyTrackerContext"

function App() {
  return (
    <>
      <HobbyContextProvider>
      <h1>Hobby tracker</h1>
      <AddHobbyForm/>

      <HobbyTracker />
      </HobbyContextProvider>
    </>
  )
}

export default App
