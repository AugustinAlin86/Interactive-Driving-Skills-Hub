export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Test Page</h1>
      <p className="text-lg text-gray-700">This is a simple test page to check if Tailwind CSS is working.</p>
      <div className="mt-8 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Tailwind Test</h2>
        <div className="flex space-x-4">
          <div className="w-16 h-16 bg-red-600 rounded-full"></div>
          <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
          <div className="w-16 h-16 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
