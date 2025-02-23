#!/bin/bash

echo "Attempting to install xdg-utils, password may be required"
sudo apt install xdg-utils
echo 'function git() { 
    if [ "$1" = "tub" ]; then 
        echo "touching grass for you 🌱"
        touch grass
        sleep 2
        /mnt/c/Windows/explorer.exe https://gittub-gp6m.vercel.app/; 
    else 
        command git "$@"; 
    fi 
}' >> ~/.bashrc

echo 'alias git-tub="/mnt/c/Windows/explorer.exe  https://gittub-gp6m.vercel.app/ || open https://gittub-gp6m.vercel.app/ || start https://gittub-gp6m.vercel.app/"' >> ~/.bashrc

source ~/.bashrc
echo "Setup complete! Now you can type 'git tub' to open the website."
# source ./git-tub.sh