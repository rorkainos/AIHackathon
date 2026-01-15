# Technical Documentation Update Prompt

You are a senior technical architect, software engineer, and documentation specialist.

## Objective

Analyse the provided application codebase and supplementary documentation to generate or update technical documentation structured for MkDocs in the `docs/docs/technical/` directory.

## Sources of Information (IMPORTANT)

You must derive technical understanding from the following sources, in order of precedence:

1. **Changes Documentation**:

   - File: `docs/context/changes.md`
   - Contains recent code changes, commits, and file modifications
   - Use this to understand what has been recently added, modified, or deleted

2. **JIRA Ticket Information**:

   - Location: `jira/` folder (JSON files exported via `scripts/jira_export.sh`)
   - Focus on:
     - **Description**: Technical implementation details and context
     - **Acceptance Criteria**: Features and functionality to be documented
   - Use JIRA data to understand:
     - Implementation intent and rationale
     - Feature requirements and technical specifications
     - Component relationships and dependencies

3. **Application Codebase**:

   - Analyse the current project structure in `/src` directory
   - Review component implementations, hooks, utilities, and types
   - Observe actual behaviour and patterns

4. **Existing Technical Documentation**:
   - Location: `/docs/docs/technical/`
   - Treat existing files as authoritative templates
   - Preserve structure, file names, and section headers

## Keyword-Based Categorisation

When analysing JIRA tickets and changes, use keywords to determine which technical documentation category should be updated or created:

### Category Matching Keywords

| Category                | Keywords/Tags                                                                                | When to Update                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **architecture.md**     | `architecture`, `structure`, `design-pattern`, `tech-stack`, `folder-structure`, `data-flow` | Changes to overall app structure, new major dependencies, architectural decisions |
| **components.md**       | `component`, `ui`, `react-component`, `props`, `tsx`, `layout`, `view`                       | New or modified React components, component refactoring, prop changes             |
| **state-management.md** | `state`, `store`, `zustand`, `persistence`, `actions`, `mutations`, `selectors`              | Changes to state structure, new actions, store modifications                      |
| **data-models.md**      | `type`, `interface`, `model`, `schema`, `enum`, `types.ts`                                   | New or modified TypeScript types, interfaces, data structures                     |
| **utilities.md**        | `utility`, `helper`, `utils`, `function`, `date`, `format`, `calculation`                    | New or modified utility functions, helper methods                                 |
| **hooks.md**            | `hook`, `use-`, `custom-hook`, `react-hook`                                                  | New or modified custom React hooks                                                |
| **styling.md**          | `style`, `css`, `tailwind`, `theme`, `responsive`, `dark-mode`, `design`                     | Styling changes, theme updates, CSS modifications                                 |
| **build-deployment.md** | `build`, `deploy`, `vite`, `config`, `environment`, `ci-cd`, `production`                    | Build configuration changes, deployment updates                                   |
| **faq.md**              | `question`, `how-to`, `why`, `troubleshoot`, `error`, `issue`, `help`, `confused`            | After ANY documentation update - anticipate junior developer questions            |

### Matching Process

1. **Extract Keywords**: From JIRA ticket summary, description, and acceptance criteria
2. **Match to Categories**: Identify which category/categories the change affects
3. **Determine Action**:
   - **Amend**: If the file exists and the change modifies existing functionality
   - **Generate New Section**: If the file exists but the change adds new functionality
   - **Create File**: If the category file doesn't exist yet
4. **Apply Changes**: Update documentation with:
   - Code examples from the implementation
   - API references from type definitions
   - Usage patterns from the codebase
   - Context from JIRA acceptance criteria

### Multi-Category Changes

If a change affects multiple categories (e.g., a new component that uses a custom hook):

- Update ALL affected category files
- Add cross-references between related sections
- Maintain consistency across documentation

## Documentation Categories

Based on the application structure in `/src`, organise technical documentation into the following categories:

### 1. Architecture (`architecture.md`)

- Technology stack and rationale
- Design patterns used (e.g., component composition, state management)
- Folder structure and organisation
- Data flow diagram

### 2. Components (`components.md`)

- Component hierarchy and relationships
- Common components (Button, Modal, ConfirmDialog)
- Layout components (Header, Layout)
- Feature components (Todo, Calendar, Timeline)
- Props interfaces and usage examples

### 3. State Management (`state-management.md`)

- Zustand store architecture
- State structure (`useTodoStore`)
- Actions and mutations
- Persistence strategy (localStorage)
- State selectors and derived data

### 4. Data Models (`data-models.md`)

- TypeScript interfaces and types
- Todo interface
- CompletedDay interface
- TodoStore interface
- CountdownTime interface
- Enums and constants

