"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-4">
              <Link href="/">
                <img src="/logo.png" alt="Bogdan's Driving School" className="h-12 w-auto hover:opacity-80 transition-opacity duration-200" />
              </Link>
              {/* <div>
                <h3 className="text-xl font-bold text-gray-900">BOGDAN'S</h3>
                <p className="text-gray-700 font-serif">Driving School</p>
              </div> */}
            </div>
            <p className="text-gray-600 text-sm max-w-md">
              Professional driving instruction with a focus on safety, confidence, and success. 
              Your journey to becoming a confident driver starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-0.5">
              <li>
                <Link href="/"  className="text-gray-600 hover:text-red-600 transition-colors">
                Home
                </Link>
                </li>
                <li>
                <Link href="/about" className=" text-gray-600 hover:text-red-600 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/quizzes" className="text-gray-600 hover:text-red-600 transition-colors">
                  Quiz
                </Link>
              </li>
              <li>
                <Link href="/book-slot" className="text-gray-600 hover:text-red-600 transition-colors">
                  Book a slot
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-red-600 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/usefulLinks" className="text-gray-600 hover:text-red-600 transition-colors">
                  Useful Links
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact & Social</h4>
            <div className="space-y-3">
              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/bogdaninstructor" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a><a 
                  href="https://www.dailymotion.com/video/x8w77ry?start=1950" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-200 text-white rounded-full flex items-center justify-center transition-colors"
                >
                  <img 
                    src="footer/dailymotion.svg" 
                    alt="Dailymotion" 
                    className="w-4 h-4"
                  />
                </a>



                
              </div>
              
           
              <div className="space-y-2">
  {/* Phone */}
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+447747531404" className="text-sm hover:text-blue-600">
                  +44 7747 531404
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a href="mailto:bogdancrisan23@gmail.com" className="text-sm hover:text-blue-600">
                  bogdancirsan23@gmail.com
                </a>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>

     
          <div className="bg-gray-900 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-sm space-y-1 sm:space-y-0 sm:flex sm:justify-center sm:space-x-2">
          <p>
            Copyright  {new Date().getFullYear()} Bogdan's Driving School | All Rights Reserved
          </p>
          <p>
            | <a href="/privacy" className="hover:underline text-gray-300">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>

    </footer>
  );
}
