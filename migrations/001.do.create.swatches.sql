CREATE TABLE swatches (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    name TEXT NOT NULL,
    color_primary TEXT NOT NULL,
    color_secondary TEXT,
    font_primary TEXT NOT NULL
);