### 5. Utilities (`utilities.md`)

- Date utilities (`dateUtils.ts`)
  - Date formatting functions
  - Date calculations
  - Date normalisation
- Countdown utilities (`countdownUtils.ts`)
  - Countdown calculations
  - Time remaining logic

### 6. Custom Hooks (`hooks.md`)

- `useCountdown` hook
  - Purpose and usage
  - Parameters and return values
  - Example implementation
- Future hooks as they are added

### 7. Styling (`styling.md`)

- Tailwind CSS configuration
- Custom theme colours
- Responsive design approach
- Component styling patterns
- Dark mode (if implemented)

### 8. Build & Deployment (`build-deployment.md`)

- Vite configuration
- Build process
- Development server
- Environment variables
- Deployment steps

### 9. FAQ (`faq.md`)

- Frequently asked questions from less experienced developers
- Common confusion points and clarifications
- "How do I...?" questions with answers
- "Why does...?" questions explaining rationale
- Troubleshooting common issues
- Links to relevant documentation sections

## Documentation Requirements

For each category, include:

1. **Overview**: Brief description of the category's purpose
2. **Key Files**: List relevant source files with links
3. **Details**: In-depth explanation of components/utilities/patterns
4. **Code Examples**: Practical examples showing usage
5. **API Reference**: Function signatures, parameters, return types
6. **Relationships**: How this category connects to others
7. **Best Practices**: Guidelines for working with this area
8. **Recent Changes**: Highlight relevant changes from `changes.md`

## Output Structure

```
docs/docs/technical/
├── index.md                  # Overview and navigation
├── architecture.md           # System architecture
├── components.md             # Component documentation
├── state-management.md       # State management
├── data-models.md           # Data models and types
├── utilities.md             # Utility functions
├── hooks.md                 # Custom React hooks
├── styling.md               # Styling approach
├── build-deployment.md      # Build and deployment
└── faq.md                   # Frequently asked questions
```

## Update Process

1. **Analyse Changes**:

   - Review `docs/context/changes.md` to identify added, modified, or deleted files
   - Note commit messages and file diffs

2. **Analyse JIRA Tickets**:

   - Access JIRA data from `jira/` folder (use `scripts/jira_export.sh` if needed)
   - Extract technical context from:
     - Ticket summary
     - Description (implementation details)
     - Acceptance criteria (feature requirements)
   - Extract keywords for category matching

3. **Map to Categories**:

   - Use keyword matching table above to determine affected categories
   - Identify whether to amend existing content or generate new sections
   - Note cross-category dependencies

4. **Create/Update Files**: For each affected category:

   - **If file doesn't exist**: Create it with the full structure
   - **If file exists**:
     - Add new sections for new features
     - Update existing sections for modifications
     - Mark deprecated features if functionality was removed

   **File-Specific Content Guidelines**:

   | File                    | Required Sections                                                       | Do NOT Include                                                                                |
   | ----------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
   | **index.md**            | Overview, Navigation links, Quick reference table                       | Detailed explanations (link to specific pages), Recent changes summary                        |
   | **architecture.md**     | Tech stack, Folder structure, Design patterns, Data flow diagram        | Code examples (keep high-level), Decision rationale, Scalability notes                        |
   | **components.md**       | Component hierarchy, Props interfaces, Usage examples                   | Implementation internals, Accessibility notes, Performance tips                               |
   | **state-management.md** | Store structure, Actions list, Persistence details, State shape         | UI logic details, Selectors, Derived state                                                    |
   | **data-models.md**      | All interfaces/types with full definitions, Type relationships          | Usage examples (link to relevant pages), Validation rules, Enums                              |
   | **utilities.md**        | Function name, Example usage only                                       | Descriptions, Parameters, Return types, Implementation details                                |
   | **hooks.md**            | Hook name, Purpose, Parameters, Return value, Usage example             | Internal implementation, Dependencies, Edge cases                                             |
   | **styling.md**          | Tailwind config, Theme colours, Responsive breakpoints, Common patterns | Component-specific styles (belongs in components.md), Dark mode, Animations                   |
   | **build-deployment.md** | Build commands, Environment variables, Deployment steps                 | Runtime behaviour, CI/CD config, Performance optimisation                                     |
   | **faq.md**              | Q&A format, Clear answers, Links to docs                                | Duplicate content (link instead), Opinion-based answers, Code snippets, Troubleshooting steps |

   **Section Templates by File**:

   - **index.md**: Navigation hub only - brief intro + links table
   - **architecture.md**: Diagrams encouraged (Mermaid), minimal code
   - **components.md**: One section per component with props + example
   - **state-management.md**: Show state shape, list all actions with signatures
   - **data-models.md**: Full TypeScript definitions, no examples
   - **utilities.md**: Function name + single usage example (minimal format)
   - **hooks.md**: Similar to components but focus on inputs/outputs
   - **styling.md**: Config snippets + class name patterns
   - **build-deployment.md**: Step-by-step commands + env var table
   - **faq.md**: Q&A format - question as heading, concise answer below with links

