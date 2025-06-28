import Badge from '@/components/custom/Badge'
import './App.css'
import Logo from '@/components/custom/logo'
function App() {
  return (
    <>
      <Logo />
      <Badge text="Civil Sem" varient="tag"/>
      <br />
      <Badge text="Votes" varient="filter"/>
    </>
  )
}

export default App
