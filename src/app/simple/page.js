export default function SimplePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#dc2626', fontSize: '32px', marginBottom: '20px' }}>
        Bogdan's Driving School
      </h1>
      
      <div style={{ 
        background: 'linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)', 
        padding: '40px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '10px' }}>
          Pass with Confidence. Learn Smarter, Drive Better
        </h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>
          Driving made simple, safe, and effective.
        </p>
        <button style={{
          backgroundColor: '#fbbf24',
          color: '#111827',
          padding: '12px 24px',
          borderRadius: '6px',
          border: 'none',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Get lesson prices and book
        </button>
      </div>

      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ fontSize: '20px', marginBottom: '15px' }}>Our Driving Courses</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px' }}>
          {['Automatic', 'Beginner', 'Intensive', 'Advanced', 'Pass Plus', 'Motorway', 'Refresher'].map((course, index) => (
            <div key={index} style={{
              textAlign: 'center',
              padding: '15px',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#dc2626',
                borderRadius: '50%',
                margin: '0 auto 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px'
              }}>
                L
              </div>
              <div style={{ fontWeight: '600', color: '#111827' }}>{course}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
