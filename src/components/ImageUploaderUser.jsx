import { useState } from 'react';
import basicImage from '../assets/loginSvg.svg';
import { Pencil } from 'lucide-react';
function ImageUploaderUser({ setPostInfo, imageUrl }) {
  const [_, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Create a preview for user feedback
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreview(reader.result);
        setPostInfo((prev) => ({ ...prev, image: reader.result })); // Store base64 preview
      };
    }
  };

  return (
    <>
      {preview ? (
        <label className="relative cursor-pointer hover:scale-105 block group">
          <img
            src={preview || basicImage}
            className="w-[100px] h-[100px] object-cover border border-emerald-400 rounded-full mb-2"
            alt="userImage"
          />

          <Pencil
            className="absolute top-8 left-8 text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            size="35"
            strokeWidth="2"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange} // Handle file selection
          />
        </label>
      ) : (
        <label className="relative cursor-pointer hover:scale-105 block">
          <img
            src={imageUrl || basicImage}
            className="w-[100px] h-[100px] object-cover border border-emerald-400 opacity-70 rounded-full mb-2"
            alt="userImage"
          />
          <Pencil
            className="absolute top-8 left-8 text-gray-700 hover:text-black"
            size="35"
            strokeWidth="2"
          />

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange} // Handle file selection
          />
        </label>
      )}
    </>
  );
}

export default ImageUploaderUser;
