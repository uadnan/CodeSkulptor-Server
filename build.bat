:: CodeSkulptor Server Build Task

:: Author: Adnan Umer <u.adnan@outlook.com>
:: Dated: 3 February, 2015

@echo off
SET GOPATH="%CD%"
cd src
go build -o ../bin/CodeSkulptorServer.exe
cd ..