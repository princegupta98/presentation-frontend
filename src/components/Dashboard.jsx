import { useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, FileText, Mail, Image as ImageIcon, Zap } from 'lucide-react';

// Reusable Collapsible Component
const CollapsibleSection = ({ title, icon: Icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="collapsible-card">
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="header-left">
          {Icon && <Icon size={20} className="icon" />}
          <h3>{title}</h3>
        </div>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

export default function Dashboard() {
  const location = useLocation();
  const { results } = location.state || {};

  // If user tries to access /dashboard directly without data, redirect to Home
  if (!results) {
    return <Navigate to="/" />;
  }

  const { marketing_brief, email, ad_image_prompts, generated_images } = results;

  return (
    <div className="dashboard-container">
      {/* LEFT PANEL (Empty for other dev) */}
      <div className="left-panel">
        <div className="placeholder-content">
          <h2>Left Panel</h2>
          <p>Reserved for future functionality.</p>
        </div>
      </div>

      {/* RIGHT PANEL (Generated Content) */}
      <div className="right-panel">
        <div className="results-wrapper">
          <h2>🎉 Generated Strategy</h2>

          {/* 1. Marketing Brief */}
          <CollapsibleSection title="Strategy Brief" icon={Zap} defaultOpen={true}>
            <div className="brief-grid">
              <p><strong>Product:</strong> {marketing_brief.product_or_service}</p>
              <p><strong>Audience:</strong> {marketing_brief.target_audience}</p>
              <p><strong>Value Prop:</strong> {marketing_brief.value_proposition}</p>
              <p><strong>Tone:</strong> {marketing_brief.tone_of_voice}</p>
              <div className="tag-list">
                <strong>Key Benefits:</strong>
                <ul>
                  {marketing_brief.key_benefits.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          </CollapsibleSection>

          {/* 2. Email Draft */}
          <CollapsibleSection title="Email Draft" icon={Mail}>
            <div className="email-preview">
              <p className="email-subject"><strong>Subject:</strong> {email.subject}</p>
              <hr />
              <div className="email-body">{email.body}</div>
            </div>
          </CollapsibleSection>

          {/* 3. Image Prompts (Text Only) */}
          <CollapsibleSection title="Image Prompts" icon={FileText}>
            <div className="prompts-list">
              {ad_image_prompts.prompts.map((item, idx) => (
                <div key={idx} className="prompt-item">
                  <span className="angle-badge">{item.angle_name}</span>
                  <p>{item.prompt}</p>
                </div>
              ))}
            </div>
          </CollapsibleSection>

          {/* 4. Generated Images (Only show if images exist) */}
          {generated_images && (
            <CollapsibleSection title="Creative Assets" icon={ImageIcon}>
              <div className="image-grid">
                {generated_images.map((img, idx) => (
                  <div key={idx} className="image-card">
                    <img
                      src={`http://localhost:5000/static/${img.image_url}`}
                      alt={img.angle_name}
                    />
                    <p>{img.angle_name}</p>
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          )}

        </div>
      </div>
    </div>
  );
};
