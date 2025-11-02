clear();
log("clear();");
for (i in Reflection.GetProperties('Theme'))
  log(`Theme.${i} = '${Theme[i]}';`);
log("PersonalizationService.LoadTheme();");
log("log('Theme loaded');");
