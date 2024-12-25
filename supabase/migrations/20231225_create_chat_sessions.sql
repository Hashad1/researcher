-- Create chat_sessions table
create table if not exists public.chat_sessions (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    messages jsonb[] default array[]::jsonb[] not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.chat_sessions enable row level security;

-- Create policies
create policy "Users can view their own chat sessions"
    on public.chat_sessions for select
    using (auth.uid() = user_id);

create policy "Users can create their own chat sessions"
    on public.chat_sessions for insert
    with check (auth.uid() = user_id);

create policy "Users can update their own chat sessions"
    on public.chat_sessions for update
    using (auth.uid() = user_id);

create policy "Users can delete their own chat sessions"
    on public.chat_sessions for delete
    using (auth.uid() = user_id);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$;

create trigger handle_chat_sessions_updated_at
    before update on public.chat_sessions
    for each row
    execute function public.handle_updated_at();
