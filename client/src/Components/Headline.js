
import React from "react";

const Headline = () => {
  return (
    <section className="bg-white pt-4 py-[5px] dark:bg-dark">
      <div className="mx-auto px-4 sm:container">
      <div className="flex flex-col items-center text-left mb-6">
  <h1 className="mb-2 text-3xl font-bold text-dark dark:text-white flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="orange"
      style={{ width: '35px', height: '35px', marginRight: '8px' }}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
      />
    </svg>
    Text Translate
  </h1>
  <h5 className="font-medium text-gray-600 dark:text-gray-400 text-center">
    Translate your text from one language to another with ease.
  </h5>
</div>

      </div>
    </section>
  );
};

export default Headline;
