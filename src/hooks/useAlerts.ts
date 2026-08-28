import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DEMO_ALERTS } from '../mock/demoData';
import { useProperties } from './useProperties';

export interface Alert {
  id: string;
  property_id: string;
  dispute_id: string;
  dispute_type: string;
  risk_level: string;
  date: string;
  source: string;
  source_page: number;
  verification_status: string;
  read: boolean;
  created_at: string;
}

export function useAlerts() {
  const { user } = useAuth();
  const { properties } = useProperties();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    if (!user || properties.length === 0) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const propertyIds = properties.map(p => p.id);
      
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .in('property_id', propertyIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const userAlerts = data || [];
      const combinedAlerts = [...userAlerts, ...DEMO_ALERTS];
      setAlerts(combinedAlerts as any[]);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [user, properties]);

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const markRead = async (id: string) => {
    await supabase.from('alerts').update({ read: true }).eq('id', id);
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  return { alerts, loading, markRead, refresh: fetchAlerts };
}
