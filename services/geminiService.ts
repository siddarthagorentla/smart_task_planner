
import { GoogleGenAI, Type } from "@google/genai";
import { Task } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const taskSchema = {
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
};

const planSchema = {
  type: Type.OBJECT,
  properties: {
    tasks: {
      type: Type.ARRAY,
      items: taskSchema,
    },
  },
  required: ["tasks"],
};


export const generatePlan = async (goal: string): Promise<Task[]> => {
  const prompt = `
    You are an expert project manager AI. Your task is to break down a user's goal into a series of actionable, sequential tasks.

    User's Goal: "${goal}"

    Please generate a detailed plan with the following constraints:
    1.  Create a list of tasks.
    2.  For each task, provide:
        - A unique 'id' starting from 1.
        - A concise 'taskName'.
        - A short 'description' of what needs to be done.
        - An estimated 'timeline' (e.g., Day 1, Week 1-2).
        - A list of 'dependencies' which should be an array of task 'id's that must be completed before this task can start. If there are no dependencies, provide an empty array.
    3. The tasks should be logical and well-ordered. Ensure dependencies make sense.
    4. Provide the final output in a valid JSON format according to the provided schema. Do not include any explanatory text outside of the JSON structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: planSchema,
      },
    });

    const jsonString = response.text;
    const parsedResponse = JSON.parse(jsonString);

    if (parsedResponse && Array.isArray(parsedResponse.tasks)) {
      // Basic validation to ensure the response structure is correct
      return parsedResponse.tasks.map((task: any) => ({
        id: typeof task.id === 'number' ? task.id : 0,
        taskName: typeof task.taskName === 'string' ? task.taskName : 'Untitled Task',
        description: typeof task.description === 'string' ? task.description : '',
        timeline: typeof task.timeline === 'string' ? task.timeline : 'N/A',
        dependencies: Array.isArray(task.dependencies) ? task.dependencies : [],
      }));
    } else {
      throw new Error("Invalid response format from API.");
    }

  } catch (error) {
    console.error("Error generating plan with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
