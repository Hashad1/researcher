import React from 'react';

interface EmbedCodeComponentProps {
  embedUrl: string;
  title: string;
}

const EmbedCodeComponent: React.FC<EmbedCodeComponentProps> = ({ embedUrl, title }) => {
  return (
    <div className="embed-container">
      <iframe
        src={embedUrl}
        title={title}
        frameBorder="0"
        allowFullScreen
        className="embed-iframe"
      ></iframe>
    </div>
  );
};

export default EmbedCodeComponent;
