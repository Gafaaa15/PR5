const { Bot } = require('grammy');


const bot = new Bot('8219605169:AAEQBc3Pg0si_JBy2w3xD4-p2HSKphK0pFQ');


bot.command('start', async (ctx) => {
.)
    const userName = ctx.from && ctx.from.first_name ? ctx.from.first_name : 'Пользователь';
    
    const welcomeMessage = 
        'Привет, ' + userName + '! 👋\n\n' +
        'Я - бот для практической работы по Node.js.\n' +
        'Мои возможности:\n' +
        '• Переворачиваю текст\n' +
        '• Показываю справку по командам\n\n' +
        'Просто отправь мне любой текст!';
    
    await ctx.reply(welcomeMessage);
    console.log('Бот запущен пользователем: ' + userName);
});


bot.command('help', async (ctx) => {
    const helpText = 
        'Доступные команды:\n' +
        '/start : Начало работы с ботом\n' +
        '/help : Список всех команд\n\n' +
        'Просто отправьте любой текст, и бот перевернет его!';
    
    await ctx.reply(helpText);
    console.log('Отправлена справка по командам');
});


function reverseText(text) {
    return text.split('').reverse().join('');
}


bot.on('message:text', async (ctx) => {
    const userText = ctx.message.text;
    

    console.log('Получено сообщение: "' + userText + '" от ' + ctx.from.id);
    

    if (userText.startsWith('/')) {
        const command = userText.split(' ')[0];
   
        if (command !== '/start' && command !== '/help') {
            await ctx.reply('Неизвестная команда. Используйте /help для списка доступных команд');
            console.log('Неизвестная команда: ' + command);
        }
        return;
    }
    
    if (userText.trim() === '') {
        await ctx.reply('Пожалуйста, введите текст');
        console.log('Получено пустое сообщение');
        return;
    }
    
    try {
       
        const reversedText = reverseText(userText);
        await ctx.reply(reversedText);
        console.log('Отправлен перевернутый текст: "' + reversedText + '"');
    } catch (error) {
      
        console.error('Ошибка при отправке сообщения:', error);
        await ctx.reply('Произошла ошибка при обработке сообщения');
    }
});

bot.catch((err) => {
    console.error('Ошибка в работе бота:', err);
});


console.log('🚀 Запускаю Telegram-бота...');
bot.start()
    .then(() => {
        console.log('✅ Бот успешно запущен и готов к работе!');
        console.log('📱 Откройте Telegram и найдите своего бота');
    })
    .catch((error) => {
        console.error('❌ Ошибка при запуске бота:', error);
    });