import { supabase } from './client';

export async function signUp(whatsapp: string, password: string, fullName: string) {
  // Convert WhatsApp to a valid email format
  const email = `user.${whatsapp.replace(/[^0-9]/g, '')}@fateenai.com`;
  
  try {
    // First try to sign up with metadata
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          whatsapp: whatsapp,
        }
      }
    });

    if (signUpError) throw signUpError;

    // If signup successful, try to sign in immediately
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    return { data: signInData, error: null };
  } catch (error) {
    console.error('Signup error:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error("حدث خطأ في التسجيل") 
    };
  }
}

export async function signIn(whatsapp: string, password: string) {
  // Convert WhatsApp to a valid email format
  const email = `user.${whatsapp.replace(/[^0-9]/g, '')}@fateenai.com`;
  
  try {
    // Try to sign in
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      throw new Error("رقم الواتساب أو كلمة المرور غير صحيحة");
    }

    // Update user metadata if it's missing
    if (signInData?.user && (!signInData.user.user_metadata?.whatsapp || !signInData.user.user_metadata?.full_name)) {
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          whatsapp: whatsapp,
          // We don't have fullName here, but at least set the WhatsApp
          full_name: signInData.user.user_metadata?.full_name || whatsapp
        }
      });

      if (updateError) {
        console.error('Error updating user metadata:', updateError);
      }
    }

    return { data: signInData, error: null };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      data: null, 
      error: error instanceof Error ? error : new Error("حدث خطأ في تسجيل الدخول") 
    };
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}