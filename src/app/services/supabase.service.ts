import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {

    console.log(environment.SUPABASE_KEY, environment.SUPABASE_KEY)
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
    return this.supabase.from('lecionario').select('*').eq("ano_liturgico", ano_liturgico);
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

  onAuthStateChange(callback: Function) {
    this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session);
    });
  }

  getUser() {
    return this.supabase.auth.getUser().then(({ data }) => data.user);
  }
  

}
