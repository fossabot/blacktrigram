#!/bin/bash
set -e

# export display for headless browsers
export DISPLAY=:99

echo "Starting Xvfb on display $DISPLAY..."
Xvfb $DISPLAY -screen 0 1280x1024x24 &
sleep 1

echo "Setting up D-Bus..."
if [ ! -e "/var/run/dbus/system_bus_socket" ]; then
    sudo mkdir -p /var/run/dbus
    sudo dbus-daemon --system --fork
fi

echo "✓ Xvfb and D-Bus ready for Cypress"
