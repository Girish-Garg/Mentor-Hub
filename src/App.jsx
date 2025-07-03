import Badge from "@/components/custom/Badge";
import Logo from "@/components/custom/logo";
import Resource from "@/components/custom/Resource";
import Question from "@/components/custom/Question";
import Events from "@/components/custom/Event";
function App() {
  return (
    <>
      <Logo />
      <Badge text="Votes" varient="filter" />
      <br />
      <Resource
        title="Math 1 Notes"
        author="Girish Garg"
        uploadDate="12/11/2025"
        tags={["Student", "Math 1", "Civil Sem", "Notes"]}
      />
      <Question
        title="How Should i prepare for my maths 2 Examination of 2nd sem ..? sdfsfdvdfdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvdfvfvdfvdfvdfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv"
        description ="I'm a 2nd-semester student and have my Maths 2 exam coming up. I want to know the most effective way to preparggggg gggggggggggggggggg gggggggvvv vvvvvvvvv vvvvvvvvvvv vvvvvvvvv vvvvvvvvcv bbbbbbbbb bbbbbbbbbb bbbbbbbbbb bbbbbbbbfvv vvvvvvvvvvvvvvvvvvvvvc bbbbbbbbbb bbbbdgfdfgdfgdvdvvvvvvvvvvvvv"
        author="Girish Garg dffffffffffffffffffffffffffffffffffffffffffffffffff"
        time="2 days"
        tags={["Student", "Maths 2", "Mech sem", "Etc", "lol", "None"]}
      />
      <Events
        title="Encarta the MBM event..."
        description="With the commencement of the 2025 academic session, MBM University proudly presents Encarta, its flagship annual event. Encarta is more than just a fest—it's a grand celebration of innovation, creativity, and cultural vibrance. Held every year,Encarta is a celebration of student energy, creativity and..."
        uploadTime="1 min"
        initialDate="12/11/2025"
        finalDate="15/11/2025"
        tags={["College", "Fest", "Students", "Encarta", "MBM University", "Event", "2025", "Jaipur"]}
      />
    </>
  );
}

export default App;
