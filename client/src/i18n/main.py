import sys
from sync import sync
from updater import update

args = (sys.argv)[1:]

def help():
  print("=================== Framer.ai Translator (v.1.0.0) ===================")
  print("The system will let you add translations without touching the files")
  print("and sync all the files at once and add the missing values as well.")
  print("")
  print("\t Arguments:")
  print("\t * sync (file) [sync all the translation languages. Requires a sync file to compare]: python main.py sync en")
  print("\t * update [update/create one or more values]: python main.py update")


if __name__ == "__main__":
  valid_args = ["sync", "update"]
  if len(args) == 0 or args[0] not in valid_args:
    help()
  else:
    if args[0] == "sync":
      lang = args[1]
      if not lang:
        print("A sync file is required.")
        help()
      else:
        sync(lang)
    if args[0] == "update":
      update()



