import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useApplications } from "../../src/context/ApplicationContext";
import StatCard from "../../src/components/StatCard";
import type { Application, ApplicationStatus } from "../../src/types";

function countByStatus(
  applications: Application[],
  status: ApplicationStatus,
): number {
  return applications.filter((a) => a.status === status).length;
}

export default function DashboardScreen() {
  const { applications } = useApplications();
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.subheading}>Overview of your job applications</Text>

      <View style={styles.row}>
        <StatCard
          label="Total"
          count={applications.length}
          borderColor="#9ca3af"
        />
        <View style={styles.gap} />
        <StatCard
          label="Pending"
          count={countByStatus(applications, "Pending")}
          borderColor="#facc15"
        />
      </View>

      <View style={[styles.row, styles.rowTop]}>
        <StatCard
          label="Interviews"
          count={countByStatus(applications, "Interview")}
          borderColor="#3b82f6"
        />
        <View style={styles.gap} />
        <StatCard
          label="Rejected"
          count={countByStatus(applications, "Rejected")}
          borderColor="#ef4444"
        />
      </View>

      <View style={[styles.row, styles.rowTop]}>
        <StatCard
          label="Offers"
          count={countByStatus(applications, "Offer")}
          borderColor="#22c55e"
        />
        <View style={styles.gap} />
        <View style={{ flex: 1 }} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/add")}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Add New Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  content: { padding: 20 },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  subheading: { fontSize: 13, color: "#6b7280", marginBottom: 24 },
  row: { flexDirection: "row" },
  rowTop: { marginTop: 12 },
  gap: { width: 12 },
  button: {
    backgroundColor: "#2563eb",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 32,
  },
  buttonText: { color: "#ffffff", fontWeight: "600", fontSize: 15 },
});
