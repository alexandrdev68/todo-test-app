# vite-template-redux

Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)


## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## App goals
- the main goal of the app is manage users todo list (add, update remove)
- main page shows a list of users with short user guide
- when user click on table row app redirected to the todo list and actions menu
- summary page shows information about count of complete and incomplete todos for each user

## Used technologies
- [AG Grid](https://www.ag-grid.com/)
- [RTK Query and Redux Toolkit](https://redux-toolkit.js.org/)
- [React bootstrap](https://react-bootstrap.github.io/)
- [React router](https://reactrouter.com/en/main)

## Technical decisions
 - Implemented universal Typography component for texts
 - Implemented DataGrid for apply default app settings for it anywhere at the project
 - Use CSS variables at the index.css for default css values (colors, heights)
 - 
