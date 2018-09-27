#!/bin/bash
docker build -t tomascaraccia/minesweeper .
docker push tomascaraccia/minesweeper

ssh deploy@$DEPLOY_SERVER << EOF
docker pull tomascaraccia/minesweeper
docker stop minesweeper || true
docker rm minesweeper || true
docker rmi tomascaraccia/minesweeper:current || true
docker tag tomascaraccia/minesweeper:latest tomascaraccia/minesweeper:current
docker run -d --restart always --name minesweeper -p 3000:3000 tomascaraccia/minesweeper:current
EOF
