import { useState } from 'react';

function ImageUploader({ setPostInfo }) {
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
      <div className="">
        <div className="md:flex">
          <div className="w-full p-3">
            <div className="relative h-25 min-w-35 p-2 rounded-lg border-2 border-emerald-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
              {preview ? (
                <div className="flex gap-3 items-center ">
                  <img
                    src={preview}
                    alt="Selected"
                    className=" w-17 h-17 md:w-21 md:h-21
                     object-cover rounded-md ml-4"
                  />
                  <h2 className="text-gray-500 font-semibold md:w-90 ">
                    {' '}
                    Change Image on click
                  </h2>
                </div>
              ) : (
                <div className="absolute flex flex-col md:flex-row items-center">
                  <img
                    alt="File Icon"
                    className="mb-3"
                    src="https://img.icons8.com/dusk/64/000000/file.png"
                  />
                  <span className="block text-gray-500 font-semibold">
                    Upload an image
                  </span>
                </div>
              )}

              <input
                name="image"
                accept="image/*"
                className="absolute h-full w-full opacity-0 cursor-pointer z-10 "
                type="file"
                aria-label="Upload an image"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageUploader;
