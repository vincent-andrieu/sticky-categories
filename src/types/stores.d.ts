import { DiscordChannelType } from "src/constants";
import {
    DiscordChannel,
    DiscordChannelMessages,
    DiscordEmoji,
    DiscordGuild,
    DiscordGuildMember,
    DiscordMessage,
    DiscordRole,
    DiscordUser
} from "./discord";

export type UserStore = {
    getUser: (userId: string) => DiscordUser;
    getCurrentUser: () => DiscordUser;
};

export type ChannelStore = {
    addChangeListener: (listener: Function) => void;
    addConditionalChangeListener: (listener: Function) => void;
    addReactChangeListener: (listener: Function) => void;
    getChannel: (channelId: string) => DiscordChannel;
    getMutableGuildChannelsForGuild: (guildId: string) => { [key: string]: DiscordChannel };
    removeChangeListener: (listener: Function) => void;
    removeReactChangeListener: (listener: Function) => void;
    getAllThreadsForParent: (parentId: string) => DiscordChannel[];
    getBasicChannel: (channelId: string) => DiscordChannel;
    getChannelIds: (guildId: string) => string[];
    getDMChannelFromUserId: (userId: string) => DiscordChannel;
    getDMFromUserId: (userId: string) => DiscordChannel;
    getDMUserIds: () => string[];
    getDebugInfo: () => any;
    getGuildChannelsVersion: (guildId: string) => number;
    getInitialOverlayState: () => any;
    getMutableBasicGuildChannelsForGuild: (guildId: string) => { [key: string]: DiscordChannel };
    getMutableDMsByUserIds: () => { [key: string]: DiscordChannel };
    getMutablePrivateChannels: () => { [key: string]: DiscordChannel };
    getPrivateChannelsVersion: () => number;
    getSortedPrivateChannels: () => DiscordChannel[];
    hasChannel: (channelId: string) => boolean;
    initialize: () => void;
    loadAllGuildAndPrivateChannelsFromDisk: () => Promise<void>;
};

export type SelectedChannelStore = {
    getChannelId(): string;
    getVoiceChannelId(): string;
    getMostRecentSelectedTextChannelId(): string;
    getCurrentlySelectedChannelId(): string | undefined;
    getLastSelectedChannelId(): string;
    getLastSelectedChannels(): string[];
    getLastChannelFollowingDestination(): string;
};

export type ChannelReadState = {
    ackMessageIdAtChannelSelect: string;
    ackPinTimestamp: number;
    ackedWhileCached: boolean | undefined;
    channelId: string;
    estimated: boolean;
    flags: number;
    isManualAck: boolean;
    lastPinTimestamp: number;
    lastViewed: number;
    loadedMessages: boolean;
    oldestUnreadMessageIdStale: boolean;
    outgoingAck: any;
    outgoingAckTimer: any;
    snapshot: {
        unread: boolean;
        mentionCount: number;
        guildUnread: boolean;
        guildMentionCount: number;
        takenAt: number;
    };
    type: number;
    _ackMessageId: string;
    _ackMessageTimestamp: number;
    _guildId: string;
    _isActiveThread: boolean;
    _isJoinedThread: boolean;
    _isResourceChannel: boolean;
    _isThread: boolean;
    _lastMessageId: string;
    _lastMessageTimestamp: number;
    _mentionCount: number;
    _oldestUnreadMessageId: string | null;
    _persisted: boolean;
    _unreadCount: number;
    ack(options: {
        messageId?: string;
        local?: boolean;
        immediate?: boolean;
        force?: boolean;
        isExplicitUserAction?: boolean;
        location?: { section: string };
        trackAnalytics?: boolean;
    }): boolean;
    ackPins(timestamp?: number | null): boolean;
    canBeUnread(): boolean;
    canHaveMentions(): boolean;
    canTrackUnreads(): boolean;
    clearOutgoingAck(): void;
    delete(): void;
    deserializeForOverlay(data: any): any;
    getAckTimestamp(): number;
    getGuildChannelUnreadState(guildId: string, channelId: string, mentioned: boolean, unread: boolean, muted: boolean): any;
    getMentionCount(): number;
    guessAckMessageId(): string | null;
    handleGuildEventRemoval(guildId: string, eventId: string): void;
    hasMentions(): boolean;
    hasRecentlyVisitedAndRead(): boolean;
    hasUnread(): boolean;
    hasUnreadOrMentions(): boolean;
    incrementGuildUnreadsSentinel(): void;
    isForumPostUnread(): boolean;
    isPrivate(): boolean;
    rebuildChannelState(messageId?: string, resetMentions?: boolean, options?: any): void;
    recalculateFlags(): number;
    recordLastViewedTime(): void;
    serialize(includeMessages?: boolean): any;
    shouldDeleteReadState(channelId: string): boolean;
    syncThreadSettings(): void;
    takeSnapshot(): any;
    _ack(messageId: string, options: any): void;
    _nonChannelAck(): void;
    _shouldAck(force: boolean, local: boolean, explicitAction: boolean): boolean;
    ackMessageId: string;
    guildId: string;
    isMentionLowImportance: boolean;
    lastMessageId: string;
    lastMessageTimestamp: number;
    mentionCount: number;
    oldestUnreadMessageId: string | null;
    oldestUnreadTimestamp: number;
    unreadCount: number;
};

export type ReadStateStore = {
    getReadStatesByChannel(): Record<string, ChannelReadState>;
};

export type MessageStore = {
    getMessages(channelId: string): DiscordChannelMessages;
    getMessage(channelId: string, messageId: string): DiscordMessage | undefined;
};

export type GuildChannelStore = {
    getAllGuilds: () => any;
    getChannels: (guildId: string) => Record<
        DiscordChannelType | "SELECTABLE" | "VOCAL",
        Array<{
            channel: DiscordChannel;
            comparator: number;
        }>
    > & {
        count: number;
        id: string;
    };
    getDefaultChannel: (guildId: string, useCache?: boolean, permission?: any) => any;
    getDirectoryChannelIds: (guildId: string) => string[];
    getFirstChannel: (guildId: string, filter: Function) => any;
    getFirstChannelOfType: (guildId: string, type: number, permission: any) => any;
    getSFWDefaultChannel: (guildId: string, useCache?: boolean, permission?: any) => any;
    getSelectableChannelIds: (guildId: string) => string[];
    getSelectableChannels: (guildId: string) => any[];
    getTextChannelNameDisambiguations: (guildId: string) => any;
    getVocalChannelIds: (guildId: string) => string[];
    hasCategories: (guildId: string) => boolean;
    hasChannels: (guildId: string) => boolean;
    hasElevatedPermissions: (guildId: string) => boolean;
    hasSelectableChannel: (guildId: string, filter: Function) => boolean;
};

export type GuildStore = {
    getGuild(guildId: string): DiscordGuild;
    getRole(guildId: string, roleId: string): DiscordRole;
};

export type SelectedGuildStore = {
    getGuildId(): string;
};

export type GuildMemberStore = {
    getMember(guildId: string, userId: string): DiscordGuildMember | undefined;
};

export type EmojiStore = {
    getCustomEmojiById(emojiId: string): DiscordEmoji | undefined;
};
