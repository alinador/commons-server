# Commons Server RESTFull API Documentation


## GET /api/v1.0/users
### Description
Returns the list of registered users.

## Request
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
## description
Return a user.

## Request
    GET /api/v1.0/users/:id

## Response
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
## description
Returns the user asks feed.

## Request
    GET /api/v1.0/users/:id/feed

## Response
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
## Description
Returns the user posted asks.

## Request
    GET /api/v1.0/users/:id/asks

## Response
    {
        "_id": ...,
        "createDate": ...,
        "status: ...,
        "content": ...,
        "isAnonymous": ...
    }



## PUT /api/v1.0/users/:id/asks/:askid


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

GET /api/v1.0/users/:id/asks/followed


