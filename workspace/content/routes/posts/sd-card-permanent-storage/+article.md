---
updated: "2025-08-26T19:45:00+07:00"
date: "2019-01-12T17:38:25+07:00"
theme: guide
title: Use an SD Card as Permanent Storage in Windows
description: mount an SD card in Windows as permanent storage.
tags: [tutorial, windows]
---

thin-and-light laptops often come with only 128gb to 256gb of SSD storage. if you install a lot of programs, games, or keep cloud files offline, that fills up quickly.

many laptops include an SD or microSD slot, which you can repurpose for extra storage. it's slower and less durable than an SSD, but if you only need extra room for files or secondary apps, it can help.

> **warning**: SD cards are not designed for heavy program installs or databases. they wear out faster than SSDs. use this mainly for files, backups, or light apps.

## precautions

make sure your Windows drivers are up to date. outdated drivers can cause issues with mounting and stability.

## reformatting

connect your SD card via the built-in slot. back up any important data first, as formatting will erase everything on the card.

next, reformat the SD card to **NTFS**. this file system supports larger files and is more reliable for program installations than **FAT32** or **exFAT**.

## mounting

create a mount point folder on your main drive, usually `C:`. this is where your SD card will appear as a folder. for example, create a folder named `ext` in the root `C:\ext`. then, mount the SD card to that folder:

1. press **win + r** and type `diskmgmt.msc`.
2. in **disk management**, right-click the SD card and select **change drive letter and paths**.
3. click **add** and select **mount in the following empty NTFS folder**.
4. browse to your new folder (e.g. `C:\ext`).
5. confirm with **ok**.

now, your SD card is accessible at `C:\ext` and behaves like a permanent extension of your main drive.
