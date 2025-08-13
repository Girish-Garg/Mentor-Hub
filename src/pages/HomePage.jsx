import React, { useState, useEffect } from "react";
import { TopBar, UserNavBar as Navbar, Sidebar, Question } from "../../components/custom";
import AddAQuestion from "../../components/Overlay_Components/AddAQuestion";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToTop } from "../utils/scrollUtils";
import { ChevronUp } from "lucide-react";

function HomePage() {
  const questionsData = [
    {
      title: "How to implement authentication in React?",
      description: "I'm building a React application and need to implement user authentication. What are the best practices?",
      author: "John Doe",
      time: "2 hours ago",
      tags: ["React", "Authentication", "JavaScript"],
      answers: 3,
      initialVotes: 5
    },
    {
      title: "Best practices for state management in large applications",
      description: "What are the recommended patterns for managing state in large-scale React applications?",
      author: "Jane Smith",
      time: "4 hours ago",
      tags: ["React", "State Management", "Redux"],
      answers: 7,
      initialVotes: 12
    },
    {
      title: "How to optimize React app performance?",
      description: "My React application is running slowly. What are some techniques to improve performance?",
      author: "Mike Johnson",
      time: "1 day ago",
      tags: ["React", "Performance", "Optimization"],
      answers: 5,
      initialVotes: 8
    },
    {
      title: "Understanding React Hooks",
      description: "Can someone explain the concept of React Hooks and when to use them?",
      author: "Sarah Wilson",
      time: "2 days ago",
      tags: ["React", "Hooks", "JavaScript"],
      answers: 2,
      initialVotes: 6
    },
    {
      title: "CSS Grid vs Flexbox - When to use which?",
      description: "I'm confused about when to use CSS Grid and when to use Flexbox. Can someone clarify?",
      author: "Alex Brown",
      time: "3 days ago",
      tags: ["CSS", "Grid", "Flexbox"],
      answers: 4,
      initialVotes: 10
    }
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
  const [ask, setAsk] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const totalPages = Math.max(1, Math.ceil(questionsData.length / questionsPerPage));
  const paginatedQuestions = questionsData.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Smooth scroll to top of questions section when changing pages
    const questionsContainer = document.querySelector('.questions-container');
    if (questionsContainer) {
      questionsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
    <motion.div 
      className="w-screen h-screen bg-white overflow-hidden smooth-scroll"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {ask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AddAQuestion onClose={() => setAsk(false)} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <TopBar
          buttonText="Ask a Question"
          onButtonClick={() => {setAsk(true)}}
          onSearch={handleSearch}
          onAvatarClick={() => {}}
          onBellIcon={() => {}}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Navbar className="mt-[2.222vh]" />
      </motion.div>

      <div className="flex pl-[1vw] gap-[2vw] w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Sidebar
            className="bg-white py-[4.815vh] scroll-smooth scrollbar-hover w-[20vw] h-[83vh] border-r flex-shrink-0"
            filterConfig={filterConfig}
            onFilterChange={handleFilterChange}
          />
        </motion.div>

        <motion.div 
          className="w-full pt-[1.8vh]  h-[77vh] gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="h-full overflow-y-auto py-4  scrollbar-hover smooth-scroll questions-container">
            {paginatedQuestions.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.3,
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="space-y-6 pb-8"
              >
                {paginatedQuestions.map((q, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ 
                      y: -8,
                      transition: { 
                        duration: 0.2,
                        ease: "easeOut"
                      } 
                    }}
                    className="mb-4"
                  >
                    <div className="transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/20">
                      <Question
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
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center h-full text-gray-500"
              >
                <p>No questions found. Be the first to ask a question!</p>
              </motion.div>
            )}
          </div>
          
          {questionsData.length > 0 && (
            <motion.div 
              className="flex justify-center items-center h-[7.222vh] w-[69.861vw] mx-auto gap-[0.7vw]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-sm px-[1vw] py-[0.7vh] border rounded disabled:opacity-50"
                whileHover={{ scale: currentPage !== 1 ? 1.05 : 1 }}
                whileTap={{ scale: currentPage !== 1 ? 0.95 : 1 }}
                transition={{ duration: 0.2 }}
              >
                ← Previous
              </motion.button>

              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`text-sm px-[1vw] py-[0.7vh] border rounded ${
                    currentPage === i + 1
                      ? "bg-[#1461FC] text-white"
                      : "text-gray-700"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {i + 1}
                </motion.button>
              ))}

              <motion.button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-sm px-[1vw] py-[0.7vh] border rounded disabled:opacity-50"
                whileHover={{ scale: currentPage !== totalPages ? 1.05 : 1 }}
                whileTap={{ scale: currentPage !== totalPages ? 0.95 : 1 }}
                transition={{ duration: 0.2 }}
              >
                Next →
              </motion.button>
            </motion.div>
          )}
          
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-[#1461FC] text-white p-3 rounded-full shadow-lg hover:bg-[#0f4fd6] transition-colors z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default HomePage;
