(async () => {
  clear();
  let file = await File.PickPhotoAsync();
  let path = Path.Combine(File.ScriptDirectory, "background");
  await File.CopyAsync(file, path);
  Theme.BackgroundImage = path;
  log("BackgroundImage setted");
})().catch(log);
