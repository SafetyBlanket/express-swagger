import Logger from '@shared/services/Logger';
import app from './server';
import chalk from 'chalk';

const port = Number(process.env.PORT || 3000);
app.listen(port, _ => {
    Logger.info(chalk.black.bgYellow(`
    **************************************************    
        Express Boilerplate - Information                 
        Node environment: ${process.env.NODE_ENV}                     
        Express server listening on port: ${port}            
    **************************************************    
`));
});
