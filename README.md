# Innovise Careers Backend

REST API for the **Innovise Careers Portal**. It publishes jobs and takes candidate applications with resumes. It then runs the hiring pipeline: review, interview approval, scheduling, decision, email notifications and audit logging.

- **Public (no login):** candidates browse open jobs and departments and apply with a resume.
- **Admin (JWT):** admins with different roles manage departments, jobs, applications, interviews, emails, admin users and audit logs, and view the dashboard.

---

## Table of contents

1. [Tech stack](#tech-stack)
2. [Architecture](#architecture)
3. [Project structure](#project-structure)
4. [Getting started](#getting-started)
5. [Environment variables](#environment-variables)
6. [Database](#database)
7. [Roles and access control](#roles-and-access-control)
8. [Project flows](#project-flows)
9. [API reference](#api-reference)
10. [Integrations](#integrations)
11. [Response format](#response-format)
12. [Utility scripts](#utility-scripts)
13. [Deployment](#deployment)
14. [Known issues](#known-issues)

---

## Tech stack

| Layer        | Technology                                                                 |
| ------------ | -------------------------------------------------------------------------- |
| Runtime      | Node.js, Express 5                                                         |
| Database     | MySQL (`mysql2/promise` connection pool, 10 connections)                   |
| Auth         | JWT (`jsonwebtoken`, 1-day expiry), `bcrypt` password hashing              |
| Validation   | `express-validator`                                                        |
| File upload  | `multer` (in memory, 5 MB, PDF/DOC/DOCX) → AWS S3                          |
| Email        | AWS SES (`@aws-sdk/client-ses`), Nodemailer SMTP, Handlebars HTML templates |
| Integrations | LinkedIn REST API (`axios`)                                                |
| Security/ops | `helmet`, `cors`, `compression`, `morgan`                                  |

---

## Architecture

Every module follows the same layered pattern:

```
Request
  → Route (src/routes)            URL + role list
  → Middleware (src/middleware)   authenticate → authorize(role) → validate → upload
  → Controller (src/controllers)  parse request, write audit log, send response
  → Service (src/services)        business rules, S3, email, LinkedIn
  → Repository (src/repositories) parameterised SQL
  → MySQL
```

Errors are thrown as `ApiError(status, message)` and returned by the global error handler in `src/middleware/error.middleware.js`.

---

## Project structure

```
innovise-careers-backend/
├── config/s3.js                 # S3 client used for signed resume URLs (src/utils/s3Url.js)
├── database/schema.sql          # MySQL schema + required email templates
├── src/
│   ├── server.js                # Entry: load .env, check MySQL + SMTP, start server
│   ├── app.js                   # Express app, middleware, route mounting
│   ├── config/
│   │   ├── db.js                # MySQL pool
│   │   ├── mail.js              # Nodemailer SMTP transport
│   │   ├── ses.js               # AWS SES client + sendSES()
│   │   └── s3.js                # AWS S3 client
│   ├── routes/                  # One file per module (+ role lists)
│   ├── middleware/
│   │   ├── auth.middleware.js   # Verifies Bearer JWT → req.user
│   │   ├── role.middleware.js   # authorize(...roles)
│   │   ├── rbac.middleware.js   # Same check, used by audit routes
│   │   ├── upload.middleware.js # Multer memory storage, 5 MB, PDF/DOC/DOCX
│   │   ├── validate.middleware.js
│   │   └── error.middleware.js
│   ├── controllers/             # admin, application, audit, auth, dashboard, department,
│   ├── services/                #   email, emailTemplate, interview, job
│   ├── repositories/            #   (+ services: linkedin, s3)
│   ├── validations/             # express-validator rule sets
│   ├── templates/               # HTML email templates + layouts/base.html
│   ├── utils/                   # ApiError, ApiResponse, asyncHandler, jwt, s3Url, template, token
│   └── uploads/resumes/         # Legacy local resumes (before S3)
├── hashPassword.js              # Generate a bcrypt hash
├── test-s3.js                   # S3 connectivity test
├── testEmail.js                 # Email sending test
└── .env.example
```

---

## Getting started

### Prerequisites

- Node.js 18+
- MySQL 8 with the project schema (see [Database](#database))
- AWS account with an S3 bucket and a verified SES sender

### Install and run

```bash
npm install
cp .env.example .env      # then fill in all variables below
npm run dev               # development (nodemon)
npm start                 # production
```

On startup the server checks MySQL and the SMTP connection and logs:

```
✅ MySQL Connected
📂 Database: <db name>
🚀 Server running on http://localhost:5000
```

Health check: `GET /api/health`.

### Database setup

Load [database/schema.sql](database/schema.sql) as shown in [Database](#database). It creates all the tables and inserts the email templates.

### First Super Admin

Admins are not seeded. Create the first admin directly in MySQL (a commented template is at the end of `database/schema.sql`):

1. Put the password in `hashPassword.js` and run `node hashPassword.js` to get a bcrypt hash.
2. Insert it:

```sql
INSERT INTO admins (full_name, email, password, role, status)
VALUES ('Super Admin', 'admin@example.com', '<bcrypt hash>', 'Super Admin', 'Active');
```

---

## Environment variables

| Variable                                                   | Purpose                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| `PORT`                                                     | HTTP port (default `5000`)                                           |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`  | MySQL connection                                                     |
| `JWT_SECRET`                                               | Signs and verifies admin tokens                                      |
| `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` | S3 and SES                                                           |
| `AWS_S3_BUCKET`, `AWS_S3_BUCKET_NAME`                      | Resume bucket (both names are used in code — set both to the same value) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`     | SMTP transport (Amazon SES SMTP)                                     |
| `SMTP_FROM`                                                | Sender address for all emails                                        |
| `HR_EMAIL`                                                 | Receives "New Application" alerts; recruiter contact in invites      |
| `ADMIN_URL`                                                | Admin portal URL (login, reset-password and applications links)      |
| `CAREER_URL`                                               | Public careers site URL used in candidate emails                     |
| `FRONTEND_URL`                                             | Base URL for job links in LinkedIn posts                             |
| `LINKEDIN_ACCESS_TOKEN`                                    | LinkedIn API token (posting is skipped if empty)                     |
| `LINKEDIN_ORG_ID`                                          | Post as the company page; if empty, posts as the token's member      |

Never commit `.env`.

---

## Database

The full schema and the required email templates are in [database/schema.sql](database/schema.sql). It was exported from the local database and contains no candidate, admin or log data.

```bash
mysql -u <user> -p -e "CREATE DATABASE innovise_careers CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;"
mysql -u <user> -p innovise_careers < database/schema.sql
```

> ⚠️ The script drops and recreates every table. Never run it on a database whose data you want to keep.

The file creates 9 tables (`settings` exists but is not used by the code yet):

| Table             | Main columns                                                                                                                                                                                                                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `admins`          | id, full_name, email, password, role, status (`Active`/`Inactive`/`Suspended`), last_login, reset_token, reset token expiry, created_at                                                                                                                                                |
| `departments`     | id, department_name, description                                                                                                                                                                                                                                                       |
| `job_positions`   | id, department_id, title, location, employment_type, experience_level, salary_min, salary_max, description, responsibilities, requirements, benefits, status, openings, application_deadline                                                                                          |
| `applications`    | id, job_id, first_name, last_name, email, phone, current_location, linkedin, portfolio, experience, salary_expectation, availability, source, authorized_to_work, requires_sponsorship, resume_key, resume_original_name, resume_mime_type, resume_size, cover_letter, status, interview_approval_status, approved_by, approved_at, applied_at |
| `interviews`      | id, application_id, interview_date, interview_time, interview_timezone, duration_minutes, interview_type, interviewer_name, meeting_link, status                                                                                                                                      |
| `email_templates` | id, name, subject, body                                                                                                                                                                                                                                                                |
| `email_logs`      | id, recipient, subject, body, status (`Sent`/`Failed`), error_message, sent_by                                                                                                                                                                                                         |
| `audit_logs`      | id, admin_id, module, action, description, ip_address, user_agent                                                                                                                                                                                                                      |

### Required email templates (`email_templates.name`)

| Name                   | Sent when                                  |
| ---------------------- | ------------------------------------------ |
| `Application Submitted` | Candidate applies (to candidate)          |
| `New Application`      | Candidate applies (to `HR_EMAIL`)          |
| `Application Reviewed` | Status → Reviewed                          |
| `Interview`            | Status → Interview, or interview scheduled |
| `Selected`             | Status → Selected                          |
| `Rejected`             | Status → Rejected                          |

Template subject and body use `{{variable}}` placeholders, for example `{{first_name}}`, `{{job_title}}`, `{{interview_date}}` and `{{meeting_link}}`.

File-based templates in `src/templates/` are used for `forgot-password`, `welcome-admin` and the test email.

---

## Roles and access control

Login returns a JWT with `id`, `email` and `role`. Send it as `Authorization: Bearer <token>`.

| Role                       | Dashboard | Departments | Jobs | Applications | Request interview | Approve interview | Emails | Admins | Audit logs |
| -------------------------- | :-------: | :---------: | :--: | :----------: | :---------------: | :---------------: | :----: | :----: | :--------: |
| Super Admin                | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| HR Administrator           | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | — | — |
| Talent Acquisition Manager | ✅ | ✅ | ✅ | ✅ | — | ✅ | ✅ (send/view) | — | — |
| HR Operations              | ✅ | ✅ | ✅ | — | — | — | ✅ | — | — |
| Recruiter                  | ✅ | — | — | ✅ | ✅ | — | ✅ (send/view) | — | — |
| Talent Sourcer             | ✅ | — | — | ✅ | ✅ | — | ✅ (send/view) | — | — |
| Hiring Manager             | ✅ | — | ✅ | ✅ | ✅ | — | — | — | — |
| Management Viewer          | ✅ | — | — | — | — | — | — | — | — |
| Auditor                    | ✅ | — | — | — | — | — | — | — | ✅ |
| Interview Panel            | — | — | — | — | — | — | — | — | — |

- All **DELETE** actions are Super Admin only.
- The last Super Admin cannot be deleted.
- `Interview Panel` is a valid role but no route grants it access yet.

---

## Project flows

### Overall hiring flow

```
1. Job created ──► 2. Candidate applies ──► 3. Emails sent
                                                   │
6. Approve/reject ◄── 5. Interview requested ◄── 4. Recruiter reviews
       │
7. Interview scheduled ──► 8. Interview held ──► 9. Final decision ──► 10. Outcome email + audit
```

### 1. Job flow

1. A job manager calls `POST /api/jobs`. The department must exist.
2. The job is saved in `job_positions`.
3. The job is posted to LinkedIn (`src/services/linkedin.service.js`). If there is no token or the API fails, posting is skipped and the job is still created.
4. An audit log is written (`Jobs / CREATE`).
5. Each time jobs are listed or read, jobs past `application_deadline` are set to `Closed`.
6. Public requests (no token) to `GET /api/jobs` do not return closed jobs.

### 2. Application flow (public)

1. The candidate submits `POST /api/applications` as `multipart/form-data`, with the resume in the `resume` field (PDF/DOC/DOCX, max 5 MB).
2. The job is checked.
3. The resume is uploaded to S3 as `applications/YYYY/MM/<uuid>.<ext>`.
4. The application is saved with status `Pending`. If the save fails, the S3 file is deleted.
5. Emails are sent without blocking the response:
   - `Application Submitted` → candidate
   - `New Application` → `HR_EMAIL`
6. Admins list applications with filters and open resumes through `GET /api/applications/:id/resume`, which returns a pre-signed S3 URL valid for 1 hour.

### 3. Application status flow

```
Pending → Reviewed → Interview → Selected
                               ↘ Rejected
```

`PUT /api/applications/:id/status` with `{ "status": "..." }`:

- The candidate gets the matching template email (Reviewed, Interview, Selected or Rejected).
- An audit log is written (`Applications / STATUS_UPDATE`).

### 4. Interview approval and scheduling flow

1. **Request:** a Recruiter, Talent Sourcer, Hiring Manager, HR Administrator or Super Admin calls `POST /api/applications/:id/request-interview`. This sets `interview_approval_status = Pending`.
2. **Approve or reject:** a Super Admin, HR Administrator or Talent Acquisition Manager calls:
   - `PUT /api/applications/:id/approve-interview` → `Approved`, with `approved_by` and `approved_at` stored
   - `PUT /api/applications/:id/reject-interview` → `Rejected`
3. **Schedule:** `POST /api/interviews` with the interview details:

   ```json
   {
     "application_id": 12,
     "interview_date": "2026-11-25",
     "interview_time": "10:30",
     "interview_timezone": "IST",
     "duration_minutes": 45,
     "interview_type": "Video",
     "interviewer_name": "Jane Doe",
     "meeting_link": "https://meet.example.com/abc"
   }
   ```

   The interview is saved with status `Scheduled`, the application moves to `Interview`, and the candidate gets the `Interview` invitation email.
4. **Manage:** update (`PUT /api/interviews/:id`), change status (`PATCH /api/interviews/:id/status`) or delete the interview.
5. Request, approve and reject each write an audit log.

### 5. Admin and authentication flow

1. A Super Admin creates an admin (`POST /api/admins`) with a role. The password is hashed and a welcome email with the login link is sent.
2. The admin logs in with `POST /api/auth/login` and receives a JWT valid for 1 day.
3. Forgot password: `POST /api/auth/forgot-password` emails a link to `ADMIN_URL/reset-password?token=...`, valid for 15 minutes. `POST /api/auth/reset-password` sets the new password.
4. A Super Admin can update details, change role or password, or delete admins.

### 6. Email flow

1. The service loads the template by name from `email_templates`.
2. It replaces `{{variables}}` in the subject and body.
3. It sends the email through AWS SES from `SMTP_FROM`.
4. Each attempt is logged in `email_logs` as `Sent` or `Failed` (with the error).
5. Admins can send ad-hoc emails, resend logged emails, and manage templates.

### 7. Dashboard and audit flow

- `GET /api/dashboard` returns totals, recent jobs and applications, job and application status breakdowns, jobs per department, and monthly applications.
- Job, application, admin and login actions are written to `audit_logs` with admin ID, module, action, description, IP and user agent.
- Super Admin and Auditor can read the audit log by ID, by admin or by module.

---

## API reference

Base path: `/api`

### Health and auth

| Method | Endpoint                     | Access | Description                 |
| ------ | ---------------------------- | ------ | --------------------------- |
| GET    | `/health`                    | Public | Health check                |
| POST   | `/auth/login`                | Public | Admin login, returns JWT    |
| POST   | `/auth/forgot-password`      | Public | Send password reset email   |
| POST   | `/auth/reset-password`       | Public | Reset password with token   |

### Departments

| Method | Endpoint            | Access                                                        |
| ------ | ------------------- | ------------------------------------------------------------- |
| GET    | `/departments`      | Public                                                        |
| GET    | `/departments/:id`  | Public                                                        |
| POST   | `/departments`      | Super Admin, HR Administrator, TA Manager, HR Operations      |
| PUT    | `/departments/:id`  | Super Admin, HR Administrator, TA Manager, HR Operations      |
| DELETE | `/departments/:id`  | Super Admin                                                   |

### Jobs

| Method | Endpoint     | Access                                                                       | Notes                                               |
| ------ | ------------ | ---------------------------------------------------------------------------- | --------------------------------------------------- |
| GET    | `/jobs`      | Public                                                                       | Query: `search`, `department_id`, `status`, `page`, `limit` |
| GET    | `/jobs/:id`  | Public                                                                       |                                                     |
| POST   | `/jobs`      | Super Admin, HR Administrator, TA Manager, HR Operations, Hiring Manager     | Posts to LinkedIn                                   |
| PUT    | `/jobs/:id`  | Same as POST                                                                 |                                                     |
| DELETE | `/jobs/:id`  | Super Admin                                                                  |                                                     |

### Applications

| Method | Endpoint                                  | Access                                                          |
| ------ | ----------------------------------------- | --------------------------------------------------------------- |
| POST   | `/applications`                           | Public (multipart, `resume` file)                               |
| GET    | `/applications`                           | Application roles¹                                              |
| GET    | `/applications/:id`                       | Application roles¹                                              |
| GET    | `/applications/:id/resume`                | Application roles¹                                              |
| PUT    | `/applications/:id/status`                | Application roles¹                                              |
| POST   | `/applications/:id/request-interview`     | Super Admin, HR Administrator, Recruiter, Talent Sourcer, Hiring Manager |
| PUT    | `/applications/:id/approve-interview`     | Super Admin, HR Administrator, TA Manager                       |
| PUT    | `/applications/:id/reject-interview`      | Super Admin, HR Administrator, TA Manager                       |
| DELETE | `/applications/:id`                       | Super Admin                                                     |

¹ Super Admin, HR Administrator, TA Manager, Recruiter, Talent Sourcer, Hiring Manager.

`GET /applications` query: `page`, `limit` (max 100), `search` (name or email), `status`, `job_id`, `sort` (`latest` | `oldest`).

### Interviews

| Method | Endpoint                                   | Description                        |
| ------ | ------------------------------------------ | ---------------------------------- |
| POST   | `/interviews`                              | Schedule interview + send invite   |
| GET    | `/interviews/:id`                          | Get interview                      |
| GET    | `/interviews/application/:applicationId`   | Interviews for an application      |
| PUT    | `/interviews/:id`                          | Update interview                   |
| PATCH  | `/interviews/:id/status`                   | Update interview status            |
| DELETE | `/interviews/:id`                          | Delete interview                   |

> ⚠️ Interview routes currently have no authentication. See [Known issues](#known-issues).

### Dashboard

| Method | Endpoint                         | Access                                |
| ------ | -------------------------------- | ------------------------------------- |
| GET    | `/dashboard`                     | All roles except Interview Panel      |
| GET    | `/dashboard/recent-activities`   | Any logged-in admin                   |

### Admins (Super Admin only)

| Method | Endpoint                 | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/admins`                | List admins            |
| GET    | `/admins/:id`            | Get admin              |
| POST   | `/admins`                | Create admin           |
| PUT    | `/admins/:id`            | Update name/email/status |
| PATCH  | `/admins/:id/role`       | Change role            |
| PATCH  | `/admins/:id/password`   | Change password        |
| DELETE | `/admins/:id`            | Delete admin           |

### Audit logs (Super Admin, Auditor)

| Method | Endpoint                          |
| ------ | --------------------------------- |
| GET    | `/audit-logs`                     |
| GET    | `/audit-logs/:id`                 |
| GET    | `/audit-logs/admin/:adminId`      |
| GET    | `/audit-logs/module/:module`      |

### Emails

| Method | Endpoint               | Access                                                                                 |
| ------ | ---------------------- | -------------------------------------------------------------------------------------- |
| POST   | `/emails/send`         | Super Admin, HR Administrator, TA Manager, Recruiter, Talent Sourcer, HR Operations    |
| POST   | `/emails/resend/:id`   | Same as above                                                                          |
| POST   | `/emails/test`         | Super Admin                                                                            |
| GET    | `/emails`              | Same as send                                                                           |
| GET    | `/emails/:id`          | Same as send                                                                           |
| POST   | `/emails`              | Super Admin, HR Administrator, HR Operations                                           |
| PUT    | `/emails/:id`          | Super Admin, HR Administrator, HR Operations                                           |
| DELETE | `/emails/:id`          | Super Admin                                                                            |

### Email templates

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | `/email-templates`        |
| GET    | `/email-templates/:id`    |
| POST   | `/email-templates`        |
| PUT    | `/email-templates/:id`    |
| DELETE | `/email-templates/:id`    |

> ⚠️ Email template routes currently have no authentication. See [Known issues](#known-issues).

---

## Integrations

| Service      | Code                                                  | Usage                                                                                   |
| ------------ | ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| AWS S3       | `src/services/s3.service.js`, `src/utils/s3Url.js`    | Stores resumes; pre-signed download URLs                                                |
| AWS SES      | `src/config/ses.js`, `src/services/email.service.js`  | Sends all emails; results logged in `email_logs`                                        |
| SMTP         | `src/config/mail.js`                                  | Nodemailer transport, verified at startup                                               |
| LinkedIn API | `src/services/linkedin.service.js`                    | Posts new jobs to `https://api.linkedin.com/rest/posts`, linking to `FRONTEND_URL/careers/jobdetails/:id` |

LinkedIn access tokens expire (usually after 60 days). Generate a new one through the LinkedIn OAuth flow and update `LINKEDIN_ACCESS_TOKEN`.

---

## Response format

Success:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Jobs fetched successfully",
  "data": {}
}
```

Error:

```json
{
  "success": false,
  "message": "Application not found"
}
```

Validation error (HTTP 400):

```json
{
  "success": false,
  "errors": [{ "msg": "Invalid role", "path": "role" }]
}
```

---

## Utility scripts

| Script            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `hashPassword.js` | Print a bcrypt hash for a password          |
| `test-s3.js`      | Test the S3 upload connection               |
| `testEmail.js`    | Test email sending                          |

---

## Deployment

The repo has no Dockerfile or CI config. The service runs as a Node process:

1. Set all [environment variables](#environment-variables) on the server, including the production `ADMIN_URL`, `CAREER_URL` and `FRONTEND_URL`.
2. `npm install --production`
3. `npm start` (a process manager such as PM2 is recommended).
4. The server needs network access to MySQL, S3, SES and LinkedIn.
5. The AWS credentials need S3 put/get/delete on the bucket and SES send permission, with a verified sender.

---

## Known issues

| Priority | Issue                                                                                          | Fix                                              |
| -------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| High     | `/api/interviews` and `/api/email-templates` have no authentication                           | Add `authenticate` + `authorize` to the routes   |
| High     | Scheduling an interview does not check `interview_approval_status`                            | Require `Approved` before scheduling             |
| Medium   | Login does not block `Inactive`/`Suspended` admins; `last_login` is not updated                | Check status in `auth.service.js`                |
| Medium   | `getById` is exported twice in `job.controller.js`; closed jobs are readable by ID publicly    | Remove the duplicate                             |
| Medium   | Validation files for applications, jobs and departments are not used in routes                | Add them to the routes                           |
| Medium   | CORS allows all origins                                                                        | Restrict to the portal domains                   |
| Low      | Large commented-out code blocks in several files                                               | Remove                                           |
| Low      | Duplicate S3 clients and role middlewares; two bucket variable names                           | Keep one of each                                 |
| Medium   | Deleting a department cascades: it deletes its jobs, their applications and interviews (`ON DELETE CASCADE`); S3 resumes are left behind | Block delete when jobs exist, or soft-delete |
| Low      | No migrations or tests in the repo; `.env.example` is incomplete                               | Add migrations, tests, full `.env.example`       |
| Low      | Unused `settings` table and legacy `applications.resume` column                                | Remove or start using them                       |
| Low      | Legacy resume files are committed in `src/uploads/resumes/`                                    | Remove from git                                  |
