export type ApplicationStatus = "Pending" | "Interview" | "Rejected" | "Offer";

export interface Application {
  id: string;
  company: string;
  jobTitle: string;
  dateApplied: string;
  jobLink: string;
  status: ApplicationStatus;
}

export type NewApplication = Omit<Application, "id">;
