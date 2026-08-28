import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DEMO_DISPUTES } from '../mock/demoData';
import { Dispute } from './usePropertyIntelligence';
import { useProperties } from './useProperties';

export function useDisputes() {
  const { user } = useAuth();
  const { properties } = useProperties();
  const [disputes, setDisputes] = useState<Dispute[]>(DEMO_DISPUTES as any[]);
  const [loading, setLoading] = useState(true);

  const fetchDisputes = useCallback(async () => {
    if (!user || properties.length === 0) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const propertyIds = properties.map(p => p.id);
      
      const { data, error } = await supabase
        .from('disputes')
        .select('*')
        .in('property_id', propertyIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const userDisputes = data || [];
      const combinedDisputes = [...userDisputes, ...DEMO_DISPUTES];
      setDisputes(combinedDisputes as any[]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, properties]);

  useEffect(() => {
    fetchDisputes();
  }, [fetchDisputes]);

  return { disputes, loading, refresh: fetchDisputes };
}
