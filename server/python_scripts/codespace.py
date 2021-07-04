import re
import pandas as pd

# file name 
fileName = 'Fford Llanarth CQ 7'

# read column headers
columns = pd.read_csv('public/Fford Llanarth CQ 7.csv', nrows=0).columns.tolist()

# filter column headers for 'Inverter # - minus standby use'
for column in columns[:]:
    if re.search('(?=.*Inverter)(?=.*minus standby use)', column):
        continue
    elif column == 'Time':
        continue
    else:
        columns.remove(column)

# read inverter data from file and format datetime
data = pd.read_csv('C:\\Users\\Des Brennan\\sources\\commercial-data-python-dev\\data\\Fford Llanarth CQ 7.csv', usecols=columns, skiprows=[i for i in range(1,17)])
data['Time']= pd.to_datetime(data['Time'], format="%d.%m. %H:%M")

data.columns = data.columns.str.strip()

# Group data by day and by month
daily = data.groupby(pd.Grouper(key='Time',freq='D')).sum().reset_index()
monthly = data.groupby(pd.Grouper(key='Time',freq='M')).sum().reset_index()

monthly.to_csv('public/' + fileName + '-monthly.csv')

inverters = columns
inverters.remove('Time')
print(inverters)