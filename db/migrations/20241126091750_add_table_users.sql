-- migrate:up
CREATE TABLE IF NOT EXISTS char (
    char_id SERIAL PRIMARY KEY,
    char_name VARCHAR(100),
    region VARCHAR(50),
    vision VARCHAR(50),
    weapon VARCHAR(50)
);

-- migrate:down
