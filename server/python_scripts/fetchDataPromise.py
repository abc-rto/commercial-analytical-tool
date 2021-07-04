import sys
import json
import pandas as pd

columns = json.loads(sys.argv[1])
columns.remove('0')
columns[:] = map(str.strip, columns)

data = pd.read_csv('public/Fford Llanarth CQ 7-monthly.csv', usecols=columns)
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
seriesList = data.columns.values.tolist()

yVals = []
for col in data:
    points = data[col].values.tolist()
    series = {'label': col, 'data':points}
    yVals.append(series)

dataSeries = {'labels': months, 'datasets': yVals}

print(json.dumps(dataSeries))
