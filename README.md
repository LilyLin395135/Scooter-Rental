# Scooter-Rental
1. 使用 Node.js 實作出租借車輛 API。
2. 需要連接關聯型資料庫，資料庫種類不拘。
3. 基本資料表：User, Scooter, Rent。
4. **限制同一個人同時間只能租借一台車，一台車同時也只能被一個人使用。**
5. 需要記錄使用者租車的起終時間。

## Contents
- [API Endpoints](#api-endpoints)
  - [Users](#users)
    - [POST /api/users](#post-apiusers)
  - [Scooters](#scooters)
    - [POST /api/scooters](#post-apiscooters)
  - [Rents](#rents)
    - [POST /api/rents](#post-apirents)
    - [PATCH /api/rents/:id/return](#patch-apirentsidreturn)
- [Database](#database)


## API Endpoints

### Users
#### POST /api/users
- Create a new user.

**Request Body**

| Field       | Required | Type   | Description |
|-------------|----------|--------|-------------|
| `name`      | Yes      | string | 使用者名稱   |
| `cellphone` | Yes      | string | 手機號碼     |

**Response**
- **201 Created**

```json
{
    "message": "User created successfully.",
    "user": {
        "id": 1,
        "name": "Lily",
        "cellphone": "0912345678"
    }
}
```
**Unit Tests**
- Request Validation
    1. should return 400 if name is missing
    2. should return 400 if cellphone is missing
    3. should return 400 if cellphone format is invalid
    4. should return 201 if all fields are valid
- controller
    - **`createUser`**
      1. should return 400 if user already exists
      2. should create a new user and return 201
      3. should handle errors and call next with the error
- model
    - **`insertUser`**
      1. should return a user if found by cellphone
    - **`findUserByCellphone`**
      1. should create a new user
---

### Scooters
#### POST /api/scooters
- Create a new scooter.

**Request Body**

| Field          | Required | Type   | Description     |
|----------------|----------|--------|-----------------|
| `model`        | Yes      | string | 車輛型號         |
| `licensePlate` | Yes      | string | 車牌號碼（唯一） |

**Response**
- **201 Created**

```json
{
    "message": "Scooter created successfully.",
    "scooter": {
        "id": 1,
        "model": "Gogoro",
        "licensePlate": "SFC123",
        "available": true
    }
}
```
**Unit Tests**
- Request Validation
    1. Should return 400 if model is missing.
    2. Should return 400 if licensePlate is over 255 characters.
    3. Should return 400 if licensePlate is missing.
    4. Should return 400 if licensePlate is over 20 characters.
    5. Should return 201 if all fields are valid.
- controller
    - **`createScooter`**
      1. Should return 400 if licensePlate already exists.
      2. Should create a new scooter and return 201.
      3. Should handle errors and call next with the error.
- model
    - **`insertScooter`**
      1. Should create a new scooter.
    - **`findScooterByLicensePlate`**
      1. Should return a scooter if found by licensePlate.
---

### Rents
#### POST /api/rents
- Create a new rent record.

**Request Body**

| Field       | Required | Type   | Description |
|-------------|----------|--------|-------------|
| `userId`    | Yes      | number | 使用者 ID    |
| `scooterId` | Yes      | number | 車輛 ID      |
| `startTime` | Yes      | string | 租借開始時間  |

**Response**
- **201 Created**

```json
{
    "message": "Rent created successfully.",
    "rent": {
        "id": 1,
        "userId": 1,
        "scooterId": 1,
        "startTime": "2025-01-17 00:00:00",
        "endTime": null
    }
}
```
**Unit Tests**
- Request Validation
    1. Should return 400 if `userId` is missing.
    2. Should return 400 if `scooterId` is missing.
    3. Should return 400 if `startTime` is missing or invalid.
    4. Should return 201 if all fields are valid.
- controller
    - **`createRent`**
      1. Should return 400 if the user already has an active rent.
      2. Should return 400 if the scooter is already rented.
      3. Should create a new rent and return 201.
      4. Should handle errors and call `next` with the error.
- model
    - **`insertRent`**
      1. Should create a new rent.
    - **`findActiveRentByUser`**
      1. Should return an active rent if the user has one.
    - **`findActiveRentByScooter`**
      1. Should return an active rent if the scooter is rented.

#### PATCH /api/rents/:id/return
- End a rent by updating the `end_time`.

**Request Body**

| Field      | Required | Type   | Description |
|------------|----------|--------|-------------|
| `endTime`  | Yes      | string | 租借結束時間 |

**Response**
- **200 OK**

```json
{
    "message": "Rent ended successfully.",
    "rent": {
        "id": 1,
        "user_id": 1,
        "scooter_id": 1,
        "start_time": "2025-01-17 00:00:00",
        "end_time": "2025-01-18 00:00:00"
    }
}
```
**Unit Tests**
- Request Validation
  1. Should return 400 if `endTime` is missing or invalid.
  2. Should return 404 if the rent is not found.
  3. Should return 200 if rent is ended successfully.

- Controller
  - **`returnRent`**
    1. Should return 404 if the rent is not found or already ended.
    2. Should end a rent and return 200.
    3. Should handle errors and call `next` with the error.
- Model
  - **`endRent`**
    1. Should update the `endTime` of a rent.
---

## Database
![image](https://github.com/user-attachments/assets/b2075b3a-4327-4dd8-89d4-3337f7ee3ccc)

