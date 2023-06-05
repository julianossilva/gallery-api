
export DEBIAN_FRONTEND=noninteractive
apt-get install -y ninja-build gettext cmake make unzip curl

cd ~
git clone https://github.com/neovim/neovim.git

cd neovim
git checkout v0.9.1

make CMAKE_BUILD_TYPE=RelWithDebInfo
make install

