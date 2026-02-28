-- =====================
-- TABLE 1: ROLES
-- =====================
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- DEFAULT ROLES
INSERT INTO roles (name) VALUES 
('admin'),
('doctor'),
('receptionist'),
('patient');

-- =====================
-- TABLE 2: USERS
-- =====================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INTEGER NOT NULL,
  specialty VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) 
    REFERENCES roles(id) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

-- =====================
-- TABLE 3: PATIENTS
-- =====================
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age < 150),
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('male', 'female', 'other')),
  contact VARCHAR(20) NOT NULL,
  blood_group VARCHAR(5) CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_patient_user FOREIGN KEY (user_id) 
    REFERENCES users(id) 
    ON DELETE SET NULL 
    ON UPDATE CASCADE
);

-- =====================
-- TABLE 4: APPOINTMENTS
-- =====================
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) 
    REFERENCES patients(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_appointment_doctor FOREIGN KEY (doctor_id) 
    REFERENCES users(id) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

-- =====================
-- TABLE 5: PRESCRIPTIONS
-- =====================
CREATE TABLE prescriptions (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  medicines TEXT NOT NULL,
  dosage TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_prescription_patient FOREIGN KEY (patient_id) 
    REFERENCES patients(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_prescription_doctor FOREIGN KEY (doctor_id) 
    REFERENCES users(id) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);

-- =====================
-- TABLE 6: DIAGNOSIS LOGS
-- =====================
CREATE TABLE diagnosis_logs (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  symptoms TEXT NOT NULL,
  diagnosis TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_diagnosis_patient FOREIGN KEY (patient_id) 
    REFERENCES patients(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  CONSTRAINT fk_diagnosis_doctor FOREIGN KEY (doctor_id) 
    REFERENCES users(id) 
    ON DELETE RESTRICT 
    ON UPDATE CASCADE
);



select * from diagnosis_logs;
select * from prescriptions;
select * from appointments;
select * from patients;
select * from users;
select * from roles;
