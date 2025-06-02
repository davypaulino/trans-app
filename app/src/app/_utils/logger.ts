type LogLevel = "info" | "warn" | "error" | "debug";

class Logger {
    private log(level: LogLevel, message: string, meta?: Record<string, any>) {
        const logEntry = {
            level,
            message,
            timestamp: new Date().toISOString(),
            ...(meta && { meta }),
        };
        
        console.log(JSON.stringify(logEntry, null, 2));
    }

    info(message: string, meta?: Record<string, any>) {
        this.log("info", message, meta);
    }

    warn(message: string, meta?: Record<string, any>) {
        this.log("warn", message, meta);
    }

    error(message: string, meta?: Record<string, any>) {
        this.log("error", message, meta);
    }

    debug(message: string, meta?: Record<string, any>) {
        this.log("debug", message, meta);
    }
}

export const logger = new Logger();

