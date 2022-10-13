from bs4 import BeautifulSoup
import requests

html_text = requests.get('https://www.amazon.de/s?k=iphone').text
soup = BeautifulSoup(html_text, 'lxml')
phone_name = soup.find_all('span', class_='a-size-medium a-color-base a-text-normal')
# print("1st phone in the array:", phone_name[0].text)
# great there is a name
print("phonenames:", phone_name)

phone_price = soup.find_all('span', class_='a-price')
print("phone prices:", phone_price)

my_price = phone_price[0].text.replace(' ','')

print("1st price in the array:", my_price)

my_phone = phone_name[0].text.replace(' ','')

# great I have an unordered list of phone prices / but doubled prices

# get the phone name from the search query

# iterate through the array to get the min/max/average price of a phone

print(f'''
Phone Name: {my_phone}
Price: {my_price}
''')

# export the data 
# https://towardsdatascience.com/how-to-automate-financial-data-collection-with-python-using-tiingo-api-and-google-cloud-platform-b11d8c9afaa1

