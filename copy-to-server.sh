#!/bin/sh
ssh-add --apple-load-keychain
#---------------------------------------------------
DOMAIN="tibtus.github.io"
SERVER="-p 2200 root@"$DOMAIN" -q"
SERVER2="root@"$DOMAIN
SCPPORT="-P 2200"


date
git pull
echo "Backend update "$(npm version patch -git-tag-version false)
date
#git show --stat --oneline HEAD
git commit -a -m "$(git log -1 --pretty=%B)"

git push

#npm run-script build
#
#ssh $SERVER 'mkdir ~/projects/'
#ssh $SERVER 'mkdir ~/projects/project-dashboard/'
#ssh $SERVER 'mkdir ~/projects/project-dashboard//build/'
#scp $SCPPORT -r ./build/* $SERVER2:~/projects/project-dashboard//build/
#scp $SCPPORT -r ./ecosystem.config.js $SERVER2:~/projects/project-dashboard//
#scp $SCPPORT -r ./public/* $SERVER2:~/projects/project-dashboard//public/
#scp $SCPPORT -r ./src/* $SERVER2:~/projects/project-dashboard//src/
#scp $SCPPORT ./*.json $SERVER2:~/projects/project-dashboard/
#scp $SCPPORT ./*.js $SERVER2:~/projects/project-dashboard/
#scp $SCPPORT ./.babelrc $SERVER2:~/projects/project-dashboard/
#scp $SCPPORT ./.eslintignore $SERVER2:~/projects/project-dashboard/
#ssh $SERVER 'cd /root/projects/project-dashboard/ && pm2 restart ecosystem.config.js'

IP=$(ifconfig en1 | grep 'inet ' | cut -d' ' -f2 | awk '{ print $1}')
echo $IP
date