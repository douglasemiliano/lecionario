import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.SUPABASE_URL,
      environment.SUPABASE_KEY,
      { auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: localStorage, // ou sessionStorage
      },
      global: {
        // workaround opcional para problemas de lock
        fetch: (...args) => fetch(...args),
      },
    });
  }

  insertLectionary(entry: any) {
    return this.supabase.from('lecionario').insert([entry]);
  }

  async getLectionary() {
    return this.supabase.from('lecionario').select('*').eq("ano_liturgico", "C");
  }

  getLecionarioPorAnoLiturgico(ano_liturgico: string){
    return this.supabase.from('lecionario').select('*').eq("ano_liturgico", ano_liturgico).order('dia', { ascending: true });
  }

  async getTodos() {
    const { data: lecionario, error } = await this.supabase
      .from('lecionario')
      .select('*')
    return { lecionario, error };
  }

  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }

  getSession() {
    return this.supabase.auth.getSession();
  }

  onAuthChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(_event, session);
    });
  }

  getUser() {
    return this.supabase.auth.getUser().then(({ data }) => data.user);
  }

  updateLectionary(id: number, entry: any) {
    return this.supabase
      .from('lecionario')
      .update(entry)
      .eq('id', id);
  }  

  deleteLectionary(id: string) {
    return this.supabase
      .from('lecionario')
      .delete()
      .eq('id', id);
  }
  

}
