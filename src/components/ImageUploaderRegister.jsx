import { useState } from 'react';

function ImageUploaderRegister({ setPostInfo }) {
  const [_, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Create a preview for user feedback
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPostInfo((prev) => ({ ...prev, image: reader.result })); // Store base64 preview
      };
    }
  };

  return (
    <>
      <div className="grid gap-1.5 pt-2">
        <label className="block text-black-800 font-semibold text-md xl:text-lg ">
          *Choose a profile image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="flex w-75 h-10  rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
        ></input>
      </div>
    </>
  );
}

export default ImageUploaderRegister;
