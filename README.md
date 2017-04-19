# NistPagesTemplate

This is a template project for Jekyll collaboration site on pages.nist.gov. Follow the instructions to create a collaboration web site that can be used under NIST guidelines.

## For instructions on use of GitHub at NIST

[NIST Github Instructions and Policies](http://odiwiki.nist.gov/ODI/GitHubFAQ)

[NIST Specific Instructions for Pages Sites](http://odiwiki.nist.gov/ODI/GitHubFAQ#GitHub_Pages_Instructions)

# Tools
To perform development of collaboration sites using this method, you need some tools installed on your computer.

**Jekyll**
Jekyll is a tool that will enable you build the web site on your computer and view the outputs before updating the repository on github. This is very helpful since once pushed to github your changes are "live".

**Markdown**
Markdown is a lightweight file format for developing web pages without the use of html. It uses simple markup of a text file with .md extension. *note: github has its own profile of markdown which is what will be rendered*

	# Creates a level one heading
	## Creates a level two heading
	* Creates a bullet
	**bold**
	*italic*
	1. Creates a numbered list
	[heres is a link description](here is url)
	![alt text](image.png "Title of image")
	
With this technology, you dont have to do much to make attractive pages of content for your site.

## Add ability to upload files to AWS
See file [UploadingFilesToS3Store.md](UploadingFilesToS3Store.md) in this directory

## Miscelaneous
You need a favicon for your site -- it can be made from a small png or jpg:

[Convert a png file to an icon for favicon](http://convertico.com/) 

[font awsome](http://fontawesome.io/cheatsheet/)

## Setting up for web development

Use these instructions to enable pages to be edited and tested on your desktop before committing changes to the github repository.

### Install ruby and jekyll

[install ruby and jekyll on Linux/Mac](http://jekyllrb.com/docs/installation/)


[Windows installation instructions](http://jekyllrb.com/docs/windows/#installation)

Note: on a windows computer, the default locations of C:\ as the directories for the tools should be accepted.

### Install a markdown editor
[For MAC](https://macdown.uranusjr.com)

[For Windows](http://markdownpad.com)

### Working with git and github
This is mostly beyond this README but look at the presentation on the elwood shared drive
smb://elwood.nist.gov/730/internal/sgcps/TestBeds/CPSTestbed/WorkingWithGithub.pptx

# Work on your web site


## To Use This Template

1. Create a new repository with the name you want to use as part of the link
2. Create a new repo branch called nist-pages (to prevent any cross contamination, you may wish to create this as an orphan branch). You can delete the "main branch" and make this new branch the default branch.
3. In the "Repo Settings", setup a WebHook with Payload URL of https://pages.nist.gov/deploy
4. clone the repo onto your computer
5. copy all files from the NISTPagesTemplate project
6. search for the string NistPagesTemplate in all files and replace with appropriate values -- typically yourreponame
7. commit all the new files to the project and push to your repo

That's it! Find your page at https://pages.nist.gov/yourreponame  

## Developing content
When you have edited to your project to your hearts content, run the following command to spin up a local web server with jekyll in a windows command line terminal:

	jekyll server

This will allow you to view in your web browser the site as:
[http://localhost:4000/yourreponame/]()

## Adding files to the library
The file system is located on the NIST AWS S3 site. See file [UploadingFilesToS3Store.md](UploadingFilesToS3Store.md) in this directory