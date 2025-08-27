---
updated: "2025-08-26T20:15:00+07:00"
date: "2019-01-19T17:38:25+07:00"
theme: guide
title: Block Internet Access for a Program
description: block any program from accessing the internet in Windows using firewall rules.
tags: [tutorial, windows]
---

some programs are meant to be used offline, yet still insist on nagging you with update prompts, automatically installing changes that break features you need, or showing ads that could be avoided entirely without internet access. fortunately, you can block any program from connecting to the internet in the background.

## create a firewall rule

1. open the **Windows Defender Firewall with Advanced Security** interface
   - open **Control Panel**
   - select **System and Security**
   - select **Windows Defender Firewall**
   - click **Advanced settings** in the left panel

2. create a new outbound rule
   - select **Outbound Rules** in the left panel
   - click **New Rule...** in the right panel
   - choose **Program**, then click **Next**
   - select **This program path**, browse to the program's `.exe` file, and click **Next**
   - select **Block the connection**, then click **Next**
   - choose the [network types](#network-types) where this rule will apply, then click **Next**
   - give the rule a clear name so you'll recognize it later

## network types

- **domain** – applies when connected to a corporate or managed domain
- **private** – applies when connected to a trusted network, such as your home or small office
- **public** – applies when connected to an open network, such as at a coffee shop or hotel
