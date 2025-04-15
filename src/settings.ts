import { SettingConfigElement } from "./types";

const name = "StickyCategories";

export const SETTING_CHECK_UPDATES = "checkUpdates";

export function getConfig(): {
    name: string;
    settings: Array<SettingConfigElement>;
} {
    return {
        name,
        settings: [
            {
                type: "switch",
                id: SETTING_CHECK_UPDATES,
                name: "Check for updates",
                note: "Check for updates on plugin startup",
                value: BdApi.Data.load(name, SETTING_CHECK_UPDATES) ?? true,
                defaultValue: true
            }
        ]
    };
}

export function getSetting<T>(id: string, settingsList: Array<SettingConfigElement> = getConfig().settings): Readonly<T | undefined> {
    for (const setting of settingsList) {
        if (setting.type === "category") {
            const result = getSetting<T>(id, setting.settings);

            if (result !== undefined) {
                return result;
            }
        } else if (setting.id === id) {
            return setting.value as T;
        }
    }
    return undefined;
}
