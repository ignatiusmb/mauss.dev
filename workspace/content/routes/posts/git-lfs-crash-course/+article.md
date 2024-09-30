---
date: "2023-11-30T12:00:00+07:00"
title: Git LFS Crash Course
description: A quick introduction to the basics of Git LFS
tags: [tech, git, crash-course]
---

[Git LFS](https://git-lfs.com/) is an open source Git extension for versioning large files (e.g. audio, video, and graphics) with Git by replacing these large files with text pointers that are tracked by Git, while storing the file contents on a remote server like GitHub.

This extension is really useful when working on a project with large files that are updated frequently, such as assets in a game project. It allows us to keep the repository size small while still being able to version the large files, meaning faster cloning and pulling of the repository. We also don't need to worry about cleaning up the repository history to remove the large files after they are no longer needed.

We do have to keep in mind that Git LFS needs a remote server to store the large files, so we're fully dependent on the server for their availability, storage, and bandwidth. If you rarely or never update the large files, then you can ignore this extension knowing you're not missing out on anything.

## Installation

To install Git LFS, we can run the following command...

```bash
git lfs install
```

Then we can track the large files (we're using "mp4" files as an example here) by running...

```bash
git lfs track "*.mp4"
```

This will add or generate a `.gitattributes` file that you'll need to track and commit. Commit the rest of the changes, push it, and you're done!

## Uninstalling

To uninstall Git LFS, we can run the following command...

```bash
git lfs uninstall
```

Then go to your `.gitattributes` file and remove the lines that were added by Git LFS (if it's everything, then you can safely delete the file)

```diff
#$ file: .gitattributes
# examples this file might have
*.md linguist-detectable 

-*.mp4 filter=lfs diff=lfs merge=lfs -text
-*.png filter=lfs diff=lfs merge=lfs -text
-*.jpg filter=lfs diff=lfs merge=lfs -text
-*.jpeg filter=lfs diff=lfs merge=lfs -text
```

Re-track and add the files that were previously tracked by Git LFS by running...

```bash
git add --renormalize .
```

commit the changes, push it, and you're done!

---

Reference(s):

- <https://git-lfs.com/> - Git Large File Storage Website
- <https://docs.github.com/en/repositories/working-with-files/managing-large-files> - Managing large files in GitHub
