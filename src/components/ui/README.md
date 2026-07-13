# UI components (`components/ui`)

Dumb, reusable, presentational primitives used across features — no business
logic, no data fetching. Build these first; features compose them.

Suggested primitives to add:

```
ui/
├── Button.jsx
├── Input.jsx
├── Select.jsx
├── Card.jsx
├── Modal.jsx
├── Table.jsx
├── Badge.jsx
└── Spinner.jsx
```

Style with Tailwind. Keep props minimal and composable. If you later want a
prebuilt kit, `shadcn/ui` patterns fit this folder well.
