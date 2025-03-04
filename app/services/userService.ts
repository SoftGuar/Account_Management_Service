// app/services/userService.ts
import { UserModel, CreateUserInput } from '../models/user.model';

export const UserService = {
  createUser: async (userData: CreateUserInput) => {
    // Check if user with this email already exists
    const existingUser = await UserModel.findByEmail(userData.email);
    
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // In a real application, you would hash the password before storing it
    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    return UserModel.create({
      ...userData,
      // password: hashedPassword
    });
  },
  
  getUserById: async (id: number) => {
    return UserModel.findById(id);
  },
  
  getAllUsers: async () => {
    return UserModel.getAll();
  }
};