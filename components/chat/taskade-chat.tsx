'use client';

import { useEffect } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    TaskadeEmbed: {
      AgentPublicChatPopup: {
        init: (config: { publicAgentId: string }) => void;
      };
    };
  }
}

export function TaskadeChat() {
  useEffect(() => {
    // Initialize Taskade chat after the script is loaded
    const initChat = () => {
      if (window.TaskadeEmbed) {
        window.TaskadeEmbed.AgentPublicChatPopup.init({
          publicAgentId: '01JFP5XB8SSD0RCVA5C813JBSS',
        });
      }
    };

    // Try to initialize if the script is already loaded
    initChat();

    // Add a global callback for when the script loads
    window.TaskadeEmbedLoaded = initChat;
  }, []);

  return (
    <>
      <Script
        src="https://assets.taskade.com/embeds/latest/embed.iife.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Call the initialization function when the script loads
          if (window.TaskadeEmbed) {
            window.TaskadeEmbed.AgentPublicChatPopup.init({
              publicAgentId: '01JFP5XB8SSD0RCVA5C813JBSS',
            });
          }
        }}
      />
    </>
  );
}
