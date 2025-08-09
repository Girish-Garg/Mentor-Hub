import React from "react";
import { TopBar, UserNavBar as Navbar, Sidebar, Question } from "../../components/custom";
import { useState } from "react";

function HomePage() {
  const questionsData = [
    {
      title: "How to use React useEffect with cleanup?",
      description:
        "I’m trying to understand how cleanup functions work inside useEffect in React. Can someone provide an example?",
      author: "John Doe",
      time: "2 hours",
      tags: ["React", "Hooks", "JavaScript", "Frontend"],
      answers: 4,
      initialVotes: 10,
    },
    {
      title: "What is Tailwind CSS and how does it compare to Bootstrap?",
      description:
        "I’ve heard a lot about Tailwind CSS recently. What are the advantages of using it over traditional frameworks like Bootstrap?",
      author: "Jane Smith",
      time: "3 hours",
      tags: ["Tailwind", "CSS", "Design"],
      answers: 2,
      initialVotes: 7,
    },

    {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },

        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },

        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
        {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
            {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
                {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
                {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
                {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
                {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
                {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },
                {
      title: "How should I prepare for my maths 2 exam?",
      description:
        "I'm a 2nd-semester student preparing for my Maths 2 exam. Looking for strategies on Laplace transforms and vector calculus.",
      author: "Girish Garg",
      time: "1 min",
      tags: ["Student", "Maths 2", "Mech sem"],
      answers: 0,
      initialVotes: 192,
    },


  ];

  const filterConfig = {
    tags: {
      title: "Tags",
      items: [
        { id: "notices", label: "Notices" },
        { id: "events", label: "Events" },
        { id: "counselling", label: "Counselling" },
        { id: "resources", label: "Resources" },
        { id: "workshops", label: "Workshops" },
        { id: "mentorship", label: "Mentorship" },
        { id: "internships", label: "Internships" },
        { id: "placements", label: "Placements" },
        { id: "hackathons", label: "Hackathons" },
        { id: "competitions", label: "Competitions" },
        { id: "seminars", label: "Seminars" },
        { id: "webinars", label: "Webinars" },
        { id: "conferences", label: "Conferences" },
        { id: "meetups", label: "Meetups" },
        { id: "bootcamps", label: "Bootcamps" },
      ],
    },
    department: {
      title: "Department",
      items: [
        { id: "cs", label: "Computer Science" },
        { id: "it", label: "Information Technology" },
        { id: "ece", label: "Electronics & Communication" },
        { id: "me", label: "Mechanical Engineering" },
        { id: "ce", label: "Civil Engineering" },
        { id: "ee", label: "Electrical Engineering" },
        { id: "mba", label: "MBA" },
        { id: "mca", label: "MCA" },
        { id: "chem", label: "Chemical Engineering" },
        { id: "bio", label: "Biomedical Engineering" },
        { id: "aero", label: "Aerospace Engineering" },
        { id: "auto", label: "Automobile Engineering" },
        { id: "textile", label: "Textile Engineering" },
        { id: "mining", label: "Mining Engineering" },
        { id: "metal", label: "Metallurgical Engineering" },
        { id: "food", label: "Food Technology" },
        { id: "marine", label: "Marine Engineering" },
        { id: "petro", label: "Petroleum Engineering" },
        { id: "enviro", label: "Environmental Engineering" },
        { id: "agri", label: "Agricultural Engineering" },
        { id: "arch", label: "Architecture" },
        { id: "physics", label: "Physics" },
        { id: "chem2", label: "Chemistry" },
        { id: "math", label: "Mathematics" },
        { id: "bio2", label: "Biology" },
        { id: "biotech", label: "Biotechnology" },
        { id: "micro", label: "Microbiology" },
        { id: "stats", label: "Statistics" },
        { id: "econ", label: "Economics" },
        { id: "bcom", label: "B.Com" },
        { id: "bba", label: "BBA" },
        { id: "finance", label: "Finance" },
        { id: "account", label: "Accounting" },
        { id: "marketing", label: "Marketing" },
        { id: "hr", label: "Human Resources" },
        { id: "law", label: "Law" },
        { id: "english", label: "English Literature" },
        { id: "hindi", label: "Hindi Literature" },
        { id: "history", label: "History" },
        { id: "geo", label: "Geography" },
        { id: "polsci", label: "Political Science" },
        { id: "socio", label: "Sociology" },
        { id: "psych", label: "Psychology" },
        { id: "philo", label: "Philosophy" },
        { id: "journal", label: "Journalism" },
        { id: "mass", label: "Mass Communication" },
        { id: "fashion", label: "Fashion Design" },
        { id: "graphic", label: "Graphic Design" },
        { id: "interior", label: "Interior Design" },
        { id: "fine", label: "Fine Arts" },
        { id: "music", label: "Music" },
        { id: "dance", label: "Dance" },
        { id: "theatre", label: "Theatre Arts" },
        { id: "film", label: "Film Studies" },
        { id: "photo", label: "Photography" },
        { id: "nursing", label: "Nursing" },
        { id: "pharma", label: "Pharmacy" },
        { id: "dental", label: "Dental" },
        { id: "physio", label: "Physiotherapy" },
        { id: "medical", label: "Medical" },
      ],
    },
    academicYear: {
      title: "Academic Year",
      items: [
        { id: "first", label: "First Year" },
        { id: "second", label: "Second Year" },
        { id: "third", label: "Third Year" },
        { id: "fourth", label: "Final Year" },
      ],
    },
    category: {
      title: "Category",
      items: [
        { id: "academic", label: "Academic" },
        { id: "career", label: "Career Development" },
        { id: "technical", label: "Technical" },
        { id: "social", label: "Social Service" },
      ],
    },
  };
  const questionsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(questionsData.length / questionsPerPage);
  const paginatedQuestions = questionsData.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (selectedFilters) => {
    console.log("Selected filters:", selectedFilters);
  };

  const handleSearch = (value) => {
    console.log("Search input:", value);
  };

  const handleQuestionClick = () => {
    console.log("Title clicked");
  };

  const handleUpvote = (voted) => {
    console.log("Upvoted:", voted);
  };

  const handleBookmark = (bookmarked) => {
    console.log("Bookmarked:", bookmarked);
  };

  return (
    <div className="w-screen h-screen bg-white overflow-hidden ">
      <TopBar
        buttonText="Ask a Question"
        onButtonClick={() => {}}
        onSearch={handleSearch}
        onAvatarClick={() => {}}
        onBellIcon={() => {}}
      />
      <Navbar className="mt-[2.222vh]" />

      <div className="flex px-[1vw] gap-[2vw] w-full">
        <Sidebar
          className="bg-white py-[4.815vh] w-[20%] h-[83vh] border-r flex-shrink-0"
          filterConfig={filterConfig}
          onFilterChange={handleFilterChange}
        />

        <div className="w-full py-[4.815vh] h-[80vh]   gap-4">
          <div className="h-[60vh] overflow-y-auto gap-6">
          {paginatedQuestions.map((q, index) => (
            <Question
              key={index}
              title={q.title}
              description={q.description}
              author={q.author}
              time={q.time}
              tags={q.tags}
              answers={q.answers}
              initialVotes={q.initialVotes}
              onTitleClick={handleQuestionClick}
              onUpvote={handleUpvote}
              onBookmark={handleBookmark}
            />
          ))}
          </div>
<div className="flex justify-center items-center mt-[3vh] h-[7.222vh] w-[69.861vw] mx-auto gap-[0.7vw]">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-sm px-[1vw] py-[0.7vh] border rounded disabled:opacity-50"
            >
              ← Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`text-sm px-[1vw] py-[0.7vh] border rounded ${
                  currentPage === i + 1
                    ? "bg-[#1461FC] text-white"
                    : "text-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-sm px-[1vw] py-[0.7vh] border rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
          
        </div>
      
      </div>
        
    </div>
    
  );
}

export default HomePage;
