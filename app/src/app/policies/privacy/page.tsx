// src/app/privacy-policy/page.tsx
import React from 'react';
import { Metadata } from 'next'; // Para metadados da página

// --- Metadados da Página (para SEO e aba do navegador) ---
export const metadata: Metadata = {
    title: 'Política de Privacidade - Pung Game',
    description: 'Política de privacidade do Pung Game: como coletamos, usamos e protegemos seus dados.',
    keywords: ['política de privacidade', 'privacidade', 'dados', 'Pung Game', 'jogo'],
    // opcional: robots: { index: true, follow: true },
};

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg my-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Política de Privacidade do Pung Game</h1>
            <p className="text-gray-600 text-sm mb-8 text-center">Última atualização: 17 de junho de 2025</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introdução</h2>
                <p className="text-gray-700 leading-relaxed">
                    Bem-vindo ao Pung Game. A sua privacidade é de extrema importância para nós. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nosso jogo Pung Game (&quot;Serviço&quot;). Ao usar nosso Serviço, você concorda com as práticas descritas nesta política.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Informações que Coletamos</h2>
                <p className="text-gray-700 leading-relaxed mb-2">Podemos coletar as seguintes categorias de informações:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li className="mb-1">
                        <strong>Informações de Cadastro:</strong> Quando você cria uma conta, podemos coletar seu nickname, endereço de e-mail, ID de provedor externo (e.g., Google ID, GitHub ID), e URL da imagem de perfil (avatar).
                    </li>
                    <li className="mb-1">
                        <strong>Dados de Jogo:</strong> Informações sobre seu progresso no jogo, pontuações, tempo de jogo, partidas jogadas e outros dados de jogabilidade.
                    </li>
                    <li className="mb-1">
                        <strong>Dados Técnicos e de Uso:</strong> Informações sobre seu dispositivo (tipo de dispositivo, sistema operacional), endereço IP, tipo de navegador, logs de acesso, e como você interage com o Serviço.
                    </li>
                    <li className="mb-1">
                        <strong>Comunicações:</strong> Registros de suas comunicações conosco (e.g., suporte ao cliente).
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Como Usamos Suas Informações</h2>
                <p className="text-gray-700 leading-relaxed mb-2">Usamos as informações coletadas para:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li className="mb-1">Operar, manter e aprimorar o Serviço.</li>
                    <li className="mb-1">Personalizar sua experiência de jogo e fornecer funcionalidades.</li>
                    <li className="mb-1">Monitorar e analisar tendências, uso e atividades em conexão com nosso Serviço.</li>
                    <li className="mb-1">Processar transações e enviar notificações relacionadas ao Serviço.</li>
                    <li className="mb-1">Responder a seus comentários, perguntas e fornecer suporte ao cliente.</li>
                    <li className="mb-1">Garantir a segurança e integridade do Serviço, incluindo a prevenção de fraudes.</li>
                    <li className="mb-1">Cumprir obrigações legais.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Compartilhamento de Informações</h2>
                <p className="text-gray-700 leading-relaxed mb-2">Não vendemos suas informações pessoais.</p>
                <p className="text-gray-700 leading-relaxed mb-2">Podemos compartilhar informações nas seguintes circunstâncias:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li className="mb-1">
                        <strong>Com Provedores de Serviço:</strong> Com terceiros que prestam serviços em nosso nome (e.g., hospedagem, análise de dados, suporte ao cliente), que estão contratualmente obrigados a proteger suas informações.
                    </li>
                    <li className="mb-1">
                        <strong>Para Cumprimento da Lei:</strong> Se exigido por lei ou em resposta a processos legais válidos (ordens judiciais, intimações).
                    </li>
                    <li className="mb-1">
                        <strong>Transferências de Negócios:</strong> Em conexão com qualquer fusão, venda de ativos da empresa, financiamento ou aquisição de toda ou parte de nosso negócio por outra empresa.
                    </li>
                    <li className="mb-1">
                        <strong>Com Seu Consentimento:</strong> Podemos divulgar suas informações pessoais para qualquer outro propósito com seu consentimento.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Seus Direitos de Privacidade (LGPD/GDPR)</h2>
                <p className="text-gray-700 leading-relaxed mb-2">De acordo com a Lei Geral de Proteção de Dados (LGPD) ou o Regulamento Geral sobre a Proteção de Dados (GDPR), você tem o direito de:</p>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li className="mb-1">Acessar suas informações pessoais.</li>
                    <li className="mb-1">Corrigir informações imprecisas ou incompletas.</li>
                    <li className="mb-1">Solicitar a exclusão de suas informações pessoais.</li>
                    <li className="mb-1">Restringir ou se opor ao processamento de suas informações.</li>
                    <li className="mb-1">Solicitar a portabilidade dos dados.</li>
                    <li className="mb-1">Retirar o consentimento a qualquer momento.</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-2">Para exercer esses direitos, entre em contato conosco através das informações fornecidas na Seção 7.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Segurança dos Dados</h2>
                <p className="text-gray-700 leading-relaxed">
                    Tomamos medidas razoáveis, incluindo medidas administrativas, técnicas e físicas, para proteger suas informações contra perda, roubo, uso indevido e acesso não autorizado, divulgação, alteração e destruição. No entanto, nenhum sistema de segurança é impenetrável.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Contato</h2>
                <p className="text-gray-700 leading-relaxed">
                    Se você tiver alguma dúvida sobre esta Política de Privacidade ou sobre nossas práticas de dados, entre em contato conosco em:
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    E-mail: <a href="mailto:suporte@punggame.com" className="text-blue-600 hover:underline">suporte@punggame.com</a>
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Alterações a Esta Política de Privacidade</h2>
                <p className="text-gray-700 leading-relaxed">
                    Podemos atualizar nossa Política de Privacidade periodicamente. Publicaremos a nova Política de Privacidade nesta página e indicaremos a data da &quot;Última atualização&quot;. Aconselhamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;