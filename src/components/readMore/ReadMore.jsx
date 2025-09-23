"use client";
import { useState } from "react";

export default function ReadMoreSection() {
  const [showMore, setShowMore] = useState(false);

  return (
     <div>
      {showMore && (
        <p className="text-lg text-gray-700 mt-4">
          I welcome learners who would like to try a taster lesson, even if they already have another instructor.
For beginners, I recommend private practice in addition to professional tuition. If your instructor is unavailable or you simply want to try a few lessons with someone else, I encourage learners to explore different teaching styles for the best experience.
My lessons are based around local test centre areas, so learners become familiar with the roads and conditions they will encounter. For mock tests, I select the most challenging routes within these test centres, so that candidates find the actual test easier and know exactly what to expect.
I am based within 15 minutes of two test centres and within 30 minutes of another two.
Do not hesitate to contact me for any type of lesson listed — I am confident I can help learners of all levels achieve their goals.
Do not hesitate to contact me for any type of lesson listed, I am positive I can offer help to all types of learners.

        </p>
      )}

      <button
        onClick={() => setShowMore(!showMore)}
        className="mt-4 text-red-600 hover:text-red-800 font-semibold"
      >
        {showMore ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}