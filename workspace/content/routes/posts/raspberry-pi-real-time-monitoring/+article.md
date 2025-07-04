---
date: "2018-12-19T17:38:25+07:00"
title: Monitor your Raspberry Pi in Real Time with RPi-Monitor
tags: [tutorial, raspi]
---

Have you ever wanted to see the statistics of your mini-server or any IoT device that works 24/7 and wondered what happened during all those time? Well, lucky you found this post.

![RPi-Monitor Interface](./thumbnail.jpg)

**RPi-Monitor** is an application designed to perform real time monitoring embedded devices. It provides a lot of feature such as Embedded Web server, Alert messaging, SNMP integration, etc.

## Objective

- See your Raspberry Pi metrics as its current status with statistics pleasantly displayed in a web interface

## Tip

For more details, refer to their key features in its [documentation](https://xavierberger.github.io/RPi-Monitor-docs/index.html).

<!-- content -->

### Installation from Repository

1. Install RPi-Monitor's public key to trust RPi-Monitor repository

    ```bash
    sudo apt-get install dirmngr
    sudo apt-key adv --recv-keys --keyserver keyserver.ubuntu.com 2C0D3C0F
    ```

2. Add RPi-Monitor into your list of repository

    ```bash
    sudo wget http://goo.gl/vewCLL -O /etc/apt/sources.list.d/rpimonitor.list
    ```

3. Install RPi-Monitor

    ```bash
    sudo apt-get update
    sudo apt-get install rpimonitor
    ```

## Note

RPi-Monitor is designed to start automatically and collect metrics. The web interface is available at `localhost:8888`

### Command Cheat Sheet

1. Update packages information

```bash
sudo /etc/init.d/rpimonitor update
sudo service rpimonitor update
```
