from bs4 import BeautifulSoup
import requests
from csv import writer

base_url = 'https://www.amazon.de'

search = '/s?k='

min_price = '&s=price-asc-rank'

max_price = '&s=price-desc-rank'

# get the keyword from searchbar
keyword = 'iphone' 

#search test

url = base_url+search+keyword+min_price

print("url:", url)

page = requests.get(url)
soup = BeautifulSoup(page.content, 'lxml')

print("test")

print("soup:", soup)

#t

lists = soup.find_all('div', class_="s-result-item")

# why is the list empty? / because: To discuss automated access to Amazon data please contact api-services-support@amazon.com.

print('lists:', lists)
print('hello?')
#

#phone_name = lists.

# phone_name = soup.find_all('span', class_='a-size-medium a-color-base a-text-normal')
# print("1st phone in the array:", phone_name[0].text)
# great there is a name
#print("phonenames:", phone_name)
""" for list in lists:    
    phone_name = list.find('span', class_='a-size-medium a-color-base a-text-normal')
    phone_price = list.find('span', class_='a-price-whole')
    # add the other methods to find out the pricing
    info = [phone_name, phone_price]

    print('info:', info)
    

#phone_price = soup.find_all('span', class_='a-price-whole')
print("phone prices:", phone_price) """

# for minimum price add '&s=price-asc-rank' and pick the first price from array


# for maximum price add '&s=price-desc-rank' and pick the first price from array

# for average price 

# for most common price?

#my_price = phone_price[0].text.replace(' ','')

#print("1st price in the array:", my_price)

#my_phone = phone_name[0].text.replace(' ','')

# great I have an unordered list of phone prices / but doubled prices

# get the phone name from the search query

# iterate through the array to get the min/max/average price of a phone

#print(f'''
#Phone Name: {my_phone}
#Price: {my_price}
#''')

# export the data 
# https://towardsdatascience.com/how-to-automate-financial-data-collection-with-python-using-tiingo-api-and-google-cloud-platform-b11d8c9afaa1


""" with open('pricing.csv', 'w', encoding='utf8', newline='') as f:
    thewriter = writer(f)
    header = ['Timestamp', 'Phone', 'Minimum Price', 'Maximum Price', 'Average Price', 'Common Price']
    thewriter.writerow(header)

    for """