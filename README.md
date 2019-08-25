# Udacity cloud-developer c3 project

## Submission requirements:

### According to the Project Submissions page.(Taken from Udacity 25th August 2019)

Please submit your project with the following: Screenshot of TravisCI which shows the successful build and deploy steps The public GitHub repo and the docker hub images Screenshot of kubectl get pod which shows all running container Screenshot of the application

Your project should meet all rubric requirements to pass the project. The link is provided here: Project Rubric.

### According to the project specifications (Taken from Udacity 25th August 2019)

PROJECT SPECIFICATION
Refactor Udagram App into Microservices and Deploy

CI/DC, Github & Code Quality

CRITERIA
MEETS SPECIFICATIONS
The project demonstrates an understanding of CI and Github

All project code is stored in a GitHub repository and a link to the repository has been provided for reviewers. The student uses a CI tool to build the application.

--> Travis CI

The project has a proper documentation

--> This readme

The README file includes introduction how to setup and deploy the project. It explains the main building blocks and has comments in the important files.

--> .travis.yml is used for the CI to run on git push
--> Explain set up of different services

The project use continuous deployments (CD)

--> check the travis.yaml file

A CD tool is in place to deploy new version of the app automatically to production. The way is described and easy to follow.

--> read this --> https://codygreen.com/2018/08/13/ci-cd-with-kubernetes-and-travis-ci/

Container

CRITERIA
MEETS SPECIFICATIONS
The app is containerized

--> yes it is

There is a Dockerfile in repo and the docker image can be build

--> check the deployment/docker folder and run docker compose in it

The project have public docker images

--> check the deployment/docker folder the public docker images are referenced in the docker-compose.yaml

On DockerHub images for the application are available

--> yes

The applications runs in a container without errors

--> please test

Starting the app as a container on a local system

Deployment

CRITERIA
MEETS SPECIFICATIONS
The application runs on a cluster in the cloud

--> yes see screen shots

The project can be deployed to a kubernetes cluster

The app can be upgraded via

The students can deploy a new version of the application without downtime, rolling-update

--> yes

A/B deployment of the application

Two versions of the same app can run at the same and service traffic

--> I assume te above also refers to rolling updates ?

Monitoring

The application is monitored by Amazon CloudWatch

--> Sure
