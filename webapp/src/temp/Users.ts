import { IUser } from "../models/IUser";

export let Users: IUser[] = []; // Экспортируемый массив пользователей

export async function getUsers(): Promise<IUser[]> {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const userData = await response.json(); // Получаем ОДНОГО пользователя

    // Если сервер возвращает одного пользователя, добавляем его в массив
    Users = [userData]; // Обернули в массив, чтобы Users оставался IUser[]

    return Users; 
  } catch (error) {
    console.error("Error fetching users:", error);
    Users = []; // Очищаем массив в случае ошибки
    return Users;
  }
}