# VS Code Terminal: DOCKER
docker-compose up --build


# BROWSER: 
http://localhost:3000 ---> frontend

http://localhost:5000/api/users


# POSTGRESQL:
select * from users


# NEWMAN - RestAPI
GET ------------> http://localhost:5000/api/users
POST -----------> http://localhost:5000/api/users
{
    "name": "Meri",
    "email": "meri@mail.com"
}
PUT ------------> http://localhost:5000/api/users/5
{
    "name": "John"
    "email": "john@mail.com"
}
DELETE ---------> http://localost:5000/api/users/5


# UNIT TEST using JEST
npm test