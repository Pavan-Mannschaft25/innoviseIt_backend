-- =====================================================================
-- Innovise Careers Backend - database schema + setup data
-- Source: local MySQL database `innovise_careers` (exported 2026-11-18)
-- Contains: all 9 table structures + the 6 required email templates.
-- Contains NO candidates, admins, jobs, departments or logs.
--
-- Usage:
--   mysql -u <user> -p -e "CREATE DATABASE innovise_careers CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;"
--   mysql -u <user> -p innovise_careers < database/schema.sql
--
-- WARNING: each table is dropped and recreated. Never run on a database
-- whose data you want to keep.
-- =====================================================================


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Active',
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `portfolio` varchar(255) DEFAULT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `resume` varchar(255) DEFAULT NULL,
  `cover_letter` longtext,
  `status` enum('Pending','Reviewed','Interview','Rejected','Selected') DEFAULT 'Pending',
  `applied_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `resume_key` varchar(500) DEFAULT NULL,
  `resume_original_name` varchar(255) DEFAULT NULL,
  `resume_mime_type` varchar(100) DEFAULT NULL,
  `resume_size` bigint DEFAULT NULL,
  `current_location` varchar(255) DEFAULT NULL,
  `salary_expectation` varchar(100) DEFAULT NULL,
  `availability` varchar(100) DEFAULT NULL,
  `source` varchar(100) DEFAULT NULL,
  `authorized_to_work` varchar(50) DEFAULT NULL,
  `requires_sponsorship` varchar(50) DEFAULT NULL,
  `interview_approval_status` enum('Not Requested','Pending','Approved','Rejected') DEFAULT 'Not Requested',
  `approved_by` int DEFAULT NULL,
  `approved_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_job` (`job_id`),
  CONSTRAINT `fk_job` FOREIGN KEY (`job_id`) REFERENCES `job_positions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `audit_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `admin_id` int NOT NULL,
  `module` varchar(100) NOT NULL,
  `action` varchar(100) NOT NULL,
  `description` text,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_audit_admin` (`admin_id`),
  CONSTRAINT `fk_audit_admin` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `department_name` (`department_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `email_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipient` varchar(150) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` longtext,
  `status` enum('Pending','Sent','Failed') DEFAULT 'Pending',
  `error_message` text,
  `sent_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `sent_by` (`sent_by`),
  CONSTRAINT `email_logs_ibfk_1` FOREIGN KEY (`sent_by`) REFERENCES `admins` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `email_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_templates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `body` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `interviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application_id` int NOT NULL,
  `interview_date` date NOT NULL,
  `interview_time` time NOT NULL,
  `interview_timezone` varchar(100) DEFAULT 'Asia/Kolkata',
  `duration_minutes` int DEFAULT '30',
  `interview_type` varchar(100) NOT NULL,
  `interviewer_name` varchar(150) DEFAULT NULL,
  `meeting_link` text,
  `status` enum('Scheduled','Completed','Cancelled','Rescheduled') DEFAULT 'Scheduled',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_interview_application` (`application_id`),
  CONSTRAINT `fk_interview_application` FOREIGN KEY (`application_id`) REFERENCES `applications` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `job_positions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_positions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `employment_type` enum('Full-Time','Part-Time','Contract','Internship','Remote') NOT NULL,
  `experience_level` varchar(50) DEFAULT NULL,
  `salary_min` decimal(10,2) DEFAULT NULL,
  `salary_max` decimal(10,2) DEFAULT NULL,
  `description` text,
  `responsibilities` longtext,
  `requirements` longtext,
  `benefits` longtext,
  `status` enum('Open','Closed') DEFAULT 'Open',
  `openings` int DEFAULT '1',
  `application_deadline` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_department` (`department_id`),
  CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(100) DEFAULT NULL,
  `setting_value` text,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `setting_key` (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- ---------------------------------------------------------------------
-- Setup data: email templates (looked up by name in email.service.js)
-- ---------------------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

LOCK TABLES `email_templates` WRITE;
/*!40000 ALTER TABLE `email_templates` DISABLE KEYS */;
INSERT INTO `email_templates` (`id`, `name`, `subject`, `body`, `created_at`, `updated_at`) VALUES (24,'Application Reviewed','Application Reviewed - Innovise IT','<!DOCTYPE html>\n\n<html>\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Application Update - Innovise IT</title>\n</head>\n\n<body style=\"margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;\">\n\n  <div style=\"max-width:680px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);\">\n\n```\n<!-- Header -->\n<div style=\"background:#0B2A4A; padding:28px 35px; text-align:center;\">\n  <div style=\"font-size:25px; font-weight:700; color:#ffffff;\">\n    Innovise IT\n  </div>\n\n  <div style=\"margin-top:8px; font-size:14px; color:#dbe7f3;\">\n    Application Status Update\n  </div>\n</div>\n\n<!-- Content -->\n<div style=\"padding:35px;\">\n\n  <p style=\"margin:0 0 18px; font-size:16px; line-height:1.7;\">\n    Hello <strong>{{first_name}}</strong>,\n  </p>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Thank you for your interest in joining <strong style=\"color:#0B2A4A;\">Innovise IT</strong> and for taking the time to submit your application for the\n    <strong style=\"color:#0B2A4A;\">{{job_title}}</strong> position.\n  </p>\n\n  <!-- Status Card -->\n  <div style=\"background:#f0f7ff; border:1px solid #cfe3f7; border-radius:10px; padding:22px; margin:25px 0; text-align:center;\">\n\n    <div style=\"font-size:13px; color:#64748b; text-transform:uppercase; letter-spacing:1px;\">\n      Application Status\n    </div>\n\n    <div style=\"margin-top:8px; font-size:20px; font-weight:700; color:#0B2A4A;\">\n      Application Reviewed\n    </div>\n\n  </div>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    We would like to let you know that our recruitment team has carefully reviewed your application and qualifications.\n  </p>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Your application is currently being considered as part of our recruitment process. If your profile is shortlisted for the next stage, our team will contact you with further details.\n  </p>\n\n  <p style=\"margin:0 0 25px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    We appreciate your interest in Innovise IT and the time you have invested in your application.\n  </p>\n\n  <!-- Next Steps -->\n  <div style=\"border-left:4px solid #FDB913; background:#fffaf0; padding:16px 18px; margin:25px 0;\">\n\n    <p style=\"margin:0; font-size:14px; line-height:1.7; color:#5b4a20;\">\n      <strong>What happens next?</strong><br />\n      Our recruitment team will continue evaluating applications. If you are selected to proceed, you will receive another email with the next steps.\n    </p>\n\n  </div>\n\n  <p style=\"margin:25px 0 5px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Thank you again for considering Innovise IT as your next career opportunity. We wish you the very best throughout the recruitment process.\n  </p>\n\n  <p style=\"margin:20px 0 0; font-size:14px; line-height:1.7; color:#4b5563;\">\n    Best regards,<br />\n    <strong style=\"color:#0B2A4A;\">\n      Innovise IT Recruitment Team\n    </strong>\n  </p>\n\n</div>\n\n<!-- Footer -->\n<div style=\"background:#f8fafc; border-top:1px solid #e2e8f0; padding:22px 35px; text-align:center;\">\n\n  <p style=\"margin:0 0 8px; font-size:12px; color:#94a3b8;\">\n    This is an automated notification regarding your application.\n  </p>\n\n  <a\n    href=\"{{career_url}}\"\n    target=\"_blank\"\n    style=\"font-size:13px; color:#0B2A4A; font-weight:600; text-decoration:none;\"\n  >\n    View Career Opportunities\n  </a>\n\n</div>\n```\n\n  </div>\n\n</body>\n</html>\n','2026-08-08 10:03:53','2026-08-08 12:37:40'),(25,'Interview','Interview Invitation - Innovise IT','<!DOCTYPE html>\n\n<html>\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Interview Invitation - Innovise IT</title>\n</head>\n\n<body style=\"margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;\">\n\n  <div style=\"max-width:680px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);\">\n\n```\n<!-- Header -->\n<div style=\"background:#0B2A4A; padding:28px 35px; text-align:center;\">\n  <div style=\"font-size:25px; font-weight:700; color:#ffffff;\">\n    Innovise IT\n  </div>\n\n  <div style=\"margin-top:8px; font-size:14px; color:#dbe7f3;\">\n    Interview Invitation\n  </div>\n</div>\n\n<!-- Main Content -->\n<div style=\"padding:35px;\">\n\n  <p style=\"margin:0 0 18px; font-size:16px; line-height:1.7;\">\n    Hello <strong>{{first_name}}</strong>,\n  </p>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Thank you for your interest in joining Innovise IT. We are pleased to invite you to the next stage of our recruitment process for the\n    <strong style=\"color:#0B2A4A;\">{{job_title}}</strong>\n    position.\n  </p>\n\n  <p style=\"margin:0 0 25px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Following our review of your application, we would like to meet with you to discuss your experience, skills, and suitability for the role.\n  </p>\n\n  <!-- Interview Details -->\n  <div style=\"border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; margin:25px 0;\">\n\n    <div style=\"background:#f8fafc; padding:16px 20px; border-bottom:1px solid #e2e8f0;\">\n      <strong style=\"font-size:16px; color:#0B2A4A;\">\n        Interview Details\n      </strong>\n    </div>\n\n    <div style=\"padding:20px;\">\n\n      <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"font-size:14px;\">\n\n        <tr>\n          <td style=\"padding:9px 0; color:#64748b; width:40%;\">\n            Position\n          </td>\n          <td style=\"padding:9px 0; font-weight:600; color:#1e293b;\">\n            {{job_title}}\n          </td>\n        </tr>\n\n        <tr>\n          <td style=\"padding:9px 0; color:#64748b;\">\n            Interview Type\n          </td>\n          <td style=\"padding:9px 0; font-weight:600; color:#1e293b;\">\n            {{interview_type}}\n          </td>\n        </tr>\n\n        <tr>\n          <td style=\"padding:9px 0; color:#64748b;\">\n            Date\n          </td>\n          <td style=\"padding:9px 0; font-weight:600; color:#1e293b;\">\n            {{interview_date}}\n          </td>\n        </tr>\n\n        <tr>\n          <td style=\"padding:9px 0; color:#64748b;\">\n            Time\n          </td>\n          <td style=\"padding:9px 0; font-weight:600; color:#1e293b;\">\n            {{interview_time}} {{interview_timezone}}\n          </td>\n        </tr>\n\n        <tr>\n          <td style=\"padding:9px 0; color:#64748b;\">\n            Duration\n          </td>\n          <td style=\"padding:9px 0; font-weight:600; color:#1e293b;\">\n            {{interview_duration}}\n          </td>\n        </tr>\n\n        <tr>\n          <td style=\"padding:9px 0; color:#64748b;\">\n            Interviewer\n          </td>\n          <td style=\"padding:9px 0; font-weight:600; color:#1e293b;\">\n            {{interviewer_name}}\n          </td>\n        </tr>\n\n      </table>\n\n    </div>\n  </div>\n\n  <!-- Meeting Section -->\n  <div style=\"background:#f0f7ff; border:1px solid #cfe3f7; border-radius:10px; padding:22px; text-align:center; margin:25px 0;\">\n\n    <div style=\"font-size:16px; font-weight:700; color:#0B2A4A; margin-bottom:8px;\">\n      Join Your Interview\n    </div>\n\n    <p style=\"margin:0 0 18px; font-size:14px; color:#64748b;\">\n      Please join the meeting a few minutes before the scheduled time.\n    </p>\n\n    <a\n      href=\"{{meeting_link}}\"\n      target=\"_blank\"\n      style=\"display:inline-block; background:#0B2A4A; color:#ffffff; text-decoration:none; padding:13px 28px; border-radius:7px; font-size:14px; font-weight:600;\"\n    >\n      Join Interview\n    </a>\n\n    <p style=\"margin:18px 0 0; font-size:12px; color:#64748b; word-break:break-all;\">\n      {{meeting_link}}\n    </p>\n\n  </div>\n\n  <!-- Preparation -->\n  <div style=\"margin:28px 0;\">\n\n    <div style=\"font-size:15px; font-weight:700; color:#0B2A4A; margin-bottom:10px;\">\n      Before the Interview\n    </div>\n\n    <ul style=\"margin:0; padding-left:20px; color:#4b5563; font-size:14px; line-height:1.8;\">\n      <li>Please join 5–10 minutes before the scheduled time.</li>\n      <li>Ensure you have a stable internet connection.</li>\n      <li>Choose a quiet and professional environment.</li>\n      <li>Keep your camera and microphone ready.</li>\n      <li>Be prepared to discuss your experience and technical skills.</li>\n    </ul>\n\n  </div>\n\n  <!-- Reschedule -->\n  <div style=\"background:#fff8e8; border-left:4px solid #FDB913; padding:15px 18px; margin:25px 0;\">\n\n    <p style=\"margin:0; font-size:13px; line-height:1.6; color:#5b4a20;\">\n      <strong>Need to reschedule?</strong><br />\n      If you are unable to attend at the scheduled time, please contact our recruitment team at\n      <a\n        href=\"mailto:{{recruiter_email}}\"\n        style=\"color:#0B2A4A; font-weight:600;\"\n      >\n        {{recruiter_email}}\n      </a>\n      as soon as possible.\n    </p>\n\n  </div>\n\n  <p style=\"margin:25px 0 5px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    We look forward to speaking with you and learning more about your experience and skills.\n  </p>\n\n  <p style=\"margin:20px 0 0; font-size:14px; line-height:1.7; color:#4b5563;\">\n    Best regards,<br />\n    <strong style=\"color:#0B2A4A;\">\n      Innovise IT Recruitment Team\n    </strong><br />\n\n    <a\n      href=\"mailto:{{recruiter_email}}\"\n      style=\"color:#0B2A4A; text-decoration:none;\"\n    >\n      {{recruiter_email}}\n    </a>\n  </p>\n\n</div>\n\n<!-- Footer -->\n<div style=\"background:#f8fafc; border-top:1px solid #e2e8f0; padding:22px 35px; text-align:center;\">\n\n  <p style=\"margin:0 0 8px; font-size:12px; color:#94a3b8;\">\n    This email was sent regarding your application with Innovise IT.\n  </p>\n\n  <a\n    href=\"{{career_url}}\"\n    target=\"_blank\"\n    style=\"font-size:13px; color:#0B2A4A; font-weight:600; text-decoration:none;\"\n  >\n    View Career Opportunities\n  </a>\n\n</div>\n```\n\n  </div>\n\n</body>\n</html>\n','2026-08-08 10:03:53','2026-08-08 11:03:29'),(26,'Selected','Congratulations - Innovise IT','<!DOCTYPE html>\n\n<html>\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Selection Confirmation - Innovise IT</title>\n</head>\n\n<body style=\"margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;\">\n\n  <div style=\"max-width:680px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);\">\n\n```\n<!-- Header -->\n<div style=\"background:#0B2A4A; padding:30px 35px; text-align:center;\">\n  <div style=\"font-size:26px; font-weight:700; color:#ffffff;\">\n    Innovise IT\n  </div>\n\n  <div style=\"margin-top:8px; font-size:14px; color:#dbe7f3;\">\n    Selection Confirmation\n  </div>\n</div>\n\n<!-- Content -->\n<div style=\"padding:35px;\">\n\n  <p style=\"margin:0 0 18px; font-size:16px; line-height:1.7;\">\n    Hello <strong>{{first_name}}</strong>,\n  </p>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    We are delighted to share some great news with you. Following the successful completion of our recruitment process, we are pleased to confirm that you have been <strong style=\"color:#0B2A4A;\">selected for the {{job_title}} position</strong> at Innovise IT.\n  </p>\n\n  <!-- Selection Card -->\n  <div style=\"background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:24px; margin:28px 0; text-align:center;\">\n\n    <div style=\"font-size:13px; color:#64748b; text-transform:uppercase; letter-spacing:1px;\">\n      Selection Status\n    </div>\n\n    <div style=\"margin-top:10px; font-size:21px; font-weight:700; color:#166534;\">\n      Congratulations — You’re Selected!\n    </div>\n\n    <div style=\"margin-top:8px; font-size:14px; color:#4b5563;\">\n      Position: <strong>{{job_title}}</strong>\n    </div>\n\n  </div>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    We appreciate the time, effort, and enthusiasm you have demonstrated throughout the selection process. Your skills and experience stood out to our team, and we are excited about the possibility of welcoming you to Innovise IT.\n  </p>\n\n  <!-- Next Steps -->\n  <div style=\"background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:22px; margin:25px 0;\">\n\n    <div style=\"font-size:16px; font-weight:700; color:#0B2A4A; margin-bottom:10px;\">\n      What happens next?\n    </div>\n\n    <p style=\"margin:0; font-size:14px; line-height:1.8; color:#4b5563;\">\n      Our HR team will contact you shortly with the next steps, including onboarding information, documentation requirements, joining details, and any other information needed to complete the hiring process.\n    </p>\n\n  </div>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Please keep an eye on your email for further communication from our HR team.\n  </p>\n\n  <p style=\"margin:0 0 25px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Once again, congratulations on your achievement. We look forward to having you as part of the Innovise IT team.\n  </p>\n\n  <!-- Career Link -->\n  <div style=\"text-align:center; margin:28px 0;\">\n\n    <a\n      href=\"{{career_url}}\"\n      target=\"_blank\"\n      style=\"display:inline-block; background:#0B2A4A; color:#ffffff; text-decoration:none; padding:13px 28px; border-radius:7px; font-size:14px; font-weight:600;\"\n    >\n      Explore Innovise IT\n    </a>\n\n  </div>\n\n  <p style=\"margin:25px 0 0; font-size:14px; line-height:1.7; color:#4b5563;\">\n    Best regards,<br />\n    <strong style=\"color:#0B2A4A;\">\n      Innovise IT Recruitment Team\n    </strong><br />\n\n    <a\n      href=\"mailto:{{recruiter_email}}\"\n      style=\"color:#0B2A4A; text-decoration:none;\"\n    >\n      {{recruiter_email}}\n    </a>\n  </p>\n\n</div>\n\n<!-- Footer -->\n<div style=\"background:#f8fafc; border-top:1px solid #e2e8f0; padding:22px 35px; text-align:center;\">\n\n  <p style=\"margin:0 0 8px; font-size:12px; color:#94a3b8;\">\n    This email is an official recruitment communication from Innovise IT.\n  </p>\n\n  <a\n    href=\"{{career_url}}\"\n    target=\"_blank\"\n    style=\"font-size:13px; color:#0B2A4A; font-weight:600; text-decoration:none;\"\n  >\n    Innovise IT Careers\n  </a>\n\n</div>\n```\n\n  </div>\n\n</body>\n</html>\n','2026-08-08 10:03:53','2026-08-08 12:38:24'),(27,'Rejected','Application Update - Innovise IT','<!DOCTYPE html>\n\n<html>\n<head>\n  <meta charset=\"UTF-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <title>Application Update - Innovise IT</title>\n</head>\n\n<body style=\"margin:0; padding:0; background-color:#f4f7fb; font-family:Arial, Helvetica, sans-serif; color:#1f2937;\">\n\n  <div style=\"max-width:680px; margin:30px auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);\">\n\n```\n<!-- Header -->\n<div style=\"background:#0B2A4A; padding:30px 35px; text-align:center;\">\n  <div style=\"font-size:26px; font-weight:700; color:#ffffff;\">\n    Innovise IT\n  </div>\n\n  <div style=\"margin-top:8px; font-size:14px; color:#dbe7f3;\">\n    Application Status Update\n  </div>\n</div>\n\n<!-- Content -->\n<div style=\"padding:35px;\">\n\n  <p style=\"margin:0 0 18px; font-size:16px; line-height:1.7;\">\n    Hello <strong>{{first_name}}</strong>,\n  </p>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Thank you for taking the time to apply for the\n    <strong style=\"color:#0B2A4A;\">{{job_title}}</strong>\n    position at Innovise IT and for your interest in being part of our team.\n  </p>\n\n  <!-- Status Card -->\n  <div style=\"background:#fff7f7; border:1px solid #fecaca; border-radius:10px; padding:24px; margin:28px 0; text-align:center;\">\n\n    <div style=\"font-size:13px; color:#64748b; text-transform:uppercase; letter-spacing:1px;\">\n      Application Status\n    </div>\n\n    <div style=\"margin-top:10px; font-size:20px; font-weight:700; color:#991b1b;\">\n      Application Not Selected\n    </div>\n\n  </div>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    After careful consideration of your application and qualifications, we regret to inform you that we will not be moving forward with your application for this position at this time.\n  </p>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    Please understand that this decision was made after reviewing a number of qualified candidates, and it does not diminish the value of your experience, skills, or accomplishments.\n  </p>\n\n  <!-- Future Opportunities -->\n  <div style=\"background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:22px; margin:25px 0;\">\n\n    <div style=\"font-size:16px; font-weight:700; color:#0B2A4A; margin-bottom:10px;\">\n      Future Opportunities\n    </div>\n\n    <p style=\"margin:0; font-size:14px; line-height:1.8; color:#4b5563;\">\n      We encourage you to continue exploring opportunities with Innovise IT. New positions may become available that better match your skills and experience, and we would be pleased to consider your application in the future.\n    </p>\n\n  </div>\n\n  <!-- Career Button -->\n  <div style=\"text-align:center; margin:28px 0;\">\n\n    <a\n      href=\"{{career_url}}\"\n      target=\"_blank\"\n      style=\"display:inline-block; background:#0B2A4A; color:#ffffff; text-decoration:none; padding:13px 28px; border-radius:7px; font-size:14px; font-weight:600;\"\n    >\n      Explore Future Opportunities\n    </a>\n\n  </div>\n\n  <p style=\"margin:0 0 18px; font-size:15px; line-height:1.7; color:#4b5563;\">\n    We sincerely appreciate your interest in Innovise IT and the effort you invested in the application process. We wish you continued success in your career journey.\n  </p>\n\n  <p style=\"margin:25px 0 0; font-size:14px; line-height:1.7; color:#4b5563;\">\n    Best regards,<br />\n    <strong style=\"color:#0B2A4A;\">\n      Innovise IT Recruitment Team\n    </strong><br />\n\n    <a\n      href=\"mailto:{{recruiter_email}}\"\n      style=\"color:#0B2A4A; text-decoration:none;\"\n    >\n      {{recruiter_email}}\n    </a>\n  </p>\n\n</div>\n\n<!-- Footer -->\n<div style=\"background:#f8fafc; border-top:1px solid #e2e8f0; padding:22px 35px; text-align:center;\">\n\n  <p style=\"margin:0 0 8px; font-size:12px; color:#94a3b8;\">\n    This is an automated notification regarding your application.\n  </p>\n\n  <a\n    href=\"{{career_url}}\"\n    target=\"_blank\"\n    style=\"font-size:13px; color:#0B2A4A; font-weight:600; text-decoration:none;\"\n  >\n    Innovise IT Careers\n  </a>\n\n</div>\n```\n\n  </div>\n\n</body>\n</html>\n','2026-08-08 10:03:53','2026-08-08 12:39:09'),(28,'Application Submitted','Application Received - {{job_title}}','<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>Application Received - Innovise IT</title>\n</head>\n<body style=\"margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;\">\n  <div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;padding:40px;box-shadow:0 2px 10px rgba(0,0,0,0.08);\">\n    \n    <h2 style=\"color:#0B2A4A;margin-top:0;\">\n      Hello {{first_name}} {{last_name}},\n    </h2>\n\n    <p style=\"font-size:16px;color:#333;line-height:1.6;\">\n      Thank you for applying for the\n      <strong>{{job_title}}</strong>\n      position at Innovise IT.\n    </p>\n\n    <p style=\"font-size:16px;color:#333;line-height:1.6;\">\n      We have successfully received your application and resume.\n      Our recruitment team will carefully review your profile.\n    </p>\n\n    <p style=\"font-size:16px;color:#333;line-height:1.6;\">\n      If your profile is shortlisted, our recruitment team will contact\n      you regarding the next steps.\n    </p>\n\n    <div style=\"margin:30px 0;text-align:center;\">\n      <a href=\"{{career_url}}\"\n         style=\"display:inline-block;padding:12px 24px;background:#0B2A4A;color:#ffffff;text-decoration:none;border-radius:6px;\">\n        View Careers\n      </a>\n    </div>\n\n    <p style=\"font-size:14px;color:#666;line-height:1.5;\">\n      Best Regards,<br>\n      <strong>Innovise IT Recruitment Team</strong>\n    </p>\n\n  </div>\n</body>\n</html>','2026-08-11 10:16:38','2026-08-11 10:16:38'),(29,'New Application','New Job Application - {{job_title}}','<!DOCTYPE html>\n<html>\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>New Job Application - Innovise IT</title>\n</head>\n<body style=\"margin:0;padding:0;background-color:#f4f7fb;font-family:Arial,sans-serif;\">\n  <div style=\"max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;padding:40px;box-shadow:0 2px 10px rgba(0,0,0,0.08);\">\n\n    <h2 style=\"color:#0B2A4A;margin-top:0;\">\n      New Job Application\n    </h2>\n\n    <p style=\"font-size:16px;color:#333;line-height:1.6;\">\n      A new candidate has applied for the\n      <strong>{{job_title}}</strong>\n      position.\n    </p>\n\n    <div style=\"background:#f4f7fb;padding:20px;border-radius:8px;margin:20px 0;\">\n      <p style=\"margin:8px 0;\">\n        <strong>Candidate:</strong> {{full_name}}\n      </p>\n\n      <p style=\"margin:8px 0;\">\n        <strong>Email:</strong> {{email}}\n      </p>\n\n      <p style=\"margin:8px 0;\">\n        <strong>Phone:</strong> {{phone}}\n      </p>\n\n      <p style=\"margin:8px 0;\">\n        <strong>Experience:</strong> {{experience}}\n      </p>\n\n      <p style=\"margin:8px 0;\">\n        <strong>Position:</strong> {{job_title}}\n      </p>\n    </div>\n\n    <p style=\"font-size:16px;color:#333;line-height:1.6;\">\n      Please log in to the Innovise IT Admin Panel to review the\n      candidate application and resume.\n    </p>\n\n    <div style=\"margin:30px 0;text-align:center;\">\n      <a href=\"{{admin_url}}\"\n         style=\"display:inline-block;padding:12px 24px;background:#0B2A4A;color:#ffffff;text-decoration:none;border-radius:6px;\">\n        Open Application\n      </a>\n    </div>\n\n    <p style=\"font-size:14px;color:#666;line-height:1.5;\">\n      Innovise IT Recruitment System\n    </p>\n\n  </div>\n</body>\n</html>','2026-08-11 10:16:38','2026-08-11 10:16:38');
/*!40000 ALTER TABLE `email_templates` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;


-- ---------------------------------------------------------------------
-- First Super Admin (edit, then uncomment and run once)
-- Generate the hash with: node hashPassword.js
-- ---------------------------------------------------------------------
-- INSERT INTO `admins` (`full_name`, `email`, `password`, `role`, `status`)
-- VALUES ('Super Admin', 'admin@example.com', '<bcrypt hash>', 'Super Admin', 'Active');
