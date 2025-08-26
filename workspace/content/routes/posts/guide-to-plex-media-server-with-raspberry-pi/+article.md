---
date: "2018-10-19T17:38:25+07:00"
theme: archive
title: Setup Plex Media Server in Raspberry Pi
tags: [tutorial, raspi]
---

> update: i've since switched from Plex to Jellyfin, now running on a mini PC with DietPi in a fully headless setup.

ever wished you had your own Netflix, but better? filled only with your favorite movies, shows, music, photos, and podcasts, all your personal media in one place, ready to stream on demand? that's exactly what **Plex** offers. with a Raspberry Pi, you can build a small, always-on media server to host your personal collection and stream it anywhere, anytime.

## getting started

the basic idea is to setup your Raspberry with Plex, connect your storage, and configure the network. once everything is running, you'll be able to manage your library remotely and keep it available 24/7.

to follow along, you'll need a Raspberry Pi 3 B+ (or newer), a microSD card, an external hard drive to store your files, a power supply, and ideally a powered USB hub. you'll also want a monitor and keyboard for the initial setup, though you can go fully headless and manage it remotely later on. finally, have a PC or laptop on hand to prepare the microSD card.

## installing the OS

start by preparing the microSD card, i'll be using Windows to do this. format it as FAT32 and load it with Raspbian using [NOOBS](https://www.raspberrypi.org/downloads/noobs/). insert the card into the Raspberry, connect the peripherals, and only then plug in the power. during installation, choose Raspbian as the OS and set your language. it's also wise to configure wifi during setup, as some users report `wlan0` issues if it's left until later.

## setting up Plex

once Raspbian is running, update the system and install some essentials:

```bash
sudo apt update
sudo apt upgrade

# handle secure apt sources
sudo apt install apt-transport-https
```

add the dev2day repository for Plex by importing the GPG key and adding the source list:

```bash
wget -O - https://dev2day.de/pms/dev2day-pms.gpg.key | sudo apt-key add -
echo "deb https://dev2day.de/pms/ jessie main" | sudo tee /etc/apt/sources.list.d/pms.list
sudo apt update
```

then install Plex:

```bash
sudo apt install -t jessie plexmediaserver
```

by default, Plex runs under its own user, but on Raspberry Pi it's often easier to run it as `pi`. edit the service defaults:

```bash
sudo nano /etc/default/plexmediaserver.prev
```

change `PLEX_MEDIA_SERVER_USER=plex` to `pi`, save, and restart the service:

```bash
sudo service plexmediaserver restart
```

## networking and remote access

a media server is only useful if you can reach it consistently. assign your Raspberry a static ip by editing `/boot/cmdline.txt` and `/etc/dhcpcd.conf`. set the desired `ip_address`, router, and DNS, and disable IPv6 if you want to keep things simple. reboot to apply the changes.

for remote control, enable VNC through `raspi-config`. install the RealVNC server and enable it under "interfacing options". this gives you a graphical way to manage your pi, though in practice, most of the work can be done from the terminal. if you prefer a lightweight alternative, [Dataplicity](https://www.dataplicity.com/) offers remote terminal access from a browser without the overhead of VNC.

## managing your media

organizing your files well will save you headaches. structure your external drive with clear directories and name them consistently. Plex's scanner works best when it can infer metadata from the directory structure. once the drive is ready, connect it to your Raspberry Pi (use a powered usb hub if possible to avoid power issues). in the Plex web app, open `192.168.xxx.xxx:32400` from your browser, add libraries, and point them to your mounted drive under `/media/pi/`.

if you run into filesystem compatibility problems, install `ntfs-3g` for NTFS drives or `exfat-fuse` with `exfat-utils` for exFAT. avoid exFAT for Plex metadata storage, as it lacks symlink support. for permission issues, make the media directory readable and writable with:

```bash
sudo chmod 777 /media/pi
```

## keeping it running

once configured, you'll want to occasionally update and restart services. some useful commands:

```bash
sudo apt update && sudo apt upgrade
sudo service plexmediaserver restart
sudo reboot
sudo shutdown -h now
```

check wifi signal with `iwconfig`, and use `sudo tuptime` to see uptime. these basics keep your server healthy without needing to reconfigure from scratch.
