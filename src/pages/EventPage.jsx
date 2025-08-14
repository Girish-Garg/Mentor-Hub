import React from "react";
import { TopBar, UserNavBar as Navbar, Sidebar, Event as Events } from "../../components/custom";
import { useState } from "react";
import { questionsData, filterConfig } from "../../Dev/var3";

function EventPage() {

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

  return (
    <div className="w-screen h-screen bg-white overflow-hidden">
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
        <div className="w-full py-[4.815vh] h-[80vh] ">
          <div className="h-[60vh] overflow-y-auto gap-6 ">
            {paginatedQuestions.map((q, index) => (
              <Events
                key={index}
                title={q.title}
                description={q.description}
                uploadTime={q.uploadTime}
                initialDate={q.initialDate}
                finalDate={q.finalDate}
                tags={q.tags}
                initialVotes={q.initialVotes || 0}
                onTitleClick={handleQuestionClick}
                onUpvote={handleUpvote}
                onFollow={() => {}}
                onLinkClick={() => {}}
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

export default EventPage;
