/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

export default function App() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hotmart Widget Loader
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.hotmart.com/lib/hotmart-checkout-elements.js';
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.checkoutElements) {
        // @ts-ignore
        window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="font-sans bg-[#0a0e17] text-[#ffffff] min-h-screen selection:bg-[#10b981] selection:text-white">
      {/* HEADER FIXO (TIMER) */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex justify-center items-center px-4 py-3 backdrop-blur-md border-b transition-colors duration-500 shadow-lg ${timeLeft <= 60 ? 'bg-[#fee2e2] border-red-200' : 'bg-[#0a0e17]/95 border-[#ef4444]/20'}`}>
        <div className="flex items-center gap-3 md:gap-4">
          <span className={`text-[clamp(14px,3.5vw,18px)] font-bold uppercase tracking-wide ${timeLeft <= 60 ? 'text-red-700' : 'text-white'}`}>
            Esta oferta acaba em:
          </span>
          <span className={`text-[clamp(24px,6vw,32px)] font-black tabular-nums leading-none ${timeLeft <= 60 ? 'text-red-700' : 'text-[#ef4444]'}`}>
            {timeLeft <= 0 ? 'ACABOU!' : formatTime(timeLeft)}
          </span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 pb-12 px-5 overflow-hidden">
        {/* VIDEO BG + OVERLAY */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0e17]/70 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070&auto=format&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-bartender-making-a-cocktail-2644/1080p.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(36px,8vw,96px)] font-black text-white leading-[1.1] text-center mb-8"
          >
            As Tuas 200 Receitas + TÉCNICAS DE BARTENDER = COCKTAILS 5 ESTRELAS!
          </motion.h1>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[clamp(20px,5vw,40px)] text-[#d1d5db] text-center mb-12 max-w-3xl font-medium"
          >
            10 Videoaulas COMPLETAS que transformam receitas comuns em drinks PROFISSIONAIS
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#1f2937] p-8 rounded-2xl w-full max-w-[400px] text-center shadow-2xl border border-white/5"
          >
            <div className="line-through text-[clamp(28px,6vw,48px)] text-[#9ca3af] mb-2 font-medium">
              €97
            </div>
            <div className="text-[clamp(36px,7vw,48px)] text-[#f59e0b] font-black mb-2 leading-none">
              SÓ €27
            </div>
            <div className="text-[clamp(16px,3vw,18px)] text-[#10b981] font-bold uppercase tracking-wide">
              (Única vez para ti!)
            </div>
          </motion.div>
        </div>
      </section>

      {/* SEÇÃO BENEFÍCIOS */}
      <section className="bg-[#111827] py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(28px,6vw,44px)] text-white text-center mb-6 font-bold leading-tight"
          >
            Ter 200 receitas <span className="text-[#ef4444] underline decoration-[#ef4444]/30">NÃO SERVE DE NADA</span> se não dominares a técnica.
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(18px,4vw,22px)] text-[#d1d5db] text-center mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Um drink mal batido, no copo errado ou com o gelo incorreto estraga qualquer receita. O <strong className="text-[#10b981]">Treinamento Cocktails Perfeitos</strong> é o passo a passo prático em vídeo para garantires resultados de barman profissional:
          </motion.p>

          <div className="grid gap-6 bg-[#0a0e17]/50 p-6 sm:p-8 rounded-2xl border border-white/5">
            {[
              "Aula 1: Equipamentos de Bar – O que realmente precisas (e o que é desperdício).",
              "Aula 2: Cristaleria – O copo certo para cada drink (muda o sabor e o visual).",
              "Aula 3: Bebidas Essenciais – Como montar o teu bar em casa sem gastar fortunas.",
              "Aula 4: Xarope de Açúcar PRO – O segredo dos bares para não sobrar açúcar no fundo.",
              "Aula 5: Drinks Batidos – A técnica de shaker para gelar e misturar perfeitamente.",
              "Aula 6: Drinks Mexidos – O \"stir\" perfeito para gelar sem aguar o teu cocktail.",
              "Aula 7: Coquetéis Montados – A arte de construir o drink direto no copo.",
              "Aula 8: O Autêntico Mojito – Técnicas de maceração para extrair o melhor sabor.",
              "Aula 9: Drinks Liquidificados – A textura cremosa de barman (ex: Piña Colada).",
              "Aula 10: O Negroni Perfeito – A masterclass definitiva do clássico italiano."
            ].map((text, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 items-start text-[clamp(16px,3vw,18px)] text-[#d1d5db]"
              >
                <span className="text-[#10b981] text-2xl shrink-0 leading-none mt-0.5">✅</span>
                <span className="leading-snug">
                  <strong className="text-white">{text.split(' – ')[0]}</strong> – {text.split(' – ')[1]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO PROVA SOCIAL */}
      <section className="bg-[#0a0e17] py-20 px-5">
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img 
              src="https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=1000&auto=format&fit=crop" 
              alt="Vídeos reais Cocktail Channel" 
              className="w-full max-w-[400px] aspect-video object-cover border-2 border-[#374151] rounded-xl mx-auto shadow-xl"
            />
          </motion.div>
          
          <div className="text-center md:text-left">
            <motion.h4 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-[clamp(24px,5vw,28px)] font-bold mb-8 leading-tight"
            >
              Vídeos REAIS que vais ter acesso imediato!
            </motion.h4>
            
            <div className="flex flex-col gap-4 items-center md:items-start">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#1f2937] p-6 rounded-xl w-full max-w-[400px] text-left border border-white/5"
              >
                <p className="text-[#d1d5db] text-[clamp(16px,3vw,18px)] mb-3 italic">
                  "Minhas receitas do Manual ficaram PERFEITAS!"
                </p>
                <p className="text-[#10b981] font-bold m-0 flex justify-between items-center">
                  <span>– Miguel, Lisboa</span>
                  <span className="text-[#f59e0b] tracking-widest">★★★★★</span>
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-[#1f2937] p-6 rounded-xl w-full max-w-[400px] text-left border border-white/5"
              >
                <p className="text-[#d1d5db] text-[clamp(16px,3vw,18px)] mb-3 italic">
                  "Caipirinhas agora parecem de hotel 5*!"
                </p>
                <p className="text-[#10b981] font-bold m-0 flex justify-between items-center">
                  <span>– Ana, Porto</span>
                  <span className="text-[#f59e0b] tracking-widest">★★★★★</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO CTA FINAL */}
      <section className="bg-[#111827] py-20 px-5">
        <div className="max-w-[600px] mx-auto text-center">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(32px,6vw,44px)] text-white font-black mb-8"
          >
            ⏰ DECIDE AGORA!
          </motion.h3>
          
          {/* GARANTIA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#10b981] text-white p-6 rounded-xl mb-8 text-left shadow-lg"
          >
            <h4 className="m-0 mb-3 text-[clamp(18px,4vw,20px)] font-bold flex items-center gap-2">
              <span className="text-2xl">✅</span> GARANTIA TOTAL:
            </h4>
            <div className="text-[clamp(16px,3vw,18px)] leading-relaxed font-medium">
              • Garantia 15 dias total<br/>
              • Acesso imediato via Hotmart<br/>
              • 1-Click (sem formulários!)
            </div>
          </motion.div>

          {/* WIDGET HOTMART */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 w-full"
          >
            <div id="hotmart-sales-funnel"></div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER P.S. */}
      <footer className="bg-[#111827] py-12 px-5 border-t border-white/5">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-[clamp(18px,4vw,24px)] text-[#d1d5db] italic leading-relaxed">
            P.S.: Receitas sem técnica = drinks amadores. <br/>
            Técnica sem receitas = inútil. <br/>
            <strong className="text-[#10b981] font-bold not-italic block mt-2">Juntos = IMPRESSIONANTE!</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
