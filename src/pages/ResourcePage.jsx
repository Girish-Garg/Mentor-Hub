import React from "react";
import { TopBar, UserNavBar as Navbar, Sidebar, Resource } from "../../components/custom";
import { useState } from "react";
import { questionsData, filterConfig } from "../../Dev/var2";

function ResourcePage() {
  const questionsPerPage = 9;
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

       <div className="flex-1 h-[80vh] overflow-hidden relative">
  <div className="h-full overflow-y-auto overflow-x-hidden pr-3">
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-[2vw] gap-y-[3vh] px-2 pb-[12vh]">
      {paginatedQuestions.map((q, index) => (
        <Resource
          key={index}
          title={q.title}
          description={q.description}
          uploadTime={q.uploadTime}
          initialDate={q.initialDate}
          finalDate={q.finalDate}
          tags={q.tags}
          onLinkClick={() => {}}
        />
      ))}
    </div>
  </div>

  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center items-center h-[7.222vh] w-[69.861vw] gap-[0.7vw] bg-white z-10 shadow-md border-t">
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
          currentPage === i + 1 ? "bg-[#1461FC] text-white" : "text-gray-700"
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

export default ResourcePage;
