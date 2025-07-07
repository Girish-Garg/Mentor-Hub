import Badge from "@/components/custom/Badge";
import Logo from "@/components/custom/logo";
import Resource from "@/components/custom/Resource";
import Question from "@/components/custom/Question";
import Events from "@/components/custom/Event";
import Sidebar from "@/components/custom/sidebar";
import { cn } from "@/components/lib/utils";

function App() {
  const tempFilterConfig = {
    tags: {
      title: "Tags",
      items: [
        { id: 'notices', label: 'Notices' },
        { id: 'events', label: 'Events' },
        { id: 'counselling', label: 'Counselling' },
        { id: 'resources', label: 'Resources' },
        { id: 'workshops', label: 'Workshops' },
        { id: 'mentorship', label: 'Mentorship' },
        { id: 'internships', label: 'Internships' },
        { id: 'placements', label: 'Placements' },
        { id: 'hackathons', label: 'Hackathons' },
        { id: 'competitions', label: 'Competitions' },
        { id: 'seminars', label: 'Seminars' },
        { id: 'webinars', label: 'Webinars' },
        { id: 'conferences', label: 'Conferences' },
        { id: 'meetups', label: 'Meetups' },
        { id: 'bootcamps', label: 'Bootcamps' }
      ]
    },
    department: {
      title: "Department",
      items: [
        { id: 'cs', label: 'Computer Science' },
        { id: 'it', label: 'Information Technology' },
        { id: 'ece', label: 'Electronics & Communication' },
        { id: 'me', label: 'Mechanical Engineering' },
        { id: 'ce', label: 'Civil Engineering' },
        { id: 'ee', label: 'Electrical Engineering' },
        { id: 'mba', label: 'MBA' },
        { id: 'mca', label: 'MCA' },
        { id: 'chem', label: 'Chemical Engineering' },
        { id: 'bio', label: 'Biomedical Engineering' },
        { id: 'aero', label: 'Aerospace Engineering' },
        { id: 'auto', label: 'Automobile Engineering' },
        { id: 'textile', label: 'Textile Engineering' },
        { id: 'mining', label: 'Mining Engineering' },
        { id: 'metal', label: 'Metallurgical Engineering' },
        { id: 'food', label: 'Food Technology' },
        { id: 'marine', label: 'Marine Engineering' },
        { id: 'petro', label: 'Petroleum Engineering' },
        { id: 'enviro', label: 'Environmental Engineering' },
        { id: 'agri', label: 'Agricultural Engineering' },
        { id: 'arch', label: 'Architecture' },
        { id: 'physics', label: 'Physics' },
        { id: 'chem2', label: 'Chemistry' },
        { id: 'math', label: 'Mathematics' },
        { id: 'bio2', label: 'Biology' },
        { id: 'biotech', label: 'Biotechnology' },
        { id: 'micro', label: 'Microbiology' },
        { id: 'stats', label: 'Statistics' },
        { id: 'econ', label: 'Economics' },
        { id: 'bcom', label: 'B.Com' },
        { id: 'bba', label: 'BBA' },
        { id: 'finance', label: 'Finance' },
        { id: 'account', label: 'Accounting' },
        { id: 'marketing', label: 'Marketing' },
        { id: 'hr', label: 'Human Resources' },
        { id: 'law', label: 'Law' },
        { id: 'english', label: 'English Literature' },
        { id: 'hindi', label: 'Hindi Literature' },
        { id: 'history', label: 'History' },
        { id: 'geo', label: 'Geography' },
        { id: 'polsci', label: 'Political Science' },
        { id: 'socio', label: 'Sociology' },
        { id: 'psych', label: 'Psychology' },
        { id: 'philo', label: 'Philosophy' },
        { id: 'journal', label: 'Journalism' },
        { id: 'mass', label: 'Mass Communication' },
        { id: 'fashion', label: 'Fashion Design' },
        { id: 'graphic', label: 'Graphic Design' },
        { id: 'interior', label: 'Interior Design' },
        { id: 'fine', label: 'Fine Arts' },
        { id: 'music', label: 'Music' },
        { id: 'dance', label: 'Dance' },
        { id: 'theatre', label: 'Theatre Arts' },
        { id: 'film', label: 'Film Studies' },
        { id: 'photo', label: 'Photography' },
        { id: 'nursing', label: 'Nursing' },
        { id: 'pharma', label: 'Pharmacy' },
        { id: 'dental', label: 'Dental' },
        { id: 'physio', label: 'Physiotherapy' },
        { id: 'medical', label: 'Medical' },
        { id: 'ai', label: 'Artificial Intelligence' },
        { id: 'ml', label: 'Machine Learning' },
        { id: 'ds', label: 'Data Science' },
        { id: 'cyber', label: 'Cybersecurity' },
        { id: 'cloud', label: 'Cloud Computing' },
        { id: 'blockchain', label: 'Blockchain' },
        { id: 'iot', label: 'Internet of Things' },
        { id: 'robotics', label: 'Robotics' }
      ]
    },
    academicYear: {
      title: "Academic Year",
      items: [
        { id: 'first', label: 'First Year' },
        { id: 'second', label: 'Second Year' },
        { id: 'third', label: 'Third Year' },
        { id: 'fourth', label: 'Final Year' },
        { id: 'masters', label: 'Masters' },
        { id: 'phd', label: 'PhD' },
        { id: 'diploma', label: 'Diploma' },
        { id: 'certificate', label: 'Certificate' }
      ]
    },
    category: {
      title: "Category",
      items: [
        { id: 'academic', label: 'Academic' },
        { id: 'extracurricular', label: 'Extracurricular' },
        { id: 'career', label: 'Career Development' },
        { id: 'research', label: 'Research' },
        { id: 'sports', label: 'Sports & Recreation' },
        { id: 'cultural', label: 'Cultural Activities' },
        { id: 'technical', label: 'Technical' },
        { id: 'social', label: 'Social Service' },
        { id: 'entrepreneurship', label: 'Entrepreneurship' },
        { id: 'innovation', label: 'Innovation' }
      ]
    }
  }

  // Handle filter changes
  function handleFilterChange(selectedFilters) {
    console.log('Selected filters:', selectedFilters)
    // You can process the filter data here
  }

  return (
    <>
      {/* <Logo />
      <Badge text="Votes" varient="filter" />
      <br />
      <Resource
        title="Math 1 Notes"
        author="Girish Garg"
        uploadDate="12/11/2025"
        tags={["Student", "Math 1", "Civil Sem", "Notes"]}
      />
      <Question
        title="How Should i prepare for my maths 2 Examination of 2nd sem ..?"
        description="I'm a 2nd-semester student and have my Maths 2 exam coming up. I want to know the most effective way to prepare for it. The syllabus include topic ike differential equations, Laplace transforms, vector calculus, and multiple integrals. I’m looking for a solid preparation strsdfsdsdvsdvsdv sdvsdvsdvsdvs...."
        author="Girish Garg"
        time="1 min"
        tags={["Student", "Maths 2", "Mech sem"]}
      />
      <Events
        title="Encarta the MBM event..."
        description="With the commencement of the 2025 academic session, MBM University proudly presents Encarta, its flagship annual event. Encarta is more than just a fest—it's a grand celebration of innovation, creativity, and cultural vibrance. Held every year,Encarta is a celebration of student energy, creativity and..."
        uploadTime="1 min"
        initialDate="12/11/2025"
        finalDate="15/11/2025"
        tags={["College", "Fest", "Students", "Encarta", "MBM University", "Event", "2025", "Jaipur"]}
      />
      <div className="custom-scrollbar bg-white flex flex-col w-64 py-6 px-0 max-h-screen overflow-y-auto overflow-x-hidden">
        <Sidebar
          filterConfig={tempFilterConfig}
          onFilterChange={handleFilterChange}
          title="Filter by"
        />
      </div>
=======
        uploadTime="1 min ago"
        uploadDate="24 Jun’25  - 28 Jun’25"
        tags={["College", "Fest", "Students"]}
      /> */}
      <Navbar/>

>>>>>>> 3a9b35d (navbar)
    </>
  );
}

export default App;
