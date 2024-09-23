-- Create the new table with the updated structure
CREATE TABLE analysis_record (
    analysis_Id integer primary key AUTOINCREMENT,
    Organisation text,
    Region text,
    CropType text,
    Field_size_ha real,
    Temperature real,
    Humidity real,
    Rainfall real,
    Predicted_yield real
);