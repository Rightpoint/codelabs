summary: Create a new Android project using the Rightpoint Android template
id: new-android-project
categories: Template
tags: android
status: Published
authors: Jon Duran
Feedback Link: https://raizlabs.atlassian.net/jira/software/projects/DROID/boards/358

# Rightpoint Android Template
<!-- ------------------------ -->
## Introduction
Duration: 1

These days creating a new project in Android Studio isn't terribly difficult and Studio even provides a number of different starter templates to help get your new project up and running quickly. However, there are various libraries, tools, best practices, etc. that we have built up over several past projects that we want to continue utilizing on future projects.

We obviously don't get all of the setup that we want out of the box from the Android Studio wizard which is what led us to build this template project. Not only does it reduce the amount of time spent setting the project up at kick-off, it standardizes how we choose to build Android projects at Rightpoint.

This codelab will show how to create a new Android project using the [Rightpoint Android template][template] and provide some background into what the template provides newly generated projects.

### What you'll learn

* How to use the Android template
* How the Android template benefits newly kicked-off projects

### What you'll do

* Create a new repository on Github
* Execute various JVM commands on the command line
* Read a module-by-module breakdown of the Android template structure

<!-- ------------------------ -->
## Creating the Repository
Duration: 2

First you want to create a new project on Github using the template. Github provides [detailed documentation][github-docs] on how to do this so we won't reiterate it here, however, the simplest way of accomplishing this is just opening [version 2 of the Rightpoint Android template][template] and clicking on the `Use this template` button.

![Use this template button](assets/use-this-template.jpg)

Negative 
: You want to make sure you are using **version 2** of the template as opposed to version 1. Version 1 of the template is out of date and no longer being actively maintained.

<!-- ------------------------ -->
## Verifying the Project
Duration: 5

You should now have a new project on Github under the [Rightpoint organization][rightpoint]. Clone this repo onto your machine and open it in Android Studio:

```shell script
git clone ${your-repo}
```

Now make sure to run a Gradle clean command:

```shell script
# Windows
gradle clean

# MacOS/Linux
./gradlew clean
```

If no build errors occur then this command does a couple of things:

* Verifies that the repo can be built and is ready to be modified.
* Removes various build files that could be mangled by the subsequent post-processing step.

<!-- ------------------------ -->
## Renaming the Project
Duration: 7

The template itself has various settings and strings that make reference to Rightpoint or template and we don't want to ship a client project with any of that so we are going to use the `android-template-renamer-tool.jar` file to do some post-processing.

Negative 
: The repo should contain an `android-template-renamer-tool.jar` file, however, if it's missing you can [generate it from source][tool-source].

Run the .jar file on the command line with this command:

```shell script
java -jar android-template-renamer-tool.jar
```

Positive 
: In order to run the .jar file you will need Java installed on your machine. We recommend using an [OpenJDK implementation][open-jdk] (and on MacOS machines [Homebrew can be used to manage JDKs][adoptopenjdk-homebrew]).

Follow the command prompt and enter the following information:

