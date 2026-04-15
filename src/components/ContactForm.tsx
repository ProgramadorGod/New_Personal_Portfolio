import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    const formElement = e.currentTarget;

    try {
      // Usamos tus credenciales reales
      await emailjs.sendForm(
        'service_q2epcq7', 
        'template_8bljf6p', 
        formElement,
        '4p6GA98zCTp6HUyRQ'
      );

      setStatus('success');
      formElement.reset(); // Limpieza del estado del objeto
      
    } catch (error) {
      console.error("[CRITICAL_FAILURE]:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 border-t border-border/30">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header Visual estilo C# / Terminal */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-primary/20 to-primary/50" />
          <h2 className="text-xl font-mono uppercase tracking-widest text-primary">Contact.Init()</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-primary/20 to-primary/50" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 font-mono">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-muted-foreground">User_Name</label>
              <input 
                required
                name="name" // Debe coincidir con {{name}} en tu template
                type="text" 
                placeholder="e.g. John Doe"
                className="w-full bg-secondary/20 border border-border/50 p-3 focus:border-primary/50 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase text-muted-foreground">User_Email</label>
              <input 
                required
                name="email" // Debe coincidir con {{email}} en tu template
                type="email" 
                placeholder="email@example.com"
                className="w-full bg-secondary/20 border border-border/50 p-3 focus:border-primary/50 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase text-muted-foreground">Payload_Message</label>
            <textarea 
              required
              name="message" // Debe coincidir con {{message}} en tu template
              rows={5}
              placeholder="Write your message here..."
              className="w-full bg-secondary/20 border border-border/50 p-3 focus:border-primary/50 outline-none transition-all text-sm resize-none"
            />
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full group relative overflow-hidden border border-primary/50 py-4 transition-all hover:bg-primary/5 disabled:opacity-50"
          >
            <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative text-xs uppercase tracking-widest font-bold">
              {isSubmitting ? "Executing_Send..." : "Execute_Transmission"}
            </span>
          </button>

          {/* Feedback de Sistema */}
          {status === 'success' && (
            <p className="text-[10px] text-primary text-center animate-pulse">
              [SUCCESS] Message transmitted successfully to luis.dev0519@gmail.com
            </p>
          )}

          {status === 'error' && (
            <p className="text-[10px] text-red-500 text-center uppercase">
              [ERROR] Handshake failed. Connection unstable.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};