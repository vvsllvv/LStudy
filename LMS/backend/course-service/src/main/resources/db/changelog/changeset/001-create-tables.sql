CREATE TABLE modules (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
);

CREATE TABLE courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    module_id BIGINT NOT NULL,

    FOREIGN KEY (module_id) REFERENCES courses(id)
);

CREATE TABLE themes (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    course_id BIGINT NOT NULL,

    FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE paragraphs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    theme_id BIGINT NOT NULL,

    FOREIGN KEY (theme_id) REFERENCES themes(id)
);

CREATE TABLE documents (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    theme_id BIGINT NOT NULL,

    FOREIGN KEY (theme_id) REFERENCES themes(id)
);

CREATE TABLE tests (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    is_active BOOLEAN NOT NULL,
    timeout SERIAL,
    theme_id BIGINT NOT NULL,

    FOREIGN KEY (theme_id) REFERENCES themes(id)
);

CREATE TABLE questions (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    method VARCHAR(15) NOT NULL,
    test_id BIGINT NOT NULL,

    FOREIGN KEY (test_id) REFERENCES tests(id)
);

CREATE TABLE answers (
    id BIGSERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    is_right BOOLEAN NOT NULL,
    question_id BIGINT NOT NULL,

    FOREIGN KEY (question_id) REFERENCES questions(id)
);


