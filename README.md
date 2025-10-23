# Smart Task Planner

> An AI-powered application that breaks down high-level user goals into a detailed, structured plan of actionable tasks, complete with timelines and dependencies.

This project leverages the Google Gemini API's JSON mode to intelligently analyze a user's objective and generate a step-by-step guide to achieve it.

![Smart Task Planner Screenshot](https://storage.googleapis.com/aistudio-o-images/project_screenshots/smart-task-planner.png)

## ✨ Core Features

*   **AI-Powered Planning**: Utilizes the Google Gemini API (`gemini-2.5-flash`) to intelligently decompose complex goals.
*   **Structured JSON Output**: Enforces a strict JSON schema for reliable, machine-readable responses from the AI.
*   **Detailed Task Generation**: Creates tasks with unique IDs, names, descriptions, and estimated timelines.
*   **Dependency Mapping**: Clearly identifies and displays dependencies between tasks, showing which tasks must be completed first.
*   **Modern & Responsive UI**: A clean, intuitive, and fully responsive interface built with React, TypeScript, and Tailwind CSS.
*   **Clear User Feedback**: Includes dedicated loading and error states to keep the user informed during the generation process.

## 🛠️ Tech Stack

*   **Frontend**:
    *   [React](https://react.dev/) (with TypeScript)
    *   [Tailwind CSS](https://tailwindcss.com/) for styling
*   **AI Model**:
    *   [Google Gemini API](https://ai.google.dev/) via the `@google/genai` SDK

## 🧠 How It Works

The application's core logic is centered around a seamless interaction with the Gemini API.

1.  **User Input**: The user enters a high-level goal into the text area (e.g., "Launch a new SaaS product in 3 months").
2.  **API Call**: The `geminiService.ts` file constructs a detailed prompt, instructing the AI to act as an expert project manager.
3.  **Schema Enforcement**: To ensure a predictable and structured response, the request includes a `responseSchema`. This forces the Gemini model to return its plan in a specific JSON format, eliminating parsing errors and making the data easy to work with.
4.  **Parsing & Display**: The frontend receives the structured JSON, validates it, and dynamically renders the tasks as a series of clear, organized cards.

### The Gemini JSON Schema

The key to the application's reliability is the `planSchema` defined in `services/geminiService.ts`. This schema guarantees that the AI's output always matches the `Task` interface defined in the application.

```typescript
const planSchema = {
  type: Type.OBJECT,
  properties: {
    tasks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.INTEGER, description: "A unique identifier for the task, starting from 1." },
          taskName: { type: Type.STRING, description: "A short, concise name for the task." },
          description: { type: Type.STRING, description: "A brief description of what the task entails." },
          timeline: { type: Type.STRING, description: "An estimated timeline for the task (e.g., 'Day 1-2', 'Week 1')." },
          dependencies: {
            type: Type.ARRAY,
            items: { type: Type.INTEGER },
            description: "An array of task IDs that this task depends on. Empty if no dependencies."
          },
        },
        required: ["id", "taskName", "description", "timeline", "dependencies"],
      },
    },
  },
  required: ["tasks"],
};
```

## 📂 Project Structure

The codebase is organized logically into components, services, and type definitions for maintainability.

```
.
├── README.md
├── App.tsx                 # Main application component and state management
├── components/
│   ├── Footer.tsx
│   ├── GoalInputForm.tsx
│   ├── Header.tsx
│   ├── LoadingSpinner.tsx
│   ├── TaskCard.tsx        # Renders a single task
│   ├── TaskList.tsx        # Renders the list of tasks
│   └── Welcome.tsx
├── index.html              # Entry point, includes CDN links and importmap
├── index.tsx               # Renders the React application
├── metadata.json
├── services/
│   └── geminiService.ts    # Handles all communication with the Gemini API
└── types.ts                # TypeScript type definitions
```

## 🚀 Getting Started

This project is configured to run directly in the browser without a build step, thanks to ES modules and CDN-hosted dependencies.

### Prerequisites

*   A modern web browser (like Chrome, Firefox, or Edge).
*   A Google Gemini API key.

### Running Locally

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-username/smart-task-planner.git
    cd smart-task-planner
    ```

2.  **Set Up API Key**
    The application loads the Gemini API key from an environment variable `process.env.API_KEY`. When running in a development environment that supports this (like AI Studio), this key is injected automatically. For other environments, you would need to configure this variable.

3.  **Serve the Project**
    Since this is a static project, you can use any simple local web server. The `serve` package is a great option.

    ```bash
    # If you don't have serve, install it globally
    npm install -g serve

    # Run the server from the project's root directory
    serve .
    ```

4.  **Open in Browser**
    The server will give you a local URL (usually `http://localhost:3000`). Open it in your browser to use the application.
