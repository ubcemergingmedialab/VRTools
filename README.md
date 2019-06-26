# VRTools
API backend for VRTools



# Setting up the MongoDB server locally

Import the MongoDB Repository

```
> sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
```

```
> echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
```

```
> sudo apt-get update
```



Install the MongoDB Packages

```
> sudo apt-get install -y mongodb
```



Create the configuration file

```
> sudo touch /etc/systemd/system/mongodb.service
```



Start editing the configuration file

```
> sudo vim /etc/systemd/system/mongodb.service
```

Paste this into the file

```
#Unit contains the dependencies to be satisfied before the service is started.
[Unit]
Description=MongoDB Database
After=network.target
Documentation=https://docs.mongodb.org/manual
# Service tells systemd, how the service should be started.
# Key `User` specifies that the server will run under the mongodb user and
# `ExecStart` defines the startup command for MongoDB server.
[Service]
User=mongodb
Group=mongodb
ExecStart=/usr/bin/mongod --quiet --config /etc/mongodb.conf
# Install tells systemd when the service should be automatically started.
# `multi-user.target` means the server will be automatically started during boot.
[Install]
WantedBy=multi-user.target
```

Exit vim by pressing escape, then typing  `:wq`



Update the systemd service

```
> systemctl daemon-reload
```



Start the service (mongodb)

```
> sudo systemctl start mongodb
```



Check if mongodb has been started on port 27017 (Check for a `127.0.0.1:27017` in the Local Address list) 

```
> netstat -plntu
```



Check if the service has started properly

```
> sudo systemctl status mongodb
```



Enable auto start MongoDB when system starts

```
> sudo systemctl enable mongodb
```



Stop then restart MongoDB

```
> sudo systemctl stop mongodb
```

```
> sudo systemctl restart mongodb
```



Open MongoDB

```
> mongo
```



Switch to database admin

```
> use admin
```



Create the root user

```
> db.createUser({user:"admin", pwd:"password", roles:[{role:"root", db:"admin"}]})
```



Exit from the MongoDB shell (either press ctrl+d or just start a new terminal)

Restart MongoDB

```
> sudo systemctl restart mongodb
```

And connect to the database

```
> mongo -u admin -p password --authenticationDatabase admin
```

