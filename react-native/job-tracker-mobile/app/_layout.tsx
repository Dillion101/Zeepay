import { Stack } from "expo-router";
import { ApplicationProvider } from "../src/context/ApplicationContext";

export default function RootLayout() {
  return (
    <ApplicationProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#2563eb" },
          headerTintColor: "#ffffff",
          headerTitleStyle: { fontWeight: "bold" },
          contentStyle: { backgroundColor: "#f3f4f6" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="add" options={{ title: "Add Application" }} />
        <Stack.Screen name="detail/[id]" options={{ title: "Details" }} />
      </Stack>
    </ApplicationProvider>
  );
}
