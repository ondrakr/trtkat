export type BlogSection = { heading?: string; paragraphs: string[] };
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          id: string;
          slug: string;
          status: 'draft' | 'published';
          date_published: string;
          date_modified: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          status?: 'draft' | 'published';
          date_published: string;
          date_modified?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          status?: 'draft' | 'published';
          date_published?: string;
          date_modified?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_post_translations: {
        Row: {
          id: string;
          post_id: string;
          locale: 'cs' | 'en';
          title: string;
          excerpt: string;
          meta_description: string;
          sections: BlogSection[];
        };
        Insert: {
          id?: string;
          post_id: string;
          locale: 'cs' | 'en';
          title: string;
          excerpt: string;
          meta_description: string;
          sections?: BlogSection[];
        };
        Update: {
          id?: string;
          post_id?: string;
          locale?: 'cs' | 'en';
          title?: string;
          excerpt?: string;
          meta_description?: string;
          sections?: BlogSection[];
        };
        Relationships: [
          {
            foreignKeyName: 'blog_post_translations_post_id_fkey';
            columns: ['post_id'];
            isOneToOne: false;
            referencedRelation: 'blog_posts';
            referencedColumns: ['id'];
          },
        ];
      };
      waitlist_subscribers: {
        Row: {
          id: string;
          email: string;
          source: string;
          page: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          source?: string;
          page?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          source?: string;
          page?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      cookie_consents: {
        Row: {
          id: string;
          visitor_id: string;
          analytics: boolean;
          marketing: boolean;
          necessary: boolean;
          user_agent: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          visitor_id: string;
          analytics?: boolean;
          marketing?: boolean;
          necessary?: boolean;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          visitor_id?: string;
          analytics?: boolean;
          marketing?: boolean;
          necessary?: boolean;
          user_agent?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          role: 'user' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: 'user' | 'admin';
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
