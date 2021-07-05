import sys
import json
import pandas as pd
import seaborn as sns

columns = json.loads(sys.argv[1])
columns.remove('0')
columns[:] = map(str.strip, columns)

data = pd.read_csv('public/Fford Llanarth CQ 7-monthly.csv', usecols=columns)
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
seriesList = data.columns.values.tolist()
pal = sns.color_palette('BuPu', n_colors=len(columns))

yVals = []
for i, col in enumerate(data):
    points = data[col].values.tolist()
    series = {'label': col, 'data':points, 'backgroundColor':'rgb(' + str(255*pal[i][0]) + ',' + str(255*pal[i][1]) + ',' + str(255*pal[i][2]) + ')'}
    yVals.append(series)

dataSeries = {'labels': months, 'datasets': yVals}

print(json.dumps(dataSeries))
