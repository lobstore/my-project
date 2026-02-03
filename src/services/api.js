export const fetchUsersData = async () => {
  const url = 'https://dummyjson.com/users?limit=100&select=firstName,lastName,maidenName,age,gender,phone,email,address,height,weight';
  const response = await fetch(url);
  if (!response.ok) throw new Error('Ошибка при загрузке данных');
  return await response.json();
};