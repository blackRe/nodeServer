#!/bin/bash
echo 'shell脚本运行中'
ips='root@8.141.66.163'
pName='portalApi'
rootPath='/root/apiApp/project'

rm -rf 'nodeServer' ;

tar -xvf $pName.tar.gz -C $rootPath
#scp $pName.tar.gz $ips:$rootPath
