firebase target:apply hosting xgoadmin xgoadmin
firebase deploy -P xgogt502 --only hosting:xgoadmin



firebase hosting:sites:create xgoadmin
firebase target:apply hosting xgoadmin xgoadmin
firebase deploy --only hosting:xgoadmin

firebase hosting:sites:create xgob2b
firebase target:apply hosting xgob2b xgob2b
firebase deploy --only hosting:xgob2b
