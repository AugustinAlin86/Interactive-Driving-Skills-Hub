export default function SimpleLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        {/* Simple Header */}
        <header style={{ 
          backgroundColor: '#dc2626', 
          color: 'white', 
          padding: '10px 20px',
          marginBottom: '20px'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ margin: 0, fontSize: '24px' }}>BOGDAN'S</h1>
              <p style={{ margin: 0, fontSize: '16px' }}>Driving School</p>
            </div>
            <nav style={{ display: 'flex', gap: '20px' }}>
              <a href="/" style={{ color: 'white', textDecoration: 'none' }}>About</a>
              <a href="/quizzes" style={{ color: 'white', textDecoration: 'none' }}>Quiz</a>
              <a href="/calendar" style={{ color: 'white', textDecoration: 'none' }}>Book a slot</a>
              <a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a>
            </nav>
          </div>
        </header>
        
        <main>
          {children}
        </main>
        
        {/* Simple Footer */}
        <footer style={{ 
          backgroundColor: '#374151', 
          color: 'white', 
          padding: '20px',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>Copyright 2017 - 2025 Bogdan's Driving School | All Rights Reserved</p>
        </footer>
      </body>
    </html>
  );
}
