export type DiscordFluxDispatcher = {
    dispatch: (event: DiscordEvent) => void;
    subscribe(eventName: string, cb: (event: DiscordEvent) => void): void;
    unsubscribe(eventName: string, cb: (event: DiscordEvent) => void): void;
};

export type DiscordEventType = "CHANNEL_SELECT";
export type DiscordEvent = {
    type: DiscordEventType;
    guildId: string;
    channelId: string;
};
