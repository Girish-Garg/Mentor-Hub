import Badge from '@/components/custom/Badge'
import './App.css'
import Logo from '@/components/custom/logo'
import Resource from '@/components/custom/Resource'
function App() {
  return (
    <>
      <Logo />
      <Badge text="Votes" varient="filter"/>
      <br />
      <Resource title='Math 1 Notes' author='Girish Garg' uploadDate='12/11/2025' tags={['Student','Math 1', 'Civil Sem', 'Notes']} initialUserVote='down' initialVotes={-1}/>
    </>
  )
}

export default App
