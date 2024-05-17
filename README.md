# Software Engineering School Assignment

## Steps to start the project

1. Create  `.env` file in the root and fill it with values just like in `.env.example`:
   1. To get `CURRENCY_BEACON_API_KEY` you have to create an account in https://currencybeacon.com/account and copy API Token from there
   2. `SENDER_EMAIL_PASSWORD`: using your actual email password is frowned upon, so I used 'App Password' generated from my Gmail account: https://myaccount.google.com/apppasswords

2. Make sure that Docker is up
3. To start the app run:

```sh
docker-compose up
```

# Project Text Stack

- Express.js
- TypeScript
- Docker, docker-compose
- PostgresQL
- TypeORM
- Joi
- Nodemailer
- Node-schedule

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
