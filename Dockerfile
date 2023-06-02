FROM ubuntu:22.04

USER root

RUN export DEBIAN_FRONTEND=noninteractive
RUN apt-get update 
RUN apt-get -y install --no-install-recommends \
    git \
    curl \
    tmux \
    neovim \
    ca-certificates 

ARG USERNAME=developer
ARG GROUP=developer
ARG UID=1000
ARG GID=1000
RUN groupadd -g ${GID} ${GROUP}
RUN useradd -u ${UID} -g ${GROUP} -s /bin/sh -m ${USERNAME} 

RUN curl -O https://nodejs.org/dist/v18.16.0/node-v18.16.0-linux-x64.tar.gz
RUN tar -xf node-v18.16.0-linux-x64.tar.gz
RUN mv node-v18.16.0-linux-x64 /opt/node
RUN ln -s /opt/node/bin/node /usr/local/bin/node
RUN ln -s /opt/node/bin/npx /usr/local/bin/npx
RUN ln -s /opt/node/bin/npm /usr/local/bin/npm
RUN ln -s /opt/node/bin/corepack /usr/local/bin/corepack

USER ${UID}:${GID}

RUN echo "set-option -g default-shell /bin/bash" >> ~/.tmux.conf

WORKDIR /home/${USERNAME}/.config 

RUN git clone https://github.com/julianossilva/nvim.git

RUN sh ./nvim/install_ext.sh

WORKDIR /home/${USERNAME}/app 
