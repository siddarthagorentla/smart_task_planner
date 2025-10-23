Smart Task Planner
An AI-powered application that breaks down user goals into actionable tasks with timelines and dependencies. Simply enter your goal, and the AI will generate a structured plan to help you achieve it.
✨ Core Features
AI-Powered Planning: Leverages the Google Gemini API to intelligently analyze your goals.
Structured Output: Decomposes high-level goals into a detailed list of actionable tasks.
Task Details: Each task includes a description, an estimated timeline, and its dependencies.
Dependency Mapping: Clearly visualizes which tasks must be completed before others can begin.
Responsive UI: A clean, modern, and fully responsive interface built with React and Tailwind CSS.
Loading & Error States: Provides clear feedback to the user while the plan is being generated or if an error occurs.
🚀 How It Works
The application provides a simple and intuitive user experience:
Enter a Goal: The user types their objective into the main text area (e.g., "Build and launch a personal portfolio website in one month").
Generate Plan: Upon clicking "Generate Plan", the application sends the user's goal to a backend service.
Call Gemini API: The service communicates with the Google Gemini API. It uses a carefully crafted prompt that instructs the AI to act as an expert project manager.
Enforce Structure: To ensure the AI's response is consistent and machine-readable, the request includes a strict JSON schema that defines the required structure for each task (id, taskName, description, timeline, dependencies).
Receive & Parse: The AI returns a JSON object containing the list of tasks. The application parses this response.
Display the Plan: The tasks are rendered on the screen as a series of cards, providing a clear and organized action plan for the user.
🛠️ Tech Stack
Frontend:
React (with TypeScript)
Tailwind CSS for styling
AI Model:
Google Gemini API (@google/genai SDK)
📂 Project Structure
The project is organized into a clean and maintainable structure:
code
Code
/
├── public/
│   └── vite.svg        # Favicon
├── src/
│   ├── components/     # Reusable React components
│   │   ├── Footer.tsx
│   │   ├── GoalInputForm.tsx
│   │   ├── Header.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── TaskCard.tsx
│   │   ├── TaskList.tsx
│   │   └── Welcome.tsx
│   ├── services/       # API interaction logic
│   │   └── geminiService.ts
│   ├── types.ts        # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── index.tsx       # Application entry point
├── .gitignore
├── index.html          # Main HTML file
└── metadata.json       # Project metadata
🧠 The AI Engine: Gemini Integration
The core logic resides in src/services/geminiService.ts. This file is responsible for communicating with the Gemini API.
Prompt Engineering
A detailed prompt guides the AI to produce the desired output. It sets the context, defines the goal, and lists constraints to ensure a high-quality, relevant plan.
JSON Schema Enforcement
To guarantee a structured response, we leverage Gemini's JSON mode. By providing a responseSchema, we instruct the model to return its output in a specific JSON format, eliminating the need for complex string parsing and making the integration robust.
Here is the schema definition from the service:
code
TypeScript
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
⚙️ Getting Started
To run this project locally, follow these steps.
Prerequisites
A modern web browser.
A Google Gemini API key.
Setup & Configuration
Clone the repository:
code
Bash
git clone https://github.com/your-username/smart-task-planner.git
cd smart-task-planner
API Key:
This project requires a Google Gemini API key to function. The application is configured to read the key from an environment variable named API_KEY. You must set this up in your deployment environment.
Running Locally:
Since this project is set up with static HTML and ES modules, you can run it using any simple local web server. One of the easiest ways is using the serve package:
code
Bash
# Install serve globally if you haven't already
npm install -g serve

# Serve the project directory
serve .
Now, open your browser and navigate to the URL provided by the server (usually http://localhost:3000).
🤝 Contributing
Contributions are welcome! If you have ideas for improvements or find any issues, please open an issue or submit a pull request.
Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
