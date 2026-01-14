# Technical Documentation

**Last Updated**: 2026-01-14

## Overview

Welcome to the technical documentation for the Todo App. This section provides comprehensive documentation for developers working on or learning from this project.

The Todo App is a modern React application built with TypeScript, demonstrating best practices in component architecture, state management, and type safety.

This documentation was generated from the latest codebase and JIRA tickets to ensure accuracy and completeness.

## Documentation Sections

### [Architecture](./architecture.md)
Learn about the overall system design, technology stack, and architectural decisions.

**Topics Covered**:
- Technology stack and rationale
- System architecture diagrams
- Design patterns (component composition, unidirectional data flow)
- Application structure
- Data flow and state management approach
- Performance considerations

---

### [Components](./components.md)
Detailed documentation of all React components, their props, and usage examples.

**Component Categories**:
- **Common**: Reusable UI components (Button, Modal, ConfirmDialog)
- **Layout**: Application structure components (Layout, Header)
- **Calendar**: Calendar view components (CalendarView, CalendarDay)
- **Timeline**: Timeline view components (TimelineView, TimelineGroup)
- **Todo**: Todo-specific components (TodoList, TodoItem, TodoForm, CountdownTimer)

---

### [State Management](./state-management.md)
Complete guide to Zustand store implementation and state management patterns.

**Topics Covered**:
- Zustand store architecture
- State structure and shape
- CRUD operations (addTodo, updateTodo, deleteTodo, toggleTodo)
- Day completion logic
- Selectors and queries
- Business rules and validation
- Error handling
- Performance optimisations

---

### [Data Models](./data-models.md)
TypeScript interfaces, types, and data structures used throughout the application.

**Data Models**:
- `Todo` - Main todo item interface
- `CompletedDay` - Completed day tracking
- `CountdownTime` - Countdown timer state
- `ViewMode` - Application view mode type
- `TodoStore` - Zustand store interface
- Date format standards

---

### [Utilities](./utilities.md)
Pure utility functions for date handling, countdown calculations, and formatting.

**Utility Categories**:
- **Date Utilities**: Formatting, comparison, boundaries, normalisation
- **Countdown Utilities**: Calculations, formatting, urgency levels
- Pure function patterns
- Testing approaches

---

### [Custom Hooks](./hooks.md)
Documentation of custom React hooks for reusable stateful logic.

**Hooks**:
- `useCountdown` - Real-time countdown timer hook
- Implementation details
- Usage examples
- Performance considerations
- Testing strategies

---

### [Styling](./styling.md)
Guide to the Tailwind CSS styling approach and design system.

**Topics Covered**:
- Tailwind CSS configuration
- Design system (colours, spacing, typography)
- Styling patterns and best practices
- Component styling examples
- Responsive design
- State styles (hover, focus, active)
- Production optimisations

---

### [Build & Deployment](./build-deployment.md)
Information about the build process, development workflow, and deployment.

**Topics Covered**:
- Vite configuration
- Build scripts and commands
- TypeScript configuration
- Dependencies and bundle size
- Build optimisations
- Deployment options
- CI/CD pipeline examples
- Development workflow

---

## Quick Start for Developers

### Prerequisites
- Node.js 18+
- npm or yarn
- Basic knowledge of React, TypeScript, and Tailwind CSS

### Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd todo-app
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Explore the Code**
   - Start with [src/App.tsx](../../../src/App.tsx) - main application component
   - Check [src/types/index.ts](../../../src/types/index.ts) - type definitions
   - Review [src/store/useTodoStore.ts](../../../src/store/useTodoStore.ts) - state management

4. **Read Documentation**
   - Begin with [Architecture](./architecture.md) for big picture
   - Move to [Components](./components.md) to understand UI structure
   - Reference other sections as needed

---

## Key Concepts

### Component Architecture
The app uses a compositional approach where complex UIs are built from smaller, reusable components. Components are organised by feature and responsibility.

### State Management
A single Zustand store manages all application state with built-in localStorage persistence. The store provides actions for CRUD operations and selectors for data queries.

### Type Safety
TypeScript ensures compile-time type checking throughout the application. All components, functions, and data structures have explicit types.

### Immutability
All state updates follow immutable patterns. Utilities are pure functions with no side effects.

---

## Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [date-fns Documentation](https://date-fns.org/)

---

## Recent Changes

See [changes.md](../../context/changes.md) for the latest changes to the codebase.

---

**Tags**: #technical-docs #overview #getting-started