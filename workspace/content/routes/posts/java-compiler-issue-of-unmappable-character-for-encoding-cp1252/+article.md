---
date: "2018-11-30T17:38:25+07:00"
title: Get Rid of Un-mappable Character for Encoding Cp1252 when Compiling Java
tags: [tutorial, coding]
---

There are 2 ways to get rid of it

1. Add the encoding option on compile command

    ```
    javac -Dfile.encoding=UTF-8 your_appname.java
    ```

2. Add the command to the **System Variable**

    ```
    Variable name: JAVA_TOOL_OPTIONS
    Variable value: -Dfile.encoding=UTF-8
    ```
