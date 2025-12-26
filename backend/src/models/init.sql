-- Tabela de Cursos
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    workload INT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    payment_info TEXT,
    schedule TEXT,
    methodology TEXT,
    gdrive_link VARCHAR(255),
    syllabus JSONB,
    questionnaire JSONB
);

-- Tabela de Inscrições de Alunos
CREATE TABLE IF NOT EXISTS applications (
    id SERIAL PRIMARY KEY,
    course_id INT REFERENCES courses(id),
    student_name VARCHAR(255) NOT NULL,
    student_email VARCHAR(255) NOT NULL,
    student_whatsapp VARCHAR(50),
    student_address TEXT,
    student_cv TEXT,
    status VARCHAR(50) DEFAULT 'Pendente', -- Pendente, Aprovado, Rejeitado, Pago
    submission_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para respostas do questionário
CREATE TABLE IF NOT EXISTS questionnaire_answers (
    id SERIAL PRIMARY KEY,
    application_id INT REFERENCES applications(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT
);


-- Tabela de Administradores
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL
);

-- Limpar dados antigos para garantir consistência
TRUNCATE TABLE courses RESTART IDENTITY CASCADE;

-- Inserir Cursos Iniciais
INSERT INTO courses (title, workload, price, payment_info, schedule, methodology, syllabus, questionnaire) VALUES
('Matemática Financeira', 40, 1000.00, 'À vista ou em 2 parcelas mensais de R$ 500,00 (cheques pré-datados).', 'Terças e Quintas-feiras das 9 às 11hs',
'A metodologia do curso consiste inicialmente na apresentação da programação e calendário do curso, seguido da indicação das ferramentas, tais como, a HP 12C e o EXCEL, que serão utilizadas pelos alunos durante a aprendizagem e na solução dos exercícios de fixação. Ambas estão incluídos em Anexo ao final do texto básico do curso: "Conquistando o seu futuro Financeiro: Planejamento em tempos de incertezas", de minha autoria e do Prof. Paulo Gurgel. Para a fixação do conteúdo serão liberadas as listas dos exercícios para a resolução dos alunos. Posteriormente, as dúvidas nas soluções serão dirimidas com a ajuda e apoio dos auxiliares do curso. Na Bibliografia auxiliar teremos também as indicações de outros exercícios existentes em textos complementares.',
'{
  "introducao": "Na economia financeira há diversas formas através das quais as pessoas e as empresas podem analisar situações envolvendo a variação do dinheiro no tempo e também fazer as aplicações das suas reservas no mercado financeiro. Uma delas é utilizando os conceitos básicos da Matemática Financeira, juntamente com outros conteúdos de estatística associados. Podemos afirmar, portanto, que a Matemática Financeira é um conjunto de técnicas e formulações teóricas cujo objetivo principal é mostrar como se pode acompanhar a variação do dinheiro no tempo. É o que pretendemos desenvolver no nosso curso.",
  "items": [
    { "label": "I - Capitalização Simples", "level": 0 },
    { "label": "1.1 Cálculo dos juros - Montante", "level": 1 },
    { "label": "1.2 Fórmulas derivadas", "level": 1 },
    { "label": "1.3 Homogeneidade entre taxa e tempo", "level": 1 },
    { "label": "II Capitalização composta", "level": 0 },
    { "label": "2.1 Montante – Fórmulas derivadas", "level": 1 },
    { "label": "2.2 Homogeneidade entre taxa e tempo", "level": 1 },
    { "label": "2.2 Taxa nominal – Taxas proporcionais - Taxas equivalentes", "level": 1 },
    { "label": "III Desconto", "level": 0 },
    { "label": "III.1 Desconto simples", "level": 1 },
    { "label": "III.1.1 Desconto simples bancário ou comercial (por fora)", "level": 2 },
    { "label": "III.1.2 Valor atual ou de resgate", "level": 2 },
    { "label": "III.1.3 Valor nominal bancário", "level": 2 },
    { "label": "III.2 Desconto Composto", "level": 1 },
    { "label": "III.2.1 Desconto comercial, bancário composto ou por fora", "level": 2 },
    { "label": "III.2.2 Desconto racional composto ou por dentro", "level": 2 },
    { "label": "IV Inflação, Deflação e correção monetária", "level": 0 },
    { "label": "IV.1 Definições", "level": 1 },
    { "label": "IV.2 Índices", "level": 1 },
    { "label": "IV.2.1 TR - Taxa Referencial", "level": 2 },
    { "label": "IV.2.2 VRF - Valor Referencial de Financiamento", "level": 2 },
    { "label": "IV.2.3 UFIR - Unidade Fiscal de Referência", "level": 2 },
    { "label": "IV.2.4 Variação cambial", "level": 2 },
    { "label": "IV.3 Variação dos índices", "level": 1 },
    { "label": "IV.4 Taxas de juros acumuladas, nominal e real", "level": 1 },
    { "label": "V Anuidades ou séries de pagamentos", "level": 0 },
    { "label": "V.1 Classificação", "level": 1 },
    { "label": "V.1.1 Prazo", "level": 2 },
    { "label": "V.1.2 Valor", "level": 2 },
    { "label": "V.1.3 Forma", "level": 2 },
    { "label": "V.1.4 Período", "level": 2 },
    { "label": "V.2 Modelo básico de anuidades", "level": 1 },
    { "label": "V.2.1 Modelo Regular relativo ao valor presente", "level": 2 },
    { "label": "V.2.2 Modelo Regular relacionado com o montante", "level": 2 },
    { "label": "V.3 Anuidades antecipadas – Anuidades postecipadas", "level": 1 },
    { "label": "VI Anuidades diferidas", "level": 0 },
    { "label": "VI.1 Cálculo do valor atual", "level": 1 },
    { "label": "VI.2 Montante em anuidade diferida", "level": 1 },
    { "label": "VII Fluxo de Caixa", "level": 0 },
    { "label": "VII.1 Período de taxa diferente do intervalo das prestações", "level": 1 },
    { "label": "VII.2 Fluxo de Caixa, mais parcelas intermediárias", "level": 1 },
    { "label": "VIII Amortizações e empréstimos", "level": 0 },
    { "label": "VIII.1 Definições", "level": 1 },
    { "label": "VIII.2 Sistema francês de amortização ou sistema Price (SFA)", "level": 1 },
    { "label": "VIII.3 Sistema de amortização constante - SAC - ou sistema hamburguês", "level": 1 },
    { "label": "VIII.4 Sistema de amortização misto (SAM)", "level": 1 },
    { "label": "IX Sistema de amortização com correção monetária", "level": 0 },
    { "label": "IX.1 Introdução", "level": 1 },
    { "label": "IX.2 Sistema financeiro de habitação - SFH", "level": 1 },
    { "label": "IX.3 Plano de correção monetária - PCM", "level": 1 },
    { "label": "IX.5 Utilização de índices diferentes", "level": 1 },
    { "label": "IX.6 Sistema francês de amortização com correção", "level": 1 },
    { "label": "X Títulos Públicos", "level": 0 },
    { "label": "X.1 – Como investir em Títulos Públicos", "level": 1 },
    { "label": "XI Introdução à Analise de Investimentos", "level": 0 }
  ]
}',
'{
  "questions": [
    {"id": "graduacao", "label": "Curso de Graduação finalizado e ano:", "type": "text"},
    {"id": "cursou_mf", "label": "Já cursou Matemática Financeira?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "cursou_mc", "label": "Já fez curso na área de mercado de capitais?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "cursou_est", "label": "Já fez curso de estatística?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "cursou_calc", "label": "Já fez curso de Cálculo Diferencial e Integral?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "usa_hp12c", "label": "Sabe usar a HP 12C?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "tem_hp12c", "label": "Tem a calculadora financeira HP 12C?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "softwares", "label": "Indique os softwares que sabe usar:", "type": "checkbox", "options": ["Excel", "Word", "Power Point"]},
    {"id": "softwares_est", "label": "Que software estatístico sabe usar?", "type": "text", "placeholder": "SPSS, Stata, EViews, Jamovi, Outro"}
  ]
}'),

