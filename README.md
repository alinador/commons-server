# Commons Server RESTFull API Documentation


## GET /api/v1.0/users
**Description**
Returns a list of registered users.

**Sample returned value**
```javascript
[
  {
    "_id": "56409165432c3df6686f11c5",
    "facebookAccessToken": "...",
    "facebookId": "...",
    "createDate": "2015-11-09T12:28:21.065Z",
    "email": ...,
    "name": "..."
  }
]
```

## POST /api/v1.0/users/register


## GET /api/v1.0/users/:id


## GET /api/v1.0/users/:id/feed
## POST /api/v1.0/users/:id/asks
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


