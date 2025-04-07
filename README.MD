# Insurance Form Application

A dynamic form application built with React and Refine framework for managing different types of insurance applications including health, home, and car insurance.

## Features

- 🏥 Multiple insurance form types (Health, Home, Car)
- 📝 Dynamic form fields with conditional rendering
- 🔄 Dependent select fields (Country-State relationship)
- ✅ Form validation
- 📊 Submission management and listing
- 🎨 Material-UI components
- 🔒 Error boundaries and proper error handling

## Tech Stack

- **Framework:** [Refine](https://refine.dev/) with React
- **UI Components:** Material-UI (MUI)
- **Form Management:** React Hook Form
- **Routing:** React Router
- **Type Safety:** TypeScript
- **Styling:** Tailwind CSS
- **Data Provider:** REST API

## **📂 Project Structure**
```
src/
├── components/
│   ├── form-field/
│   ├── field-types/
│   └── error-boundary/
├── hooks/
│   └── use-dynamic-options/
├── resources/
│   ├── insurance.create/
│   └── insurance.list/
├── services/
│   ├── data-provider/
└── types/
│── README.md              # You're here!
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/insurance-form-app.git

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build the application
pnpm build

# Start production server
pnpm start
```