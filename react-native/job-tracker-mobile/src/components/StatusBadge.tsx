import { View, Text, StyleSheet } from "react-native";
import type { ApplicationStatus } from "../types";

interface StatusBadgeProps {
  status: ApplicationStatus;
}

const statusConfig: Record<ApplicationStatus, { bg: string; text: string }> = {
  Pending: { bg: "#fef9c3", text: "#854d0e" },
  Interview: { bg: "#dbeafe", text: "#1e40af" },
  Rejected: { bg: "#fee2e2", text: "#991b1b" },
  Offer: { bg: "#dcfce7", text: "#166534" },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <Text style={[styles.text, { color: config.text }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: "600",
  },
});
