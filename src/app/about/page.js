
import Link from "next/link";
import ReadMoreSection from "../../components/readMore/ReadMore";


export const metadata = {
 
  title: "About Bogdan - Professional Driving Instructor | Bogdan's Driving School",
  description: "Meet Bogdan Crisan, your experienced driving instructor with over 15 years of teaching experience. Specialized in teaching people with disabilities, patient approach, and 5-level lesson structure. Based in South London.",
  keywords: "driving instructor, Bogdan Crisan, driving teacher, South London, professional driving instruction, driving lessons, experienced instructor, patient teacher, disability driving lessons",
  openGraph: {
    title: "About Bogdan - Professional Driving Instructor",
    description: "Meet your experienced driving instructor with over 15 years of teaching experience. Patient, professional, and specialized instruction.",
    type: "website",
  },
};

export default function About() {
   
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-red-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Meet Bogdan Crisan, your dedicated driving instructor with over 15 years of experience
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Your Trusted Driving Instructor
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                  I'm Bogdan Crisan, a fully qualified driving instructor with over 15 years of experience, 
                  based in South London. My mission is to help learners gain confidence and skills for 
                  <strong className="text-red-600"> safe driving for life</strong>.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  My background as a P.E. teacher in Romania taught me patience and adaptable teaching methods 
                  that I bring to every driving lesson. I understand that learning to drive can be challenging, 
                  and I'm here to support you every step of the way.
                </p>
              </div>

              {/* Specialized Training */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Specialized Training & Support
                </h3>
                <p className="text-lg text-gray-700 mb-4">
                  I have completed specialist courses, including <strong>"Teaching People With Disabilities To Drive"</strong>, 
                  and I tailor lessons for individual comfort and support. Every student is unique, and I adapt my 
                  teaching style to meet your specific needs.
                </p>
                <p className="text-lg text-gray-700">
                  My calm and patient teaching approach acknowledges the challenge of driving a 1500kg machine in London. 
                  I take full responsibility for the learning experience and strive to create a positive environment 
                  where mistakes are seen as learning opportunities.
                </p>
                <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReadMoreSection/>
        </div>
      </section>
              </div>

              {/* Lesson Structure */}
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  5-Level Lesson Structure
                </h3>
                <div className="space-y-3">
                  {[
                    "Lesson Introduced",
                    "Under Full Instruction", 
                    "Prompted",
                    "Seldom Prompted",
                    "Independent"
                  ].map((level, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{level}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-600 mt-4 italic">
                  This structure is adaptable to each learner's experience and progress.
                </p>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="space-y-8">
              {/* Main Portrait */}
              <div className="text-center">
                <img 
                  src="/about/squere%20size%20image.jpg" 
                  alt="Bogdan Crisan - Driving Instructor" 
                  className="w-80 h-80 object-cover rounded-lg shadow-lg mx-auto"
                />
              
                <p className="text-gray-600 mt-4 italic">Bogdan Crisan - Your Driving Instructor</p>
              </div>

              {/* Lesson Photo */}
              <div className="text-center">
                <img 
                  src="/about/BogdanandRobBeckett.png" 
                  alt="Bogdan and Rob Beckett" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <p className="text-gray-600 mt-2 italic">Patient instruction in action</p>
              </div>

              <div className="text-center">
                <img 
                  src="/london.png" 
                  alt="Driving lesson in progress" 
                  className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
                <p className="text-gray-600 mt-2 italic">Patient instruction in action</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What My Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center mb-4">
                <img 
                    src="/about/testimonialAlex.jpg"
                  alt="Student testimonial" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Alex P.</h4>
                  <p className="text-sm text-gray-600">Passed First Time</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "As a nervous learner, I never thought I'd pass first time. Bogdan proved me wrong! 
                His patience and encouragement made all the difference."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center mb-4">
                <img 
                  src="about/ElenaC.jpg" 
                  alt="Student testimonial" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Elena C.</h4>
                  <p className="text-sm text-gray-600">Confident Driver</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Thanks to Bogdan, I feel confident driving on my own now! His structured approach 
                and calm teaching style really worked for me."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Services I Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Motorway Lessons", description: "Highway driving confidence" },
              { name: "Pass Plus", description: "Advanced driving skills" },
              { name: "Refresher Lessons", description: "Get back behind the wheel" },
              { name: "Taxi Driver Training", description: "Professional driving skills" },
              { name: "Beginner Lessons", description: "From zero to confident" },
              { name: "Taster Lessons", description: "Try before you commit" },
              { name: "Private Practice", description: "Recommended for beginners" },
              { name: "Flexible Scheduling", description: "Lessons that fit your life" }
            ].map((service, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                <div className="w-12 h-12 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            CONFIDENCE STARTS HERE
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Ready to begin your driving journey? Contact me for any lesson type. 
            I'm flexible and will work with you to arrange lessons at a time that suits you.
          </p>
          <Link 
            href="/book-slot" 
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
          >
            Get Lesson Prices and Book
          </Link>
          <p className="text-red-200 text-sm mt-4 italic">

          </p>
        </div>
      </section>

      {/* Student Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
         
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { src: "about//students/student1.jpg", name: "Frase D.", comment: "Passed first time!" },
            { src: "about/students/student2.jpg", name: "Diana S.", comment: "Great instructor." },
            { src: "about/students/student3.jpg", name: "George B.", comment: "I feel so confident now." },
            { src: "about/students/student4.jpg", name: "Rachel T.", comment: "Best lessons ever!" },
            { src: "about/students/student5.jpg", name: "Daisys R.", comment: "Very professional approach." },
            { src: "about/students/student6.jpg", name: "Tony L.", comment: "Highly recommend!" }
          ].map((student, index) => (
            <div key={index} className="bg-gray-200 rounded-lg overflow-hidden flex flex-col">
              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={student.src}
                    alt={`${student.name} - successful student passing driving licence`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Comment section */}
              <div className="p-2 text-center bg-white">
                <p className="font-semibold text-gray-900">{student.name}</p>
                <p className="text-sm text-gray-600">{student.comment}</p>
              </div>
            </div>
          ))}
        </div>

          <p className="text-center text-gray-600 mt-8 italic">
            Over 15 years of helping students achieve their driving goals
          </p>
        </div>
      </section>
    </div>
  );
}
