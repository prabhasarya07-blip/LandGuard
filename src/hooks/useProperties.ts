import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Property {
  id: string;
  user_id: string;
  property_name: string | null;
  survey_number: string;
  khasra_number: string | null;
  village: string;
  taluk: string;
  district: string;
  state: string;
  property_type: string | null;
  area: string | null;
  owner_name: string | null;
  latitude: number | null;
  longitude: number | null;
  monitoring_status: string;
  created_at: string;
  updated_at: string;
}

export function useProperties() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const addProperty = async (property: Omit<Property, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error("Must be logged in to add a property");
    
    const { data, error } = await supabase
      .from('properties')
      .insert([{ ...property, user_id: user.id }])
      .select()
      .single();

    if (error) throw error;
    setProperties(prev => [data, ...prev]);
    return data;
  };

  const deleteProperty = async (id: string) => {
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) throw error;
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return {
    properties,
    loading,
    error,
    addProperty,
    deleteProperty,
    refresh: fetchProperties
  };
}
