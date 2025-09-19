import ContactForm from "@/components/contact/ContactForm";

export const metadata = {
  title: "Contact Us - Bogdan's Driving School | Get in Touch",
  description: "Contact Bogdan's Driving School for driving lessons, bookings, and inquiries. Professional driving instruction in South London. Call 07747 531404 or email bogdancirsan23@gmail.com",
  keywords: "contact driving school, driving lessons inquiry, book driving lesson, South London driving instructor, driving school contact, Bogdan driving school contact",
  openGraph: {
    title: "Contact Us - Bogdan's Driving School",
    description: "Get in touch with Bogdan's Driving School for professional driving instruction and lesson bookings.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              CONTACT
            </h1>
            <p className="text-xl text-gray-700">
              Write us to find more information about the driving class
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column - Information */}
            <div className="space-y-8">
              {/* Instructor Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bogdan</h2>
                <p className="text-xl text-gray-700 mb-4">Driving Instructor</p>
                <p className="text-gray-600">Email address</p>
              </div>

              {/* LinkedIn Community Section */}
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  JOIN OUR TECH COMMUNITY TO FIND OUT MORE ABOUT WORK
                </h3>
                <div className="flex justify-center">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-20 h-20 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors duration-200"
                  >
                    <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
