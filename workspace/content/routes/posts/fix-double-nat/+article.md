---
date: "2019-01-15T17:38:25+07:00"
title: Fix Double-NAT Problem on Your Network
tags: [tutorial, networking]
---

## Note

As I have experienced my issue before with Plex, I'll be referring my solutions to resolve the Double-NAT problem with `Not available outside your network` error from Plex Media Server

What is the first thing that comes to your mind when you see a red mark and some big red colored text with no green color to see anywhere? You think "something's definitely not right here". It's natural for us to see the red color as a sign of trouble and danger whilst on the contrary, the green color has a more calm and pleasant vibe in it. Well, that is exactly the case right here with my Plex Remote Access for almost 3 months and I've almost given up on it completely until I finally found the mischief behind all the issues and fixed it.

[NAT](https://en.wikipedia.org/wiki/Network_address_translation) (Network Address Translation) allows sharing a single internet connection with many computers. This will virtually always be used for home internet connections. Routers/modems that allow multiple computers to be connected, either over ethernet or WiFi, will use NAT to do this sharing.

"Double-NAT" is when you have 2 devices on the network, both handling NAT services in two levels. For example, you might have a router plugged in to your ISP directly and then route a cable to another modem to use in your room, now both the router and the modem are providing NAT services. Double-NAT will interfere with the server attempting to create automatic connections. It can also arise when the Public IP Address assigned to you by your ISP is itself behind a NAT service.

## Objective

- Port forward an application
- Resolve any Double-NAT problems on any network

<!-- content -->

_Tip_ - Try enabling Universal Plug and Play (UPnP) first before attempting to manually forward your port. This will allow an application to automatically configure a forwarded port on the router. See images below for examples.

![Huawei UPnP](./huawei-upnp.png)
![Cisco UPnP](./cisco-upnp.jpg)

### PART A &bull; Detecting Double-NAT

#### Method 1 &bull; Knowing Exactly Which Router

1. Check how many modems/routers there are in your network
2. If there's only one &rarr; you most likely don't have a Double-NAT problem (but keep reading if needed)
3. If you know the modem/router you're connecting to is connected directly to your ISP &rarr; you most likely don't have a Double-NAT problem (but keep reading if needed)
4. If you know the modem/router you're connecting to is connected to another modem &rarr; read the next part

#### Method 2 &bull; Manually Tracing your Packet

Another way is to manually count the first 2 hops of your packet using the `traceroute` command

```shell
#$ file: Windows
tracert 8.8.8.8
```

```bash
#$ file: Linux
traceroute 8.8.8.8
```

You are looking for your local IP addresses, as you can see the first 2 address clearly represent a local IP with a 192.168 leading them

![Tracert](./tracert.jpg)

### PART B &bull; Fixing Double-NAT

In Double-NAT situations, one of the devices can often be set to **Bridge Mode** so only one of the devices is providing NAT services. Alternatively, it might be possible to set up a port forward on all NAT devices so that the network requests are correctly sent through.

_Note_ - Try setting the first router you're connected to in Bridge Mode. This might allow you to skip port forwarding all the way.

```shell
#$ file: Windows
ipconfig /all
```

1. Use the code above to find out your local IP and set it as a static IP to make it easier (you can set a custom IP if you want to)
2. Plex uses 32400 as their internal port number, but other applications such as Minecraft uses 25565 so know your application well to port forward them
   _Tip_ - If you're manually forwarding ports your best bet is to stay at the high range as this will reduce the possibility of a port collision with other applications. The higher you go the safer you would be in the long run. Around 40000 to 60000 is respectable.
3. As you can see in the image below, it is trying to automatically forward the port number 55555 but failed. You'll want to check the box to `Manually specify public port` and input your number. For demonstration purposes, we'll use 43200 for the following external/public port
   _Important_ - You must enable this setting or else Plex will continue to try and automatically map the port and fail every time
   ![Plex Retry](./plex-retry.png)
4. Go to your first router settings which is the first IP when you do a `tracert` and forward your port
   - Give a name so you can remember why you forward that port
   - Type in the port you choose previously in `External Port`
   - Type in the application port in `Internal Port`
   - Use both `Protocol` (TCP/UDP)
   - Put the IP you set static previously
     ![Cisco Port Forward](./cisco-port-forward.jpg)
5. Go to your second router settings and forward your port
   _Important_ - Now this is what most other sites don't tell you, you need to type in the `External Port` you forwarded before into the `Internal Port` here. Now you can choose any port number for the external port, but I opted for the same.
   _Note_ - The port that would be opened to the public internet would be the `External Port` on the second router, you want this port to be the same as the port you manually specify in your app.
   ![Huawei Port Forward](./huawei-port-forward.jpg)
6. Go back to Plex and you should see all red turn to green!
   ![Fully Accessible](./fully-accessible.jpg)
