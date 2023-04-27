from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from django.conf import settings

import time
import os
import pyscreenshot as ImageGrab
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from time import sleep

import shutil

# Creates a default Background Scheduler
sched = BackgroundScheduler()

def homepage(request):
    return render(request, "index.html")

def demo(request):
    return render(request, "demo.html")

def save_screenshot(request):
    photo_files = os.listdir("media")
    photo_urls = [os.path.join(settings.MEDIA_URL, photo) for photo in photo_files if photo.endswith('.png')]
    return render(request, "screenshot.html", {'photo_urls': photo_urls})

def clearMedia():
    dir = 'media'
    shutil.rmtree(dir)

def take_screenshot():
    if os.path.exists("media"):
        pass
    else:
        os.mkdir("media")

    image_name = f"screenshot-{str(datetime.now())}"
    screen_shot = ImageGrab.grab()

    image_name = image_name.replace(":", "")
    file_path_loc = f"./media/{image_name}.png"

    screen_shot.save(file_path_loc)

isrunning = True
onetime = True

def screenshot(request):
    global onetime
    if onetime:
        sched.add_job(take_screenshot, 'interval', seconds = 5)
        sched.add_job(take_screenshot, 'interval', days = 5)
        sched.add_job(clearMedia, 'cron', hour=23, minute=42)
        if isrunning:
            sched.start()
        else:
            sched.resume()
        onetime = False
    while True:
        sleep(1)


def stop_screenshot(request):
    global isrunning
    isrunning = False
    global onetime
    onetime = True
    
    sched.pause()

    while True:
        time.sleep(1)



