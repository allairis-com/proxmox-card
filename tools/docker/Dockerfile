# docker build -t asdf-devcontainer . --build-arg dev-ubuntu

ARG VARIANT="bookworm"
FROM mcr.microsoft.com/devcontainers/base:${VARIANT}

# needs to be declared *after* FROM to be available in shell scripts
ARG ASDF_BRANCH=v0.18.0
ARG ARCH_TYPE

# adding a bunch of packages to avoid warnings and build errors over the main languages I use with asdf
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    gnupg \
    autoconf \
    build-essential \
    libpng-dev \
    libssh-dev \
    automake \
    libzip-dev \
    libgd-dev \
    dirmngr \
    gpg \
    curl \
     traceroute \
    gawk

USER 1000:1000
WORKDIR $HOME

ENV asdfFile="asdf-${ASDF_BRANCH}-linux-${ARCH_TYPE}.tar.gz"
ENV url="https://github.com/asdf-vm/asdf/releases/download/${ASDF_BRANCH}/${asdfFile}"

RUN sudo wget $(echo ${url}) && sudo tar -xvzf $(echo ${asdfFile})  -C /usr/local/bin

# # including the asdf source in sh + bash profiles make it easier to run boostrap scripts
# # which expect `asdf` to be available
# RUN echo "\n. $HOME/.asdf/asdf.sh\n" | tee -a ~/.bashrc ~/.profile ~/.zshrccd