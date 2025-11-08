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
'A metodologia do curso consiste inicialmente na apresentação das ferramentas que serão utilizadas pelos alunos na solução dos exercícios de fixação do conteúdo: a HP 12C e o EXCEL. Ambos estarão incluídos em Anexo ao final do “Portal dos Cursos”. Em seguida, a apresentação dos conteúdos. Para a fixação do conteúdo (que também estará na Bibliografia auxiliar do curso) será liberado a lista dos exercícios para a solução dos alunos. Posteriormente, as dúvidas nas soluções serão dirimidas com a interevenção dos auxiliares do curso. Na Bibliografia auxiliar teremos também outros exercídios complementares.',
'{
  "introducao": "Na economia financeira há diversas formas através das quais as pessoas e as empresas podem analisar situações envolvendo a variação do dinheiro no tempo e também fazer as aplicações das suas reservas no mercado financeiro. Uma delas é utilizando os conceitos básicos da Matemática Financeira, juntamente com outros conteúdos de estatística associados. Podemos afirmar, portanto, que a Matemática Financeira é um conjunto de técnicas e formulações teóricas cujo objetivo principal é mostrar como se pode acompanhar a variação do dinheiro no tempo. É o que pretendemos desenvolver no nosso curso.",
  "items": [
    "Capitalização Simples (Cálculo dos juros - Montante, Fórmulas derivadas, Homogeneidade entre taxa e tempo)",
    "Capitalização Composta (Montante – Fórmulas derivadas, Homogeneidade entre taxa e tempo, Taxa nominal – Taxas proporcionais - Taxas equivalentes)",
    "Desconto (Desconto simples bancário ou comercial, Valor atual ou de resgate, Desconto Composto)",
    "Inflação, Deflação e Correção Monetária (Definições, Índices: TR, VRF, UFIR, Variação cambial, Taxas de juros acumuladas, nominal e real)",
    "Anuidades ou Séries de Pagamentos (Classificação, Modelo básico de anuidades, Anuidades antecipadas – Anuidades postecipadas)",
    "Anuidades Diferidas (Cálculo do valor atual, Montante em anuidade diferida)",
    "Fluxo de Caixa (Período de taxa diferente do intervalo das prestações, Fluxo de Caixa, mais parcelas intermediárias)",
    "Amortizações e Empréstimos (Definições, Sistema francês de amortização ou sistema Price - SFA, Sistema de amortização constante - SAC, Sistema de amortização misto - SAM)",
    "Sistema de Amortização com Correção Monetária (Introdução, Sistema financeiro de habitação - SFH, Plano de correção monetária - PCM, Utilização de índices diferentes)",
    "Títulos Públicos (Como investir em Títulos Públicos)",
    "Introdução à Análise de Investimentos"
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
    "Medidas (Medidas de Tendência Central, Medidas de Ordenamento, Medidas de Dispersão)",
    "Teoria de Probabilidade (Espaço Amostral, Eventos, Probabilidade Axiomática, Probabilidades condicionais, Eventos independentes, Teorema de Bayes)",
    "Variáveis Aleatórias Discretas (Variáveis Aleatórias Discretas e Contínuas, Função Densidade de Probabilidade, Função Distribuição Acumulada)",
    "Modelos Especiais de Distribuição (Uniforme, Exponencial, Bernoulli, Binomial, Poisson, Normal, Distribuição Gama, Qui-quadrado, t-de student, F-de Snedecor)",
    "Variáveis Aleatórias Bidimensionais (Distribuições conjuntas e marginais, Covariância e correlação)",
    "Testes de Hipóteses",
    "Propriedades dos Estimadores de Mínimos Quadrados",
    "Modelo Regressão Linear Simples"
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