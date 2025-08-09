import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { MultiSelect } from '@mantine/core';
import { SquarePen, CircleX, Maximize2, X } from "lucide-react";

export default function AddQuestion() {
  const [question, setQuestion] = useState("");
  const [tags] = useState("");
  const [quillContent, setQuillContent] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaError, setMediaError] = useState("");
  const [files, setFiles] = useState([]);
  const [isQuestionInvalid, setIsQuestionInvalid] = useState(false);

  const [fileError, setFileError] = useState("");

  const isMediaInvalid = mediaFiles.length > 3;
  const isFilesInvalid = files.length > 2;

  const isFormInvalid = isQuestionInvalid || isMediaInvalid || isFilesInvalid;

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
    <div className="w-[69.74vw] mx-auto bg-white rounded-xl shadow-md px-[1.25vw]">
      <div className="flex justify-between items-center ">
        <div className="flex items-center gap-2 text-base mb-[2.222vh] mt-[2.222vh] font-medium">
          <SquarePen className="w-4 h-4" />
          <span>Add a Question</span>
        </div>

        <div className="flex items-center mb-[2.222vh] mt-[2.222vh] gap-[0.625vw]">
          <Maximize2 className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
          <CircleX className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
        </div>
      </div>

      <hr className="border-t border-gray-300 mb-[1.852vh]" />
      <div className="mb-[1.481vh] relative">
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
        

      </div>
      <div className="mb-[7vh]">
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
          className="bg-white md:h-[35.463vh] h-[34.463vh] w-[67.24vw] rounded-xl"
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
  );
}
