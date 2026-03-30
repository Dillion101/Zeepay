import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
} from "react-native";
import { useState } from "react";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useApplications } from "../src/context/ApplicationContext";
import type { NewApplication, ApplicationStatus } from "../src/types";

const statusOptions: ApplicationStatus[] = [
  "Pending",
  "Interview",
  "Rejected",
  "Offer",
];

const emptyForm: NewApplication = {
  company: "",
  jobTitle: "",
  dateApplied: "",
  jobLink: "",
  status: "Pending",
};

type FormErrors = Partial<Record<keyof NewApplication, string>>;

const inputStyle = {
  backgroundColor: "#ffffff",
  borderWidth: 1,
  borderColor: "#d1d5db",
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: Platform.OS === "ios" ? 12 : 8,
  fontSize: 14,
  color: "#111827",
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AddApplicationScreen() {
  const { addApplication } = useApplications();
  const router = useRouter();

  const [form, setForm] = useState<NewApplication>(emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  function updateField(field: keyof NewApplication, value: string): void {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {};
    if (!form.company.trim()) newErrors.company = "Company name is required.";
    if (!form.jobTitle.trim()) newErrors.jobTitle = "Job title is required.";
    if (!form.dateApplied)
      newErrors.dateApplied = "Date applied is required (YYYY-MM-DD).";
    return newErrors;
  }

  function handleDateChange(
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ): void {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed" || !selectedDate) {
      return;
    }

    updateField("dateApplied", formatDate(selectedDate));
  }

  function handleSubmit(): void {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    addApplication(form);
    router.back();
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Add Application</Text>
      <Text style={styles.subheading}>Fill in the details below</Text>

      {/* Company Name */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Company Name <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={inputStyle}
          value={form.company}
          onChangeText={(val) => updateField("company", val)}
          placeholder="e.g. Google"
          placeholderTextColor="#9ca3af"
          autoCapitalize="words"
        />
        {errors.company && <Text style={styles.error}>{errors.company}</Text>}
      </View>

      {/* Job Title */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Job Title <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={inputStyle}
          value={form.jobTitle}
          onChangeText={(val) => updateField("jobTitle", val)}
          placeholder="e.g. Frontend Engineer"
          placeholderTextColor="#9ca3af"
          autoCapitalize="words"
        />
        {errors.jobTitle && <Text style={styles.error}>{errors.jobTitle}</Text>}
      </View>

      {/* Date Applied */}
      <View style={styles.field}>
        <Text style={styles.label}>
          Date Applied <Text style={styles.required}>*</Text>
        </Text>

        <Pressable style={inputStyle} onPress={() => setShowDatePicker(true)}>
          <Text
            style={form.dateApplied ? styles.dateValue : styles.datePlaceholder}
          >
            {form.dateApplied || "Select date"}
          </Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={form.dateApplied ? new Date(form.dateApplied) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        {errors.dateApplied && (
          <Text style={styles.error}>{errors.dateApplied}</Text>
        )}
      </View>

      {/* Job Link */}
      <View style={styles.field}>
        <Text style={styles.label}>Job Link</Text>
        <TextInput
          style={inputStyle}
          value={form.jobLink}
          onChangeText={(val) => updateField("jobLink", val)}
          placeholder="https://..."
          placeholderTextColor="#9ca3af"
          keyboardType="url"
          autoCapitalize="none"
        />
      </View>

      {/* Status - chip buttons instead of a dropdown */}
      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusRow}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.chip, form.status === option && styles.chipActive]}
              onPress={() => updateField("status", option)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.chipText,
                  form.status === option && styles.chipTextActive,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        activeOpacity={0.8}
      >
        <Text style={styles.submitButtonText}>Save Application</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => router.back()}
        activeOpacity={0.7}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  content: { padding: 20, paddingBottom: 40 },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subheading: { fontSize: 13, color: "#6b7280", marginBottom: 24 },
  field: { marginBottom: 18 },
  label: { fontSize: 13, fontWeight: "600", color: "#374151", marginBottom: 6 },
  required: { color: "#ef4444" },
  error: { fontSize: 11, color: "#ef4444", marginTop: 4 },
  datePlaceholder: { color: "#9ca3af", fontSize: 14 },
  dateValue: { color: "#111827", fontSize: 14 },
  statusRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: "#ffffff",
  },
  chipActive: { backgroundColor: "#2563eb", borderColor: "#2563eb" },
  chipText: { fontSize: 13, color: "#374151" },
  chipTextActive: { color: "#ffffff", fontWeight: "600" },
  submitButton: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: { color: "#ffffff", fontWeight: "600", fontSize: 15 },
  cancelButton: { paddingVertical: 12, alignItems: "center", marginTop: 8 },
  cancelButtonText: { color: "#6b7280", fontSize: 14 },
});
