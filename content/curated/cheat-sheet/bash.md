---
title: Complete Bash Utility Cheat Sheet
date:updated: 2021-02-21
---

These are my goto scripts to manage my home media server. I'll be compiling all that I remember here so I won't forget it and could quickly search for a reference in the future. I hope most of it would be beneficial to you too.

## Using Nano Editor

Nano is a lightweight text editor that is present in virtually any OS out there, other alternatives are Vim and Emacs. There's no point in debating which are the best editor, Nano works well for my use case as far as I'm concerned, so here's some tips to make your CLI editing better.

```bash
# Default arguments for most use cases
sudo nano -lit filename
# l - Enables line numbers in front of text
# i - Automatically indent new lines
# t - Save on exit by default without prompt

# Use -ET 4 when working with Python files
sudo nano -litET 4 main.py
# E - Convert typed tabs to spaces
# T 4 - Set tab size to 4 instead of 8
```

## Resource management

`df`, displays the amount of disk space available on the file system containing each file name argument. Used more for calculating the overall disk space or file system.

```bash
# The -H switch is for human-readable format
df -H path/to/drive

# For more output details
df -H --output=source,size,used,avail path/to/disk
```

`du`, stands for disk usage. It reports on directories and not drives.

```bash
# The -h switch is for human-readable format
du -h path/to/directory

# Display only the total or summary
du -sh path/to/directory

# Find the top 10 directories eating space
du -a path/to/start | sort -nr | head -n 10
```

## File and folder manipulation

`Copy method`, it creates a hard link for the file or everything in the folder to the desired destination. Hard linking is crucial for media management so that you won't have a lot of wasted space with duplicates or multiple files with similar data and different file names.

```bash
~Copy Method
# This will create a complete hard linked copy instead of traditional one
cp -al /path/to/source /path/to/destination
```

`Find method`, it quickly finds your desired file or folder with many additional functionalities. It could do many things such as

- Search for empty files or folders
- Search files and folders with specific hard link counts
- Search files and folders that belongs to a specific owner or group
- Search and destroy files and folders with specific prefix/suffix
- and many more...

```bash
~Find Method
# (find .) <- dot meaning relative from current path

# Find all empty files and directories
find . -empty

# Find all files in directory that has no other hard links
find . -links 1

# Find all directories with specific group
find . -type d -group root

# Find and rename certain directories
find . -depth -type d -name 'dirname' -execdir mv {} 'new-dirname' \;

# Recursively change owner of a directory or file
find . -type d -exec chown user:group {} \;    # for directories
find . -type f -exec chown user:group {} \;    # for files

# Recursively delete all files with specific name
find . -type f -name *.nfo -delete             # wildcard scan
find . -iname JaVaScRiPt                       # case insensitive

# Recursively force delete directories that are not empty
find . -name .unwanted -exec rm -rf {} \;

# Recursively remove executable permission from file with all permission
find . -type f -perm 777 -exec chmod -x {} \;
```

`Rename method`, it renames multiple files or folders with a specific regex pattern. One of the most useful scripts to have for media management.

```bash
~Rename Method
# Get the package first if you don't have it yet
sudo apt install rename

# This will rename all files in the current directory that has
# 0 or more characters inside a bracket and replace it with any text
rename 's/\[.*\]/\[replacement\]/' **/* -n  # preview changes
rename 's/\[.*\]/\[replacement\]/' **/*     # execute rename

# This recursively find and rename all folders from the start directory
rename 's/unwantedName/changedName/' path/to/start/**/* -n  # preview changes
rename 's/unwantedName/changedName/' path/to/start/**/*     # execute rename

# ('s/{}/{}/') is just regex so it's limited to just your knowledge
```
