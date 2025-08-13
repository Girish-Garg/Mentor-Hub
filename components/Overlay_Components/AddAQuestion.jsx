import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MultiSelect } from '@mantine/core';
import { SquarePen, CircleX, Maximize2, Minimize2, X } from "lucide-react";

export default function AddQuestion({ onClose }) {
  const [question, setQuestion] = useState("");
  const [tags, setTags] = useState([]);
  const [quillContent, setQuillContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaError, setMediaError] = useState("");
  const [files, setFiles] = useState([]);
  const [isQuestionInvalid, setIsQuestionInvalid] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const [fileError, setFileError] = useState("");
  const modalRef = useRef(null);

  // Categorized tag options with colors
  const tagCategories = {
    frontend: {
      label: 'Frontend',
      color: '#3b82f6', // Blue
      tags: [
        { value: 'React', label: 'React' },
        { value: 'Vue.js', label: 'Vue.js' },
        { value: 'Angular', label: 'Angular' },
        { value: 'HTML', label: 'HTML' },
        { value: 'CSS', label: 'CSS' },
        { value: 'JavaScript', label: 'JavaScript' },
        { value: 'TypeScript', label: 'TypeScript' },
        { value: 'Tailwind CSS', label: 'Tailwind CSS' },
        { value: 'Bootstrap', label: 'Bootstrap' }
      ]
    },
    backend: {
      label: 'Backend',
      color: '#10b981', // Green
      tags: [
        { value: 'Node.js', label: 'Node.js' },
        { value: 'Python', label: 'Python' },
        { value: 'Java', label: 'Java' },
        { value: 'C#', label: 'C#' },
        { value: 'PHP', label: 'PHP' },
        { value: 'Go', label: 'Go' },
        { value: 'Rust', label: 'Rust' },
        { value: 'Ruby', label: 'Ruby' }
      ]
    },
    database: {
      label: 'Database',
      color: '#f59e0b', // Orange
      tags: [
        { value: 'MongoDB', label: 'MongoDB' },
        { value: 'PostgreSQL', label: 'PostgreSQL' },
        { value: 'MySQL', label: 'MySQL' },
        { value: 'Redis', label: 'Redis' },
        { value: 'Firebase', label: 'Firebase' },
        { value: 'SQLite', label: 'SQLite' }
      ]
    },
    devops: {
      label: 'DevOps & Cloud',
      color: '#8b5cf6', // Purple
      tags: [
        { value: 'Docker', label: 'Docker' },
        { value: 'AWS', label: 'AWS' },
        { value: 'Azure', label: 'Azure' },
        { value: 'Google Cloud', label: 'Google Cloud' },
        { value: 'Kubernetes', label: 'Kubernetes' },
        { value: 'CI/CD', label: 'CI/CD' },
        { value: 'Git', label: 'Git' }
      ]
    },
    concepts: {
      label: 'Concepts',
      color: '#ef4444', // Red
      tags: [
        { value: 'API', label: 'API' },
        { value: 'REST API', label: 'REST API' },
        { value: 'GraphQL', label: 'GraphQL' },
        { value: 'Authentication', label: 'Authentication' },
        { value: 'State Management', label: 'State Management' },
        { value: 'Performance', label: 'Performance' },
        { value: 'Security', label: 'Security' },
        { value: 'Testing', label: 'Testing' },
        { value: 'Microservices', label: 'Microservices' }
      ]
    },
    emerging: {
      label: 'Emerging Tech',
      color: '#06b6d4', // Cyan
      tags: [
        { value: 'Machine Learning', label: 'Machine Learning' },
        { value: 'AI', label: 'AI' },
        { value: 'Data Science', label: 'Data Science' },
        { value: 'Blockchain', label: 'Blockchain' },
        { value: 'IoT', label: 'IoT' },
        { value: 'AR/VR', label: 'AR/VR' }
      ]
    }
  };

  // Flatten all tags for the MultiSelect
  const tagOptions = React.useMemo(() => {
    try {
      return Object.values(tagCategories).flatMap(category => 
        category.tags.map(tag => ({
          ...tag,
          group: category.label,
          color: category.color
        }))
      );
    } catch (error) {
      console.error('Error creating tag options:', error);
      return [];
    }
  }, []);

  const isMediaInvalid = mediaFiles.length > 3;
  const isFilesInvalid = files.length > 2;
  const isTagsInvalid = tags.length > 8;

  const isFormInvalid = isQuestionInvalid || isMediaInvalid || isFilesInvalid || isTagsInvalid;

  // Handle maximize/minimize
  const handleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Get tag color based on category
  const getTagColor = (tagValue) => {
    try {
      const tagData = tagOptions.find(tag => tag.value === tagValue);
      return tagData?.color || '#6b7280'; // Default gray
    } catch (error) {
      return '#6b7280'; // Default gray on error
    }
  };

  // Custom tag renderer
  const renderSelectedTags = () => {
    if (!tags || tags.length === 0) return null;
    
    return tags.map((tagValue, index) => {
      const tagColor = getTagColor(tagValue);
      return (
        <span
          key={`${tagValue}-${index}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 transition-all duration-200"
          style={{
            backgroundColor: `${tagColor}20`,
            color: tagColor,
            border: `1px solid ${tagColor}40`
          }}
        >
          {tagValue}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const newTags = tags.filter(tag => tag !== tagValue);
              setTags(newTags);
            }}
            className="ml-2 text-current opacity-70 hover:opacity-100 transition-opacity"
          >
            ×
          </button>
        </span>
      );
    });
  };

  // Handle tags change with strict limit enforcement
  const handleTagsChange = (selectedTags) => {
    if (selectedTags && selectedTags.length <= 8) {
      setTags(selectedTags);
    }
  };

  // Handle ESC key press and click outside
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onClose) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      // Check if the clicked element is part of a Mantine dropdown
      if (event.target.closest('[data-mantine-component]') || 
          event.target.closest('.mantine-Select-dropdown') ||
          event.target.closest('.mantine-MultiSelect-dropdown')) {
        return;
      }
      
      if (modalRef.current && !modalRef.current.contains(event.target) && onClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      file.name.endsWith(".pdf")
    );
    const totalFiles = [...files, ...validFiles];

    if (totalFiles.length > 2) {
      setFileError("You can only upload up to 2 PDF files.");
      return;
    }

    setFiles(totalFiles);
    setFileError("");
  };

  const handleRemoveFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleMediaChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    const validImages = selectedImages.filter((file) =>
      /\.(jpe?g|png)$/i.test(file.name)
    );
    const totalMedia = [...mediaFiles, ...validImages];

    if (totalMedia.length > 3) {
      setMediaError("You can only upload up to 3 image files.");
      return;
    }

    setMediaFiles(totalMedia);
    setMediaError("");
  };

  const handleRemoveMedia = (index) => {
    const updated = [...mediaFiles];
    updated.splice(index, 1);
    setMediaFiles(updated);
  };

  return (
    <div className="w-screen h-screen fixed overflow-hidden flex flex-col z-10 items-center justify-center backdrop-blur-[3px]">
    <div ref={modalRef} className={`bg-white shadow-md transition-all duration-300 ${
      isMaximized 
        ? 'fixed inset-0 w-screen h-screen overflow-y-auto modal-scroll smooth-scroll px-6 py-4 rounded-none z-50' 
        : 'fixed w-[69.74vw] rounded-xl px-[1.25vw] z-40'
    }`}>
      <div className="flex justify-between items-center">
        <div className={`flex items-center gap-2 text-base font-medium ${
          isMaximized ? 'mb-2 mt-2' : 'mb-[2.222vh] mt-[2.222vh]'
        }`}>
          <SquarePen className="w-4 h-4" />
          <span>Add a Question</span>
        </div>

        <div className={`flex items-center gap-[0.625vw] ${
          isMaximized ? 'mb-2 mt-2' : 'mb-[2.222vh] mt-[2.222vh]'
        }`}>
          {isMaximized ? (
            <Minimize2 
              className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" 
              onClick={handleMaximize}
            />
          ) : (
            <Maximize2 
              className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" 
              onClick={handleMaximize}
            />
          )}
          <CircleX 
            className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" 
            onClick={handleClose}
          />
        </div>
      </div>

      <hr className={`border-t border-gray-300 ${
        isMaximized ? 'mb-3' : 'mb-[1.852vh]'
      }`} />
      <div className={`relative ${
        isMaximized ? 'mb-4' : 'mb-[1.481vh]'
      }`}>
        <textarea
          rows="2"
          placeholder="Enter your Question here...."
          value={question}
          onChange={(e) => {
            const val = e.target.value;
            setQuestion(val);
            setIsQuestionInvalid(val.length > 150);
          }}
          className={`w-full border rounded-lg px-3 py-2 resize-none text-sm pr-12 ${
            isQuestionInvalid ? "border-red-500" : ""
          }`}
        />

        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          {question.length} / 150
        </div>
      </div>
      <div className="mb-[1.481vh]">
        <div className="flex justify-between items-center mb-[1.111vh]">
          <label className="text-sm font-medium">Tags</label>
          <span className="text-xs text-gray-500">{tags.length} / 8</span>
        </div>
        
        <MultiSelect
          data={[
           { group: 'Frontend', items: [{ value: 'react', label: 'React' }, { value: 'ng', label: 'Angular' }] },
           { group: 'Backend', items: [{ value: 'express', label: 'Express' }, { value: 'django', label: 'Django' }] },
          ]}
          value={tags}
          onChange={handleTagsChange}
          placeholder="Select tags..."
          maxValues={8}
          searchable
          clearable
          error={isTagsInvalid ? 'Maximum 8 tags allowed' : null}
        />
        


        {isTagsInvalid && (
          <p className="text-red-500 text-xs mt-1">You can only select up to 8 tags.</p>
        )}
      </div>
      <div className={`mb-[7vh] relative ${isMaximized ? 'z-10' : 'z-0'}`}>
        <ReactQuill
          value={quillContent}
          onChange={setQuillContent}
          modules={{
            toolbar: [
              [{ font: [] }, { size: [] }],
              ["bold", "italic", "underline", "strike", "script", "code"],
              [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
              [{ color: [] }, { background: [] }],
              ["clean"],
            ],
          }}
          formats={[
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "script",
            "code",
            "list",
            "bullet",
            "align",
            "color",
            "background",
            "clean",
          ]}
          placeholder="Description here..."
          className={`bg-white rounded-xl ${
            isMaximized ? 'h-[60vh] w-full' : 'md:h-[35.463vh] h-[34.463vh] w-[67.24vw]'
          }`}
          style={{
            position: 'relative',
            zIndex: isMaximized ? 10 : 0
          }}
        />
      </div>
      <div className="fix mb-[1.481vh]">
        <div className="flex justify-between items-center mb-[1.11vh]">
          <label className="text-sm font-medium">Attach Media (JPG, PNG)</label>
          <span className="text-xs text-gray-500">{mediaFiles.length} / 3</span>
        </div>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          multiple
          onChange={handleMediaChange}
          className={`w-full border rounded-lg px-3 py-2 text-sm ${
            isMediaInvalid ? "border-red-500" : ""
          }`}
        />

        {mediaFiles.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {mediaFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm"
              >
                <span>{file.name}</span>
                <X
                  className="w-4 h-4 ml-1 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => handleRemoveMedia(index)}
                />
              </div>
            ))}
          </div>
        )}
        {mediaError && (
          <p className="text-red-500 text-xs mt-1">{mediaError}</p>
        )}
      </div>
      <div className="mb-[1.481vh]">
        <div className="flex justify-between items-center mb-[1.11vh]">
          <label className="text-sm font-medium">
            Attach Files (PDF, TXT, DOC, DOCX)
          </label>
          <span className="text-xs text-gray-500">{files.length} / 2</span>
        </div>
        <input
          type="file"
          accept=".pdf, .txt, .doc, .docx"
          multiple
          onChange={handleFileChange}
          className={`w-full border rounded-lg px-3 py-2 text-sm ${
            isFilesInvalid ? "border-red-500" : ""
          }`}
        />

        {files.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-sm"
              >
                <span>{file.name}</span>
                <X
                  className="w-4 h-4 ml-1 text-gray-500 hover:text-red-500 cursor-pointer"
                  onClick={() => handleRemoveFile(index)}
                />
              </div>
            ))}
          </div>
        )}
        {fileError && <p className="text-red-500 text-xs mt-1">{fileError}</p>}
      </div>
      <button
        disabled={isFormInvalid}
        className={`w-full mb-[1.481vh] py-2 rounded-md font-semibold text-white ${
          isFormInvalid
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-red-400 hover:bg-red-500"
        }`}
      >
        Submit
      </button>
    </div>
    </div>
  );
}
