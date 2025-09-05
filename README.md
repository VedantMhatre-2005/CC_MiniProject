# Cloud-based Resume PDF Generator

A full-stack web application that enables users to create professional PDF resumes through an intuitive web interface. The application leverages cloud technologies for scalable storage, database management, and PDF generation.

## 🚀 Project Overview

This project is a modern resume builder that allows users to:
- Input personal information, education, work experience, and skills
- Upload profile images
- Generate professional PDF resumes instantly
- Download and share resumes seamlessly

The application follows a microservices architecture with a React frontend and Django REST API backend, utilizing AWS cloud services for production deployment.

## 🛠️ Tech Stack

### Frontend
- **React 19.1.1** - Modern UI library for building interactive user interfaces
- **Create React App** - Boilerplate and build tools
- **JavaScript ES6+** - Core programming language
- **CSS3** - Styling and responsive design

### Backend
- **Django 4.x** - High-level Python web framework
- **Django REST Framework** - Powerful toolkit for building Web APIs
- **Python 3.x** - Core programming language
- **WeasyPrint** - PDF generation library
- **Pillow** - Image processing library

### Database & Storage
- **MySQL** - Relational database for data persistence
- **AWS RDS** - Managed database service
- **AWS S3** - Object storage for profile images

### Development Tools
- **django-storages** - Django storage backends for AWS S3
- **django-cors-headers** - CORS handling for cross-origin requests

## 🏗️ Architecture & AWS Services

The application utilizes the following AWS services for a scalable cloud deployment:

### 1. **Amazon EC2** (Elastic Compute Cloud)
- Hosts the Django backend application
- Provides scalable compute capacity
- Configurable instance types based on load requirements

### 2. **Amazon RDS** (Relational Database Service)
- Managed MySQL database instance
- Automated backups and maintenance
- High availability and security features

### 3. **Amazon S3** (Simple Storage Service)
- Stores user-uploaded profile images
- Static file hosting for production assets
- Secure and scalable object storage

### 4. **Amazon CloudFront** (Content Delivery Network)
- Global content distribution
- Faster loading times for static assets
- Enhanced security and DDoS protection

### 5. **AWS Load Balancer** (Application Load Balancer)
- Distributes incoming traffic across multiple EC2 instances
- High availability and fault tolerance
- SSL/TLS termination

## 📁 Directory Structure

```
CC_MiniProject/
├── resume_backend/                 # Django REST API Backend
│   ├── manage.py                  # Django management script
│   ├── resume_backend/            # Main Django project directory
│   │   ├── settings.py           # Django configuration (AWS S3, RDS setup)
│   │   ├── urls.py               # Main URL routing
│   │   └── wsgi.py               # WSGI configuration for deployment
│   └── portfolio/                 # Main Django app
│       ├── models.py             # Database models (Profile, Education, Experience, Skill)
│       ├── serializers.py        # DRF serializers for API
│       ├── views.py              # API endpoints and PDF generation
│       ├── urls.py               # App-specific URL routing
│       └── templates/            
│           └── resume_template.html  # HTML template for PDF generation
├── resume_frontend/               # React Frontend Application
│   ├── public/                   # Static assets
│   │   ├── index.html           # Main HTML template
│   │   └── manifest.json        # PWA configuration
│   ├── src/                     # React source code
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # Application styles
│   │   ├── index.js             # React entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Node.js dependencies and scripts
│   └── README.md                # Frontend-specific documentation
└── README.md                     # This file - Project documentation
```

## 🔄 Application Workflow

### 1. User Input Phase
- User accesses the React frontend application
- Fills out the resume form with:
  - Personal information (name, email, phone, summary)
  - Educational background (school, degree, graduation year)
  - Work experience (company, role, dates, description)
  - Skills and competencies
  - Optional profile image upload

### 2. Data Processing Phase
- Frontend sends HTTP POST requests to Django REST API
- Profile data is validated and stored in MySQL database via RDS
- Profile images are uploaded and stored in AWS S3
- Foreign key relationships are established between Profile, Education, Experience, and Skills

### 3. PDF Generation Phase
- User clicks "Download Resume" button
- Frontend makes GET request to `/api/generate_resume/{profile_id}/`
- Django backend:
  - Retrieves user data from database
  - Renders HTML template with user data
  - Converts HTML to PDF using WeasyPrint
  - Returns PDF file for download

### 4. Download Phase
- User receives professionally formatted PDF resume
- PDF includes all entered information with proper styling
- File is ready for sharing with employers

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- MySQL database
- AWS account (for production deployment)

### Backend Setup
```bash
cd resume_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Setup
```bash
cd resume_frontend
npm install
npm start
```

### Environment Configuration
Configure the following in `resume_backend/settings.py`:
- MySQL database credentials
- AWS S3 credentials and bucket name
- CORS settings for frontend URL

## 📊 Database Schema

### Profile Model
- `name`: CharField - User's full name
- `email`: EmailField - Contact email
- `phone`: CharField - Phone number
- `summary`: TextField - Professional summary
- `profile_image`: ImageField - Profile photo (stored in S3)

### Education Model
- `profile`: ForeignKey - Links to Profile
- `school`: CharField - Educational institution
- `degree`: CharField - Degree/certification
- `year`: CharField - Graduation year

### Experience Model
- `profile`: ForeignKey - Links to Profile
- `company`: CharField - Company name
- `role`: CharField - Job title
- `start_date`: DateField - Employment start date
- `end_date`: DateField - Employment end date (optional)
- `description`: TextField - Job responsibilities

### Skill Model
- `profile`: ForeignKey - Links to Profile
- `name`: CharField - Skill name

## 🔗 API Endpoints

- `POST /api/profiles/` - Create new profile
- `GET /api/profiles/{id}/` - Retrieve profile
- `POST /api/educations/` - Add education record
- `POST /api/experiences/` - Add work experience
- `POST /api/skills/` - Add skill
- `GET /api/generate_resume/{profile_id}/` - Generate and download PDF

## 🌐 Production Deployment

The application is designed for deployment on AWS with the following architecture:
- Frontend: Deployed on S3 with CloudFront distribution
- Backend: Deployed on EC2 instances behind a Load Balancer
- Database: MySQL on RDS with automated backups
- File Storage: Profile images stored in S3
- Security: IAM roles and policies for secure access

## 🔐 Security Features

- CORS configuration for secure cross-origin requests
- Input validation and sanitization
- Secure file upload handling
- AWS IAM-based access control
- HTTPS encryption in production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is developed for educational purposes as part of a Cloud Computing Mini Project.

---

**Note**: This is a mini project demonstrating cloud-based application development using modern web technologies and AWS services. For production use, additional security measures and optimizations should be implemented.