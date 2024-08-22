please read this document!!

when you are going to test logout and logout-all then please make sure you are logging in first! as in that endpoint I have used JWTAUTH middleware there! after some practical over other websites I came over the conclusion that from one device there can be only one token and not multiple from multiple tabs! this I came to know when I was testing it! so if you are going to check it then please watch over database thoroughly. I hope you already knew about this, and if there was any confusion I have already explained it to you! the motive behind writing this is to ensure whoever checking this project don't face any problems while checking as I have check the whole project it is working totally fine in every aspect, I am also attaching endpoints with there body and method so it is easy for you as well to check!


=====USERS=====

post: localhost:3200/api/users/signup
{
    "name":"Aditya Satokar",
    "email":"adityasatokar@gmail.com",
    "password":"aditya1234",
    "gender":"Male"
}


post: localhost:3200/api/users/signin
{
    "email":"adityasatokar@gmail.com",
    "password":"aditya1234"
}


get: localhost:3200/api/users/logout
none


get: localhost:3200/api/users/logout-all-devices
none


get: localhost:3200/api/users/get-details/66326b9e036dcda8dbe84379
none


get:localhost:3200/api/users/get-all-details
none


put:localhost:3200/api/users/update-details/66326cca036dcda8dbe84388
none


=====POSTS=====

post: localhost:3200/api/posts/
form data: image file and caption


get: localhost:3200/api/posts/all
none


get: localhost:3200/api/posts/6637987263b11789cb115dc1
none


get: localhost:3200/api/posts/
none


delete: localhost:3200/api/posts/6637987263b11789cb115dc1
none


put: localhost:3200/api/posts/6638930e8355ec799078a3c9
form data: image file and caption


=====COMMENT=====


post: localhost:3200/api/comments/66365dbb02ac0baac3ef900d
{
    "content":"congratulations on your first post"
}


get: localhost:3200/api/comments/66365dbb02ac0baac3ef900d
none


put: localhost:3200/api/comments/663798cc63b11789cb115dc8
{
    "content":"What is your name"
}


delete: localhost:3200/api/comments/663798cc63b11789cb115dc8
none


=====LIKE=====

get: localhost:3200/api/likes/66365dbb02ac0baac3ef900d
none


get: localhost:3200/api/likes/toggle/66365dbb02ac0baac3ef900d?type=Post
none


=====FRIENDSHIP=====


get:localhost:3200/api/friends/get-friends/66326b9e036dcda8dbe84379
none


get: localhost:3200/api/friends/get-pending-requests
none


get: localhost:3200/api/friends/toggle-friendship/66326b9e036dcda8dbe84379
none


get: localhost:3200/api/friends/accept/66326b9e036dcda8dbe84379
none


=====OTP=====


post: localhost:3200/api/otp/send
{
    "email":"adityasatokar@gmail.com"
}


post: localhost:3200/api/otp/verify
{
    "otp":"719289",
    "email":"adityasatokar@gmail.com"
}


post: localhost:3200/api/otp/reset-password
{
    "new_password":"aditya1234"
}