('Estatística Básica', 50, 1500.00, 'À vista ou em 3 parcelas mensais de R$ 500,00 (cheques pré-datados).', 'Terças e Quintas-feiras das 9 às 11hs',
'A metodologia do curso consistirá inicialmente na apresentação do programa e na orientação da forma de estudo e resolução dos exercícios com o auxiliar do curso. Após identificar os alunos que não têm a o conhecimento das ferramentas que serão utilizadas na solução dos exercícios de fixação do conteúdo: a HP 12C e o EXCEL, apresentaremos o material de apoio e forma de estudo. Para a fixação do conteúdo também estará na Bibliografia auxiliar do curso um conjunto de textos para para consulta. Ao longo do curso serão liberadas as listas dos exercícios para a resolução dos alunos. Posteriormente, as dúvidas nas soluções serão dirimidas com a interevenção do auxiliar do curso.',
'{
  "introducao": "A Estatística é uma parte da Matemática Aplicada que fornece métodos para coleta, organização, descrição, análise e interpretação de dados e para a utilização dos mesmos na tomada de decisões. A grosso modo podemos dividir a Estatística em três áreas: Estatística Descritiva; Probabilidade; e Inferência Estatística. Essas três áreas serão estudadas no decorrer do curso.",
  "items": [
    { "label": "I Medidas", "level": 0 },
    { "label": "I.1 Medidas de Tendência Central", "level": 1 },
    { "label": "I.2 Medidas de Ordenamento", "level": 1 },
    { "label": "I.3 Medidas de Dispersão", "level": 1 },
    { "label": "II – Teoria de Probabilidade", "level": 0 },
    { "label": "II.1 Espaço Amostral, Eventos", "level": 1 },
    { "label": "II.2 Probabilidade Axiomática; Propriedades", "level": 1 },
    { "label": "II.3 Probabilidades condicionais", "level": 1 },
    { "label": "II.4 Eventos independentes", "level": 1 },
    { "label": "II.5 Teorema de Bayes", "level": 1 },
    { "label": "III Variáveis Aleatórias Discretas", "level": 0 },
    { "label": "III.1 Variáveis Aleatórias Discretas e Contínuas", "level": 1 },
    { "label": "III.2 Função Densidade de Probabilidade; valor esperado e variância", "level": 1 },
    { "label": "III.3 Função Distribuição Acumulada", "level": 1 },
    { "label": "IV Modelos especiais de distribuição", "level": 0 },
    { "label": "IV.1 Uniforme, Exponencial, Bernoulli, Binomial, Poisson", "level": 1 },
    { "label": "IV.2 Normal; Distribuição Gama, Qui-quadrado, t-de student, F-de Snedecor", "level": 1 },
    { "label": "V Variáveis Aleatórias Bidimensionais, Distribuições conjuntas e marginais", "level": 0 },
    { "label": "V.1 Covariância e correlação", "level": 1 },
    { "label": "VI Testes de Hipóteses", "level": 0 },
    { "label": "VII Propriedades dos estimadores de mínimos quadrados", "level": 0 },
    { "label": "VIII Modelo Regressão Linear Simples", "level": 0 }
  ]
}',
'{
  "questions": [
    {"id": "graduacao", "label": "Curso de Graduação finalizado e ano:", "type": "text"},
    {"id": "cursou_calc", "label": "Já fez curso de Cálculo Diferencial e Integral?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "usa_hp12c", "label": "Sabe usar a HP 12C?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "tem_hp12c", "label": "Tem a calculadora financeira HP 12C?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "softwares", "label": "Indique os softwares que sabe usar:", "type": "checkbox", "options": ["Excel", "Word", "Power Point"]},
    {"id": "softwares_est", "label": "Que software estatístico sabe usar?", "type": "text", "placeholder": "SPSS, Stata, EViews, Jamovi, Outro"}
  ]
}');