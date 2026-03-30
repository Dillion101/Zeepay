import { View, Text, StyleSheet } from "react-native";

interface StatCardProps {
  label: string;
  count: number;
  borderColor: string; // Hex color, e.g. "#3b82f6"
}

export default function StatCard({ label, count, borderColor }: StatCardProps) {
  return (
    // borderLeftColor + borderLeftWidth is the React Native equivalent
    // of Tailwind's border-l-4 class used in the web app.
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 2,
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },
  count: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
});
