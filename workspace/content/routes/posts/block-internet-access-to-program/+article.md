---
date: "2019-01-19T17:38:25+07:00"
title: Block Internet Access to a Certain Program
tags: [tutorial, windows]
---

I'm sure some of you have come across a program that you use offline/locally but keeps popping-up boxes when you start them or insisting on updating itself automatically, just to find out that the updates are breaking some of the functionality you want. You might also be using a program with obnoxious ads that could be blocked with no internet. Well, you can actually block them from accessing the internet in the background.

## Objective

- Block any program from accessing the internet

### Creating a Windows Firewall Rule

1. Open Advanced Windows Firewall interface
    - Open **Control Panel**
    - Select **System and Security**
    - Select **Windows Defender Firewall**
    - Click on **Advanced settings** on the left panel
    - **Advanced Windows Firewall interface** will show up
2. Create a new rule
    - Click on **Outbound Rules** on the left panel
    - Click on **New Rule** on the right panel
    - Confirm the **Program** is selected, then click Next
    - Select **This program path** and browse to your program's EXE file, then click Next
    - Confirm the **Block the connection** is selected, then click Next
    - Check on the boxes according to your needs, then click Next
    - Name your rule so you'll remember it later on

## Note

- **Domain:** rule applies when a computer is connected to a domain
- **Private:** rule applies when a computer is connected to a private network, such as your home or small business network
- **Public:** rule applies when a computer is connected to a public network such as at a coffee shop or hotel
