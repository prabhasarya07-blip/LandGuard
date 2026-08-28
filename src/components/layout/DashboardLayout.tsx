import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { LayoutDashboard, Building, Bell, Search, FileText, Newspaper, Upload } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Properties', href: '/properties', icon: Building },
    { name: 'Disputes', href: '/disputes', icon: FileText },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Sources', href: '/sources', icon: Newspaper },
    { name: 'Documents', href: '/documents', icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/dashboard" className="text-xl font-bold tracking-tight">LandGuard</Link>
        </div>
        <div className="flex-1 py-4 overflow-y-auto">
          <nav className="space-y-1 px-3">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${isActive ? 'text-primary' : 'text-slate-400 group-hover:text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t">
          <div className="px-3 py-2 text-sm truncate text-slate-500 mb-2">{user?.email}</div>
          <Button variant="outline" size="sm" className="w-full" onClick={() => signOut()}>Sign Out</Button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search survey number, village, dispute..."
                className="w-full h-9 rounded-lg border-0 bg-slate-100 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition-colors" />
            </div>
          </div>
          <Link to="/alerts">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-slate-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
          </Link>
        </header>
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
