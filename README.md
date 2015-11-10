# Commons Server RESTFull API Documentation

## Data Types
### Date and Time
All date and time are in ISO 8601 UTC format, for example, "2015-11-09T09:59:15Z"

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
        "_id": "user id",
        "name": "user name",
        "email": "user@email.com",
        "avatarUrl: "http://link/to/avatr.jpeg",
        "createTime": "2015-11-09T09:59:15Z",
        "facebookId": "facebook-id",
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
        "_id": "user id"
    }

## GET /api/v1.0/users/:user-id

### description
Return a user.

### Request
    GET /api/v1.0/users/:user-id

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": "user id",
        "name": "user name",
        "email": "user@email.com",
        "avatarUrl: "http://link/to/avatr.jpeg",
        "createTime": "2015-11-09T09:59:15Z",
        "facebookId": "facebook-id",
        "facebookAccessToken": "facebook-access-token"
    }

## GET /api/v1.0/users/:user-id/feed

### description
Return the user asks feed.

### Request
    GET /api/v1.0/users/:user-id/feed

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "_id": "ask-id",
            "user": {
                "_id": "user id",
                "name": "user name",
                "avatarUrl: "http://link/to/avatr.jpeg",
            },
            "createTime": "2015-11-09T09:59:15Z",
            "content": "The ask content",
            "isAnonymous": "true | false"
        }
    ]
    
## POST /api/v1.0/users/:user-id/asks

### Description
Post a new ask.

### Request
    POST /api/v1.0/users/:user-id/asks
    Content-Type: application/json
    
    { 
        "content": "The ask content",
        "isAnonymous": "true | false"
    }

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    {
        "_id": "ask-id",
    }


## GET /api/v1.0/users/:user-id/asks/followed
### description
Return the user asks with Followed status.

### Request
    GET /api/v1.0/users/:user-id/feed

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "_id": "ask-id",
            "user": {
                "_id": "user id",
                "name": "user name",
                "avatarUrl: "http://link/to/avatr.jpeg",
            },
            "createTime": "2015-11-09T09:59:15Z",
            "content": "The ask content",
            "isAnonymous": "true | false"
        }
    ]
    
    
## GET /api/v1.0/users/:user-id/asks/skipped
### description
Return the user asks with Skipped status.

### Request
    GET /api/v1.0/users/:user-id/skipped

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "_id": "ask-id",
            "user": {
                "_id": "user id",
                "name": "user name",
                "avatarUrl: "http://link/to/avatr.jpeg",
            },
            "createTime": "2015-11-09T09:59:15Z",
            "content": "The ask content",
            "isAnonymous": "true | false"
        }
    ]
     
## GET /api/v1.0/users/:user-id/asks/archived
### description
Return the user asks with Archived status.

### Request
    GET /api/v1.0/users/:user-id/archived

### Response
    HTTP/1.1 200 OK
    Content-Type: application/json
    
    [
        {
            "_id": "ask-id",
            "user": {
                "_id": "user id",
                "name": "user name",
                "avatarUrl: "http://link/to/avatr.jpeg",
            },
            "createTime": "2015-11-09T09:59:15Z",
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




