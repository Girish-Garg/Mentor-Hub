import React, { useState, useEffect } from "react";
import {
  TopBar,
  UserNavBar as Navbar,
  Sidebar,
  Question,
} from "../../components/custom";
import AddAQuestion from "../../components/Overlay_Components/AddAQuestion";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToTop } from "../utils/scrollUtils";
import { ChevronUp } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { questionsData, filterConfig } from "../../Dev/var";
function HomePage() {
  const questionsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [ask, setAsk] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const totalPages = Math.max(
    1,
    Math.ceil(questionsData.length / questionsPerPage)
  );
  const paginatedQuestions = questionsData.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    const questionsContainer = document.querySelector(".questions-container");
    if (questionsContainer) {
      questionsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
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
          onButtonClick={() => {
            setAsk(true);
          }}
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
                        ease: "easeOut",
                      },
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
