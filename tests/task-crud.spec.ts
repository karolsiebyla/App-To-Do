import { test, expect } from '@playwright/test';

test('Dodawanie, edytowanie, usuwanie zadania', async ({ page }) => {
  
  await page.goto('http://localhost:5173');
  
  await page.waitForSelector('input[type="text"].border.p-2');
  console.log("Strona załadowana");

  const taskInput = page.locator('input[type="text"].border.p-2');
  const addButton = page.locator('button:has-text("Add")');
  await taskInput.fill('Testowe zadanie');
  await addButton.click();
  console.log("Zadanie dodane");

  const task = page.locator('ul li:has-text("Testowe zadanie")').first();
  await task.waitFor({ state: 'attached' });
  console.log("Zadanie pojawiło się na liście");

  const taskTextInitial = await task.locator('span').textContent();
  console.log(`Tekst zadania początkowego: ${taskTextInitial}`);
  expect(taskTextInitial).toBe('Testowe zadanie');

  const editButton = task.locator('button.bg-yellow-400');
  await editButton.click();
  console.log("Kliknięto przycisk Edytuj");

  const taskInputEdit = page.locator('.bg-white input[type="text"]');
  await taskInputEdit.fill('Testowe zadanie edytowane');
  console.log("Zadanie edytowane");

  const saveButton = page.locator('div.bg-white button:has-text("Save")');
  await saveButton.click();
  console.log("Kliknięto przycisk Zapisz");

  await page.waitForTimeout(1000); //krótki timeout, aby być pewnym, że zadanie zostało zapisane

  const updatedTask = page.locator('ul li:has-text("Testowe zadanie edytowane")').first();
  const taskText = await updatedTask.locator('span').textContent();
  console.log(`Tekst edytowanego zadania: ${taskText}`);
  expect(taskText).toBe('Testowe zadanie edytowane');

  const deleteButton = updatedTask.locator('button.bg-red-500');
  await deleteButton.click();
  console.log("Zadanie usunięte");

  await updatedTask.waitFor({ state: 'detached', timeout: 2000 });
  console.log("Zadanie zniknęło z listy");

  const remainingTasks = await page.locator('ul li:has-text("Testowe zadanie")').count();
  console.log(`Liczba zadań utworzonych do testowania po usunięciu: ${remainingTasks}`);
  expect(remainingTasks).toBe(0);
});