# Eurodiesel - Garage Management System

A comprehensive garage management system with both backend API and frontend React application.

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MySQL database

### 1. Clone the Repository

```bash
git clone https://github.com/AmanuelTeme/Eurodiesel1.git
cd Eurodiesel1
```

### 2. Backend Setup

```bash
cd BackEnd
npm install
```

#### Database Configuration

1. Create a MySQL database
2. Update `config/db.config.js` with your database credentials
3. Run the initial SQL queries from `services/sql/initial-queries.sql`

#### Start Backend Server

```bash
npm start
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd FrontEnd
npm install
```

#### Start Frontend Development Server

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
eurodiesel/
├── BackEnd/                 # Node.js/Express API
│   ├── controllers/         # API controllers
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── middlewares/        # Authentication & validation
│   └── config/             # Database configuration
├── FrontEnd/               # React application
│   ├── src/
│   │   ├── markup/         # React components
│   │   ├── services/       # API services
│   │   └── assets/         # Images and styles
│   └── public/
└── Resources/              # Documentation & designs
```

## 🔧 Features

- **Customer Management**: Add, edit, and manage customer information
- **Employee Management**: Employee profiles and work hours tracking
- **Order Management**: Create and track service orders
- **Used Spare Parts**: Catalog and manage used spare parts
- **Admin Dashboard**: Comprehensive admin interface
- **Responsive Design**: Mobile-friendly interface

## 👥 Team Collaboration

### For Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m 'Add your feature'`
5. Push: `git push origin feature/your-feature-name`
6. Create a Pull Request

### For Reviewers

- Review code changes in Pull Requests
- Test functionality before merging
- Ensure code follows project standards

## 📞 Support

For questions or issues, please contact the development team or create an issue on GitHub.

## 📄 License

This project is proprietary software for Abe's Garage.
