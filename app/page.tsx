/**
 * @fileoverview Main landing page for the Magic Banner Plugin
 * @module app/page
 */

import Link from 'next/link';

/**
 * Home page component
 * @function Home
 * @returns {JSX.Element} The main landing page with feature highlights and usage instructions
 * @description Renders the main landing page with sections for features, usage instructions, and a call-to-action
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🎯 Magic Banner Plugin
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Plugin completo para criação e gerenciamento de banners dinâmicos com agendamento, analytics e script embutível.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/admin" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Painel Admin
            </Link>
            <a 
              href="#como-usar" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Como Usar
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fácil Integração</h3>
            <p className="text-gray-600">Adicione uma linha de código e pronto! Compatível com qualquer site.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Analytics Integrado</h3>
            <p className="text-gray-600">Contador automático de visualizações e métricas em tempo real.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl mb-4">⏰</div>
            <h3 className="text-xl font-semibold mb-2">Agendamento</h3>
            <p className="text-gray-600">Configure datas de início e fim para campanhas automáticas.</p>
          </div>
        </div>

        {/* Como Usar */}
        <div id="como-usar" className="bg-white rounded-2xl p-8 shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Como Usar</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">1. Adicione o Script</h3>
              <div className="bg-gray-100 p-4 rounded-lg">
                <code className="text-sm">
                  &lt;script src=&quot;https://futuriza-challenge.vercel.app/magic-banner.js&quot;&gt;&lt;/script&gt;
                </code>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">2. Gerencie no Admin</h3>
              <p className="text-gray-600 mb-4">Acesse o painel administrativo para criar e gerenciar seus banners.</p>
              <Link 
                href="/admin" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Acessar Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Demo */}
        <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Veja em Ação</h2>
          <p className="text-lg mb-6 opacity-90">
            Este site usa o próprio Magic Banner! Crie um banner no admin para ver funcionando.
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/api/health" 
              target="_blank"
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              API Status
            </a>
            <a 
              href="/magic-banner.js" 
              target="_blank"
              className="bg-white/20 text-white px-6 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors"
            >
              Ver Script
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            Desenvolvido para o desafio Futuriza • 
            <a href="https://github.com" className="text-blue-400 hover:text-blue-300">GitHub</a>
          </p>
        </div>
      </footer>
    </main>
  );
}
