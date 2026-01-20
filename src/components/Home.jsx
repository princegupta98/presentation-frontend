import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData();
    if (url) formData.append('website_url', url);
    if (file) formData.append('ppt_file', file);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate assets');
      }

      // NAVIGATE TO DASHBOARD WITH DATA
      navigate('/dashboard', { state: { results: data.data } });

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="card">
        <h1>AI Presentation & Marketing</h1>
        <p className="subtitle">Upload your assets to generate a campaign instantly.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Website URL</label>
            <input 
              type="url" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="form-group">
            <label>Presentation (PPTX)</label>
            <div className="file-input-wrapper">
              <input type="file" accept=".pptx" onChange={handleFileChange} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="generate-btn">
            {loading ? 'Generating Strategy...' : 'Generate Assets'}
          </button>
        </form>

        {error && <div className="error-msg">{error}</div>}
      </div>
    </div>
  );
}
export default Home;


// import { useState } from 'react';

// function Home() {
//   const [url, setUrl] = useState('');
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResult(null);

//     const formData = new FormData();
//     if (url) formData.append('website_url', url);
//     if (file) formData.append('ppt_file', file);

//     try {
//       const response = await fetch('http://localhost:5000/api/generate', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok || !data.success) {
//         throw new Error(data.error || 'Failed to generate assets');
//       }

//       setResult(data.data);
//     }
//     catch (err) {
//       console.error(err);
//       setError(err.message);
//     }
//     finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
//       <h1>AI Marketing Generator</h1>
      
//       <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
//         <div style={{ marginBottom: '1rem' }}>
//           <label><strong>Website URL:</strong></label><br/>
//           <input 
//             type="url" 
//             value={url} 
//             onChange={(e) => setUrl(e.target.value)} 
//             placeholder="https://example.com"
//             style={{ width: '100%', padding: '8px' }}
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label><strong>Upload PPTX:</strong></label><br/>
//           <input 
//             type="file" 
//             accept=".pptx" 
//             onChange={handleFileChange} 
//           />
//         </div>

//         <button type="submit" disabled={loading} style={{ padding: '10px 20px', fontSize: '16px' }}>
//           {loading ? 'Generating...' : 'Generate Assets'}
//         </button>
//       </form>

//       {error && <div style={{ color: 'red', marginBottom: '1rem' }}>Error: {error}</div>}

//       {result && (
//         <div className="results">
          
//           <div className="section">
//             <h2>📝 Marketing Brief</h2>
//             <p><strong>Product:</strong> {result.marketing_brief.product_or_service}</p>
//             <p><strong>Target Audience:</strong> {result.marketing_brief.target_audience}</p>
//           </div>

//           {/* <div className="section">
//             <h2>📧 Email Draft</h2>
//             <div style={{ background: '#f9f9f9', padding: '1rem', border: '1px solid #eee' }}>
//               <p><strong>Subject:</strong> {result.email.subject}</p>
//               <p style={{ whiteSpace: 'pre-wrap' }}>{result.email.body}</p>
//             </div>
//           </div> */}

//           <div className="section">
//             <h2>🖼️ Generated Images</h2>
//             {result.generated_images && result.generated_images.length > 0 ? (
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
//                 {result.generated_images.map((img, index) => (
//                   <div key={index} style={{ border: '1px solid #ddd', padding: '10px' }}>
//                     {/* Note: Adjust localhost port if different */}
//                     <img 
//                       src={`http://localhost:5000/${img.image_url}`} 
//                       alt={img.angle_name} 
//                       style={{ width: '100%', height: 'auto' }}
//                     />
//                     <p><strong>{img.angle_name}</strong></p>
//                     <small>{img.prompt}</small>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No images generated (check backend console).</p>
//             )}
//           </div>

//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;