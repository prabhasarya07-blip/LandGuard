import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Button } from './ui/button';
import { Bot, User, Send, FileText, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations?: Array<{ docName: string; page: number; extract: string }>;
}

export function DocumentChat({ propertyId: _propertyId }: { propertyId: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I have analyzed the newspaper notices and public records strictly indexed in our database for this property. I am restricted to answering based ONLY on these verified sources. What would you like to know?',
    },
    {
      id: '2',
      role: 'user',
      content: 'Does Suresh Reddy have a valid claim to this property based on the newspaper notices?',
    },
    {
      id: '3',
      role: 'assistant',
      content: 'Based strictly on the database records, Suresh Reddy\'s claim is highly contested and currently under litigation. \n\nAccording to a **Vijaya Karnataka** public notice from 2019, Suresh Reddy initially claimed ownership. However, a subsequent **Deccan Herald** notice in 2023 references an active court injunction (OS/2021/4523) freezing the property.\n\nTherefore, his active injunction prevents any safe transfer of the property until the claim is resolved in court.',
      citations: [
        { docName: 'Vijaya_Karnataka_Mar_2019_Pg7.pdf', page: 7, extract: '...Notice is hereby given that my client Sri Suresh Reddy claims absolute ownership of the property bearing Survey Number 145/2...' },
        { docName: 'Deccan_Herald_Jan_2023_Pg12.pdf', page: 12, extract: '...the Hon\'ble Court has issued an interim injunction restraining any transfer of property Survey No. 145/2 pending final disposal...' }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Mock RAG response delay
    setTimeout(() => {
      setIsTyping(false);
      const newAssistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Based on the most recent scan of the **Prajavani** newspaper database, there are no newer public notices or encumbrances reported for Survey No 145/2 after the August 2026 update. However, please note that unregistered agreements cannot be detected through newspaper scans alone.',
        citations: [
          { docName: 'Prajavani_Aug_2026_Database_Scan', page: 1, extract: '...Nil matches found for Survey No 145/2, Whitefield Village for the period 01-Jan-2026 to 25-Aug-2026...' }
        ]
      };
      setMessages(prev => [...prev, newAssistantMsg]);
    }, 2000);
  };

  return (
    <Card className="flex flex-col h-[600px] border-2 border-slate-200">
      <CardHeader className="border-b bg-slate-50 py-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          AI Database Intelligence (RAG)
        </CardTitle>
        <CardDescription className="flex items-center gap-2 mt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-emerald-700 font-medium">Strict Database Mode Active:</span> Answers are generated exclusively from verified newspaper notices and public records in our database.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-6 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-indigo-100 text-indigo-700'
            }`}>
              {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>
            
            <div className="space-y-2 w-full">
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                  : 'bg-slate-100 text-slate-800 rounded-tl-sm'
              }`}>
                {msg.content}
              </div>
              
              {/* Citations block for RAG */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Sources Retrieved
                  </div>
                  {msg.citations.map((cite, i) => (
                    <div key={i} className="bg-indigo-50/50 border border-indigo-100 rounded-lg p-3 text-xs">
                      <div className="font-semibold text-indigo-900 mb-1">{cite.docName} (Page {cite.page})</div>
                      <div className="italic text-slate-600 border-l-2 border-indigo-200 pl-2">"{cite.extract}"</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-slate-100 rounded-2xl rounded-tl-sm p-4 flex items-center gap-2 text-slate-500 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Querying newspaper database...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 border-t bg-slate-50">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative flex items-center"
        >
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about ownership, litigation, or encumbrances..." 
            className="w-full h-12 pl-4 pr-12 rounded-full border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={!inputValue.trim() || isTyping}
            className="absolute right-1 rounded-full bg-indigo-600 hover:bg-indigo-700 w-10 h-10"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
