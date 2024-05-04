from updater import get_files_names, update_file
import json

def read_keys(file):
  with open(file, encoding='utf8') as enj:
    en = json.load(enj)
    return list(en.keys())


def sync(ref):
  print("! Taking as reference language \"" + ref + "\"")
  files = get_files_names()
  en = read_keys(ref+'.json')
  files.remove(ref)
  for i in files:
    lang_keys = read_keys(i+'.json')
    for j in range(len(en)):
      key = en[j]
      if key not in lang_keys:
        print("! ["+ str((j+2)) + "] " + "Field \"" + key + "\" not present in \"" + i + "\". Insert the value:")
        inp = input("> ")
        update_file(i+'.json', key, inp)
    print("# Finished sync language " + i)


