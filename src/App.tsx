import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Catalog from './pages/Catalog'
import './App.css'

function App() {

  return (
    <MantineProvider>
      <Catalog />
    </MantineProvider>
  )
}

export default App
