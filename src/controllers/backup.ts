import { Request, Response } from 'express'
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const backupCtrl = async (_: Request, res: Response): Promise<void> => {
    const BACKUP_URI = process.env.BACKUP_URI as string;
    const USER = process.env.USER as string;
    const PASS = process.env.PASS as string;
    const backupPath = path.join(__dirname, '../../backups'); // Ruta absoluta a la carpeta backups

    console.log(BACKUP_URI, USER, PASS)

    // Verificar si la carpeta de backups existe, si no, crearla
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
    }

    exec(`mongodump --uri="${BACKUP_URI}" --out=${backupPath} --username="${USER}" --password="${PASS}"`, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error generando el backup');
        }

        // Filtrar mensajes de stderr que no son errores reales
        if (stderr && stderr.toLowerCase().includes('error')) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error generando el backup');
        }

        console.log(`stdout: ${stdout}`);
        console.warn(`stderr: ${stderr}`); // Mostrar stderr si no contiene "error"
        return res.send('Backup generado exitosamente');
    });
};

const restoreCtrl = async (_: Request, res: Response): Promise<void> => {
    const BACKUP_URI = process.env.BACKUP_URI as string;
    const USER = process.env.USER as string;
    const PASS = process.env.PASS as string;
    const backupPath = path.join(__dirname, '../../backups/test'); // Ruta absoluta a la carpeta donde están los backups

    console.log(BACKUP_URI, USER, PASS)

    // Verificar si el directorio de backups existe
    if (!fs.existsSync(backupPath)) {
        res.status(404).send('No se encontró el directorio de backups');
        return
    }

    exec(`mongorestore --uri="${BACKUP_URI}" --username="${USER}" --password="${PASS}" --drop --nsInclude=test.* ${backupPath}`, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send('Error restaurando el backup');
        }

        // Filtrar mensajes de stderr que no son errores reales
        if (stderr && stderr.toLowerCase().includes('error')) {
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error restaurando el backup');
        }

        console.log(`stdout: ${stdout}`);
        console.warn(`stderr: ${stderr}`); // Mostrar stderr si no contiene "error"
        return res.send('Backup restaurado exitosamente');
    });
};

export { backupCtrl, restoreCtrl }
