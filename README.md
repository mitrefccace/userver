![](images/acesmall.png)

# ACE USERVER Project

The ACE USERVER is a server that provides a RESTful Web Service API to the ACE database for user information.

#### Note: Data in this README is fake. Data included here is for documentation purposes only.

### SSL Configuration

1. ACE software uses SSL which requires a valid key and certificate
1. The location of the SSL key and certificate can be specified in the config.json by using the https:certificate and https:private_key parameters in the form of folder/file (e.g., ssl/mycert.pem and ssl/mykey.pem)
1. Additional information can be found in the ACE Direct Platform Release document

### Getting Started
To install userver, follow the README.md file in the autoinstall folder. The instructions for manual install are also provided below for reference.
1. Clone this repository
1. Download and install [Node.js](https://nodejs.org/en/)
1. Install the required Node.js modules: cd into the userver directory, run `npm install`
1. From the command line:
    * cd userver
    * npm install
    * npm install apidoc -g
    * apidoc -i routes/ -o apidoc/
    * node app.js

## Configuration
1. Copy config.json_TEMPLATE to config.json
1. Insert values for the parameters below
1. Values must be Encoded using base64 strings (example "port":8080 becomes "port":"ODA4MA=="), unless this is in development mode (see the clearText flag below).

| Key         | Description |
|-------------|-------------|
| clearText   | If present, indicates that the config.json file is unencoded. |
| debuglevel  | Logging level; TRACE, DEBUG, INFO, WARN, ERROR, or FATAL |
| port  | The port for the server to listen on |
| mysql:host      | The hostname for the MySQL database |
| mysql:user      | The username for the MySQL database |
| mysql:password  | The password for the MySQL database |
| mysql:database      | The name of the MySQL database |
| https:certificate | The path to the SSL certificate |
| https:private_key | The path to the SSL private key |
| redis:host | The IP address of the Redis server |
| redis:port | The port number of the Redis server |  

#### Running the Server

Usage: nodejs app.js [ port ]

#### Testing the Server in AWS

* `curl -k --request GET https://host:port/`
* `curl -k --request GET https://host:port/vrsverify/?vrsnum=1000`
* `curl -k --request GET https://host:port/getallvrsrecs`
* `curl -k -H "Content-Type: application/json" -X PUT -d '{"vrsnum":"1000","fieldname":"last_name","fieldvalue":"Spacey"}'  https://host:port/vrsupdate`
* `curl -k -H "Content-Type: application/json" -X PUT -d '{"vrs":1111111111,"username":"someuser","password":"somepassword","first_name":"Oprah","last_name":"Winfrey","address":"1 Billionaire Way","city":"Beverly Hills","state":"CA","zip_code":"90210","email":"oprah@mail.com","isAdmin":0}' https://host:port/addVrsRec`
* `curl -k -H "Content-Type: application/json" -X POST -d '{"vrs": "1112223333", "password": "somepassword", "first_name": "Clint", "last_name": "Eastwood", "address": "10 Hollywood Blvd", "city": "Los Angeles", "state":"CA", "zip_code":"94821", "isAdmin":0}' https://host:port/updateVrsRec`

# SERVICE API

## vrsverify

_Verify a VRS number._

### URL

_/vrsverify/:vrsnum_

### Method

`GET`

### URL Params

#### Required

`vrsnum=[integer]`

#### Optional

_None_

### Data Params

_None_

### Success Response

Code: 200

Content:

```
{
	"message": "success",
	"data": [{
		"vrs": 1000,
		"username": "someuser",
		"password": "somepassword",
		"first_name": "Rick",
		"last_name": "Grimes",
		"address": "1 Walking Way",
		"city": "Eatontown",
		"state": "NJ",
		"zip_code": "07724",
		"email": "root@comp.org"
	}]
}
```

### Error Response

Code: 400 BAD REQUEST, Content: `{"message": "missing vrsnum"}`

Code: 500 INTERNAL SERVER ERROR, Content: `{"message": "mysql error"}`

Code: 404 NOT FOUND, Content: `{"message": "you may not modify this field"}`

Code: 501 NOT IMPLEMENTED, Content: `{"message": "records returned is not 1"}`

### Sample Call

`curl -k --request GET https://host:port/vrsverify/?vrsnum=1000`

----

## getallvrsrecs

_Get all the VRS records in the user database._

### URL

_/getallvrsrecs_

### Method

`GET`

### URL Params

#### Required

_None_

#### Optional

_None_

### Data Params

_None_

### Success Response

Code: 200

Content:

```
{
	"message": "success",
	"data": [{
		"vrs": 1000,
		"username": "someuser",
		"password": "somepassword",
		"first_name": "Rick",
		"last_name": "Grimes",
		"address": "1 Walking Way",
		"city": "Eatontown",
		"state": "NJ",
		"zip_code": "07724",
		"email": "root@comp.org"
	}, {
		"vrs": 1001,
		"username": "someuser",
		"password": "somepassword",
		"first_name": "John",
		"last_name": "Smith",
		"address": "10 Industrial Way",
		"city": "Eatontown",
		"state": "NJ",
		"zip_code": "07724",
		"email": "jsmith@gmail.com"
	}, ..., {
		"vrs": 1006,
		"username": "someuser",
		"password": "somepassword",
		"first_name": "Root",
		"last_name": "Beer",
		"address": "1 Supermarket Way",
		"city": "Freehold",
		"state": "NJ",
		"zip_code": "07728",
		"email": "root@root.com"
	}]
}
```

### Error Response

Code: 500 INTERNAL SERVER ERROR, Content: `{"message": "mysql error"}`

Code: 204 NO CONTENT, Content: `{"message": "vrs number not found"}`

### Sample Call

`curl -k --request GET https://host:port/getallvrsrecs`

----

## Test Service

_This is just a test service to quickly check the connection._

### URL

_/_

### Method

`GET`

### URL Params

_None_

#### Required

_None_

#### Optional

_None_

### Data Params

_None_

### Success Response

Code: 200, Content: `{"message":"Hello world."}`

### Error Response

_None_

### Sample Call

`curl -k --request GET https://host:port/`

----

## addVrsRec

_Add a new VRS record in the user database._

### URL

_/addVrsRec_

### Method

`PUT`

### URL Params

#### Required

_None_

#### Optional

_None_

### Data Params

_Every field must have a corresponding value, except for VRS which is automatically incremented._

```
{
	"username": "someuser",
	"password": "somepassword",
	"first_name": "Oprah",
	"last_name": "Winfrey",
	"address": "1 Billionaire Way",
	"city": "Beverly Hills",
	"state": "CA",
	"zip_code": "90210",
	"email": "oprah@mail.com",
	"isAdmin": 0
}
```

### Success Response

Code: 200, Content: `{"message":"success"}`

### Error Response

Code: 400 BAD REQUEST, Content: `{"message":"Missing required field(s)"}`

Code: 500 INTERNAL SERVER ERROR, Content: `{"message": "mysql error"}`

### Sample Call

`curl -k -H "Content-Type: application/json" -X PUT -d '{"username":"someuser1","somepassword1":"password1","first_name":"Oprah","last_name":"Winfrey","address":"1 Billionaire Way","city":"Beverly Hills","state":"CA","zip_code":"90210","email":"oprah@mail.com","isAdmin":0}' https://host:port/addVrsRec`

----

## updateVrsRec

_Update a VRS record in the user database._

### URL

_/updateVrsRec_

### Method

`POST`

### URL Params

#### Required

_None_

#### Optional

_None_

### Data Params

_Must input a value for each field except for username and email, which cannot be changed._

```
{
	"vrs": "1112223333",
	"password": "somepassword",
	"first_name": "Clint",
	"last_name": "Eastwood",
	"address": "10 Hollywood Blvd",
	"city": "Los Angeles",
	"state": "CA",
	"zip_code": "94821",
	"isAdmin": 0
}
```

### Success Response

Code: 200, Content: `{"message":"success"}`

### Error Response

Code: 400 BAD REQUEST, Content: `{"message":"Missing required field(s)"}`

Code: 500 INTERNAL SERVER ERROR, Content: `{"message": "mysql error"}`

### Sample Call

`curl -k -H "Content-Type: application/json" -X POST -d '{"vrs": "1112223333", "password": "somepassword", "first_name": "Clint", "last_name": "Eastwood", "address": "10 Hollywood Blvd", "city": "Los Angeles", "state":"CA", "zip_code":"94821", "isAdmin":0}' https://host:port/updateVrsRec`

## getuserinfo

_Get a user record from the VRS database._

### URL

_/getuserinfo_

### Method

`GET`

### URL Params

#### Required

_username_

#### Optional

_None_

### Success Response

Code: 200, Content: `{ "message": "success", "data": [ { "vrs": 0, "first_name": "First", "last_name": "Last", "address": "1 Some Street", "city": "Some City", "state": "XX", "zip_code": "00000", "email": "someuser@mail.com", "isAdmin": 0 } ]}`

### Error Response

Code: 400 BAD REQUEST, Content: `{"message":"missing username"}`

Code: 500 INTERNAL SERVER ERROR, Content: `{"message": "mysql error"}`

### Sample Call

`curl -k --request GET https://host:port/getuserinfo?username=someuser`
