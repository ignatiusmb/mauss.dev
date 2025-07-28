---
date: 2025-07-17
title: Notes • Bash
series: my-notes
---

my personal notes on bash scripting. they are mostly scripts that i use to manage my home media server. i forget things easily, so i write them down here for future reference. these notes are not meant to be comprehensive, and i'm no expert in bash, so please let me know if you have any suggestions or improvements.

## nano editor

`nano` is a lightweight text editor that is present in virtually any OS out there.

```bash
# default arguments for most use cases
sudo nano -lit filename
# l - Enables line numbers in front of text
# i - Automatically indent new lines
# t - Save on exit by default without prompt

# Use -ET 4 when working with Python files
sudo nano -litET 4 main.py
# E - Convert typed tabs to spaces
# T 4 - Set tab size to 4 instead of 8
```

## resource management

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

## filesystem manipulation

`cp -al`, use this to create a hard link for the file or everything in the directory to the desired destination. hard linking is crucial for media management so that you won't have a lot of wasted space with duplicates or multiple files with similar data and different file names.

```bash
#$ file: Copy Method
# This will create a complete hard linked copy instead of traditional one
cp -al /path/to/source /path/to/destination
```

`find`, it quickly finds your desired file or directory with many additional functionalities. It could do many things such as

- Search for empty files or directories
- Search files and directories with specific hard link counts
- Search files and directories that belongs to a specific owner or group
- Search and destroy files and directories with specific prefix/suffix
- and many more...

```bash
#$ file: Find Method
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

`rename`, it renames multiple files or directories with a specific regex pattern. One of the most useful scripts to have for media management.

```bash
#$ file: Rename Method
# Get the package first if you don't have it yet
sudo apt install rename

# This will rename all files in the current directory that has
# 0 or more characters inside a bracket and replace it with any text
rename 's/\[.*\]/\[replacement\]/' **/* -n  # preview changes
rename 's/\[.*\]/\[replacement\]/' **/*     # execute rename

# This recursively find and rename all directories from the start directory
rename 's/unwantedName/changedName/' path/to/start/**/* -n  # preview changes
rename 's/unwantedName/changedName/' path/to/start/**/*     # execute rename

# ('s/{}/{}/') is a regular expression so it's limited to your knowledge on it
```
