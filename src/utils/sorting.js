export const getSortValue = (user, field) => {
  if (field === 'fullName') {
    return `${user.lastName} ${user.firstName} ${user.maidenName || ''}`.trim().toLowerCase();
  }
  const val = user[field];
  return typeof val === 'string' ? val.toLowerCase() : val;
};