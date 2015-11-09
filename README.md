# Commons Server RESTFull API Documentation


## GET /api/v1.0/users

### Description
Return the list of registered users.

### Request
    GET /api/v1.0/users

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
      {
        "_id": ...,
        "name": ...,
        "email": ...,
        "avatarUrl: ...,
        "createDate": ...,
        "facebookId": ...,
        "facebookAccessToken": ...
      }
    ]

## POST /api/v1.0/users/register

### Description
Register a user with facebook account, and return the user id.
Create a new user if the facebook account does not exists.

### Request
    POST /api/v1.0/users/register
    Content-Type: application/json
    
    {
        "name": ...
        "email": ...
        "avatarUrl": ...,
        "facebookId": ...
        "facebookAccessToken": ...
    }

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": ...
    }

## GET /api/v1.0/users/:id

### description
Return a user.

### Request
    GET /api/v1.0/users/:id

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": ...,
        "name": ...,
        "email": ...,
        "avatarUrl: ...,
        "createDate": ...,
        "facebookId": ...,
        "facebookAccessToken": ...
    }

## GET /api/v1.0/users/:id/feed

### description
Return the user asks feed.

### Request
    GET /api/v1.0/users/:id/feed

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": ...,
        "user": {
            "_id": ...,
            "name": ...,
            "email": ...,
            "avatarUrl": ...
        },
        "createDate": ...,
        "status: ...,
        "content": ...,
        "isAnonymous": ...
    }
    
## POST /api/v1.0/users/:id/asks

### Description
Post a new ask.

### Request
    POST /api/v1.0/users/:id/asks
    Content-Type: application/json

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": ...,
        "createDate": ...,
        "status: ...,
        "content": ...,
        "isAnonymous": ...
    }


## GET /api/v1.0/users/:id/asks/followed
### description
Return the user asks feed.

### Request
    GET /api/v1.0/users/:id/feed

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": ...,
        "user": {
            "_id": ...,
            "name": ...,
            "email": ...,
            "avatarUrl": ...
        },
        "createDate": ...,
        "status: ...,
        "content": ...,
        "isAnonymous": ...
    }
    
## PUT /api/v1.0/users/:id/asks/:askid

### Description
Update a user ask status.

### Request
    PUT /api/v1.0/users/:id/asks/:askid
    Content-Type: application/json

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": ...,
        "createDate": ...,
        "status: ...,
        "content": ...,
        "isAnonymous": ...
    }



{
	status:: <value>
}

Description: Change s user status with regard to a aspcific ask
:id = id of the use
<status>  can be one of the following
follow used when user clicks open, reply or follow
skip use when use is not interested in an ask
archive - when user want to archive the ask
Sample payload
{
{

Sample return value
{
}




