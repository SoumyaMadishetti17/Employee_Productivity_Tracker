# Employee Productivity Tracker

This project is an **Employee Productivity Tracker** designed to empower employees and employers with tools to log, monitor, and analyze daily tasks and productivity. Built with Vite, this application offers actionable insights to foster transparency, fairness, and enhanced productivity.

---

## Features Implemented

### **1. Employee Task Logging**

- **Task Timeline:**
    - Employees can log tasks with details such as:
        - Task title and description.
        - Time spent.
        - Priority level.
        - References (e.g., manager or colleague who assigned the task).
    - Tasks are displayed in a chronological timeline for easy tracking.
- **Task Categorization:**
    - Tasks are categorized into **BAU**, **Ad Hoc**, or **Project-Based** for better clarity.

### **2. Employer Dashboard**

- **Productivity Insights:**
    - Visualizations include:
        - Graphs: Task breakdown by category and time allocation.
        - Tables: Detailed lists of tasks with filters for task type and priority.
    - Enables employers to assess employee workloads and outputs.

### **3. AI-Powered Productivity Insights**

- **Task Efficiency Scoring:**
    - AI calculates an efficiency score based on factors like:
        - Task completion time vs. estimated time.
        - Priority tasks completed.
    - Provides actionable feedback.
- **Performance Prediction:**
    - Predicts future performance trends.
    - Highlights employees at risk of burnout or low productivity.

### **4. Graphical Analytics**

- Includes pie charts, bar graphs, and other visualizations to represent employee productivity trends and task distribution.

---

## Deployment Link

https://employee-productivity-tracker.netlify.app/

## Project Structure

```plaintext
📦project
 ┣ 📂node_modules
📦src
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┗ 📜AuthForm.tsx
 ┃ ┣ 📂layout
 ┃ ┃ ┗ 📜PrivateRoute.tsx
 ┃ ┣ 📂ui
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜input.tsx
 ┃ ┃ ┣ 📜label.tsx
 ┃ ┃ ┣ 📜select.tsx
 ┃ ┃ ┣ 📜tabs.tsx
 ┃ ┃ ┗ 📜textarea.tsx
 ┃ ┣ 📜ActivityPage.tsx
 ┃ ┣ 📜AiInsightsPage.tsx
 ┃ ┣ 📜Dashboard.tsx
 ┃ ┣ 📜Footer.tsx
 ┃ ┣ 📜Gaming.tsx
 ┃ ┣ 📜Homepage.tsx
 ┃ ┣ 📜Logo.tsx
 ┃ ┣ 📜Profile.tsx
 ┃ ┣ 📜QuizGame.tsx
 ┃ ┣ 📜SessionChart.tsx
 ┃ ┣ 📜TaskForm.tsx
 ┃ ┗ 📜TaskList.tsx
 ┣ 📂lib
 ┃ ┣ 📜firebase.ts
 ┃ ┗ 📜utils.ts
 ┣ 📂store
 ┃ ┣ 📜authStore.ts
 ┃ ┗ 📜taskStore.ts
 ┣ 📂types
 ┃ ┗ 📜task.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┗ 📜vite-env.d.ts
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd project
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview the Build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

---

## Technologies Used

- **Frontend:** React, TypeScript, TailwindCSS
- **State Management:** Zustand
- **Backend:** Firebase (Authentication, Firestore)
- **Visualization:** Recharts
- **Build Tool:** Vite

---

## Contribution

We welcome contributions to improve the application. Please fork the repository and create a pull request with your changes.

---

## License

This project is licensed under the [MIT License](LICENSE).