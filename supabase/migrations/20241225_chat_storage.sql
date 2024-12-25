-- Enable storage for file uploads
insert into storage.buckets (id, name, public) values ('chat-files', 'chat-files', true);
insert into storage.buckets (id, name, public) values ('chat-audio', 'chat-audio', true);

-- Create policy to allow authenticated users to upload files
create policy "Allow authenticated users to upload files"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id in ('chat-files', 'chat-audio') and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create policy to allow authenticated users to read their own files
create policy "Allow users to read their own files"
  on storage.objects for select
  to authenticated
  using (
    bucket_id in ('chat-files', 'chat-audio') and
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Create table for chat sessions with message history
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null default 'New Chat',
  messages jsonb[] not null default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS on chat_sessions
alter table public.chat_sessions enable row level security;

-- Create policy to allow users to read their own chat sessions
create policy "Users can read own chat sessions"
  on public.chat_sessions for select
  to authenticated
  using (user_id = auth.uid());

-- Create policy to allow users to insert their own chat sessions
create policy "Users can create own chat sessions"
  on public.chat_sessions for insert
  to authenticated
  with check (user_id = auth.uid());

-- Create policy to allow users to update their own chat sessions
create policy "Users can update own chat sessions"
  on public.chat_sessions for update
  to authenticated
  using (user_id = auth.uid());

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Trigger to automatically update updated_at
create trigger handle_chat_sessions_updated_at
  before update on public.chat_sessions
  for each row
  execute function public.handle_updated_at();
