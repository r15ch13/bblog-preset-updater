#!/bin/bash

CSS=$(shell java -jar yuicompressor-2.4.8.jar bblog-preset-updater.css)
VERSION=$(shell cat bblog-preset-updater.js | awk '/@version/ { print $$3 }')

all:
	cat bblog-preset-updater.js | sed -e "s&#css#&$(CSS)&g" | sed -e "s&#version#&$(VERSION)&g" > dist/bblog-preset-updater.js
	cp bblog-preset-updater.css dist/bblog-preset-updater.css