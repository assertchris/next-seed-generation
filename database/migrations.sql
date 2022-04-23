DROP TABLE IF EXISTS Seeds;

CREATE TABLE Seeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    words TEXT
);

-- DROP TABLE IF EXISTS Generations;

-- CREATE TABLE Generations (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     numbers TEXT,
--     seedId INTEGER REFERENCES Seeds(id)
-- );
