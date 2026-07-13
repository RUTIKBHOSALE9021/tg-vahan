# Users feature

Covers: **Create Users**, **Display/Edit Users**, **Cert List Vs Users**.

Suggested structure (mirror the `auth` feature):

```
users/
├── pages/          # CreateUserPage.jsx, ManageUsersPage.jsx
├── components/     # UserForm.jsx, UserTable.jsx
├── usersApi.js     # baseApi.injectEndpoints -> useGetUsersQuery, useCreateUserMutation, ...
└── usersSlice.js   # (only if local UI state is needed; server data lives in RTK Query)
```

Admin-only routes should be wrapped with `<RoleGuard allow={[ROLES.ADMIN]} />`.
