# XWiki ClickStart

This clickstart sets up a database, build service, repository for a customizable XWiki application.
All built by maven. 

<a href="https://grandcentral.cloudbees.com/?CB_clickstart=https://raw.github.com/swashbuck1r/xwiki-clickstart/master/clickstart.json"><img src="https://s3.amazonaws.com/cloudbees-downloads/clickstart/clickstart-now.png"/></a>

Launch this clickstart to get an instance of XWiki running on your CloudBees account now.

Once you have created this application using ClickStart, be sure to upgrade your container size to at least 1GB.

To run this application locally, just clone the GIT repository that CloudBees creates for you, and use the following Maven command:
    mvn bees:run

To customize the app, make your changes, commit to git, and push back to your CloudBees git repo.  This will trigger a Jenkins build job that will build, test, and deploy your XWiki.
