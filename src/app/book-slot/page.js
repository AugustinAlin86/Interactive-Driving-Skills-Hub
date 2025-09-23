import UserBooking from "@/components/calendar/UserBooking";

export const metadata = {
  title: "Book Your Driving Lesson - Bogdan's Driving School | Online Booking",
  description: "Book your driving lesson online with Bogdan's Driving School. Choose your preferred date and time. Professional driving instruction from £65 for 90-minute lessons. Easy online booking system.",
  keywords: "book driving lesson, online booking, driving lesson booking, driving school booking, lesson scheduling, driving instructor booking, South London driving lessons",
  openGraph: {
    title: "Book Your Driving Lesson - Bogdan's Driving School",
    description: "Book your driving lesson online. Professional instruction from £65 for 90-minute lessons.",
    type: "website",
  },
};

export default function BookSlotPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-red-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Book Your Lesson
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Before committing to a full course, book your trial lesson to experience our teaching style and see if it’s the right fit for you.
              Choose your preferred date and time for your driving lesson. 
              All lessons are 90 minutes and start from £65.
            </p>
          </div>
        </div>
      </section>

      {/* Main Booking Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <UserBooking />
          </div>
        </div>
      </section>

      {/* Pricing Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Lesson Pricing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Trial Lesson</h3>
                <div className="text-3xl font-bold text-red-600 mb-2">£65</div>
                <p className="text-gray-600">90-minute lesson</p>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  <li>• Professional instruction</li>
                  <li>• Modern training vehicle</li>
                  <li>• Pick-up and drop-off</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-2 border-red-600">
                <div className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full inline-block mb-4">
                  POPULAR
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Intensive Course</h3>
                <div className="text-3xl font-bold text-red-600 mb-2">£400</div>
                <p className="text-gray-600">5 lessons package</p>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  <li>• Save £25 compared to individual lessons</li>
                  <li>• Flexible scheduling</li>
                  <li>• Progress tracking</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Test Preparation</h3>
                <div className="text-3xl font-bold text-red-600 mb-2">£70</div>
                <p className="text-gray-600">90-minute lesson</p>
                <ul className="mt-4 text-sm text-gray-600 space-y-2">
                  <li>• Mock test practice</li>
                  <li>• Test route familiarization</li>
                  <li>• Confidence building</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-lg text-gray-700">
                <strong>Prices start from £65 for a 90-minute lesson.</strong> 
                Please contact us for a personalised quote based on your specific needs.
              </p>
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
            Book your first lesson today and take the first step towards getting your driving license.
          </p>
          <a 
            href="#booking" 
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200 inline-block"
          >
            Book Now
          </a>
        </div>
      </section>
    </div>
  );
}
