import { useState, useRef } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { DEMO_DOCUMENTS } from '../mock/demoData';
import { Upload, FileText, CheckCircle2, Loader2 } from 'lucide-react';

const STATUS_STYLES: Record<string, string> = {
  'COMPLETED': 'bg-emerald-100 text-emerald-700',
  'PROCESSING': 'bg-blue-100 text-blue-700',
  'PENDING': 'bg-amber-100 text-amber-700',
  'FAILED': 'bg-destructive/10 text-destructive',
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(DEMO_DOCUMENTS);
  const [uploading, setUploading] = useState(false);
  const [uploadStage, setUploadStage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (file: File) => {
    setUploading(true);
    const stages = ['Document received', 'Checking for duplicates...', 'OCR processing...', 'Land-dispute analysis...', 'Property matching...', 'Complete'];
    let i = 0;
    const interval = setInterval(() => {
      setUploadStage(stages[i]);
      i++;
      if (i >= stages.length) {
        clearInterval(interval);
        setDocuments(prev => [{
          id: `doc-new-${Date.now()}`,
          filename: file.name,
          file_type: file.name.split('.').pop()?.toUpperCase() || 'PDF',
          file_size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          upload_timestamp: new Date().toISOString(),
          uploaded_by: 'client-upload',
          sha256: Math.random().toString(36).substring(7) + '...',
          processing_status: 'COMPLETED',
          pages: 1,
        }, ...prev]);
        setTimeout(() => { setUploading(false); setUploadStage(''); }, 500);
      }
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(file.type)) {
        alert('Only PDF, JPG, JPEG, and PNG files are supported.');
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        alert('File size must be under 20 MB.');
        return;
      }
      simulateUpload(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Documents</h2>
            <p className="text-muted-foreground">Upload newspaper PDFs or images for processing.</p>
          </div>
          <div>
            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
            <Button onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              <Upload className="mr-2 h-4 w-4" /> Upload Document
            </Button>
          </div>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <Card className="border-primary">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <div>
                  <div className="font-semibold text-sm">Processing Document...</div>
                  <div className="text-sm text-muted-foreground mt-1">{uploadStage}</div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {['Document received', 'Checking for duplicates...', 'OCR processing...', 'Land-dispute analysis...', 'Property matching...', 'Complete'].map((stage, i) => {
                  const stages = ['Document received', 'Checking for duplicates...', 'OCR processing...', 'Land-dispute analysis...', 'Property matching...', 'Complete'];
                  const currentIdx = stages.indexOf(uploadStage);
                  const done = i < currentIdx;
                  const active = i === currentIdx;
                  return (
                    <div key={stage} className={`flex items-center gap-2 text-sm ${done ? 'text-emerald-600' : active ? 'text-primary font-medium' : 'text-slate-300'}`}>
                      {done ? <CheckCircle2 className="h-4 w-4" /> : active ? <Loader2 className="h-4 w-4 animate-spin" /> : <div className="w-4 h-4 rounded-full border border-slate-200" />}
                      {stage}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Document List */}
        <div className="grid gap-3">
          {documents.map(doc => (
            <Card key={doc.id}>
              <CardContent className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex gap-3 items-center">
                  <FileText className="h-8 w-8 text-slate-400 shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{doc.filename}</div>
                    <div className="text-xs text-muted-foreground">
                      {doc.file_type} • {doc.file_size} • {doc.pages} page(s) • Uploaded {new Date(doc.upload_timestamp).toLocaleDateString('en-IN')}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 font-mono">SHA-256: {doc.sha256}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{doc.uploaded_by}</span>
                  <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${STATUS_STYLES[doc.processing_status] || 'bg-slate-100 text-slate-500'}`}>
                    {doc.processing_status}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
