# TODO App

A modern, feature-rich TODO application built with React, TypeScript, and Tailwind CSS.

## Features

✨ **Core Functionality**
- ✅ Add, edit, and delete TODOs
- ✅ Mark TODOs as complete
- ✅ Persistent storage with localStorage

⏰ **Countdown Timers**
- Live countdown timer for each TODO showing time until due
- Color-coded urgency indicators (green → yellow → red)
- Overdue detection with "Overdue by X" display

📅 **Calendar View**
- Monthly calendar grid
- Navigate between months
- Jump to today
- TODO count badges on each day
- Visual indicator for completed days

📋 **Timeline View**
- Chronological list of all TODOs
- Grouped by date for easy scanning
- Jump to today button
- Same features as calendar view

🔒 **Complete Day Feature**
- Archive all TODOs for a day
- Lock the day to prevent modifications
- Prevents adding, editing, or deleting TODOs from completed days
- Visual indicators for locked days

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **State Management:** Zustand (with localStorage persistence)
- **Styling:** Tailwind CSS
- **Date Handling:** date-fns

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Usage

### Adding a TODO

1. Click the **"+ Add TODO"** button in the top right
2. Enter the TODO title (required)
3. Add an optional description
4. Select the due date and time
5. Click **"Add TODO"**

### Editing a TODO

1. Find the TODO in Calendar or Timeline view
2. Click the **"Edit"** button
3. Modify the fields
4. Click **"Update TODO"**

### Completing a TODO

1. Check the checkbox next to the TODO
2. The TODO will be marked as complete and grayed out

### Deleting a TODO

1. Click the **"Delete"** button on a TODO
2. Confirm the deletion when prompted

### Completing a Day

1. View the day's TODOs in Timeline view
2. Click the **"Complete Day"** button at the bottom
3. Confirm when prompted
4. Once a day is completed:
   - The day shows a lock icon
   - No new TODOs can be added
   - No TODOs can be edited or deleted
   - TODOs remain visible in both views for reference

### Switching Views

Use the **Calendar** and **Timeline** buttons in the header to switch between views:

- **Calendar View:** See a month at a glance with TODO counts per day
- **Timeline View:** See all TODOs in chronological order

### Countdown Timer

Each TODO displays a real-time countdown showing:
- **Green:** More than 1 hour remaining
- **Yellow:** Less than 1 hour remaining
- **Red:** Overdue

Format: `2d 5h 30m 15s` or `Overdue by 1h 20m`

## Data Storage

All data is stored locally in your browser using localStorage:
- TODOs are automatically saved as you add/edit/delete them
- Refreshing the page preserves all your data
- Clear your browser's localStorage to reset the app

## Keyboard Shortcuts

- **Escape:** Close modals and dialogs
- **Enter:** Submit forms (when focused on last input)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Project Structure

```
src/
├── components/           # React components
│   ├── layout/          # Header, Layout wrapper
│   ├── todo/            # TODO form, item, list, timer
│   ├── calendar/        # Calendar view
│   ├── timeline/        # Timeline view
│   └── common/          # Reusable: Button, Modal, Dialog
├── store/               # Zustand state management
├── types/               # TypeScript interfaces
├── utils/               # Date, countdown utilities
├── hooks/               # Custom React hooks
├── App.tsx              # Main app component
└── main.tsx             # Entry point
```

## Performance

- Optimized for 500+ TODOs without performance issues
- Each TODO runs its own countdown timer (updates every second)
- Efficient React re-rendering with proper memoization
- Minimal bundle size (~185KB minified, ~59KB gzipped)

## Future Enhancements

- ✨ Categories/tags for TODOs
- 🎯 Priority levels (high, medium, low)
- 🔍 Search and filter functionality
- 📊 Statistics and insights
- 🌙 Dark mode
- 🔔 Browser notifications for upcoming TODOs
- ♻️ Recurring TODOs
- ↩️ Undo/Redo functionality

## License

MIT

## Author

Created for AIHackathon 2026
