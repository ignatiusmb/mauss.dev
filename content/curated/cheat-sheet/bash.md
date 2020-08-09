---
title: Complete Bash Utility Cheat Sheet
date:updated: 2020-06-23
---

These are my goto scripts to manage my home media server. I'll be compiling all that I remember here so I won't forget it and could quickly search for a reference in the future. I hope most of it would be beneficial to you too.

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
# Find all empty files and directories
find /path/to/start/dir -empty

# Find all files in directory that has no other hard links
find /path/to/start/dir -links 1

# Find all directories with specific group
find /path/to/start/dir -type d -group root

# Recursively change owner of a directory or file
find /path/to/start/dir -type d -exec chown user:group {} \;    # for directories
find /path/to/start/dir -type f -exec chown user:group {} \;    # for files

# Recursively delete all files with specific name
find /path/to/start/dir -type f -name *.nfo -delete             # wildcard scan
find /path/to/start/dir -iname JaVaScRiPt                       # case insensitive

# Recursively force delete directories that are not empty
find /path/to/start/dir -name .unwanted -exec rm -rf {} \;

# Recursively remove executable permission from file with all permission
find /path/to/start/dir -type f -perm 777 -exec chmod -x {} \;
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
```
