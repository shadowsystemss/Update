// Set wallpaper
// Edited 14.11.2025
// Tested on version 1.1.5 (MyBad!)
(async () => {
  clear();
  let file = await FileSystem.PickPhotoAsync();
  let path = Path.Combine(FileSystem.ScriptDirectory, "background");
  if (!file) {
    alert("Вы не выбрали картинку");
    return;
  }
  await File.CopyAsync(file, path, cancel);
  Theme.BackgroundImage = path;
  log("BackgroundImage setted");
})().catch(log);
