-- MedAlign Healthcare Database Initializer for MySQL 8.0
CREATE DATABASE IF NOT EXISTS `medalign_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'medalign_user'@'%' IDENTIFIED BY 'medalign_password';
GRANT ALL PRIVILEGES ON `medalign_db`.* TO 'medalign_user'@'%';
FLUSH PRIVILEGES;

USE `medalign_db`;

-- 1. Subscription Plans
CREATE TABLE IF NOT EXISTS `subscription_plans` (
    `plan_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(30) NOT NULL,
    `price` DECIMAL(8,2) NOT NULL,
    `billing_cycle` VARCHAR(20) NOT NULL,
    `max_doctors` INT UNSIGNED NOT NULL,
    `features` TEXT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Clinics
CREATE TABLE IF NOT EXISTS `clinics` (
    `clinic_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `plan_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` VARCHAR(200) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `status` VARCHAR(20) DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`plan_id`) REFERENCES `subscription_plans`(`plan_id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Users (Auth & Staff)
CREATE TABLE IF NOT EXISTS `users` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `clinic_id` BIGINT UNSIGNED NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `phone` VARCHAR(20) NULL,
    `role` ENUM('admin', 'doctor', 'reception', 'patient') DEFAULT 'patient',
    `password` VARCHAR(255) NOT NULL,
    `email_verified_at` TIMESTAMP NULL,
    `remember_token` VARCHAR(100) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`clinic_id`) REFERENCES `clinics`(`clinic_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Doctors
CREATE TABLE IF NOT EXISTS `doctors` (
    `doctor_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT UNSIGNED NOT NULL UNIQUE,
    `clinic_id` BIGINT UNSIGNED NOT NULL,
    `specialization` VARCHAR(50) NOT NULL,
    `avg_consult_min` INT UNSIGNED DEFAULT 15,
    `availability_status` VARCHAR(20) DEFAULT 'available',
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`clinic_id`) REFERENCES `clinics`(`clinic_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Counters
CREATE TABLE IF NOT EXISTS `counters` (
    `counter_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `clinic_id` BIGINT UNSIGNED NOT NULL,
    `counter_number` INT UNSIGNED NOT NULL,
    `counter_name` VARCHAR(30) NOT NULL,
    UNIQUE KEY `clinic_counter_unique` (`clinic_id`, `counter_number`),
    FOREIGN KEY (`clinic_id`) REFERENCES `clinics`(`clinic_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Patients
CREATE TABLE IF NOT EXISTS `patients` (
    `patient_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NULL,
    `dob` DATE NULL,
    `gender` VARCHAR(10) NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Queue Tokens
CREATE TABLE IF NOT EXISTS `queue_tokens` (
    `token_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `clinic_id` BIGINT UNSIGNED NOT NULL,
    `doctor_id` BIGINT UNSIGNED NULL,
    `patient_id` BIGINT UNSIGNED NOT NULL,
    `counter_id` BIGINT UNSIGNED NULL,
    `token_number` INT UNSIGNED NOT NULL,
    `status` VARCHAR(20) DEFAULT 'waiting',
    `check_in_time` TIMESTAMP NULL,
    `called_time` TIMESTAMP NULL,
    `completed_time` TIMESTAMP NULL,
    `est_wait_time` INT UNSIGNED NULL,
    UNIQUE KEY `clinic_token_unique` (`clinic_id`, `token_number`),
    FOREIGN KEY (`clinic_id`) REFERENCES `clinics`(`clinic_id`) ON DELETE CASCADE,
    FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE SET NULL,
    FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE,
    FOREIGN KEY (`counter_id`) REFERENCES `counters`(`counter_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Prescriptions & Prescription Items
CREATE TABLE IF NOT EXISTS `prescriptions` (
    `prescription_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `token_id` BIGINT UNSIGNED NULL,
    `doctor_id` BIGINT UNSIGNED NOT NULL,
    `patient_id` BIGINT UNSIGNED NOT NULL,
    `template_id` BIGINT UNSIGNED NULL,
    `notes` TEXT NULL,
    `qr_code_path` VARCHAR(255) NULL,
    `pdf_path` VARCHAR(255) NULL,
    `issued_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`token_id`) REFERENCES `queue_tokens`(`token_id`) ON DELETE SET NULL,
    FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`) ON DELETE RESTRICT,
    FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `prescription_items` (
    `item_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `prescription_id` BIGINT UNSIGNED NOT NULL,
    `medicine_name` VARCHAR(100) NOT NULL,
    `dosage` VARCHAR(50) NOT NULL,
    `frequency` VARCHAR(50) NOT NULL,
    `duration` VARCHAR(50) NOT NULL,
    `instructions` TEXT NULL,
    FOREIGN KEY (`prescription_id`) REFERENCES `prescriptions`(`prescription_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 9. Alert Preferences
CREATE TABLE IF NOT EXISTS `alert_preferences` (
    `preference_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `patient_id` BIGINT UNSIGNED NOT NULL UNIQUE,
    `sms_enabled` TINYINT(1) DEFAULT 1,
    `whatsapp_enabled` TINYINT(1) DEFAULT 1,
    `near_turn_threshold` INT UNSIGNED DEFAULT 3,
    FOREIGN KEY (`patient_id`) REFERENCES `patients`(`patient_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 10. OTP Verifications
CREATE TABLE IF NOT EXISTS `otp_verifications` (
    `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(100) NOT NULL,
    `otp_code` VARCHAR(100) NOT NULL,
    `type` VARCHAR(20) DEFAULT 'registration',
    `expires_at` TIMESTAMP NOT NULL,
    `verified_at` TIMESTAMP NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX `email_type_idx` (`email`, `type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;