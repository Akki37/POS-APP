# `POS Billing Application`

 A generalized Point of Sale Billing Application created using React.Js
## `Packages & Libraries Used :`

* `Redux` 
* `React Redux`
* `Redux Thunk`
* `React Router`
* `Formik`
* `Yup`
* `Axios`
* `SweetAlert`
* `Ant-Design`
* `html2pdf`

## `Getting Started`

### `Registration & Login`
 * User can register with new account |(Username & Email) should be unique.
 * After registeration user will redirect to login page & can do login
 * Then user will land on Dashboard Page

### `Dashboard`
 #### On dashboard page user can overview things like :
 * Total `Customers` , `Products` , `Bills`.
 * Chart - Represents `Year(monthly based)Current year by default` and `months(days based)` sales.
 * Anaytics ( Difference b/w Yesterday's & Today's sales total amount)  
 * Recent 5 bills 

### `Products , Customers , Bills`
   Each Section has `Search Field` , `Adding/Editing Form(excluding Bills)` & `Table` representing data with the functionality of `delete` , `view`(with a pop-up modal) and `edit` 

### `Billing`
 * `Search Field`
      - Dynamic search based on name , choosen select functionality to add product in cart.
 * `Customer Form`
      - User can enter customer details here to whom user generating bill.
      - Alreday existing customer show as verified & details will get autofilled once user fill customer mobile number .
      - Otherwise user can also add customer during billing and the moment customer gets added it will verify user.
 * `Cart Table` 
      - Increment/Decrement & Delete functionality for particular product.
      - Total & SubTotal will dynamically change.
 * `Generate Bill` 
      - Bill will only generate when 
       
       * customer is verified by adding into database 
       * atleast 1 item should be in cart 
       
    #### Once bill get generated it will show up with a pop-up modal
 * `Bill Modal`
      - Will show details about customer & all products and price.
      - Can Download(pdf) & Print Bills.

### `Account`
  * `User Information` 
      - User Name
      - Email Id
      - Mobile
      - Business Name
      - Address
    

