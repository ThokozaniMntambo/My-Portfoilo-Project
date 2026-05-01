import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'How do I contact Thokozani?',
  'What are his skills?',
  'Is he available for hire?',
  'What projects has he built?',
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! 👋 I'm Thokozani's AI assistant. Ask me anything about his skills, experience, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
      setHasNew(false);
    }
  }, [open]);

  const sendMessage = async (text: string) => {
    const userText = text.trim();
    if (!userText || streaming) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);

    // Add empty assistant message to stream into
    setMessages((m) => [...m, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Server error' }));
        setMessages((m) => {
          const updated = [...m];
          updated[updated.length - 1] = {
            role: 'assistant',
            content: err.error || 'Something went wrong. Please try again.',
          };
          return updated;
        });
        setStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.error) {
              setMessages((m) => {
                const updated = [...m];
                updated[updated.length - 1] = { role: 'assistant', content: parsed.error };
                return updated;
              });
              break;
            }
            if (parsed.text) {
              setMessages((m) => {
                const updated = [...m];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: updated[updated.length - 1].content + parsed.text,
                };
                return updated;
              });
            }
          } catch {}
        }
      }

      if (!open) setHasNew(true);
    } catch {
      setMessages((m) => {
        const updated = [...m];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, I couldn't connect to the server. Please try again.",
        };
        return updated;
      });
    } finally {
      setStreaming(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '5.5rem',
              right: '1.5rem',
              zIndex: 999,
              width: 'min(380px, calc(100vw - 2rem))',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07)',
              display: 'flex',
              flexDirection: 'column',
              background: '#0d1117',
              maxHeight: '70vh',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(135deg, rgba(0,212,255,0.12), rgba(124,58,237,0.12))',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              flexShrink: 0,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={20} color="#fff" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#f0f6ff' }}>
                  TM Assistant
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Online</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, borderRadius: 6, transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f0f6ff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '1rem',
              display: 'flex', flexDirection: 'column', gap: '0.75rem',
              scrollbarWidth: 'thin',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: '0.5rem',
                    alignItems: 'flex-end',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: msg.role === 'assistant'
                      ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
                      : 'linear-gradient(135deg, #7c3aed, #00d4ff)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {msg.role === 'assistant'
                      ? <Bot size={14} color="#fff" />
                      : <User size={14} color="#fff" />}
                  </div>

                  {/* Bubble */}
                  <div style={{
                    maxWidth: '78%',
                    padding: '0.6rem 0.9rem',
                    borderRadius: msg.role === 'user'
                      ? '14px 4px 14px 14px'
                      : '4px 14px 14px 14px',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
                      : 'rgba(255,255,255,0.06)',
                    border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    fontSize: '0.85rem',
                    color: '#f0f6ff',
                    lineHeight: 1.6,
                    wordBreak: 'break-word',
                  }}>
                    {msg.content}
                    {/* Typing cursor for last streaming message */}
                    {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                      <span style={{
                        display: 'inline-block', width: 2, height: '0.9em',
                        background: '#00d4ff', marginLeft: 2, verticalAlign: 'middle',
                        animation: 'blink 1s step-end infinite',
                      }} />
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Loading dots (only before first streaming char) */}
              {streaming && messages[messages.length - 1]?.content === '' && (
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Bot size={14} color="#fff" />
                  </div>
                  <div style={{
                    padding: '0.6rem 0.9rem', borderRadius: '4px 14px 14px 14px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', gap: '0.3rem', alignItems: 'center',
                  }}>
                    {[0, 1, 2].map((i) => (
                      <div key={i} style={{
                        width: 6, height: 6, borderRadius: '50%', background: '#00d4ff',
                        animation: `bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                      }} />
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions (only on first message) */}
            {messages.length === 1 && (
              <div style={{
                padding: '0 1rem 0.75rem',
                display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
                flexShrink: 0,
              }}>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      padding: '0.3rem 0.7rem',
                      borderRadius: 100,
                      border: '1px solid rgba(0,212,255,0.25)',
                      background: 'rgba(0,212,255,0.06)',
                      color: '#00d4ff',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontFamily: 'Inter, sans-serif',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,212,255,0.14)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,212,255,0.06)'; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex', gap: '0.6rem', padding: '0.75rem 1rem',
                borderTop: '1px solid rgba(255,255,255,0.07)',
                flexShrink: 0,
                background: 'rgba(0,0,0,0.3)',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                disabled={streaming}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 10,
                  padding: '0.55rem 0.9rem',
                  color: '#f0f6ff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'border-color 0.2s',
                  opacity: streaming ? 0.6 : 1,
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(0,212,255,0.4)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                style={{
                  width: 38, height: 38, borderRadius: 10, border: 'none',
                  background: input.trim() && !streaming
                    ? 'linear-gradient(135deg, #00d4ff, #7c3aed)'
                    : 'rgba(255,255,255,0.08)',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: input.trim() && !streaming ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s', flexShrink: 0,
                }}
              >
                {streaming ? <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={15} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 1000,
          width: 56, height: 56,
          borderRadius: '50%',
          border: 'none',
          background: open
            ? 'rgba(255,255,255,0.1)'
            : 'linear-gradient(135deg, #00d4ff, #7c3aed)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 30px rgba(0,212,255,0.4)',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={22} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* New message notification dot */}
        {hasNew && !open && (
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 14, height: 14, borderRadius: '50%',
            background: '#f87171', border: '2px solid var(--bg-primary)',
          }} />
        )}
      </motion.button>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-5px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
