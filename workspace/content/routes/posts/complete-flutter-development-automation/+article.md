---
date: "2020-04-30T17:38:25+07:00"
title: Complete Flutter Development Automation
description: Check out how to automate your Flutter development workflow
tags: [ppl2020, flutter, devops, gitlab]
---

![Flutter Logo](https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png)

I'm sure most of you developers have at least seen this logo before, or are even currently using it right now. It's the newest cool kid in the block of course! Well, it's not really that new anymore but it's still relatively young and in par with the current next-gens like NativeScript, React Native, and Progressive Web Apps. Compared to our old-school veterans like plain Java Android, Swift, and Kotlin perhaps? They are the successors to our modern world.

## What even is Flutter

If you've (surprisingly) never heard of this, Flutter is Google's UI framework to develop mainly mobile applications for Android and iOS with their built-in SDK.

> Flutter is Google's UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase
> -flutter.dev

It is based on Dart language, created by Google too. You can see there's a pattern building up here. Google has made Dart easy by having a lot of similarities with existing languages like JavaScript, and Flutter is just like frameworks made with JS and Python.

## Why you shouldn't only learn Flutter

This is not to throw you away from learning Flutter, not at all. In fact, this might be another reason to learn Flutter even more.

- Big companies are still using legacy codes and it's not even an option to migrate the codebase to other languages, it'll just be a waste of money and time. Even the [government is still using COBOL from 1959](https://youtu.be/7d7-etf-wNI)
- JavaScript developers have had a lot of mutations with JS now being able to work as Desktop Application with Electron, and Mobile Application with Native frameworks like React Native, NativeScript, Ionic, Cordova, etc. Most small startups don't really have the resources to invest in a diverse team.

So if your goal is to work in a multi-million dollar companies, or just any big companies with legacy codes, then Flutter may not be your first choice, but it should still be in your toolset.

Either that, or the startup you're aiming for is using one technology (usually just JavaScript) to develop all of their applications, from Desktop to Web to Mobile to Tablets, and etc.

## Why you should start using Flutter

1. Built-in and pre-made custom widgets
2. Mild learning curve
3. Excellent, top-tier documentation
4. Fast-growing community
5. No messing with XML files
6. Native performance with no bridge
7. Supports both strong and weak typing
8. Hot reload functionality
9. Write once for all platforms

I really can't think of any other reasons why we shouldn't start using Flutter to develop any **future** mobile apps. It is, in fact, the fastest and hottest rising stack in the current mobile development world.

[![Flutter trend comparison](./flutter-trend.svg)](https://insights.stackoverflow.com/trends?tags=flutter%2Creact-native%2Cionic-framework%2Ckotlin%2Cswift%2Cxamarin.android)

If you're still not convinced yet... excluding Swift, which is slowly going down on the trend, Flutter is the highest on the chart! It is on its way to beat native languages like Swift, Java, and Kotlin.

Please keep in mind that this will only apply if you are actually developing new apps either now or in the future. It's not really encouraged to migrate existing codebase, especially huge ones, to Flutter.

## Time-driven development

This is what I'll be basing on for this post. Advokasimu, which is the app my team and I are currently working for this 2020 course of PPL. We have been researching for a lot of time before we started and we found our best engine for this project.

Remember what I said before about having a pattern building up here. Well, here's another Google's child, which is Firebase.

![Firebase logo](https://upload.wikimedia.org/wikipedia/commons/3/37/Firebase_Logo.svg)

Firebase is the best engine for Flutter, it feels like it's specially built for it. Well, I guess it is since both are made by Google. But! There are other reasons of course.

I'll start of by saying there's no reason for you to not use Firebase with Flutter, except if you're concerned with using Google products, in which case picking Flutter should also be in your concern too.

Sadly, Firebase can't be self-hosted, but then again, the benefits that comes with it is spectacular. It is scalable too in a sense that, when you need more performance, bandwidth, storage, or anything in that matter, you can just pay for it. Just think of it as a substitute to the electricity cost and other things to set up and run your own server in exchange for time, energy, and convenience.

Of course, we'll be going through what's best for this project since it is a time-driven development.

1. Zero-config development

    One of the biggest bottleneck of developing an application is focusing on infrastructure management, and when your constrain is time, this is something that you shouldn't think too much about.

    Firebase provides a lot of functionalities straight out-of-the-box. Just a couple of clicks to set up a project, download its pre-made config file, and you're set to go! Everything is handled by Firebase and you can start developing instantly.

2. Multiple available functionalities

    There are dozens of functionalities to choose from. It has serverless architecture to create scalable apps, real-time and production-ready databases, simple authentication, cloud storage, unlimited app analytics, etc.

    All of which you need to set up manually in other DBMS, or just a pain to use. Which is not the case here with Firebase.

3. Excellent APIs

    Straight-forward, plain and simple APIs to use that integrates perfectly with Flutter's data fetching and handling.

## Container-based CI/CD

Before we move on to the next section about Continuous Integration and Deliveries, we need to make our own image first, build our own container, or whatever is it that you know. *But, why though?* I hear you say. It might be fine to just use an existing image or just copy some similar project's `.gitlab-ci.yml`. The latter might be fine if you're certain about it, but keep in mind that every project have different needs.

Here's some of the reasons why I'm building my own image

1. Our dependencies are heavy to load or install, therefore running the install script every time a new code is pushed would not be wise and will waste a huge amount of time.
2. We're using our own GitLab server provided by the faculty, as such, we're also sharing runners between all other students or members using it. With limited computing power, we've experienced timeouts just because the server can't run the job after 1 hour.
3. I think 2 of the points above are sufficient enough to prove why it's 100% better to just build your own image, but another benefit to it is cache. Even after it has run once, it will cache the image making the next job or pipeline using it so much faster.
4. We can also migrate to any other workplace and have the exact same environment by just using this image.

We'll be using docker to build our image and docker hub to store it. We could go about the difference of docker and VMs, but since GitLab can only use images, VMs are out of the question.

To build the image, we first need to have docker install on our system. Once we got it set up, we create a `Dockerfile` and build our image locally

<!-- ```dockerfile TODO https://github.com/shikijs/shiki/issues/458  -->
```docker
#$ file: Dockerfile
FROM ubuntu:latest

RUN mkdir /development
WORKDIR /development
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get -q update && apt-get -qy upgrade
RUN apt-get -qy install git curl unzip xz-utils
# Flutter SDK
ENV FLUTTER_HOME /development/flutter
ENV DART_HOME ${FLUTTER_HOME}/bin/cache/dart-sdk
RUN curl https://storage.googleapis.com/flutter_infra/releases/stable/linux/flutter_linux_v1.12.13+hotfix.8-stable.tar.xz -o flutter-sdk.tar.xz
RUN tar xf flutter-sdk.tar.xz && rm flutter-sdk.tar.xz
ENV PATH $PATH:${FLUTTER_HOME}/bin
ENV PATH $PATH:${DART_HOME}/bin
RUN flutter config --no-analytics
# Flutter Coverage
RUN apt-get -qy install lcov
# Android x Java SDK
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64
ENV ANDROID_HOME /development/Android
RUN apt-get -qy install lib32z1 openjdk-8-jdk
RUN mkdir Android && curl https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip -O
RUN unzip -q sdk-tools-linux-4333796.zip -d Android && rm sdk-tools-linux-4333796.zip
ENV PATH $PATH:${JAVA_HOME}/bin
ENV PATH $PATH:${ANDROID_HOME}/tools
ENV PATH $PATH:${ANDROID_HOME}/tools/bin
ENV PATH $PATH:${ANDROID_HOME}/platform-tools
RUN yes | sdkmanager --install "platform-tools" "platforms;android-28" "build-tools;28.0.3"
RUN touch /root/.android/repositories.cfg
RUN yes | flutter doctor --android-licenses
# NodeJS v13
RUN apt-get -qy install lsb-release gnupg
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -qy nodejs
# MS App Center
RUN npm install -gs appcenter-cli

RUN apt-get update && apt-get -qy upgrade
RUN apt-get -qy autoremove && apt-get -qy autoclean

# Final Analysis
RUN flutter doctor -v && appcenter
```

Here's the said `Dockerfile` I use to create my image. I'll be going through each line of code one by one.

- `1` - Here we're saying to use the latest ubuntu image as our initial image.
- `3-4` - We're saying we want to create a directory on root called **development** and work .inside that directory. So, all of the files we handle will be contained inside this directory.
- `5` - There will be a warning when you don't set the argument variable to noninteractive, but it'll still work nonetheless, so this is optional. Using the **ARG** command will create an environment variable just for the current session and will not be carried over to the final image.
- `6-7` - We'll run an obligatory update and upgrade command using the quiet shorthand to not clutter the terminal while building the image, and install the essential packages needed to work with our next commands.
- `9-10` - We're setting an environment variable using the **ENV** command for our Flutter home and Dart home. This will set the environment variable and be carried over to the final image.
- `11-12` - We're downloading the Flutter tarball as a file called **flutter-sdk.tar.xz**, and then extracting and immediately remove the tarball. At the time of making this image, we're using the stable release **v1.12.13+hotfix.8**.
- `13-14` - We'll be appending the bin directory of Flutter and Dart to the PATH.
- `15` - This is another optional line, but run this so Flutter doesn't collect analytics when the image is used.
- `17` - We'll be installing lcov to create a summary of our coverage.
- `19-20` - We're setting an environment variable for our Java home and Android home.
- `21` - We'll be installing the required packages by Android and we'll be using Java 8 since our Flutter isn't compatible with the higher versions yet.
- `22-23` - We're downloading the CLI only sdk-tools for Linux, unzipping it to the Android directory, and immediately remove the zip file.
- `24-27` - Same as before, we're appending the directories needed by Java and Android to our PATH.
- `28` - We'll be accepting all the prompts using yes command to install the platform and build-tools needed by Android using sdkmanager. Since we're using the CLI tools only, it doesn't come with this.
- `29` - There's a warning for this particular file since it doesn't exist, so we'll just create it first.
- `30` - We'll be accepting all the prompts using yes command to accept all the licenses to prevent warnings when running **flutter doctor**
- `32-34` - We'll just follow the guide to install Node on Ubuntu.
- `35` - Since we're using MS App Center for our deployment, we'll be installing that through npm.
- `38-39` - Finally, run update and upgrade one last time just to make sure, and use autoremove and autoclean to purge off anything unnecessary.
- `42` - This is just to make sure Flutter and App Center is working as intended.

And with that final line, we're done with our Dockerfile! The next step is to just build the image locally and if you've already done that, we can push it to the hub.

## Continuous Integration

Flutter, well... all of static typed language is somewhat a double-edged sword. It would be an excellent investment for the future of the codebase, but yet again, when time is a constraint, it can be a problem for yourself too.

Thankfully, we have automation in our side! Flutter's linter is so verbose and exact, it would tell us exactly what went wrong and what is expected. We will set it up to check every time we pushed our code.

Like any other projects, having to wait and download the same exact stuff again and again is tedious and time-wasting. So, we're going to use our own image that we built in the previous section.

```yaml
#$ file: .gitlab-ci.yml
image: ignatiusmb/ppl2020-flutter:latest

# This is optional, you can follow this stages exactly or have your own
stages:
  - lint
  - test
  - analysis
  - deploy
  - show
```

If all your needs are all covered by the `Dockerfile`, you can absolutely use this exact image too. Then, all you have to do is specify your stages according to your needs, this one's for linting and it's the first stage (lint).

```yaml
#$ file: .gitlab-ci.yml
lint:codebase:
  stage: lint
  script:
    - flutter analyze
```

That's it! Now every time you commit and pushed new code to the repository, it will automatically run as a new job in the pipelines and lint the newly added code. That's not the only fun part though, we're going to add automated tests and coverage too, this is the second stage (test).

```yaml
#$ file: .gitlab-ci.yml
test:coverage:
  stage: test
  script:
    - flutter test --coverage
  coverage: '/lines......: \d+\.\d+\%/'
  artifacts:
    paths:
      - $CI_PROJECT_DIR/coverage
    expire_in: 2 days
```

You'll need to pass the results as an artifact for the next stage which they need to create the analysis, we'll save it in the $CI_PROJECT_DIR in the coverage directory. We'll also show the coverage in the terminal at line 5. We're going to use the artifact to create our analysis as well as send it to the server, this is the fourth stage (analysis).

```yaml
#$ file: .gitlab-ci.yml
analysis:quality:
  image: ignatiusmb/sonarscanner-flutter:1.0.0
  stage: analysis
  dependencies:
    - test:coverage
  before_script:
    - flutter pub get
    - rm -f analysis_options.yaml
  script:
    - sonar-scanner
      -Dsonar.login=$SONARQUBE_TOKEN
      -Dsonar.projectKey=$SONARQUBE_PROJECT_KEY
      -Dsonar.branch.name=$CI_COMMIT_REF_NAME

analysis:coverage:
  stage: analysis
  dependencies:
    - test:coverage
  script:
    - lcov --list coverage/lcov.info
    - genhtml coverage/lcov.info -o coverage
  artifacts:
    paths:
      - $CI_PROJECT_DIR/coverage/
    expire_in: 10 days
```

I'm using a custom built image to make sure that no packages are missing, but you'll probably get away with just the default image `sonarsource/sonar-scanner-cli`.

`analysis:quality` is to send out the command to run the analysis on our code, and `analysis:covergae` is to create the final lcov and html as an artifact to download. This won't happen in the previous jobs has failed.

The first line in `before_script` at the `analysis:quality` is a crucial part for making Flutter to work with sonarscanner. Removing `analysis_options.yaml` is probably optional but we're doing it because our faculty's server has its own `yaml` config that overrides ours.

The final results of your project's coverage will be stored as artifacts that expires in 10 days. You can download it in that period of time.

## Continuous Delivery/Deployment

This is the part where we're going to ship our products to our clients, and hopefully make out lives easier to test and check our production app too.

We're going to leverage on a platform called App Center by Microsoft to deploy our app. Thankfully, they have an cli to actually make all of this easier too using npm!

Before we continue, we're going to create a helper script so in case we want to make several different jobs for development build and production build, we won't have to write a lot the same code.

This is absolutely optional, if you only have one deployment stage, you can just immediately write this in the `before_script`

```yaml
#$ file: .gitlab-ci.yml
.before_deploy:
  before_script:
    - appcenter login --token $APP_CENTER_API_KEY
    - echo $GOOGLE_SERVICES | base64 -di > android/app/google-services.json
```

- `3` - $APP_CENTER_API_KEY is our environment variable and you can get it from your App Center account, this is so you're logged in before deploying the app.
- `4` - $GOOGLE_SERVICES is google-services.json file encoded as base64 because GitLab environment doesn't take raw file content. Since this file is considered as a secret, we'll need to input this in the secrets too and simply decode it before deployment.

Then, all we have to do is extend our pre-made script, build the apk on release mode, and use appcenter cli to distribute it, this is the final stage (deploy).

```yaml
#$ file: .gitlab-ci.yml
deploy:production:
  extends: .before_deploy
  stage: deploy
  only:
    - master
  tags:
    - docker
    - build
  script:
    - flutter build apk --release --build-number=1
      --build-name=YOUR_APP_NAME
    - appcenter distribute release -f build/app/outputs/apk/release/app-release.apk
      --app $APP_CENTER_APP_NAME_DEV
      --group $APP_CENTER_GROUP_TARGET
```

- `2` - We're extending our previously made script.
- `5` - We're saying that this should only run when changes are made to the master branch.
- `7-8` - Tags are there just to help differentiate each jobs and pipelines.
- `10-11` - We'll be building our apk on release mode with the name of YOUR_APP_NAME, you should change this to your own app name.
- `12-14` - We'll distribute the app by releasing it through App Center, the generated file is located at the build/app/outputs/apk/release directory, and the app and group is according to your own App Center configuration.

That's it! We have now completed our setup to fully automate flutter development using GitLab's devops specifically. All you have to is just start writing some code. Cheers!

---
Reference(s):

- <https://flutter.dev/>
- <https://firebase.google.com/>
- Weeks of research
- Prior experience
