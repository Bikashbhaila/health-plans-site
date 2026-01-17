# TRASE Health Plans Browser & Comparison App

A React + TypeScript web application for browsing and comparing health-insurance plans with a clean TRASE-styled UI.

---

## Overview
- Browse health plans in an interactive AG Grid table
- Search, filter, and sort by monthly premium
- Select up to **3 plans** for comparison
- View a side-by-side Compare page
- Responsive, dark-themed interface

---

## Screenshots

### **Browse Page**
![Browse Page](public/screenshots/browse-page.png)

### **Comparison Page**
![Compare Page](public/screenshots/compare-page.png)

---

## Features
- Fast search + premium sorting
- Comparison tray with selection limit feedback
- LocalStorage persistence (selected plans remain after reload)
- Clean Material-UI controls
- End-to-end tests using Cypress

---

## Tech Stack
- **React (Vite) + TypeScript**
- **Material UI**
- **AG Grid Community**
- **React Router v6**
- **LocalStorage** (persistence)
- **Cypress** (E2E testing)

---

## Installation & Setup

### 1. Install dependencies
```
npm install
```
### 2. Run the development server
```
npm run dev
```
App runs at: http://localhost:5173
### 3. Run Cypress end-to-end tests
```
npm run cypress:open
```
### 4. Build for production
```
npm run build
```
## State Management & Persistence Strategy
The application uses React Hooks for local UI state:

| State           | Purpose                            |
| --------------- | ---------------------------------- |
| `search`        | Filters health plans in AG Grid    |
| `sortByPremium` | Sorts plans by premium             |
| `selectedPlans` | Tracks up to 3 comparison plans    |
| `viewStats`     | Displays count and average premium |

### Persistence
Selected plans are stored using localStorage for seamless navigation and page reloads.
Two helper functions manage this behavior:
```
saveCompare(plans);
loadCompare();
```
This solution avoids heavier state management libraries while keeping the app responsive and simple.