* The name of the application
* The new package name (usually this is the client's domain in reverse order, for example: `com.rightpoint.*`)
* The repo name on GitHub (should match the name of the repo you just created)

If no issues occurred then the prompt should say `Complete` once it's done.

Positive 
: Though the `android-template-renamer-tool.jar` file should no longer make any changes to your project if run again it is best just to delete the file once you are done with it. This ensures no one runs it again by accident and reduces the size of the repo on Github.

Once the post-processing is complete, rebuild the project using either Android Studio or the following command:

```shell script
# Windows
gradle assembleDevelopDebug

# MacOS/Linux
./gradlew assembleDevelopDebug
```

If this completes with no errors then your newly created project is all set and ready to go.

<!-- ------------------------ -->
## Template Features
Duration: 3

The first thing that might stand out about the template project is all of the directories, modules and files it contains. For someone coming from a single module application this might be a bit intimidating, however, we will break the purpose of all these files. This should hopefully provide some insight into the decisions made when constructing this template.

### Opinionated decisions

While the template tries to remain unopinionated in certain respects, such as how you might model your data, there are areas where it holds very strong opinions:

* **Language:** The project is written in Kotlin programming language. The decision behind to move to Kotlin was done after Google announced that it would be an officially supported language for Android development. There are several benefits to using Kotlin over the Java programming language (too many to list here) but because of this change we use [ktlint][ktlint] to enforce styling on our Kotlin source files (following the [Android Kotlin Style Guide][android-kotlin-style-guide] in particular).
* **Architecture:** The overall structure of the project follows [clean architecture][clean-arch], in particular, it models its implementation after a [Buffer reference project][buffer-clean-arch]. The reason for choosing a clean architecture based project structure is to enforce separtion of concerns and improve testability.
* **Dependency Injection:** Dependency injection has, historically, been a pattern utilized by applications written in the JVM to help write scalable and testable code. To facilitate dependency injection the template is utilizing [Hilt][hilt], which is built on [Dagger 2][dagger]. While Dagger has a reputation of having a steep learning curve, Hilt makes it much more accessible on Android and is [Google's recommended library for dependency injection][di-guidance]. There are many libraries out there calling themselves dependency injection frameworks but in reality are just [service locators][service-locators] and we want to avoid using service locators for larger scale projects.
* **UI:** Binding a `View` to an `Activity` or a `Fragment` has always included a lot of boilerplate code, especially if you use `findViewById()`. Our projects have always taken advantage of different view binding libraries to reduce this boilerplate but we have officially shifted over to [View Binding][view-binding] in our template. There are many other solutions for binding views but here are a couple of the more popular ones and the reasons we moved away from them:
  * **KotlinX synthetics:** KotlinX synthetics are part of the Kotlin Android Extensions plugin provided by JetBrains. For a while they were considered a better solution than `findViewById()`, however they have [various problems][synthetic-issues] that eventually led to [Google to no longer recommending][synthetic-guidance] their use in projects.
  * **Data Binding:** While very similar to View Binding, Data Binding a bit further and actually allows referencing code inside of XML layouts. There have always been arguments against this kind of functionality but the problems with it have manifested themselves on projects in the form of incomprehensible spaghetti code. That coupled with the fact that Data Binding is using annotation processing underneath the hood (leading to slower build times) were enough for us to move away from the solution.

### Guidelines

This section will discuss a list of guidances that are not necessarily strictly enforced rules. These suggestions are based on previous success but are open to modifications from the Android tech lead on the project:

* **Network & Cache:** TODO
* **Package Structure:** TODO

[github-docs]: https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template
[template]: https://github.com/Rightpoint/android-template-v2
[rightpoint]: https://github.com/Rightpoint/
[tool-source]: https://github.com/Rightpoint/android-template-renamer-tool#building-from-source
[open-jdk]: https://adoptopenjdk.net/
[adoptopenjdk-homebrew]: https://github.com/AdoptOpenJDK/homebrew-openjdk
[clean-arch]: https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
[buffer-clean-arch]: https://github.com/bufferapp/android-clean-architecture-boilerplate
[ktlint]: https://github.com/pinterest/ktlint
[android-kotlin-style-guide]: https://developer.android.com/kotlin/style-guide
[view-binding]: https://developer.android.com/topic/libraries/view-binding
[hilt]: https://developer.android.com/training/dependency-injection/hilt-android
[dagger]: https://dagger.dev/hilt/
[di-guidance]: https://developer.android.com/training/dependency-injection#hilt
[service-locators]: https://www.reddit.com/r/androiddev/comments/d1b4i1/understanding_the_difference_between_di_and_sl/
[synthetic-issues]: https://proandroiddev.com/the-argument-over-kotlin-synthetics-735305dd4ed0
[synthetic-guidance]: https://www.reddit.com/r/androiddev/comments/ala9p2/why_kotlinx_synthetic_is_no_longer_a_recommended/