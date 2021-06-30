import re
import pandas as pd

#read column headers
columns = pd.read_csv('public/Fford Llanarth CQ 7.csv', nrows=0).columns.tolist()

# Filter column headers for 'Inverter # - minus standby use'
for column in columns[:]:
    if re.search('(?=.*Inverter)(?=.*minus standby use)', column):
        continue
    else:
        columns.remove(column)


print(columns)