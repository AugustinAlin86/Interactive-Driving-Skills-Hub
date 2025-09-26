import GlobalBadge from "@/components/authentication/GlobalBadge";
import Header from "@/components/design/header/Header";
import Footer from "@/components/design/footer/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "Bogdan's Driving School | Professional Driving Lessons in South London",
    template: "%s | Bogdan's Driving School"
  },
  description: "Professional driving instruction with over 15 years of experience. Learn to drive with confidence at Bogdan's Driving School. Manual & automatic lessons, intensive courses, and test preparation in South London.",
  keywords: "driving school, driving lessons, driving instructor, South London, manual driving lessons, automatic driving lessons, intensive driving course, driving test preparation, Bogdan driving school, professional driving instruction",
  authors: [{ name: "Bogdan Crisan" }],
  creator: "Bogdan's Driving School",
  publisher: "Bogdan's Driving School",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://bogdansdrivingschool.com",
    siteName: "Bogdan's Driving School",
    title: "Bogdan's Driving School | Professional Driving Lessons",
    description: "Professional driving instruction with over 15 years of experience. Learn to drive with confidence in South London.",
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
    images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"],
  },
  verification: {
    google: "your-google-verification-code", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
    
      </body>
    </html>
  );
}
