// Load script from current repository
// Edited 05.12.2025
// Tested on version 1.1.6 (GameOver)
(async () => {
  clear();
  let response = await fetch(
    "https://api.github.com/repos/shadowsystemss/Update/contents/clerk/scripts"
  );
  let data = JSON.parse(response);
  let dict = {};
  let keys = [];
  for (l of data) {
    keys.push(l.name);
    dict[l.name] = l.download_url;
  }
  selection = await select(keys);
  if (selection == null) return;
  response = await fetch(dict[selection]);
  if (Clerk.Version == "1.1.5") setCode(response);
  else Terminal.SetCode(response);
})().catch(log);
