// List a lessons in selected classroom
// Edited 14.11.2025
// Tested on version 1.1.5 (MyBad!)
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
  setCode(response);
})().catch(log);
