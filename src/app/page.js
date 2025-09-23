import Link from "next/link";

export const metadata = {
  title: "Bogdan's Driving School | Professional Driving Lessons in South London",
  description: "Learn to drive with confidence at Bogdan's Driving School. Professional driving instructor with 15+ years experience. Manual & automatic lessons, intensive courses, and test preparation. Book your lesson today!",
  keywords: "driving school, driving lessons, driving instructor, South London, manual driving lessons, automatic driving lessons, intensive driving course, driving test preparation, Bogdan driving school, professional driving instruction",
  openGraph: {
    title: "Bogdan's Driving School | Professional Driving Lessons",
    description: "Professional driving instruction with over 15 years of experience. Learn to drive with confidence in South London.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Driving lesson in progress with Bogdan's Driving School",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bogdan's Driving School | Professional Driving Lessons",
    description: "Learn to drive with confidence. Professional instruction with over 15 years of experience.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-100 to-yellow-400 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <img 
                  src="/home/cars.jpg" 
                  alt="Driving lesson in progress" 
                  className="rounded-lg shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </div>

            {/* Right Side - Text and CTA */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pass with Confidence.<br />
                <span className="text-red-600">Learn Smarter, Drive Better</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Driving made simple, safe, and effective.
              </p>
              <div className="space-y-4">
                <Link 
                  href="/book-slot" 
                  className="bg-red-600 hover:bg-red-800 text-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 inline-block text-lg px-8 py-4"
                >
                  Get lesson prices and book
                </Link>
                <p className="text-sm text-gray-600 italic">
        
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Driving Courses Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Driving Courses
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {[
              { name: "Automatic", icon: "M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" },
              { name: "Beginner", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { name: "Intensive", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
              { name: "Advanced", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
              { name: "Pass Plus", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" },
              { name: "Motorway", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" },
              { name: "Refresher", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }
            ].map((course, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-red-50 transition-colors">
                <div className="w-12 h-12 bg-red-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={course.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{course.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Reach out to us!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We are ready to answer your questions
              </p>
              <p className="text-sm text-gray-500 italic">
            
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <form className="space-y-6">
                {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <input
                  type="tel"
                  placeholder="Telephone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full btn-primary text-lg py-4"
                    onClick={() => window.location.href = "/contact"}
                >
                  REQUEST QUOTE
                </button>*/}
                <Link
                   href="/contact"
                   className="w-full btn-primary text-lg py-4 inline-block text-center"
                >
                  REQUEST QUOTE / SEND US A MESSAGE.
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12 underline">
            Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="/home/Oana-C.jpg"
                  alt="Oana C learner" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Oana C.</h4>
                  <p className="text-sm text-gray-600">1 martie 2019</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Best driving instructions for life- I recommend to all those who want to learn fast, clear and safe!"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bogdan's Driving School</span>
               {/* <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Like</button>
                  <button className="text-blue-600 hover:text-blue-800">Comment</button>
                  <button className="text-blue-600 hover:text-blue-800">Share</button>
                </div>*/}
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="/home/Arnold-C.jpg"
                  alt="Arnold W learner" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Arnold W</h4>
                  <p className="text-sm text-gray-600">7 decembrie 2017</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Highly recommended, best instructor ever! Thank you !"
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bogdan's Driving School</span>
               {/* <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800">Like</button>
                  <button className="text-blue-600 hover:text-blue-800">Comment</button>
                  <button className="text-blue-600 hover:text-blue-800">Share</button>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Quote Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           {/*} <div>
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Instructor and student in car" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>*/}
             <div>
              <img 
                src="/home/instructor-and-student-in-the-car.jpg"  
                alt="Instructor and student in car" 
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>

            <div className="text-center lg:text-left">
              <blockquote className="text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed">
                "Confidence, skills, and a smile exactly what every learner needs."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}