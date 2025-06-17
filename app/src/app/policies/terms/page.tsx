// src/app/terms-of-service/page.tsx
import React from 'react';
import { Metadata } from 'next'; // Para metadados da página

// --- Metadados da Página (para SEO e aba do navegador) ---
export const metadata: Metadata = {
    title: 'Termos de Uso - Pung Game',
    description: 'Termos e condições de uso do Pung Game.',
    keywords: ['termos de uso', 'termos de serviço', 'regras', 'Pung Game', 'jogo'],
    // opcional: robots: { index: true, follow: true },
};

const TermsOfServicePage: React.FC = () => {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white shadow-lg rounded-lg my-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">Termos de Uso do Pung Game</h1>
            <p className="text-gray-600 text-sm mb-8 text-center">Última atualização: 17 de junho de 2025</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Aceitação dos Termos</h2>
                <p className="text-gray-700 leading-relaxed">
                    Ao acessar e utilizar o Pung Game (&#34;Serviço&#34;), você concorda em cumprir e estar vinculado a estes Termos de Uso (&quot;Termos&quot;), à nossa Política de Privacidade e a todas as leis e regulamentos aplicáveis. Se você não concordar com estes Termos, não utilize nosso Serviço.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Alterações nos Termos</h2>
                <p className="text-gray-700 leading-relaxed">
                    Reservamo-nos o direito de, a nosso exclusivo critério, modificar ou substituir estes Termos a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação. Seu uso continuado do Serviço após a publicação das alterações constitui aceitação dessas alterações.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Acesso e Uso do Serviço</h2>
                <ul className="list-disc list-inside text-gray-700 ml-4">
                    <li className="mb-1">
                        <strong>Elegibilidade:</strong> Ao usar o Serviço, você declara que possui pelo menos 13 anos de idade (ou a idade mínima legal em sua jurisdição) e que tem capacidade legal para celebrar este contrato.
                    </li>
                    <li className="mb-1">
                        <strong>Conta de Usuário:</strong> Você é responsável por manter a confidencialidade de sua senha e por todas as atividades que ocorrem em sua conta. Notifique-nos imediatamente sobre qualquer uso não autorizado.
                    </li>
                    <li className="mb-1">
                        <strong>Conduta do Usuário:</strong> Você concorda em não utilizar o Serviço para qualquer finalidade ilegal ou proibida por estes Termos. Isso inclui, mas não se limita a, assédio, spam, distribuição de malware ou violação de direitos autorais.
                    </li>
                    <li className="mb-1">
                        <strong>Privacidade:</strong> Seu uso do Serviço também é regido por nossa Política de Privacidade, que é incorporada a estes Termos por referência.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Propriedade Intelectual</h2>
                <p className="text-gray-700 leading-relaxed">
                    Todo o conteúdo e materiais disponíveis no Pung Game, incluindo, entre outros, textos, gráficos, logotipos, ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, são propriedade do Pung Game ou de seus licenciadores e são protegidos por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Isenção de Garantias</h2>
                <p className="text-gray-700 leading-relaxed">
                    O Serviço é fornecido &#34;no estado em que se encontra&#34; e &#34;conforme disponível&#34;, sem garantias de qualquer tipo, expressas ou implícitas. Não garantimos que o Serviço será ininterrupto, livre de erros, seguro ou que quaisquer defeitos serão corrigidos.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Limitação de Responsabilidade</h2>
                <p className="text-gray-700 leading-relaxed">
                    Em nenhuma circunstância o Pung Game, seus diretores, funcionários ou agentes serão responsáveis por quaisquer danos diretos, indiretos, incidentais, especiais, punitivos ou consequenciais resultantes de seu uso ou incapacidade de usar o Serviço.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Rescisão</h2>
                <p className="text-gray-700 leading-relaxed">
                    Podemos rescindir ou suspender seu acesso ao Serviço imediatamente, sem aviso prévio ou responsabilidade, a nosso exclusivo critério, por qualquer motivo, incluindo, sem limitação, sua violação destes Termos.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Lei Aplicável</h2>
                <p className="text-gray-700 leading-relaxed">
                    Estes Termos serão regidos e interpretados de acordo com as leis do [Seu País/Estado, por exemplo, Brasil / Estado de São Paulo], sem considerar seus princípios de conflitos de lei.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contato</h2>
                <p className="text-gray-700 leading-relaxed">
                    Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco em:
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                    E-mail: <a href="mailto:suporte@punggame.com" className="text-blue-600 hover:underline">suporte@punggame.com</a>
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Disposições Gerais</h2>
                <p className="text-gray-700 leading-relaxed">
                    Estes Termos constituem o acordo completo entre você e o Pung Game em relação ao Serviço. Qualquer falha de nossa parte em exercer ou fazer valer qualquer direito ou disposição destes Termos não constituirá uma renúncia a tal direito ou disposição.
                </p>
            </section>
        </div>
    );
};

export default TermsOfServicePage;