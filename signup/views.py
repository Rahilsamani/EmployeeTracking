from django.shortcuts import render
import mysql.connector as sql

name=''
email=''
password=''
cpassword=''
utype=''

def signaction(request):
    global name, email, password, cpassword, utype
    if request.method=="POST":
        m = sql.connect(host="localhost", user="root", password='root', database='TrackSoft')
        cursor = m.cursor()
        d = request.POST
        for key, value in d.items():
            if key=="name":
                name=value
            if key=="email":
                email=value
            if key=="password":
                password=value
            if key=="cpassword":
                cpassword=value
            if key=='user_type':
                utype=value
        c = "insert into users values('{}' , '{}' , '{}' , '{}', '{}')".format(name,email,password,cpassword,utype)
        cursor.execute(c)
        m.commit()

    return render(request, 'signup.html')