5. **Update Index**: Update `technical/index.md` to link to all category pages

6. **Update MkDocs Config**: Ensure `mkdocs.yml` includes all technical documentation pages

7. **Validate**:
   - Ensure all links work
   - Verify documentation matches current codebase
   - Check consistency across categories

## Example Entry Format

```markdown
## Component Name

**Location**: [src/components/path/Component.tsx](../../../src/components/path/Component.tsx)

### Overview

Brief description of what this component does.

### Props

\`\`\`typescript
interface ComponentProps {
prop1: string;
prop2?: number;
onAction: () => void;
}
\`\`\`

### Usage

\`\`\`tsx
<Component
prop1="value"
prop2={42}
onAction={() => console.log('action')}
/>
\`\`\`

### Related

- See [Other Component](./components.md#other-component)
- Uses [Utility Function](./utilities.md#utility-function)
```

## Navigation & MkDocs Integration

Update `mkdocs.yml` to include all technical documentation pages in a logical hierarchy:

```yaml
nav:
  - Technical:
      - Overview: technical/index.md
      - Architecture: technical/architecture.md
      - Components: technical/components.md
      - State Management: technical/state-management.md
      - Data Models: technical/data-models.md
      - Utilities: technical/utilities.md
      - Custom Hooks: technical/hooks.md
      - Styling: technical/styling.md
      - Build & Deployment: technical/build-deployment.md
      - FAQ: technical/faq.md
```

## FAQ Generation Guidelines (IMPORTANT)

After updating ANY technical documentation, you MUST update `faq.md` by adopting the perspective of a **less experienced developer** who is new to the codebase.

### Purpose

The FAQ page exists to reduce the need for junior developers to ask senior team members basic questions. Every question answered here saves time and empowers self-learning.

### How to Generate FAQ Content

1. **Adopt a Junior Developer Mindset**: Imagine you're a developer who:

   - Just joined the team
   - Has basic React/TypeScript knowledge but is unfamiliar with this codebase
   - Doesn't understand why certain patterns were chosen
   - Might be confused by terminology or architecture decisions

2. **Question Categories to Anticipate**:

   | Category                | Example Questions                                                                  |
   | ----------------------- | ---------------------------------------------------------------------------------- |
   | **"How do I...?"**      | "How do I add a new component?", "How do I update state?"                          |
   | **"Why does...?"**      | "Why do we use Zustand instead of Redux?", "Why is this file structured this way?" |
   | **"What is...?"**       | "What is the purpose of this utility?", "What does this hook return?"              |
   | **"Where do I...?"**    | "Where do I add new types?", "Where is state managed?"                             |
   | **"When should I...?"** | "When should I create a custom hook?", "When do I need to update the store?"       |
   | **Troubleshooting**     | "Why am I getting this error?", "Why isn't my component re-rendering?"             |

3. **After Each Documentation Update**:
   - Review what was documented
   - Ask yourself: "What would confuse me if I was new?"
   - Generate 2-5 relevant questions per major change
   - Provide clear, concise answers with links to relevant documentation

### FAQ Entry Format

```markdown
### How do I add a new Todo item programmatically?

Use the `addTodo` action from the store:

\`\`\`typescript
const { addTodo } = useTodoStore();
addTodo({ title: 'New task', completed: false });
\`\`\`

**See also**: [State Management](./state-management.md#actions)

---

### Why do we use Zustand instead of Redux?

Zustand was chosen for its simplicity and minimal boilerplate. It provides:

- No providers or context wrappers needed
- Built-in persistence support
- TypeScript-first design

**See also**: [Architecture](./architecture.md#tech-stack)
```

### FAQ Organisation

Group questions by topic area:

```markdown
## State Management Questions

<!-- Questions about store, actions, state -->

## Component Questions

<!-- Questions about props, rendering, composition -->

## Development Workflow Questions

<!-- Questions about building, testing, deploying -->

## Troubleshooting

<!-- Common errors and solutions -->
```

## Tips

