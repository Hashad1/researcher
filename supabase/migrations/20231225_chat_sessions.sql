-- Create chat_sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    messages JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Add RLS policies
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

-- Allow users to view their own chat sessions
CREATE POLICY "Users can view their own chat sessions"
    ON chat_sessions
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to create their own chat sessions
CREATE POLICY "Users can create their own chat sessions"
    ON chat_sessions
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own chat sessions
CREATE POLICY "Users can update their own chat sessions"
    ON chat_sessions
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS chat_sessions_user_id_idx ON chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS chat_sessions_created_at_idx ON chat_sessions(created_at);

-- Add function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to automatically update updated_at
CREATE TRIGGER update_chat_sessions_updated_at
    BEFORE UPDATE ON chat_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
