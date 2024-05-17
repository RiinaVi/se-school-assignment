# Software Engineering School Assignment

To start the app run:

```sh
docker-compose up
```


# API Documentation

## Get current exchange rate USD to UAH

```http
GET /rate
```

#### Response

```javascript
{
  "rate": number,
}
```

## Subscribe email to get the exchange rate updates

```http
POST /subscribe
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. User email in proper email format |

#### Response

Returns newly created email data

```javascript
{
  "id": string,
  "email": string,
}
```

## Additional 'Unsubscribe' endpoint which is included into the email templates.

```http
GET /unsubscribe
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. User email in proper email format |

#### Response

Returns success message on 200

```javascript
{
  "message": string,
}
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
