export const checkIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getCurrentUser = (state) => state.auth.currentUser || {};
