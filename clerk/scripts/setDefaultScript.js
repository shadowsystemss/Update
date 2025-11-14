// Set default script
// Edited 14.11.2025
// Tested on version 1.1.5 (MyBad!)
(async () => {
  clear();
  let file = await FileSystem.PickFileAsync();
  let path = Path.Combine(FileSystem.ScriptDirectory, "default");
  if (!file) {
    alert("Вы не выбрали скрипт");
    return;
  }
  await File.CopyAsync(file, path, cancel);
  log("Скрипт по умолчанию выбран");
})().catch(log);
