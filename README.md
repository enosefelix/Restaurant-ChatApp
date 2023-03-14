# Restaurant-ChatApp
This is an api for a chat bot app

This is a restaurant chatbot that will assist customers in placing orders for their preferred meals. The main idea is that customers can send options and the backend would have a chat app that would respond to the options
---

[Live site](https://enosejolagbon-chatbot.onrender.com/)

---

## Requirements
1. ChatBot interface would be like a chat interface
2. No need for authentication but we should be able to store user session based on devices
3. When a customer lands on the chatbot page, the bot should send these options to the customer:
Select 1 to Place an order
Select 99 to checkout order
Select 98 to see order history
Select 97 to see current order
Select 0 to cancel order
4. When a customer selects “1”, the bot should return a list of items from the restaurant. The order items can have multiple options but the customer should be able to select the preferred items from the list using this same number select system and place an order.
5. When a customer selects “99” for an order, the bot should respond with “order placed” and if none the bot should respond with “No order to place”. Customer should also see an option to place a new order
6. When a customer selects “98”, the bot should be able to return all placed orders from previous order to present orders
7. When a customer selects “97”, the bot should be able to return current order and return <kbd>no current order<kbd> if none
8. When a customer selects “0”, the bot should cancel the order if there is.

---
## Setup
- Install NodeJS, dotenv, express, express-session, mongoose, nodemon, socket.io,memorystore
- pull this repo
update env with example.env
- run `npm run start` on the CLI

## APIs
---

### When a client connects

- Route: /
- Method: GET

- ChatBot Responses

Success
```
Welcome to Delight-Full restaurant
Select
1: To Place an order
97: Current Order
98: Order History

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>1</kbd>
- ChatBot Responses

Success
```
Here is a list of items you can order:
1: Italian Rice
2: NoodlesEgg
3: Spaghetti
4: Bread and Beans
5: Semo and Egusi
6: Amala and Ewedu
7: Yam and Egg
8: Fried Rice
9: Chicken Laps
10: Jollof Rice
11: Beans
12: Chicken Fingers
13: Chicken Wings
14: White Rice
15: Macaronni
16: Pomo
17: Chicken
18: Fish
19: Egg
20: Goat Meat

If not:
97: Current Order
98: Order History

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>3</kbd>
- ChatBot Responses

Success
```
Spaghetti has been added to your order.

Do you want to add more items to your order?
Select the options below
1: Italian Rice
2: NoodlesEgg
3: Spaghetti
4: Bread and Beans
5: Semo and Egusi
6: Amala and Ewedu
7: Yam and Egg
8: Fried Rice
9: Chicken Laps
10: Jollof Rice
11: Beans
12: Chicken Fingers
13: Chicken Wings
14: White Rice
15: Macaronni
16: Pomo
17: Chicken
18: Fish
19: Egg
20: Goat Meat

If not:
97: Current Order
98: Order History
99: Checkout

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>97</kbd>
- ChatBot Responses

Success
```
Here is your current order: Spagetti
98: Order History
99: Checkout
0: Cancel Order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>99</kbd>
- ChatBot Responses

Success
```
Order placed.
1: Place new order
97: Current Order
98: Order History
0: Cancel Order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>98</kbd>
- ChatBot Responses

Success
```
First Order: Spagetti

Select below to continue order
1: Italian Rice
2: NoodlesEgg
3: Spaghetti
4: Bread and Beans
5: Semo and Egusi
6: Amala and Ewedu
7: Yam and Egg
8: Fried Rice
9: Chicken Laps
10: Jollof Rice
11: Beans
12: Chicken Fingers
13: Chicken Wings
14: White Rice
15: Macaronni
16: Pomo
17: Chicken
18: Fish
19: Egg
20: Goat Meat
97: Current Order
99: Checkout
0: Cancel Order

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>0</kbd>
- ChatBot Responses

Success
```
Order cancelled.
1: Place an Order
97: Current Order
98: Order History

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>98</kbd>
- ChatBot Responses

Success
```
Wow Such empty

Select below to place an order
1: Italian Rice
2: NoodlesEgg
3: Spaghetti
4: Bread and Beans
5: Semo and Egusi
6: Amala and Ewedu
7: Yam and Egg
8: Fried Rice
9: Chicken Laps
10: Jollof Rice
11: Beans
12: Chicken Fingers
13: Chicken Wings
14: White Rice
15: Macaronni
16: Pomo
17: Chicken
18: Fish
19: Egg
20: Goat Meat

97: Current Order
99: Checkout

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>97</kbd>
- ChatBot Responses

Success
```
No current order
Select below to place an order
1: Italian Rice
2: NoodlesEgg
3: Spaghetti
4: Bread and Beans
5: Semo and Egusi
6: Amala and Ewedu
7: Yam and Egg
8: Fried Rice
9: Chicken Laps
10: Jollof Rice
11: Beans
12: Chicken Fingers
13: Chicken Wings
14: White Rice
15: Macaronni
16: Pomo
17: Chicken
18: Fish
19: Egg
20: Goat Meat

 98: Order History
99: Checkout

```

### When a client sends a response to the server

- Route: /
- Method: GET
- Body: <kbd>0</kbd>
- ChatBot Responses

Success
```
No order to cancel
Select below to place an order
1: Italian Rice
2: NoodlesEgg
3: Spaghetti
4: Bread and Beans
5: Semo and Egusi
6: Amala and Ewedu
7: Yam and Egg
8: Fried Rice
9: Chicken Laps
10: Jollof Rice
11: Beans
12: Chicken Fingers
13: Chicken Wings
14: White Rice
15: Macaronni
16: Pomo
17: Chicken
18: Fish
19: Egg
20: Goat Meat

 97: Current Order
 98: Order History

```

