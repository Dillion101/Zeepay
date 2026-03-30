import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useApplications } from "../../src/context/ApplicationContext";
import StatusBadge from "../../src/components/StatusBadge";

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { applications } = useApplications();
  const router = useRouter();

  const app = applications.find((a) => a.id === id);

  if (!app) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Application not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.company}>{app.company}</Text>
          <Text style={styles.jobTitle}>{app.jobTitle}</Text>
        </View>
        <StatusBadge status={app.status} />
      </View>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Date Applied</Text>
          <Text style={styles.rowValue}>{app.dateApplied}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Status</Text>
          <StatusBadge status={app.status} />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Job Link</Text>
          {app.jobLink ? (
            <TouchableOpacity onPress={() => Linking.openURL(app.jobLink)}>
              <Text style={styles.link}>View Posting</Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.noLink}>Not provided</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  content: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  headerText: { flex: 1, marginRight: 12 },
  company: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  jobTitle: { fontSize: 14, color: "#6b7280" },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  rowLabel: { fontSize: 13, color: "#6b7280" },
  rowValue: { fontSize: 13, fontWeight: "500", color: "#111827" },
  divider: { height: 1, backgroundColor: "#f3f4f6" },
  link: { fontSize: 13, color: "#2563eb" },
  noLink: { fontSize: 13, color: "#9ca3af" },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  notFoundText: { fontSize: 15, color: "#6b7280", marginBottom: 8 },
  backLink: { fontSize: 14, color: "#2563eb" },
});
