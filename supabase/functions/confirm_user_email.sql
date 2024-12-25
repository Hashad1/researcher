-- Create a function to confirm user's email
create or replace function public.confirm_user_email(user_email text)
returns void
language plpgsql
security definer
as $$
begin
  -- Update the user's email_confirmed status
  update auth.users
  set email_confirmed_at = now(),
      updated_at = now()
  where email = user_email;
end;
$$;
