import React from 'react'
import HomePage from './Questionare_Components/HomePage'
import AskQuestion from '../components/Overlay_Components/AddAQuestion'
// import { TEMP_FILTER_CONFIG } from "../src/test";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import AskResource from '../components/Overlay_Components/AddAAnswer';
import AddResource from '../components/Overlay_Components/AddAResource';
import AddAnswer from '../components/Overlay_Components/AddAAnswer';
import AddQuestion from '../components/Overlay_Components/AddAQuestion';
import Tag from '../components/Overlay_Components/Tag';
import EventPage from '@/src/Questionare_Components/EventPage';
import ResourcePage from './Questionare_Components/ResourcePage';
const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <ResourcePage />
        </MantineProvider>
  )
}

export default App
