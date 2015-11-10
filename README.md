# Commons Server RESTFull API Documentation

## Data Types
### Time
Time is in unix time utc. 

## GET /api/v1.0/users/:user-id
### Description
Return a user object.

### Request
    GET /api/v1.0/users/:user-id

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "id": "user id",
        "name": "user name",
        "email": "user@email.com",
        "avatarUrl: "http://link/to/avatr.jpeg",
        "createTime": "timestamp",
        "facebookId": "facebook-id"
    }
    
## POST /api/v1.0/users/register
### Description
Register a user with facebook account, and return the user id.
If a user with the input ```facebook-id``` does not exists, a new user object is created.

### Request
    POST /api/v1.0/users/register
    Content-Type: application/json
    
    {
        "name": "user name"
        "email": "user@email.com"
        "avatarUrl": "http://link/to/avatr.jpeg",
        "facebookId": "facebook-id",
        "facebookAccessToken": "facebook-access-token"
    }

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "id": "user id"
    }

## GET /api/v1.0/users/:user-id/feed
### description
Return the user Asks feed.
The Asks feed if the list of all Asks where:

1. The Ask object status is ```active```.

2. The user Ask object status does not exists (the user ask status of ```skipped```, ```follow```, or ```archived``` was not set). 

### Request
    GET /api/v1.0/users/:user-id/feed

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "id": "ask-id",
            "owner": {
                "_id": "user id",
                "name": "user name",
                "avatarUrl: "http://link/to/avatr.jpeg",
                "relationship": "other"
            },
            "recentReplies": [
                {
                    "_id": "user id",
                    "name": "user name",
                    "avatarUrl: "http://link/to/avatr.jpeg",
                    "relationship": "1st | 2nd | other"
                }
            ],
            "totalReplies": "number"
            "createTime": "timestamp",
            "common": "friends",
            "content": "The ask content",
            "isAnonymous": "true | false"
        }
    ]
    
## POST /api/v1.0/users/:user-id/asks

### Description
Post a new Ask object.

### Request
    POST /api/v1.0/users/:user-id/asks
    Content-Type: application/json
    
    { 
        "common": "friends",
        "content": "The ask content",
        "isAnonymous": "true | false"
    }

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "id": "ask-id",
    }


## GET /api/v1.0/users/:user-id/asks/:ask-status
### Description
Return the user Ask objects with a matching ```ask-status```.
The input ```ask-status``` can be one of ```followed```, ```skipped```, or ```archived```.

### Request
    GET /api/v1.0/users/:user-id/ask-status

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "id": "ask-id",
            "owner": {
                "_id": "user id",
                "name": "user name",
                "avatarUrl: "http://link/to/avatr.jpeg",
                "relationship": "1st | 2nd | other"
            },
            "createTime": "timestamp",
            "common": "friends",
            "content": "The ask content",
            "isAnonymous": "true | false"
        }
    ]
    
## PUT /api/v1.0/users/:user-id/asks/:ask-id

### Description
Update a user ask status.

### Request
    PUT /api/v1.0/users/:id/asks/:askid
    Content-Type: application/json
    
    {
        "status": "skipped | followed | archived",
        "muted": "true | false"
    }

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    