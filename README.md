# 23people exam

This exercise was developed for [23people]. 

  - All source code is in master branch
  - I'll put some references about how to build a docker image.
  
### Tech

Technology used in this project:

* [NestJS] - A progressive Node.js framework
* [node.js] - evented I/O for the backend
* [Visual Studio Code] - Code editing.Redefined.
* [MySQL] - The world's most popular open source database
* [Docker] - We help developers and development teams build and ship apps
* [Google Cloud Platform] - Meet your business challenges head on with cloud computing services from Google.
* [GitHub] - Built for developers

And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.
This exams was published in a [public repository].


### Installation

Install the dependencies and devDependencies and start the server.

```sh
$ npm install
$ npm run start
```

NOTE: You have to install [MySQL] by your own and run scripts at script folder.
      You can also run a mysql docker image

### Docker
To deploy in a Docker container.

By default, the Docker will expose port 8080, also this app has that explicit port expose.

```sh
docker build -t .
```

To run app: 

```sh
docker run -d -p 8000:8080  <image-created>
```

Verify the deployment by navigating to your server address in your preferred browser.

```sh
localhost:8080
```
I highly recommend to use [Postman] for requests.


[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


[23people]: <https://23people.io/>
[NestJS]: <https://nestjs.com/>
[Visual Studio Code]: <https://code.visualstudio.com/>
[MySQL]: <https://dev.mysql.com/>
[Docker]: https://www.docker.com/
[Google Cloud Platform]: <https://cloud.google.com/>
[GitHub]: <https://github.com/>
[public repository]: <https://github.com/RamonYanezOShee/exercise>
[postman]: <https://www.postman.com/>