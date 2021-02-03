const {loggers,format,transports} = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
require('winston-daily-rotate-file');
//这个函数由上面的方法演化而来，这里返回的是一个对象:
function createLog(wenJianJiaName,logLevel,options) {
    let _default = {
        DailyRotateFileOptions:{
            filename: './logs/'+wenJianJiaName+'/'+wenJianJiaName+logLevel+'/'+wenJianJiaName+logLevel+'-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
        },
        timestampOptions:{
            format: 'YYYY-MM-DD HH:mm:ss'
        },
        ConsoleOptions:{},
        colorizeOptions:true,
        handleExceptionOptions: true,
        labelOptions:{ label: 'right meow!' }
    };
    _default = Object.assign(_default,options);
    const {DailyRotateFileOptions,timestampOptions,ConsoleOptions,colorizeOptions,handleExceptionOptions,labelOptions} = _default;
    return {
        colorize: colorizeOptions,
        handleExceptions:handleExceptionOptions,
        level:logLevel,
        format: combine(
            label(labelOptions),
            timestamp(timestampOptions),
            prettyPrint(),
            format.errors({ stack: true }), //加上这个就会自动加上stack
            format.json() //json化报错信息
        ),
        transports: [
            // Setup your shared transports here
            new transports.Console(ConsoleOptions),
            // new (winston.transports.Console)({ level: 'error' }), 这里可以定义打印什么水平的日志
            new (transports.DailyRotateFile)(DailyRotateFileOptions)
        ]
    }
}

loggers.add('testDebug', createLog('test','debug',{labelOptions:{label:'我是测试页面debug'}}));
loggers.add('testError', createLog('test','error',{labelOptions:{label:'我是测试页面error'}}));
loggers.add('uesrError', createLog('user','error',{labelOptions:{label:'我是测试页面error'}}));
loggers.add('userDebug', createLog('user','debug',{labelOptions:{label:'我是测试页面debug'}}));


const logdebug = loggers.get('testDebug');
const logerr = loggers.get('testError');

//这个方法的有点：一个文件将所有的配置都整理完毕，

try{
    var a = 1/adgfsdfg;
    console.log(a)
}catch (e) {
    logerr.error('参数1','参数2');
}
module.exports = createLog;