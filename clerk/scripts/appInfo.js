clear();
log(`Название: ${Clerk.VersionName}`);
log(`AppId: ${Clerk.VersionId}`);
log(`Ваша версия: ${Clerk.Version}`);
changeMode();
fetch(
  "https://raw.githubusercontent.com/shadowsystemss/Update/refs/heads/main/clerk/version"
)
  .then((data) => {
    log(`Актуальная версия: ${data}`);
    if (data == Clerk.Version) log("У вас актуальная версия приложения.");
    else log("У вас иная версия приложения.");
  })
  .catch(log);
