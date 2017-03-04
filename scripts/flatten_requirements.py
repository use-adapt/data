import json
with open ("data.json", "r") as myfile:
    raw_data=myfile.read()

json_data = json.loads(raw_data)

print json_data['requirements'].keys()

requirements = []
for project in json_data['requirements'].keys():
    requirements.extend(json_data['requirements'][project])

for requirement in sorted(requirements):
    print requirement

data = {}
data['requirements'] = sorted(requirements)

print(json.dumps(data, indent=2))

