CREATE TABLE road_segments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    road_type VARCHAR(50) NOT NULL,
    length_km DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('good', 'warning', 'critical')),
    defects_count INTEGER DEFAULT 0,
    last_inspection_date DATE,
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE defects (
    id SERIAL PRIMARY KEY,
    road_segment_id INTEGER REFERENCES road_segments(id),
    defect_type VARCHAR(100) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('minor', 'moderate', 'severe')),
    description TEXT,
    detected_date DATE NOT NULL,
    resolved_date DATE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('open', 'in_progress', 'resolved')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE repair_projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    road_segment_id INTEGER REFERENCES road_segments(id),
    status VARCHAR(20) NOT NULL CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('high', 'medium', 'low')),
    budget DECIMAL(15, 2) NOT NULL,
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    start_date DATE,
    end_date DATE,
    contractor VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inspections (
    id SERIAL PRIMARY KEY,
    road_segment_id INTEGER REFERENCES road_segments(id),
    inspection_date DATE NOT NULL,
    inspector_name VARCHAR(255),
    notes TEXT,
    video_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_road_segments_status ON road_segments(status);
CREATE INDEX idx_defects_status ON defects(status);
CREATE INDEX idx_repair_projects_status ON repair_projects(status);
CREATE INDEX idx_inspections_date ON inspections(inspection_date);

INSERT INTO road_segments (name, road_type, length_km, status, defects_count, last_inspection_date, priority) VALUES
('Московский проспект, уч. 12-18 км', 'Магистраль', 6.0, 'critical', 15, '2025-11-25', 'high'),
('ул. Ленина, уч. 3-5 км', 'Магистраль', 2.0, 'warning', 7, '2025-11-26', 'medium'),
('пр. Ленинградский, уч. 8-12 км', 'Магистраль', 4.0, 'good', 2, '2025-11-27', 'low'),
('Президентский бульвар, уч. 1-4 км', 'Магистраль', 3.0, 'warning', 9, '2025-11-24', 'high'),
('ул. Гагарина, уч. 5-8 км', 'Межквартальный проезд', 3.0, 'critical', 18, '2025-11-23', 'high'),
('ул. Калинина, дворовая территория', 'Дворовая территория', 0.5, 'good', 1, '2025-11-27', 'low');

INSERT INTO repair_projects (name, road_segment_id, status, priority, budget, progress_percent, start_date, end_date, contractor) VALUES
('Ремонт Московского проспекта (уч. 12-18 км)', 1, 'in_progress', 'high', 15000000, 45, '2025-10-01', '2026-03-15', 'ООО "ДорСтрой"'),
('Капитальный ремонт ул. Гагарина', 5, 'planned', 'high', 8500000, 0, '2026-02-01', '2026-06-30', 'Не назначен'),
('Текущий ремонт Президентского бульвара', 4, 'in_progress', 'medium', 4200000, 78, '2025-11-01', '2025-12-20', 'ИП Иванов А.С.'),
('Ямочный ремонт ул. Ленина', 2, 'completed', 'low', 1800000, 100, '2025-09-15', '2025-11-10', 'ООО "АсфальтСервис"');