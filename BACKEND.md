# Backend Integration

We are going to be taking the kanban portion of the grid-and-flexbox-workshop to an existing backend.

## Prerequisites

- Clone the backend repository that we will be working with located here: https://github.com/giantmachines/gm-kanban

```bash
git clone git@github.com:giantmachines/gm-kanban.git
```

- Follow README.md instructions for the `gm-kanban` repository (`Prerequisites` and `Getting Started`) to stand up the backend server.
- Do a fresh npm install for this repository.

## Background

You are apart of a team that has been working on adding in a Kanban board feature into your application. The backend team has worked on the agreed upon specifications on how the backend should work. The frontend team has been split up into two sub-teams where one is primarily working on the UI of the Kanban Board and the other on the backend-frontend integration. You are the backend-frontend integration team and all other teams are ready for your final pieces to connect everything together.

## Tasks

- [] ★ Choose a state management system for your application (context, redux, or react-query) and install their corresponding packages.
- [] ★ Add in Kanban storage for board, columns, cards
  - [] Add fetching and storing of board data
  - [] Add fetching and storing of columns for a related board
  - [] Add fetching and storing of cards for a related column
  - [] Use stored board, column, and card data and view in `KanbanView`
- [] ★★ Add in Authentication into the application
  - [] User should be able to Sign Up through the `SignUpModal`
  - [] User should be able to Log In through the `LoginModal`
  - [] User should be able to Logout
  - [] User session should persist on refresh of application
- [] ★★ Add in create and delete functionality
  - [] A logged in user should be able to create a column through the `CreateColumnModal`.
  - [] A logged in user should be able to create a card through the `CreateCardModal`.
  - [] A logged in user should be able to delete a column through the `KanbanView`'s ColumnHeader delete button.
  - [] A logged in user should be able to delete a card through the `Card` component.
- [] ★★★ Add in moving (updating) of columns and cards
  - [] A logged in user should be able to move a column (order should be preserved)
  - [] A logged in user should be able to move a card (order should be preserved)
- [] `STRETCH` Add in editing of cards
  - [] A logged in user should be able to edit column names
  - [] A logged in user should be able to edit card names and descriptions
