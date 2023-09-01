#!/usr/bin/sh

vite build --mode=watch &
VITE_PID=$!

sleep 40 && web-ext run --source-dir "$1"
kill $VITE_PID

exit
