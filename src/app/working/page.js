export default function WorkingPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
          ✅ Bogdan's Driving School - WORKING!
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tailwind CSS Test</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-600 text-white p-4 rounded-lg text-center">
              <h3 className="font-bold">Red Header</h3>
              <p className="text-sm">Professional branding</p>
            </div>
            <div className="bg-yellow-400 text-gray-900 p-4 rounded-lg text-center">
              <h3 className="font-bold">Yellow Hero</h3>
              <p className="text-sm">Call to action</p>
            </div>
            <div className="bg-gray-200 text-gray-900 p-4 rounded-lg text-center">
              <h3 className="font-bold">Course Cards</h3>
              <p className="text-sm">Service offerings</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-yellow-400 p-6 rounded-lg text-white text-center">
            <h3 className="text-xl font-bold mb-2">Pass with Confidence</h3>
            <p className="mb-4">Learn Smarter, Drive Better</p>
            <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            🎉 Tailwind CSS is working perfectly!
          </p>
          <div className="space-x-4">
            <a href="/" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Go to Homepage
            </a>
            <a href="/simple" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View Simple Version
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
