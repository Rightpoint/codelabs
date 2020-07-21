summary: Create a new Android project using the Rightpoint Android template
id: new-android-project
categories: Template
tags: android
status: Published
authors: Jon Duran
Feedback Link: https://github.com/Rightpoint/codelabs/issues

# Rightpoint Android Template
<!-- ------------------------ -->
## Introduction
Duration: 0

This codelab will show how to create a new Android project using the [Rightpoint Android template][template]. It will also provide some background into what the template provides newly generated projects.

<!-- ------------------------ -->
## Getting Started
Duration: 0

First you want to create a new project on Github using the template. Github provides [detailed documentation][github-docs] on how to do this so we won't reiterate it here, however, the simplest way of accomplishing this is just opening [version 2 of the Rightpoint Android template][template] and clicking on the `Use this template` button.

Negative 
: You want to make sure you are using **version 2** of the template as opposed to version 1. Version 1 of the template is out of date and no longer being actively maintained.

<!-- ------------------------ -->
## Verifying the Project
Duration: 0

You should now have a new project on Github under the [Rightpoint organization][rightpoint]. Clone this repo onto your machine and open it in Android Studio.

The repo should contain an `android-template-renamer-tool.jar` file, however, if it's missing you can [generate it from source][tool-source].

Lastly, make sure to run a Gradle clean command and verify no build errors occur:

```shell script
# Windows
gradle clean

# MacOS/Linux
./gradlew clean
```

<!-- ------------------------ -->
## Renaming the Project
Duration: 0

As is the project has various setting that make reference to Rightpoint or template and we don't want to ship a client project with any of that information. We are going to use the `android-template-renamer-tool.jar` file we mentioned in the previous step to do some post-processing on the project.

First, run the .jar file on the command line with this command (this requires Java to be installed):

```shell script
java -jar android-template-renamer-tool.jar
```

Then, follow the command prompt and enter the following information:

* The name of the application
* The new package name (usually this is the client's domain in reverse order, for example: `com.rightpoint.*`)
* The repo name on GitHub (should match the name of the repo you just created)

If no issues occurred then the prompt should say `Complete` once it's done.

<!-- ------------------------ -->
## Additional Notes
Duration: 0

[github-docs]: https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template
[template]: https://github.com/Rightpoint/android-template-v2
[rightpoint]: https://github.com/Rightpoint/
[tool-source]: https://github.com/Rightpoint/android-template-renamer-tool#building-from-source