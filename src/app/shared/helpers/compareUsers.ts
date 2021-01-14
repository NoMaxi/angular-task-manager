import { User } from '../interfaces/user';

export const compareUsers = (user1: User, user2: User): boolean => {
  return user1 && user2 ? user1.id === user2.id : user1 === user2;
};
