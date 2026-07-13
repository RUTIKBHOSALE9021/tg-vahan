/**
 * Roles / access levels.
 *
 * The role is chosen by the user at login (see the LoginPage role selector) and
 * sent with the credentials; the backend also returns it in the login response,
 * and it is stored in the auth slice. These constants drive route protection
 * (see @routes/RoleGuard) and conditional UI.
 * Align the string values with what the backend expects/returns.
 */
export const ROLES = Object.freeze({
  ADMIN: 'admin',
  DEALER: 'dealer',
  USER: 'user',
});

/**
 * Options for the login role selector, in display order.
 * `value` is what we send to the backend; `label` is what the user sees.
 */
export const ROLE_OPTIONS = Object.freeze([
  { value: ROLES.ADMIN, label: 'Admin' },
  { value: ROLES.DEALER, label: 'Dealer' },
  { value: ROLES.USER, label: 'User' },
]);
