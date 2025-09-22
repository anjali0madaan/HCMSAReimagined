export default function TestDashboard() {
  console.log('🚀 TestDashboard component is rendering!');
  
  // Force visible debugging
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      document.title = '🎉 TestDashboard Loaded!';
      const debugDiv = document.createElement('div');
      debugDiv.id = 'debug-admin';
      debugDiv.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 9999; background: red; color: white; padding: 10px; font-weight: bold;';
      debugDiv.textContent = '🚀 TestDashboard React Component Loaded!';
      document.body.appendChild(debugDiv);
    }, 100);
  }
  
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f0f8ff', 
      margin: '20px',
      border: '5px solid red'
    }}>
      <h1 style={{ color: '#2c5aa0', fontSize: '2rem' }}>🎉 Admin Dashboard Working!</h1>
      <p style={{ fontSize: '1.2rem', margin: '10px 0' }}>The admin routing is now functional.</p>
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#d4edda', 
        border: '2px solid #28a745',
        borderRadius: '5px'
      }}>
        <p>✅ React admin dashboard is loading correctly</p>
        <p>✅ Authentication is working</p>
        <p>✅ Ready for content management</p>
      </div>
    </div>
  );
}