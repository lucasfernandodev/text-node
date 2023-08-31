#!/usr/bin/sh

vite build --mode=watch &
VITE_PID=$!

sleep 20 && web-ext run --source-dir "$1"
kill $VITE_PID

exit
