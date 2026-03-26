'use client';
import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'bot';
  content: string;
  source?: string | null;
  sourceTopic?: string;
  related?: Array<{ topic: string; url: string | null }>;
  cta?: { label: string; url: string } | null;
}

const SUGGESTIONS = [
  'Quel est le SMIC 2026 ?',
  'Comment calculer le brut en net ?',
  "C'est quoi la réduction Fillon ?",
  'Comment créer un bulletin de paie ?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', content: "👋 Bonjour ! Je suis l'assistant **Bulletin Facile**. Posez-moi vos questions sur la paie, les cotisations, le SMIC, les congés payés…" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [open, messages]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: q }]);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      const msg: Message = {
        role: 'bot',
        content: data.answer || "Désolé, je n'ai pas pu trouver de réponse.",
        source: data.source,
        sourceTopic: data.sourceTopic,
        related: data.related,
        cta: data.cta || null,
      };
      setMessages(prev => [...prev, msg]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMessages(prev => [...prev, { role: 'bot', content: 'Erreur de connexion. Réessayez.' }]);
    }
    setLoading(false);
  }

  function renderText(text: string) {
    // Basic markdown: **bold**
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Assistant paie"
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          width: 58, height: 58, borderRadius: '50%',
          background: 'linear-gradient(135deg,#1a3a8f,#2563eb)',
          border: 'none', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(26,58,143,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, color: 'white', transition: 'transform 0.2s',
        }}
      >
        {open ? '✕' : '💬'}
        {unread > 0 && !open && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            background: '#dc2626', color: 'white',
            width: 20, height: 20, borderRadius: '50%',
            fontSize: 11, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{unread}</span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 92, right: 24, zIndex: 9998,
          width: 'min(380px, calc(100vw - 48px))',
          height: 'min(520px, calc(100vh - 120px))',
          background: 'white', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden', fontFamily: 'Inter, Arial, sans-serif',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#1a3a8f,#2563eb)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🤖</div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14 }}>Assistant Bulletin Facile</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Paie · Cotisations · Droit social</div>
            </div>
            <div style={{ marginLeft: 'auto', width: 8, height: 8, borderRadius: '50%', background: '#4ade80' }} />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '14px 14px 8px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  background: m.role === 'user' ? '#1a3a8f' : '#f1f5f9',
                  color: m.role === 'user' ? 'white' : '#1e293b',
                  borderRadius: m.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  padding: '10px 13px', fontSize: 13.5, lineHeight: 1.55,
                }}>
                  <span dangerouslySetInnerHTML={{ __html: renderText(m.content) }} />
                  {m.cta && (
                    <div style={{ marginTop: 8 }}>
                      <a href={m.cta.url} target="_blank" rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          background: 'linear-gradient(135deg,#1a3a8f,#2563eb)',
                          color: 'white', fontSize: 12, fontWeight: 700,
                          padding: '7px 13px', borderRadius: 10,
                          textDecoration: 'none', letterSpacing: 0.2,
                        }}>
                        {m.cta.label}
                      </a>
                    </div>
                  )}
                  {m.source && (
                    <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                      <a href={m.source} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', fontSize: 11, textDecoration: 'none', fontWeight: 600 }}>
                        📖 Voir l&apos;article complet →
                      </a>
                    </div>
                  )}
                  {m.related && m.related.length > 0 && (
                    <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                      {m.related.map((r, j) => r.url ? (
                        <a key={j} href={r.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, background: '#e0e7ff', color: '#3730a3', padding: '2px 7px', borderRadius: 10, textDecoration: 'none' }}>
                          {r.topic}
                        </a>
                      ) : null)}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 5, padding: '8px 12px', background: '#f1f5f9', borderRadius: '18px 18px 18px 4px', width: 'fit-content' }}>
                {[0,1,2].map(i => (
                  <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#94a3b8', animation: `bounce 1.2s ${i*0.2}s infinite` }} />
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only at start) */}
          {messages.length === 1 && (
            <div style={{ padding: '0 12px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {SUGGESTIONS.map((s, i) => (
                <button key={i} onClick={() => send(s)}
                  style={{ fontSize: 11, background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: 10, padding: '4px 10px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '10px 12px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Votre question sur la paie…"
              style={{ flex: 1, padding: '9px 13px', borderRadius: 10, border: '1.5px solid #e2e8f0', fontSize: 13, outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={() => send(input)} disabled={loading || !input.trim()}
              style={{ width: 38, height: 38, borderRadius: 10, background: '#1a3a8f', border: 'none', cursor: 'pointer', color: 'white', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: (!input.trim() || loading) ? 0.5 : 1 }}>
              →
            </button>
          </div>

          <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
        </div>
      )}
    </>
  );
}
