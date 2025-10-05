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
('Matemática Financeira', 40, 1000.00, 'À vista ou em 2 parcelas mensais de R$ 500,00 (cheques pré-datados).', 'Terças e Quintas-feiras das 9 às 11hs', 'A metodologia consiste na apresentação das ferramentas HP 12C e EXCEL, seguida pelos conteúdos. Exercícios de fixação serão disponibilizados e dúvidas serão tiradas com auxiliares.', '{
  "introducao": "A Matemática Financeira é um conjunto de técnicas para acompanhar a variação do dinheiro no tempo, essencial para análises de aplicações no mercado financeiro.",
  "items": [
    "Capitalização Simples",
    "Capitalização Composta",
    "Desconto (Simples e Composto)",
    "Inflação, Deflação e Correção Monetária",
    "Anuidades ou Séries de Pagamentos",
    "Anuidades Diferidas",
    "Fluxo de Caixa",
    "Amortizações e Empréstimos (Price, SAC, SAM)",
    "Sistema de Amortização com Correção Monetária",
    "Títulos Públicos",
    "Introdução à Análise de Investimentos"
  ]
}', '{
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
('Estatística Básica', 50, 1500.00, 'À vista ou em 3 parcelas mensais de R$ 500,00 (cheques pré-datados).', 'Terças e Quintas-feiras das 9 às 11hs', 'As aulas online serão gravadas e disponibilizadas. As dúvidas serão esclarecidas pelo auxiliar do professor nas aulas de exercício, que ocorrem às quintas-feiras.', '{
  "introducao": "A Estatística fornece métodos para coleta, organização, descrição, análise e interpretação de dados para a tomada de decisões. O curso aborda as três grandes áreas: Estatística Descritiva, Probabilidade e Inferência Estatística.",
  "items": [
    "Medidas (Tendência Central, Ordenamento, Dispersão)",
    "Teoria de Probabilidade (Espaço Amostral, Eventos, Teorema de Bayes)",
    "Variáveis Aleatórias Discretas",
    "Modelos Especiais de Distribuição (Uniforme, Bernoulli, Binomial, Poisson, Normal, etc.)",
    "Variáveis Aleatórias Bidimensionais",
    "Testes de Hipóteses",
    "Propriedades dos Estimadores de Mínimos Quadrados",
    "Modelo Regressão Linear Simples"
  ]
}', '{
  "questions": [
    {"id": "graduacao", "label": "Curso de Graduação finalizado e ano:", "type": "text"},
    {"id": "cursou_calc", "label": "Já fez curso de Cálculo Diferencial e Integral?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "usa_hp12c", "label": "Sabe usar a HP 12C?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "tem_hp12c", "label": "Tem a calculadora financeira HP 12C?", "type": "radio", "options": ["Sim", "Não"]},
    {"id": "softwares", "label": "Indique os softwares que sabe usar:", "type": "checkbox", "options": ["Excel", "Word", "Power Point"]},
    {"id": "softwares_est", "label": "Que software estatístico sabe usar?", "type": "text", "placeholder": "SPSS, Stata, EViews, Jamovi, Outro"}
  ]
}');