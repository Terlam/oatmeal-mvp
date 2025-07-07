import React from "react";

const Custom404 = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white text-center p-8 transition-colors">
      <div className="max-w-lg w-full">
        <div className="mb-8">
          <img
            src="/oatmeal-void.gif"
            alt="Stirring oatmeal gif"
            className="rounded-lg shadow-lg mx-auto max-h-96"
          />
        </div>
        <h1 className="text-5xl font-extrabold mb-4">You’ve Fallen Into the Oatmeal</h1>
        <p className="text-xl mb-6">
          This isn’t the page you were looking for. You’ve stumbled into the breakfast void.
        </p>
        <a
          href="/"
          className="inline-block bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg text-lg hover:bg-yellow-400 dark:hover:bg-yellow-600 dark:bg-yellow-400 dark:text-gray-900 transition-colors"
        >
          🍽 Take Me Home
        </a>
      </div>
    </main>
  );
};

export default Custom404;