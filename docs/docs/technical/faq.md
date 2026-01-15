---
tags:
  - faq
  - help
  - troubleshoot
  - how-to
---

# Frequently Asked Questions

---

## State Management Questions

### How do I add a new todo programmatically?

Use the `addTodo` action from the Zustand store with title, description, and dueDateTime fields.

**See also**: [State Management](state-management.md)

---

### How do I access the store outside a React component?

Use the store's `getState()` method to access state or call actions directly.

**See also**: [State Management](state-management.md)

---

### Why isn't my component re-rendering when state changes?

Ensure you're subscribing to a specific state slice using a selector function, not the entire store.

**See also**: [State Management](state-management.md)

---

### How does data persistence work?

The app uses Zustand's `persist` middleware with localStorage. Data is automatically saved on state changes and restored on page load using the key `'todo-storage'`.

**See also**: [State Management](state-management.md)

---

### What happens when I try to modify a todo on a completed day?

The store throws an error. Components should wrap store actions in try-catch blocks for user feedback.

**See also**: [State Management](state-management.md)

---

## Component Questions

### How do I create a new component?

Create a file in the appropriate folder under `src/components/`, define a TypeScript interface for props, and export as a named export.

**See also**: [Components](components.md)

---

### Where should I put my new component?

Choose based on purpose: `common/` for reusable UI primitives, `layout/` for structure, or feature folders (`calendar/`, `timeline/`, `todo/`) for feature-specific components.

**See also**: [Architecture](architecture.md)

---

### How do I pass data between components?

Use props to pass data down, Zustand store for global state, and callback functions for child-to-parent communication.

**See also**: [Architecture](architecture.md)

---

## Hooks Questions

### When should I create a custom hook?

Create a custom hook when logic is reused across multiple components, you need to encapsulate stateful logic, or you want to keep components focused.

**See also**: [Hooks](hooks.md)

---

### How does useCountdown work?

It takes a due date/time string, sets up a 1-second interval, and returns a CountdownTime object. It cleans up the interval on unmount.

**See also**: [Hooks](hooks.md)

---

## Utilities Questions

### Where do I add new utility functions?

Add to existing files in `src/utils/`: `dateUtils.ts` for date operations, `countdownUtils.ts` for countdown logic. Create a new file for a new category.

**See also**: [Utilities](utilities.md)

---

### Why are utilities pure functions?

Pure functions have no side effects, return the same output for the same input, are easy to test, and are predictable.

**See also**: [Utilities](utilities.md)

---

## Type Questions

### Where are TypeScript types defined?

All shared types are in `src/types/index.ts` including Todo, CompletedDay, CountdownTime, ViewMode, and TodoStore.

**See also**: [Data Models](data-models.md)

---

### How do I add a new type?

Add the interface/type to `src/types/index.ts`, export it, import where needed, and document in data-models.md.

**See also**: [Data Models](data-models.md)

---

## Styling Questions

### How do I style components?

Use Tailwind CSS utility classes directly in JSX.

**See also**: [Styling](styling.md)

---

### What colour should I use for different purposes?

Blue for primary actions, gray for secondary, red for destructive, green for success/normal, yellow for warning, red for error/overdue.

**See also**: [Styling](styling.md)

---

### Why Tailwind instead of CSS modules or styled-components?

Tailwind provides rapid development, consistency via predefined design system, performance through unused style purging, and maintainability with visible styles in component code.

**See also**: [Architecture](architecture.md)

---

## Development Workflow Questions

### How do I start the development server?

Run `npm run dev`. The app will be available at `http://localhost:5173/`.

**See also**: [Build & Deployment](build-deployment.md)

---

### How do I build for production?

Run `npm run build`. This runs TypeScript compilation and Vite build, outputting to `dist/`.

**See also**: [Build & Deployment](build-deployment.md)

---

### Where is data stored during development?

Data is stored in your browser's localStorage under the key `'todo-storage'`. Clear via DevTools > Application > Local Storage.

**See also**: [State Management](state-management.md)

---

## Documentation Questions

### Where is the documentation?

Technical docs are in `docs/docs/technical/`, business docs in `docs/docs/business/`, and MkDocs config in `docs/mkdocs.yml`.

---

### How do I run the documentation locally?

Install MkDocs (`pip install mkdocs mkdocs-material`), navigate to `docs/` folder, and run `mkdocs serve`. Available at `http://127.0.0.1:8000/`.

**See also**: [Build & Deployment](build-deployment.md)

---

### How do I build the documentation for production?

Run `mkdocs build` from the `docs/` folder. Output goes to `docs/site/`.

---

### Where do I add new technical documentation?

Add to `docs/docs/technical/`. Update `docs/mkdocs.yml` navigation after adding files.

---

### How do I add tags to documentation pages?

Add a YAML frontmatter block with tags array at the top of the Markdown file.

---

### Why use MkDocs with Material theme?

MkDocs provides simplicity with Markdown-based content, built-in search, automatic navigation, modern responsive design, and tag support.

**See also**: [Architecture](architecture.md)

---

## Still Have Questions?

- Check the relevant documentation section
- Review the source code in `src/`
- Ask a team member
- Open an issue in the repository
