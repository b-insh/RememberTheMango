## Component Hierarchy

**AuthFormContainer**
- AuthForm (Sign Up, Login)

**HomeContainer**
- Home
- Sidebar

**SearchContainer**
- SearchResults

**SidebarContainer**
- ListsIndex

**ListItemContainer**
- TasksIndex
- NewTask
- ListDetail

**TaskIndexContainer**
- Task

**CompletedTaskIndexContainer**
- CompletedTasksIndex

**TaskDetailContainer**
- EditTask
- Note
- NewNote

**NoteContainer**
- Note

**NewNote**
- NewNote

**NewTask**
- NewTask

**NewList**
- NewList

**Header**
- DropDown
- SearchBar

## Routes

|Path   | Component   |
|-------|-------------|
| "/sign-up" | "AuthFormContainer" |
| "/sign-in" | "AuthFormContainer" |
| "/home" | "HomeContainer" |
| "/home/list/:listId" | "ListItemContainer" |
| "/home/list/:listId/:taskId" | "TaskDetailContainer" |
| "/home/tasks" | "TaskIndexContainer" |
| "/home/tasks/:taskId" | "TaskDetailContainer" |
| "/home/tasks/completed" | "CompletedTaskIndexContainer" |
| "/home/tasks/completed/:taskId" | "TaskDetailContainer" |

 <!-- i get what's going on but i don't get what's going on -->
