# Task Manager App
A task management app built using React and Material UI, supporting full CRUD operations, dark/light theming, filtering, and persistent local storage.

Hosted on Vercel: https://mini-task-manager-three-puce.vercel.app/

## Concepts Utilised
1. React Functional Components
2. Props, State variables, useEffect.
3. MUI (Material UI) component library — AppBar, Dialog, Table, Chip, ToggleButtonGroup, etc.
4. ThemeProvider and createTheme for dark/light mode switching
5. localStorage for persistent task state across sessions
6. `crypto.randomUUID()` for unique task IDs
7. Controlled forms with edit/add mode switching via shared Dialog
8. Conditional rendering for empty states, filtered views, and form modes

## Features
1. Add Tasks — via a modal Dialog with fields for title, priority, and due date
2. Edit Tasks — same form reused in edit mode, pre-filled with existing values
3. Delete Tasks — removes a task instantly by its UUID
4. Complete/Uncomplete Toggle — checkbox on each row flips the completed state, with strikethrough styling applied
5. Priority Levels — Low, Medium, High, shown as colour-coded chips (green / orange / red)
6. Due Date Support — optional date picker on each task, shows -- if not set
7. Filter by Status — toggle between All, Completed, and Pending views
8. Persistent Storage — tasks are saved to localStorage so they survive page refreshes
9. Dark / Light Mode — full theme switch using MUI's ThemeProvider, toggled from the navbar
10. Empty State — a friendly placeholder shown when no tasks exist yet
11. Unique IDs — each task gets a crypto.randomUUID() so edits and deletes are always precise
12. Responsive Modal — the same Dialog handles both add and edit without duplicating any UI

### Components

```
<Root>                          ---> Manages theme (dark/light) and wraps everything in ThemeProvider
  <App>                         ---> Core state: tasks, addtask dialog, editingTask, filterType
    <AppBar />                  ---> Nav with dark mode toggle and "+ Add Task" button
    <Dialog>                    ---> Modal wrapper for TaskForm
      <TaskForm />              ---> Add or Edit form (detects mode via initialValues prop)
    </Dialog>
    <FilterBar />               ---> Toggle between All / Completed / Pending
    <Home />                    ---> Empty state placeholder when no tasks exist
    <TaskList />                ---> Table of tasks with edit, delete, and toggle actions
  </App>
</Root>
```

## App.jsx

```js
const [tasks, setTasks] = useState(()=> {
  const stored = localStorage.getItem('taskList')
  return stored ? JSON.parse(stored) : []
});
const [addtask, setAddtask] = useState(false);
const [editingTask, setEditingTask] = useState(null);
const [filterType, setFiltertype] = useState('all')
```

`tasks` --> initialised from localStorage so tasks survive a page refresh  
`addtask` --> controls whether the Dialog (modal) is open  
`editingTask` --> holds the task being edited; when non-null, the Dialog renders TaskForm in edit mode  
`filterType` --> drives the `filteredTasks` derived array shown to `<TaskList />`

CRUD functions are defined here and passed as props:
- `onAdd` --> generates a UUID and appends the task
- `onDelete` --> filters out the task by id
- `onEdit` --> maps over tasks and replaces the matching one
- `onToggle` --> flips the `completed` boolean on the matching task
- `onFilter` --> updates `filterType`, which recomputes `filteredTasks`

## TaskForm.jsx

Here I made the TaskForm as a compound component - that derives whether it's in Add mode or Editing mode , depending on the initialValues passed - if empty? add mode, else edit mode
```js
const isEditing = Boolean(initialValues)
const [title, setTitle] = useState(initialValues?.title ?? "");
const [priority, setPriority] = useState(initialValues?.priority ?? 'medium');
const [dueDate, setDuedate] = useState(initialValues?.dueDate ?? '');
```

## TaskList.jsx

Instead of having a seperate component - `<TaskItem />` , I opted for using MUI's built in Table Component structure.

```js
{tasks.map((task) => (
  <StyledTableRow key={task.id}>
    ...
  </StyledTableRow>
))}
```

Renders tasks as a styled MUI Table using `StyledTableCell` and `StyledTableRow`
Each row includes:
- A `Checkbox` wired to `onToggle` for marking tasks complete
- The task title with `line-through` styling applied when completed
- A `Chip` coloured by priority (`error` for high, `warning` for medium, `success` for low)
- The due date, defaulting to `--` if not set
- Edit and Delete `IconButton`s