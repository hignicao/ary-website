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
    questionnaire JSONB,
    image_banner VARCHAR(255),
    image_thumb VARCHAR(255)
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
    status VARCHAR(50) DEFAULT 'Pendente',
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
