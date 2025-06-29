import Badge from '@/components/custom/Badge'
import Logo from '@/components/custom/logo'
import Resource from '@/components/custom/Resource'
import Question from '@/components/custom/Question'
import Login from '@/src/pages/auth/Login'
import AccType from '@/components/SignUp/AccType'
function App() {
  return (
    <>
      {/* <Logo />
      <Badge text="Votes" varient="filter"/>
      <br />
      <Resource title='Math 1 Notes' author='Girish Garg' uploadDate='12/11/2025' tags={['Student','Math 1', 'Civil Sem', 'Notes']}/>
      <Resource title='Math 1 Notes' author='Girish Garg' uploadDate='12/11/2025' tags={['Student','Math 1', 'Civil Sem', 'Notes']} initialUserVote='down' initialVotes={-1}/> */}
    {/*<Login/>*/}
      {/* <AccType/> */}
      <Question
        title="How Should i prepare for my maths 2 Examination of 2nd sem ..?"
        description="I'm a 2nd-semester student and have my Maths 2 exam coming up. I want to know the most effective way to prepare for it. The syllabus include topic ike differential equations, Laplace transforms, vector calculus, and multiple integrals. I’m looking for a solid preparation strsdfsdsdvsdvsdv sdvsdvsdvsdvs...."
        author='Girish Garg'
        uploadDate="12/11/2025"
        tags={['Student', 'Maths 2', 'Mech sem']}
      />
    </>
  )
}

export default App
