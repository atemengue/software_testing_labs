export class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.isPremium = false;
  }
}
export async function userExists(username) {
  const existingUsers = ['newuser1@pluralsight.com'];

  existingUsers.map((user) => {
    if (user.includes(username)) return true;
  });
  
  return false;
}

export function createUserId() {
  // Placeholder
  // Would call to DB
  return 2;
}
