"use server";

import { prisma } from "./db";

export async function createTodo(title: string) {
  await prisma.todo.create({
    data: {
      title: title,
    },
  });
}

export async function getTodo() {
  const todosPromise = prisma.todo.findMany();
  const todos = await todosPromise;
  return todos;
}

export async function deleteTodo(id: number) {
  await prisma.todo.delete({
    where: {
      id: id,
    },
  });
}
export async function updateTodo(id: number, title: string) {
  await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
  
}
