![](images/acesmall.png)

# ACE USERVER Project

USERVER is a server that provides a RESTful Web Service API to the ACE database for user information.

#### Note: Data in this file are fake. Data are included here for documentation purposes only.

### SSL Configuration
1. ACE software uses SSL which requires a valid key and certificate
1. The location of the SSL key and certificate can be specified in the config.json by using the https:certificate and https:private_key parameters in the form of folder/file (e.g., ssl/mycert.pem and ssl/mykey.pem)
1. Additional information can be found in the ACE Direct Platform Release document

### Getting Started

1. Clone this repository
1. Download and install [Node.js](https://nodejs.org/en/)
1. Install the required Node.js modules: cd into the userver directory, run `npm install`
1. From the command line:
    * cd userver
    * npm install
    * npm install apidoc -g
    * apidoc -i routes/ -o apidoc/
    * node app.js

#### Running the Server
Usage:  
nodejs app.js [ port ]

#### Testing the Server in AWS
* curl --request GET http://*hostname:port*/
* curl --request GET http://*hostname:port*/vrsverify/?vrsnum=1000
* curl --request GET http://*hostname:port*/getallvrsrecs
* curl -H "Content-Type: application/json" -X PUT -d '{"vrsnum":"1000","fieldname":"last_name","fieldvalue":"Spacey"}'  http://*hostname:port*/vrsupdate
* curl -H "Content-Type: application/json" -X PUT -d '{"username":"<omitted>","password":"<omitted>","first_name":"Oprah","last_name":"Winfrey","address":"1 Billionaire Way","city":"Beverly Hills","state":"CA","zip_code":"90210","email":"oprah@mail.com","isAdmin":0}' http://*hostname:port*/addVrsRec
* curl -H "Content-Type: application/json" -X POST -d '{"vrs": "7032607288", "password": "<omitted>", "first_name": "Clint", "last_name": "Eastwood", "address": "10 Hollywood Blvd", "city": "Los Angeles", "state":"CA", "zip_code":"94821", "isAdmin":0}' http://*hostname:port*/updateVrsRec
# SERVICE API

----

#vrsverify

  _Verify a VRS number._

* **URL**

  _/vrsverify/:vrsnum_

* **Method:**

   `GET`

*  **URL Params**

   **Required:**

   `vrsnum=[integer]`

   **Optional:**

   _None._

* **Data Params**

  _None._

* **Success Response:**

  * **Code:** 200, **Content:** `{
	"message": "success",
	"data": [{
		"vrs": 1000,
		"username": "<omitted>",
		"password": "<omitted>",
		"first_name": "Rick",
		"last_name": "Grimes",
		"address": "1 Walking Way",
		"city": "Eatontown",
		"state": "NJ",
		"zip_code": "07724",
		"email": "root@comp.org"
	}]
}`

* **Error Response:**
  * **Code:** 400 BAD REQUEST, **Content:** `{'message': 'missing vrsnum'}`
  * **Code:** 500 INTERNAL SERVER ERROR, **Content:** `{'message': 'mysql error'}`
  * **Code:** 404 NOT FOUND, **Content:** `{'message': 'you may not modify this field'}`
  * **Code:** 501 NOT IMPLEMENTED, **Content:** `{'message': 'records returned is not 1'}`

* **Sample Call:**

  http://*hostname:port*/vrsverify/?vrsnum=1000

* **Notes:**

  _None._

----
#getallvrsrecs

  _Get all the VRS records in the user database._

* **URL**

  _/getallvrsrecs_

* **Method:**

   `GET`

*  **URL Params**

   **Required:**

   _None._

   **Optional:**

   _None._

* **Data Params**

  _None._

* **Success Response:**

  * **Code:** 200, **Content:** `{"message":"success","data":[{"vrs":1000,"username":"<omitted>","password":"<omitted>","first_name":"Rick","last_name":"Grimes","address":"1 Walking Way","city":"Eatontown","state":"NJ","zip_code":"07724","email":"root@comp.org"},{"vrs":1001,"username":"<omitted>","password":"<omitted>","first_name":"John","last_name":"Smith","address":"10 Industrial Way","city":"Eatontown","state":"NJ","zip_code":"07724","email":"jsmith@gmail.com"}, ... ,{"vrs":1006,"username":"<omitted>","password":"<omitted>","first_name":"Root","last_name":"Beer","address":"1 Supermarket Way","city":"Freehold","state":"NJ","zip_code":"07728","email":"root@root.com"}]}`

* **Error Response:**
  * **Code:** 500 INTERNAL SERVER ERROR, **Content:** `{'message': 'mysql error'}`
  * **Code:** 204 NO CONTENT, **Content:** `{'message': 'vrs number not found'}`

* **Sample Call:**

  http://*hostname:port*/getallvrsrecs

* **Notes:**

  _None._

----

##Test Service

_This is just a test service to quickly check the connection._

* **URL**

  _/_

* **Method:**

  `GET`

*  **URL Params**

   _None._

   **Required:**

   _None._

   **Optional:**

   _None._

* **Data Params**

  _None._

* **Success Response:**
  * **Code:** 200
  * **Content:** `{"message":"Hello world."}`

* **Error Response:**

  _None._

* **Sample Call:**

  http://*hostname:port*/

* **Notes:**

  _None._

----

##addVrsRec

_Add a new VRS record in the user database._

  * **URL**

    _/addVrsRec_

  * **Method:**

     `PUT`

  *  **URL Params**

     **Required:**

     _None._

     **Optional:**

     _None._

  * **Data Params**
  Every field must have a corresponding value, except for VRS which is automatically incremented.
  `{"username":"<omitted>",
  "password":"<omitted>",
  "first_name":"Oprah",
  "last_name":"Winfrey",
  "address":"1 Billionaire Way",
  "city":"Beverly Hills",
  "state":"CA",
  "zip_code":"90210",
  "email":"oprah@mail.com",
  "isAdmin":0
  }`


  * **Success Response:**

    * **Code:** 200, **Content:** `{'message':'success'}`

  * **Error Response:**
    * **Code:** 400 BAD REQUEST, **Content:** `{'message':'Missing required field(s)'}`
    * **Code:** 500 INTERNAL SERVER ERROR, **Content:** `{'message': 'mysql error'}`

  * **Sample Call:**

   curl -H "Content-Type: application/json" -X PUT -d '{"username":"<omitted>","password":"<omitted>","first_name":"Oprah","last_name":"Winfrey","address":"1 Billionaire Way","city":"Beverly Hills","state":"CA","zip_code":"90210","email":"oprah@mail.com","isAdmin":0}' http://*hostname:port*/addVrsRec

  * **Notes:**

    _None._


----

##updateVrsRec

_Update a VRS record in the user database._

  * **URL**

    _/updateVrsRec_

  * **Method:**

     `POST`

  *  **URL Params**

     **Required:**

     _None._

     **Optional:**

     _None._

  * **Data Params**
  Must input a value for each field except for username and email, which cannot be changed.
  `{
  "vrs": "7032607288",
  "password": "<omitted>",
  "first_name": "Clint",
  "last_name": "Eastwood",
  "address": "10 Hollywood Blvd",
  "city": "Los Angeles",
  "state":"CA",
  "zip_code":"94821",
  "isAdmin":0
  }`


  * **Success Response:**

    * **Code:** 200, **Content:** `{'message':'success'}`

  * **Error Response:**
    * **Code:** 400 BAD REQUEST, **Content:** `{'message':'Missing required field(s)'}`
    * **Code:** 500 INTERNAL SERVER ERROR, **Content:** `{'message': 'mysql error'}`

  * **Sample Call:**

 curl -H "Content-Type: application/json" -X POST -d '{"vrs": "7032607288", "password": "<omitted>", "first_name": "Clint", "last_name": "Eastwood", "address": "10 Hollywood Blvd", "city": "Los Angeles", "state":"CA", "zip_code":"94821", "isAdmin":0}' http://*hostname:port*/updateVrsRec

  * **Notes:**

    _None._
