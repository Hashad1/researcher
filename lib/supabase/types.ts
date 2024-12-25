export type Profile = {
  id: string;
  full_name: string;
  created_at: string;
  updated_at: string;
};

export type ResearchProject = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

export type ChatSession = {
  id: string;
  user_id: string;
  project_id: string | null;
  title: string;
  created_at: string;
  updated_at: string;
  last_message_at: string;
};

export type ChatMessage = {
  id: string;
  session_id: string;
  user_id: string;
  content: string;
  role: 'user' | 'assistant';
  created_at: string;
};