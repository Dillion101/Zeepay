# Job Application Tracker

A job application tracking system built across three parts: a Next.js web app, a React Native mobile app, and a PHP OOP bonus demonstrating a notification system.

---

## Project Structure

```
next/job-tracker-web             # Next.js web application
react-native/job-tracker-mobile    # React Native mobile application
php/              # PHP OOP bonus
```

---

## How to Run

### Web App (Next.js)

```bash
cd next/job-tracker-web 
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

### Mobile App (React Native)

```bash
cd react-native/job-tracker-mobile 
npm install
npx expo start --clear
```

Scan the QR code with the **Expo Go** app on your phone. Both your phone and computer must be on the same Wi-Fi network.

### PHP OOP Bonus

```bash
cd php
php notification.php
```

Requires PHP 8.0 or higher.

---

## Approach

The goal was to keep the two apps as structurally consistent as possible so the same thinking applies to both.

**Shared foundations.** The TypeScript types (`Application`, `NewApplication`, `ApplicationStatus`) and the mock data (`applications.json`) are identical across both apps. If this were a monorepo, they would be a shared package imported by both.

**Same state management pattern.** Both apps use React Context with a custom `useApplications` hook, a null guard, and a typed context value interface. The logic is the same; only the rendering layer changes.

**TypeScript throughout.** Every file is typed. Props interfaces are explicit on every component, form state and errors are typed, event handlers use the correct React types, and navigation parameters in the mobile app are typed via `RootStackParamList`. This was a deliberate choice to demonstrate that type safety is not an afterthought.

**Component design.** Both apps share the same component philosophy: small, single-purpose, reusable components (`StatusBadge`, `StatCard`) that keep the screen and page files clean. The `Record<ApplicationStatus, ...>` pattern in `StatusBadge` is exhaustive, meaning adding a new status without updating the component's color map causes a compile-time error.

**PHP OOP bonus.** The notification system uses an interface as the contract, an abstract base class for shared state and behaviour, three concrete classes for each channel, and a service that dispatches any channel without knowing its type. All four OOP pillars are demonstrated: encapsulation, abstraction, inheritance, and interfaces.

---

## Assumptions Made

- **No persistence.** Data resets on page refresh or app restart. The state is seeded from a static JSON file on every load. This was intentional to keep scope focused on structure rather than storage.
- **No authentication.** The apps are single-user with no login flow.
- **IDs are generated with `Date.now().toString()`.** Sufficient for a local mock without pulling in a UUID library.
- **PHP bonus is a terminal demonstration.** The `send()` methods print to stdout rather than making real API calls. The structure is production-ready; the transport layer is mocked.
---

## Trade-offs and Limitations

- **No edit or delete.** The scope covers create and read only. These are natural next steps that the current architecture supports cleanly by extending the context with `updateApplication` and `deleteApplication` functions.
- **No local storage or AsyncStorage.** Persistence was traded for simplicity. Wiring in `localStorage` on web or `AsyncStorage` on mobile would be a small change isolated entirely to `ApplicationContext`.
- **No test suite.** Unit tests for the `countByStatus` helper, form validation logic, and context functions would be straightforward to add with Jest.
- **Mobile status selector is a row of tap buttons.** There is no native `<select>` in React Native. A third-party picker library would give a more native feel but adds a dependency for a four-option field.
- **Tailwind on web, StyleSheet on mobile.** The two styling systems are different by necessity. The hex color values used in the mobile `StyleSheet` objects are the exact values that the corresponding Tailwind classes resolve to, keeping the visual language consistent.
