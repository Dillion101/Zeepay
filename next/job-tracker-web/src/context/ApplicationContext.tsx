"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Application, NewApplication } from "@/types";
import initialData from "@/data/applications.json";

// Define the shape of what the context will provide to consumers.
// This makes it clear exactly what any component can get from the context.
interface ApplicationContextValue {
  applications: Application[];
  addApplication: (newApp: NewApplication) => void;
}

// We use null as the default and handle it in the custom hook below.
const ApplicationContext = createContext<ApplicationContextValue | null>(null);

// The provider component wraps the whole app and gives every child
// component access to the applications list and the addApplication function.
export function ApplicationProvider({ children }: { children: ReactNode }) {
  // Cast the imported JSON to Application[] so TypeScript knows the
  // exact shape of the data coming from the file.
  const [applications, setApplications] = useState<Application[]>(
    initialData as Application[],
  );

  function addApplication(newApp: NewApplication): void {
    // Generate a simple unique id using the current timestamp
    const appWithId: Application = { ...newApp, id: Date.now().toString() };
    setApplications((prev) => [appWithId, ...prev]);
  }

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
}

// A custom hook so any component can access the context cleanly.
// The null check here means you will get a clear error message if you
// accidentally use this hook outside of the ApplicationProvider.
export function useApplications(): ApplicationContextValue {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider",
    );
  }
  return context;
}
