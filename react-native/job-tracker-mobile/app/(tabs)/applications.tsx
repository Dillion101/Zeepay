import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { useApplications } from "../../src/context/ApplicationContext";
import StatusBadge from "../../src/components/StatusBadge";
import type { Application } from "../../src/types";

export default function ApplicationsScreen() {
  const { applications } = useApplications();
  const router = useRouter();

  if (applications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No applications yet.</Text>
        <TouchableOpacity onPress={() => router.push("/add")}>
          <Text style={styles.emptyLink}>Add your first application</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderItem({ item }: { item: Application }) {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/detail/${item.id}`)}
        activeOpacity={0.75}
      >
        <View style={styles.cardTop}>
          <Text style={styles.company}>{item.company}</Text>
          <StatusBadge status={item.status} />
        </View>
        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
        <Text style={styles.date}>{item.dateApplied}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />

      {/* Floating action button fixed at the bottom of the screen */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add")}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+ Add New</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },
  list: { padding: 16, paddingBottom: 80 },
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
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  company: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  jobTitle: { fontSize: 13, color: "#374151", marginBottom: 4 },
  date: { fontSize: 12, color: "#9ca3af" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  emptyText: { fontSize: 16, color: "#6b7280", marginBottom: 8 },
  emptyLink: { fontSize: 14, color: "#2563eb" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 20,
    backgroundColor: "#2563eb",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  fabText: { color: "#ffffff", fontWeight: "600", fontSize: 14 },
});
