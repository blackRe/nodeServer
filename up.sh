#!/bin/bash
echo 'shell脚本运行中'
ips='root@8.141.66.163'
pName='nodeServer'
rootPath='/root/apiApp/project'
#linux环境下打包使用zip格式，否则容易出现包解压报错
echo '代码打包中'
zip -q -r $pName.zip '../'$pName
echo '拷贝代码中。。。'
scp $pName.zip $ips:$rootPath
echo '代码解压中。。。'
ssh $ips "cd $rootPath ; ls ; rm -rf 'nodeServer' ; unzip -o $pName.zip ; cd $rootPath/nodeServer ; "
echo '启动成功。。。。'
#tar -czvf $pName.tar.gz '../nodeServer';
# tar -xvf $pName.tar.gz -C $rootPath ;
#scp $pName.tar.gz $ips:$rootPath
#ssh $ips "cd $rootPath ; ls ; rm -rf 'nodeServer' ; tar -xvf $pName.tar.gz -C $rootPath ; cd $rootPath/nodeServer ;npm i request ;npm install; node server ;"