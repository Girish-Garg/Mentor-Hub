import React, { useState } from "react";
import { SquarePen, CircleX } from "lucide-react";

export default function AddResource() {
  const [title, setTitle] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [tags, setTags] = useState("");

  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [isDriveLinkInvalid, setIsDriveLinkInvalid] = useState(false);

  const isFormInvalid = isTitleInvalid || isDriveLinkInvalid;

  return (
    <div className="w-[69.74vw] mx-auto bg-white rounded-xl shadow-md px-[1.25vw]">
      <div className="flex justify-between items-center mb-[2.222vh] mt-[2.222vh]">
        <div className="flex items-center gap-2 text-base font-medium">
          <SquarePen className="w-4 h-4" />
          <span>Add a Resource</span>
        </div>
        <div className="flex items-center gap-[0.625vw]">
          <CircleX className="w-4 h-4 text-gray-400 hover:text-black cursor-pointer" />
        </div>
      </div>

      <hr className="border-t border-gray-300 mb-[1.852vh]" />

      <div className="mb-[1.481vh] relative">
        <label className="text-sm font-medium">Title</label>
        <textarea
          rows="1"
          placeholder="Enter the title/name for the comp"
          value={title}
          onChange={(e) => {
            const val = e.target.value;
            setTitle(val);
            setIsTitleInvalid(val.length > 20);
          }}
          className={`w-full border mt-[1.111vh] rounded-lg px-3 py-2 resize-none text-sm pr-12 ${
            isTitleInvalid ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div className="absolute bottom-4 right-2 text-xs text-gray-500">
          {title.length} / 20
        </div>
      </div>


      <div className="mb-[1.481vh] relative">
        <label className="text-sm font-medium">Drive Link</label>
        <textarea
          rows="1"
          placeholder="Enter the shareable drive link"
          value={driveLink}
          onChange={(e) => {
            const val = e.target.value;
            setDriveLink(val);
            const driveRegex = /^https:\/\/drive\.google\.com\/[^\s]+$/;
            setIsDriveLinkInvalid(!driveRegex.test(val));
          }}
          className={`w-full border mt-[1.111vh] rounded-lg px-3 py-2 resize-none text-sm pr-12 ${
            isDriveLinkInvalid ? "border-red-500" : "border-gray-300"
          }`}
        />
        {isDriveLinkInvalid && (
          <p className="text-xs text-red-500 mt-1">Enter a valid Google Drive link.</p>
        )}
      </div>


      <div className="mb-[1.481vh]">
        <div className="flex justify-between items-center mb-[1.111vh]">
          <label className="text-sm font-medium">Tags</label>
          <span className="text-xs text-gray-500">{tags.length} / 8</span>
        </div>
        <input
          type="text"
          placeholder="Use ShadCn comp"
          maxLength={8}
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />
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
