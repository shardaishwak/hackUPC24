import json
from os import listdir

def update_file(file, field, value):
  with open(file, encoding='utf8') as json_file:
    json_data = json.load(json_file)

  json_data[field] = value
  json.dump(json_data, open(file, 'w', encoding='utf8'), indent=4)

def get_files():
  dirs = listdir('.')
  nd = []
  for i in dirs:
    if '.json' in i:
      nd.append(i)
  return nd

def get_files_names():
  dirs = get_files()
  for i in range(len(dirs)):
    dirs[i] = dirs[i].split(".json")[0]
  return dirs

def infinite_liner():
  while(True):
    inp = input("> ")
    if inp == "exit":
      print("# Ended")
      break
    
    inp_spl = inp.split(" ")
    lang = inp_spl[0]
    field = inp_spl[1]
    value = (' '.join(inp_spl[2:])).replace("\"", "")

    file_names = get_files_names()
    if lang not in file_names:
      print("! Language not found, available languages are: " + str(file_name))
    update_file(lang+".json", field, value)
    print("# Inserted")

def update():
  print("? Languages available: " + str(get_files_names()))
  print("? Format: [language] [field] [translation]")
  print("? For exiting enter 'exit'")
  infinite_liner()
  
  
