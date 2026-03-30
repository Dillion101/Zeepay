import { createContext, useContext, useState, ReactNode } from "react";
import type { Application, NewApplication } from "../types";
import initialData from "../data/applications.json";

interface ApplicationContextValue {
  applications: Application[];
  addApplication: (newApp: NewApplication) => void;
}

const ApplicationContext = createContext<ApplicationContextValue | null>(null);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<Application[]>(
    initialData as Application[],
  );

  function addApplication(newApp: NewApplication): void {
    const appWithId: Application = { ...newApp, id: Date.now().toString() };
    setApplications((prev) => [appWithId, ...prev]);
  }

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications(): ApplicationContextValue {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider",
    );
  }
  return context;
}
