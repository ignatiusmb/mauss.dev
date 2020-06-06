---
title: Complete Bash Utility Cheat Sheet
date: 2020-06-04
---

<pre class="aqua-code" data-language="bash" data-title="Copy Method">
# This will create a complete hard linked copy instead of traditional one
cp -al /path/to/source /path/to/destination
</pre>

<pre class="aqua-code" data-language="bash" data-title="Find Method">
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
</pre>

<pre class="aqua-code" data-language="bash" data-title="Rename Method">
# Get the package first if you don't have it yet
sudo apt install rename

# This will rename all files in the current directory that has
# 0 or more characters inside a bracket and replace it with any text
rename 's/\[.*\]/\[replacement\]/' **/* -n  # preview changes
rename 's/\[.*\]/\[replacement\]/' **/*     # execute rename

# This recursively find and rename all folders from the start directory
rename 's/unwantedName/changedName/' path/to/start/**/* -n  # preview changes
rename 's/unwantedName/changedName/' path/to/start/**/*     # execute rename
</pre>
