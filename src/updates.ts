import { GITHUB_SOURCE, LOG_PREFIX, PLUGIN_FILE_NAME } from "./constants";
import { LogLevel } from "./types";
import { getRuntimeRequire } from "./utils";

export class UpdateManager {
    private readonly _localPluginFilePath: string;
    private _remotePlugin?: string;
    private _closeUpdateNotice?: () => void;
    private _fs: any;

    constructor(private _log: (message: string, type?: LogLevel) => void) {
        const path = getRuntimeRequire("path");

        this._fs = getRuntimeRequire("fs");
        this._localPluginFilePath = path.join(BdApi.Plugins.folder, PLUGIN_FILE_NAME);
    }

    async ask() {
        const shouldUpdate = await this.check();

        if (shouldUpdate) {
            this._showUpdateNotice();
        }
    }

    async check(): Promise<boolean> {
        const [remotePlugin, localPlugin] = await Promise.all([this._getRemotePlugin(), this._getLocalPlugin()]);

        return remotePlugin !== localPlugin;
    }

    async update() {
        try {
            await new Promise<void>((resolve, reject) => {
                if (!this._remotePlugin) {
                    reject(new Error("No remote plugin found"));
                    return;
                }
                this._fs.writeFile(this._localPluginFilePath, this._remotePlugin, (error: Error) => (error ? reject(error) : resolve()));
            });

            this.cancel();
            this._log("Updated successfully", "success");
        } catch (error) {
            this._log("Failed to update plugin", "error");
            throw error;
        }
    }

    cancel() {
        if (this._closeUpdateNotice) {
            this._closeUpdateNotice();
            this._closeUpdateNotice = undefined;
        }
    }

    private async _getLocalPlugin(): Promise<string> {
        try {
            const currentPluginBuffer = await new Promise<Buffer<ArrayBufferLike>>((resolve, reject) => {
                this._fs.readFile(this._localPluginFilePath, "utf8", (error: Error, data: Buffer<ArrayBufferLike>) =>
                    error ? reject(error) : resolve(data)
                );
            });

            return currentPluginBuffer.toString();
        } catch (error) {
            this._log("Failed to read current plugin", "error");
            throw error;
        }
    }

    private async _getRemotePlugin(): Promise<string> {
        try {
            const response = await fetch(GITHUB_SOURCE);

            if (!response.ok) {
                throw new Error("Failed to fetch remote plugin");
            }
            const data = await response.text();

            this._remotePlugin = data;
            return data;
        } catch (error) {
            this._log("Failed to fetch remote plugin", "error");
            throw error;
        }
    }

    private _showUpdateNotice() {
        this._closeUpdateNotice = BdApi.UI.showNotice(`${LOG_PREFIX} New version available`, {
            type: "info",
            buttons: [
                {
                    label: "Update",
                    onClick: () => this.update()
                }
            ]
        });
    }
}
