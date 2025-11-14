// List a lessons in selected classroom
// Edited 14.11.2025
// Tested on version 1.1.5 (MyBad!)
clear();
if (!(Clerk.Version == "1.1.3" || Clerk.Version == "1.1.4")) changeMode();
const start = new Date("2025-09-01");
const end = new Date("2025-12-30");
const today = new Date();
Date.prototype.addDays = function (days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const formatDate = (date) =>
  (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
  "." +
  (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1));
const formatDateFull = (date) => formatDate(date) + "." + date.getFullYear();
(async () => {
  const items = {};
  const profile = await RucSu.FullProfileProvider.GetFullProfileAsync(cancel);
  const mode = profile.EmployeeMode ? "Group" : "Employee";
  if (
    !(await confirm(
      `Поиск будет осуществлен между ${formatDateFull(
        start
      )} - ${formatDateFull(end)}`,
      "Продолжить",
      "Да",
      "Нет"
    ))
  )
    return;

  const pretty = await confirm(
    "Добавить форматирование для Telegram?",
    "Вопрос",
    "Да",
    "Нет"
  );

  const withDates = await confirm(
    "Показать даты занятий?",
    "Вопрос",
    "Да",
    "Нет"
  );

  let withNumbers = false;
  if (withDates)
    withNumbers = await confirm(
      "Пронумеровать занятия?",
      "Вопрос",
      "Да",
      "Нет"
    );

  async function getLessons(date) {
    return await RucSu.WeekScheduleProvider.GetWeekScheduleAsync(
      profile,
      date,
      cancel
    );
  }

  for (let date = start; date <= end; date = date.addDays(7)) {
    let lessons = await getLessons(date);
    if (lessons == null) continue;
    for (let lesson of lessons) {
      if (lesson.Name in items) {
        if (lesson.Type in items[lesson.Name]) {
          if (lesson[mode] in items[lesson.Name][lesson.Type]) {
            items[lesson.Name][lesson.Type][lesson[mode]]["count"]++;
            items[lesson.Name][lesson.Type][lesson[mode]]["dates"].push(
              lesson.Date
            );
          } else
            items[lesson.Name][lesson.Type][lesson[mode]] = {
              count: 1,
              passed: 0,
              dates: [lesson.Date],
            };
        } else {
          items[lesson.Name][lesson.Type] = {};
          items[lesson.Name][lesson.Type][lesson[mode]] = {
            count: 1,
            passed: 0,
            dates: [lesson.Date],
          };
        }
      } else {
        items[lesson.Name] = {};
        items[lesson.Name][lesson.Type] = {};
        items[lesson.Name][lesson.Type][lesson[mode]] = {
          count: 1,
          passed: 0,
          dates: [lesson.Date],
        };
      }
      if (lesson.Date < today)
        items[lesson.Name][lesson.Type][lesson[mode]]["passed"]++;
    }
  }

  clear();
  if (pretty)
    log(
      `**Нагрузка у ${
        profile.EmployeeMode ? profile.EmployeeName : profile.GroupName
      }**`
    );
  else
    log(
      `Нагрузка у ${
        profile.EmployeeMode ? profile.EmployeeName : profile.GroupName
      }`
    );

  for (let item in items) {
    if (pretty) log(`**${item}**`);
    else log(item);
    for (let type in items[item])
      for (let who in items[item][type]) {
        let times = items[item][type][who];
        if (pretty)
          log(
            ` - ${type}: __${who}__ (${times.passed}/${times.count} пар прошло)`
          );
        else
          log(` - ${type}: ${who} (${times.passed}/${times.count} пар прошло)`);
        if (withDates) {
          let number = 1;
          for (let day of times.dates) {
            let line = `   - ${formatDate(day)}`;
            if (withNumbers) line += ` (${number})`;
            if (day <= today) line += " прошло";
            log(line);
            number++;
          }
        }
      }
    log();
  }
})().catch(log);
