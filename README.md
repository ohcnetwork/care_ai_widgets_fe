# Care AI Widgets — Frontend Plugin

A [Care](https://github.com/ohcnetwork/care_fe) frontend plugin that adds **AI-powered clinical widgets** to the encounter overview. Clinicians can configure prompt-driven widgets that call an AI backend and render structured outputs — summaries, scores, ranked lists, and rich markdown — directly inside the patient chart.

---

## ✨ Features

| Widget Type | Description |
|---|---|
| **Cited Summary** | 3–5 sentence encounter brief with source citations |
| **Ranked List** | Prioritised clinical risks with severity scores and reasoning |
| **Score** | Clinical scoring (e.g. NEWS2) with component breakdown |
| **Markdown** | Structured prose sections with callout support (warning / info) |

- **Template gallery** — pre-built prompts for common clinical tasks (encounter brief, active risks, discharge education, open questions, NEWS2).
- **Custom widgets** — create your own with a name, prompt, model selector, and output type.
- **Per-user storage** — widget configurations are saved to `localStorage`, scoped by user.
- **Copy to clipboard** — one-click plain-text export of any widget output.

## 🏗️ Architecture

```
src/
├── components/AIWidgets/
│   ├── api.ts              # API endpoint definition
│   ├── types.ts            # Shared TypeScript types
│   ├── schemas.ts          # JSON response schemas per widget type
│   ├── templates.ts        # Built-in widget templates
│   ├── store.ts            # Jotai atoms (per-user localStorage)
│   ├── summarize.ts        # Output → plain-text converters
│   ├── WidgetRunner.tsx     # Executes a single widget & renders result
│   ├── WidgetSlot.tsx       # Renders all enabled widgets for an encounter
│   ├── SettingsPage.tsx     # Widget management UI
│   ├── EditorDialog.tsx     # Create / edit widget dialog
│   └── renderers/
│       ├── CitedSummaryWidget.tsx
│       ├── MarkdownWidget.tsx
│       ├── RankedListWidget.tsx
│       └── ScoreWidget.tsx
├── pages/
│   ├── WidgetList.tsx       # /users/:user/ai-widgets
│   └── WidgetEditor.tsx     # /users/:user/ai-widgets/:id
└── manifest.tsx             # Plugin manifest (routes, nav items)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- A running [Care frontend](https://github.com/ohcnetwork/care_fe) dev environment
- The [Care AI backend](https://github.com/ohcnetwork/care_ai_be) plugin providing the `/api/care_ai/encounter/{encounterId}/ask/` endpoint

### Install & Run

```bash
# Clone the repo
git clone https://github.com/ohcnetwork/care_ai_widgets_fe.git
cd care_ai_widgets_fe

# Install dependencies
npm install

# Start dev server (build in watch mode + preview)
npm start
```

### Available Scripts

| Script | Description |
|---|---|
| `npm start` | Build in watch mode and serve preview |
| `npm run build` | Production build via Vite |
| `npm run lint` | Run ESLint |
| `npm run lint-fix` | Auto-fix lint issues |
| `npm run format` | Format with Prettier |
| `npm run sort-locales` | Sort locale JSON keys |

## 🔌 Plugin Integration

This plugin is registered via `manifest.tsx`:

- **Routes** — `/facility/:facilityId/users/:user/ai-widgets` (list & editor)
- **Components** — `EncounterOverviewTop` injects the `WidgetSlot` into the encounter overview
- **User Nav** — adds an "AI Widgets" link (✨) to the user dropdown menu
