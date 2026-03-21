export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          image_url: string | null;
          origin: string | null;
          size: string | null;
          room_type: string | null;
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          image_url?: string | null;
          origin?: string | null;
          size?: string | null;
          room_type?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          image_url?: string | null;
          origin?: string | null;
          size?: string | null;
          room_type?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
