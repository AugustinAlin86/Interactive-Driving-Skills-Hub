import Link from "next/link";

export default function UsefulLinksPage() {
  const usefulLinks = [
    {
      title: "The Highway Code Online",
      description: "Official UK Highway Code - essential reading for all drivers",
      url: "https://www.gov.uk/guidance/the-highway-code",
      category: "Official Resources"
    },
    {
      title: "Theory Test Explained",
      description: "What You Need to Know About Theory Test",
      url: "https://www.theorytestexplained.co.uk/dvsa-cpr-questions-explained/",
      category: "Testing"
    },
     {
      title: "Know Your Traffic signs",
      description: "Road traffic signage in Great Britain",
      url: "https://www.gov.uk/government/publications/know-your-traffic-signs?utm_source=gov.uk&utm_medium=website&utm_campaign=car-theory-test/",
      category: "Testing"
    },
    {
      title: "DVSA Theory Test Practice",
      description: "Practice your theory test with official DVSA questions",
      url: "https://www.gov.uk/theory-test",
      category: "Testing"
    },
    {
      title: "Book Your Theory Test",
      description: "Official DVSA booking system for theory tests",
      url: "https://www.gov.uk/book-theory-test",
      category: "Testing"
    },
    {
      title: "Book Your Practical Test",
      description: "Official DVSA booking system for practical driving tests",
      url: "https://www.gov.uk/book-driving-test",
      category: "Testing"
    },
    {
      title: "Driving Test Routes",
      description: "Find information about test routes in your area",
      url: "https://www.gov.uk/driving-test-routes",
      category: "Test Preparation"
    },
    {
      title: "Driving Test Fees",
      description: "Current fees for theory and practical driving tests",
      url: "https://www.gov.uk/driving-test-fees",
      category: "Information"
    },
    {
      title: "Driving Licence Application",
      description: "Apply for your first provisional driving licence",
      url: "https://www.gov.uk/apply-first-provisional-driving-licence",
      category: "Licensing"
    },
    {
      title: "Driving Test Standards",
      description: "Understanding what examiners look for during your test",
      url: "https://www.gov.uk/driving-test-standards",
      category: "Test Preparation"
    },
    {
      title: "Road Safety Tips",
      description: "Essential safety information for new drivers",
      url: "https://www.gov.uk/road-safety",
      category: "Safety"
    },
    {
      title: "Vehicle Insurance Guide",
      description: "Understanding car insurance for new drivers",
      url: "https://www.gov.uk/vehicle-insurance",
      category: "Insurance"
    }
  ];

  const categories = [...new Set(usefulLinks.map(link => link.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Useful Links
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We've gathered a few helpful resources below to help you through this journey
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {categories.map((category, categoryIndex) => (
              <div key={category} className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
                  {category}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {usefulLinks
                    .filter(link => link.category === category)
                    .map((link, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        {/* Chain Link Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </div>
                          <p className="text-xs text-center text-gray-600 mt-1 font-medium">Useful Links</p>
                        </div>
                        
                        {/* Link Content */}
                        <div className="flex-1">
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                          >
                            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2">
                              {link.title}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {link.description}
                            </p>
                            <div className="mt-2 flex items-center text-red-600 text-sm font-medium group-hover:text-red-700">
                              <span>Visit Link</span>
                              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Additional Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Study Materials</h3>
                <p className="text-gray-600">
                  Download official DVSA study guides and practice materials to prepare for your tests.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Test Preparation</h3>
                <p className="text-gray-600">
                  Access mock tests and practice questions to build confidence before your actual test.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="w-16 h-16 bg-red-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Support & Help</h3>
                <p className="text-gray-600">
                  Get help with your driving journey from official DVSA support channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Driving Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Use these resources to prepare, then book your first lesson with us.
          </p>
          <div className="space-x-4">
            <Link 
              href="/book-slot" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
            >
              Book a Lesson
            </Link>
            <Link 
              href="/contact" 
              className="bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}