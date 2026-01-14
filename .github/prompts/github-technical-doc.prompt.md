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

| Category | Keywords/Tags | When to Update |
|----------|---------------|----------------|
| **architecture.md** | `architecture`, `structure`, `design-pattern`, `tech-stack`, `folder-structure`, `data-flow` | Changes to overall app structure, new major dependencies, architectural decisions |
| **components.md** | `component`, `ui`, `react-component`, `props`, `tsx`, `layout`, `view` | New or modified React components, component refactoring, prop changes |
| **state-management.md** | `state`, `store`, `zustand`, `persistence`, `actions`, `mutations`, `selectors` | Changes to state structure, new actions, store modifications |
| **data-models.md** | `type`, `interface`, `model`, `schema`, `enum`, `types.ts` | New or modified TypeScript types, interfaces, data structures |
| **utilities.md** | `utility`, `helper`, `utils`, `function`, `date`, `format`, `calculation` | New or modified utility functions, helper methods |
| **hooks.md** | `hook`, `use-`, `custom-hook`, `react-hook` | New or modified custom React hooks |
| **styling.md** | `style`, `css`, `tailwind`, `theme`, `responsive`, `dark-mode`, `design` | Styling changes, theme updates, CSS modifications |
| **build-deployment.md** | `build`, `deploy`, `vite`, `config`, `environment`, `ci-cd`, `production` | Build configuration changes, deployment updates |

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
└── build-deployment.md      # Build and deployment
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
   - Include:
     - Code examples from actual implementation
     - API references from type definitions
     - Usage patterns observed in codebase
     - Context from JIRA acceptance criteria
     - Cross-references to related categories

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
```

## Tips

- **Prioritise Recent Changes**: Focus on changes from `changes.md` first, then enrich with JIRA context
- **Use Keywords for Precision**: Match JIRA ticket keywords to categories for accurate updates
- **Keep Documentation DRY**: Link between related sections rather than duplicating
- **Preserve Existing Structure**: If a technical documentation structure exists, follow it exactly
- **Use Diagrams**: Include Mermaid diagrams for complex relationships (architecture, data flow, component hierarchies)
- **Include Metadata**: Add "last updated" dates and related JIRA ticket references
- **Add Tags**: Include relevant tags for easy searching (matching category keywords)
- **Stay Current**: Ensure code examples match actual implementation
- **Cross-Reference**: Link to business documentation where user-facing features are explained
- **Document Rationale**: When JIRA provides implementation context, include it
- **Flag Conflicts**: If JIRA acceptance criteria doesn't match implementation, document in assumptions

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
├── components.md             # Component documentation
├── state-management.md       # State management
├── data-models.md           # Data models and types
├── utilities.md             # Utility functions
├── hooks.md                 # Custom React hooks
├── styling.md               # Styling approach
└── build-deployment.md      # Build and deployment
```

Also update: `docs/mkdocs.yml` to include technical documentation in navigation.

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
