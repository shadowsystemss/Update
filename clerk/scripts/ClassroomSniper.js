// List a lessons in selected classroom
// Edited 14.11.2025
// Tested on version 1.1.3 (CAN'T STOP)
Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const cacheMode = Settings.CacheOptimistic;
Settings.CacheOptimistic = false;
Init.SetupCache();
Tools.FullProfileFiller.SearchByName = true;
const date = new Date();
date.setHours(3, 0, 0, 0);
(async () => {
  const classroom = await prompt("Какой кабинет вас интересует?");
  if (!classroom) return;
  const condition = (l) => l.Classroom == classroom;
  clear();
  log(date);
  log(`${classroom} заняли:`);

  const epm = new EasyProfileManager(Tools.FullProfileFiller);
  epm.EmployeeMode = true;
  epm.Branch = "Чебоксар";

  let profile = await epm.GetFullProfileAsync(cancel);
  const employees = await RucSu.EmployeesProvider.GetEmployeesAsync(
    profile,
    cancel
  );

  const lessons = new ListOfLessons();
  for (let employee in employees) {
    epm.Employee = employee;
    profile = await epm.GetFullProfileAsync(cancel);
    let day = await Clerk.TimeAddAndSortWrapper.GetDayScheduleAsync(
      profile,
      date,
      cancel
    );
    if (day == null) continue;
    for (let lesson of day)
      if (condition(lesson)) {
        lessons.Add(lesson);
      }
  }
  for (let ml of MultiLessonsBuilder.MultiLessonsBuild(
    Clerk.TimeAddAndSortWrapper.Sort(lessons)
  )) {
    log(
      Rukn.MultiLessonToStringFormatter.MultiLessonToString(
        ml,
        PrettySettings.Default
      )
    );
    log();
  }
})()
  .catch(log)
  .finally(() => {
    Settings.CacheOptimistic = cacheMode;
    Tools.FullProfileFiller.SearchByName = false;
    Init.SetupCache();
  });