- **Prioritise Recent Changes**: Focus on changes from `changes.md` first, then enrich with JIRA context
- **Use Keywords for Precision**: Match JIRA ticket keywords to categories for accurate updates
- **Keep Documentation DRY**: Link between related sections rather than duplicating
- **Preserve Existing Structure**: If a technical documentation structure exists, follow it exactly
- **Use Diagrams**: Include Mermaid diagrams for complex relationships (architecture, data flow, component hierarchies)
- **Add Tags**: Include relevant tags for easy searching (matching category keywords)
- **Stay Current**: Ensure code examples match actual implementation
- **Cross-Reference**: Link to business documentation where user-facing features are explained
- **Document Rationale**: When JIRA provides implementation context, include it
- **Flag Conflicts**: If JIRA acceptance criteria doesn't match implementation, document in assumptions

## Markdown Formatting Requirements (CRITICAL)

### Bullet List Spacing

**All bullet lists must have a blank line before them** to render properly in MkDocs.

**Incorrect**:

```markdown
**Parameters**:

- param1: string
- param2: number
```

**Correct**:

```markdown
**Parameters**:

- param1: string
- param2: number
```

This applies to all contexts:

- After bold labels (e.g., `**Benefits**:`, `**Features**:`, `**Returns**:`)
- After plain text labels (e.g., `Common patterns:`, `Organised by feature:`)
- After any colon followed by a list
- In nested lists (ensure blank lines at each level)

**Always verify proper spacing** before finalising any documentation file.

## JIRA Data Usage Rules

When processing JIRA tickets:

- Focus on **Description** and **Acceptance Criteria** sections
- Use JIRA data to:
  - Understand technical implementation intent
  - Clarify feature requirements and specifications
  - Explain component relationships and dependencies
  - Provide context for architectural decisions
- If JIRA content conflicts with actual implementation:
  - Favour observed code behaviour
  - Document the discrepancy in the relevant section
  - Note it as an assumption or open question

## Output Requirements (CRITICAL)

Generate or update Markdown (.md) files in the `docs/docs/technical/` directory.

**Structure**:

```
docs/docs/technical/
├── index.md                  # Overview and navigation
├── architecture.md           # System architecture
├── components/               # Component documentation folder
│   ├── _index.md            # Components overview (Location, Category info)
│   ├── button.md            # Individual component (no Location/Category/Props)
│   ├── modal.md
│   └── ...
├── state-management.md       # State management
├── data-models.md           # Data models and types
├── utilities.md             # Utility functions
├── hooks.md                 # Custom React hooks
├── styling.md               # Styling approach
└── build-deployment.md      # Build and deployment
```

### Folder Structure Guidelines

When creating or amending folders for grouped documentation (e.g., components, utilities by category):

1. **Create `_index.md` Overview**:

   - Place an `_index.md` file in the folder root for easier access
   - This file should contain:
     - General category information (e.g., "Common Components", "Layout Components")
     - Location patterns (e.g., "All common components are in `src/components/common/`")
     - Category descriptions and purposes
     - Links to all files in the folder
     - Shared concepts (e.g., Props interfaces patterns, common usage)

2. **Individual Files Should NOT Include**:
   - **Location** field (generalized in `_index.md`)
   - **Category** field (implied by folder structure and `_index.md`)
   - **Props** section as a standalone (integrate into main content or examples)
3. **Individual Files SHOULD Include**:
   - Component/item name as heading
   - Description and purpose
   - Usage examples with code
   - Features and capabilities
   - Related documentation links

**Example `_index.md`**:

```markdown
# Common Components

**Location**: `src/components/common/`

Reusable UI components used throughout the application.

## Components in this Category

- [Button](./button.md) - Reusable button with variants
- [Modal](./modal.md) - Overlay modal for forms
- [ConfirmDialog](./confirm-dialog.md) - Confirmation dialogs

## Common Patterns

All components in this category follow these patterns:

- TypeScript interfaces for props
- Forward refs where needed
- Consistent styling with Tailwind
```

**Example Component File** (button.md):

```markdown
# Button

Reusable button component with multiple variants and sizes.

## Variants

- **primary**: Blue background, primary actions (Add, Save)
- **secondary**: Gray background, secondary actions (Cancel, Close)
- **danger**: Red background, destructive actions (Delete)

## Usage

\`\`\`tsx
import { Button } from './components/common/Button';

<Button variant="primary" onClick={handleAdd}>
  Add TODO
</Button>
\`\`\`
```

### MkDocs Navigation for Folders

When documenting folders, update `docs/mkdocs.yml` to include technical documentation in navigation:

**Navigation Structure**:

**Do NOT**:

- Render or repeat the documentation text in the chat
- Include explanations or summaries outside the file contents
- Overwrite meaningful existing content without justification
- Change established structure without reason

For each file, output:

```
# File: docs/docs/technical/[filename].md
[Full Markdown content]
```
