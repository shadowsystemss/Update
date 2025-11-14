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
