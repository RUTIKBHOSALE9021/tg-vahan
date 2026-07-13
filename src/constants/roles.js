/**
 * Roles / access levels — keyed by the backend's numeric `role_id`.
 *
 * The user picks a role at login (see the LoginPage selector); we send its
 * `role_id` in the credentials. The backend returns the effective role as
 * `user.userRoleId`, which is stored in the auth slice and drives route
 * protection (see @routes/RoleGuard) and conditional UI.
 *
 * NOTE: role_id 1 is confirmed as Admin (Super Admin) by the backend. Confirm
 * the DEALER / USER ids with the API and adjust if they differ.
 */
export const ROLES = Object.freeze({
  ADMIN: 1,
  DEALER: 2,
  USER: 3,
});

/**
 * Options for the login role selector, in display order.
 * `value` is the role_id sent to the backend; `label` is what the user sees.
 */
export const ROLE_OPTIONS = Object.freeze([
  { value: ROLES.ADMIN, label: 'Admin' },
  { value: ROLES.DEALER, label: 'Dealer' },
  { value: ROLES.USER, label: 'User' },
]);
