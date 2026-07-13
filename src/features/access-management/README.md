# Access Management feature

Covers: **Access Management** (roles, permissions, dealer/user access control).

Suggested structure:

```
access-management/
├── pages/          # AccessManagementPage.jsx
├── components/     # RolePermissionsTable.jsx
└── accessApi.js    # useGetAccessRulesQuery, useUpdateAccessMutation, ...
```

This is typically Admin-only — protect with `<RoleGuard allow={[ROLES.ADMIN]} />`.
