const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

/*
  1. Нам потрібно створити папку для логів, якщо її немає. Згадуємо що код в модулі (той який не експортується нікуди)
  виконується один раз при ініціалізації. І те що модулі підгружаються синхронно. Це значить, що отут зараз ми можемо
  перевірити і створити папку для логів СИНХРОННО (це той випадок, коли це ОК)
*/
const logFolderPath = path.join('.', 'logs');
fs.mkdirSync(logFolderPath, { recursive: true }); // флаг 'recursive' дозволяє не викидати помилку якщо папка вже є

/*
  2. тепер, коли папка у нас точно є (бо ми ж в синхронному режимі зараз!) - відкриваєм два файлстріма
*/
const infoLogStream = fs.createWriteStream(path.join(logFolderPath, 'info.log'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logFolderPath, 'errors.log'), { flags: 'a' });

/*
  4. Додаємо закриття стрімов при виході із програми
*/
process.on('beforeExit', () => {
    infoLogStream.end();
    errorLogStream.end();
});


function logger(moduleName) {
    const logLevel = process.env.LOG_LEVEL;
    const colorsEnabled = process.env.COLORS_ENABLED === '1';


    return {
        info: function (...message){
            // 3a. Ми пишемо в файли завжди, значить робимо це тут, без перевірки лог левела
            const fileMessage = `${new Date().toISOString()}: ${JSON.stringify(message)}\n`;
            infoLogStream.write(fileMessage);

            if (logLevel === 'info') {
                // працює тільки коли в process.env.LOG_LEVEL значення 'info'
                colorsEnabled ?  console.log (chalk.blue(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },

        warn: function (...message){
            // 3b. Ми пишемо в файли завжди, значить робимо це тут, без перевірки лог левела
            const fileMessage = `${new Date().toISOString()}: ${JSON.stringify(message)}\n`;
            errorLogStream.write(fileMessage);

            if (logLevel === 'warn' || logLevel === 'info' || logLevel === undefined) {
                // працює коли в process.env.LOG_LEVEL значення 'info', 'warn' або нічого
                colorsEnabled ?  console.log (chalk.yellow(moduleName), ...message) : console.log(moduleName, ...message);
            }
        },

        error: function (...message){
            // 3c. Ми пишемо в файли завжди, значить робимо це тут, без перевірки лог левела
            const fileMessage = `${new Date().toISOString()}: ${JSON.stringify(message)}\n`;
            errorLogStream.write(fileMessage);

            // працює завжди, по умовах задачі у нас немає випадків коли метод error() має бути відключений
            colorsEnabled ?  console.log (chalk.red(moduleName), ...message) : console.log(moduleName, ...message);
        }
    }
}
module.exports = logger;

