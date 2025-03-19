import { DiscordChannelType, DiscordMessageFlags, DiscordMessageState, DiscordMessageType } from "src/constants";

export type DiscordFluxDispatcher = {
    dispatch: (event: DiscordEvent) => void;
    subscribe(eventName: string, cb: (event: DiscordEvent) => void): void;
    unsubscribe(eventName: string, cb: (event: DiscordEvent) => void): void;
};

export type DiscordEventType = "CHANNEL_SELECT" | "MESSAGE_CREATE" | "MESSAGE_UPDATE" | "MESSAGE_DELETE" | "LOAD_MESSAGES_SUCCESS" | "MESSAGE_ACK";
export type DiscordEvent = {
    type: DiscordEventType;
    guildId: string;
    channelId: string;
};
export type DiscordEventCreateMessage = DiscordEvent & {
    type: "MESSAGE_CREATE";
    message: DiscordMessage;
};
export type DiscordEventUpdateMessage = DiscordEvent & {
    type: "MESSAGE_UPDATE";
    message: DiscordMessage;
};

export type DiscordGuild = {
    afkChannelId: string | null;
    afkTimeout: number;
    application_id: string | null;
    banner: string | null;
    defaultMessageNotifications: number;
    description: string | null;
    discoverySplash: string | null;
    explicitContentFilter: number;
    features: Set<string>;
    homeHeader: string | null;
    hubType: string | null;
    icon: string | null;
    id: string;
    joinedAt: Date;
    latestOnboardingQuestionId: string | null;
    maxMembers: number;
    maxStageVideoChannelUsers: number;
    maxVideoChannelUsers: number;
    mfaLevel: number;
    name: string;
    nsfwLevel: number;
    ownerId: string;
    preferredLocale: string;
    premiumProgressBarEnabled: boolean;
    premiumSubscriberCount: number;
    premiumTier: number;
    profile: null;
    publicUpdatesChannelId: string | null;
    rulesChannelId: string | null;
    safetyAlertsChannelId: string | null;
    splash: string | null;
    systemChannelFlags: number;
    systemChannelId: string | null;
    vanityURLCode: string | null;
    verificationLevel: number;
    acronym: string;
    canHaveRaidActivityAlerts: () => boolean;
    getApplicationId: () => string | null;
    getEveryoneRoleId: () => string;
    getIconSource: (size: number, animated?: boolean) => string;
    getIconURL: (size: number) => string;
    getMaxEmojiSlots: () => number;
    getMaxRoleSubscriptionEmojiSlots: () => number;
    getMaxSoundboardSlots: () => number;
    getSafetyAlertsChannelId: () => string | null;
    hasCommunityInfoSubheader: () => boolean;
    hasFeature: (feature: string) => boolean;
    hasVerificationGate: () => boolean;
    isCommunity: () => boolean;
    isLurker: () => boolean;
    isNew: () => boolean;
    isOwner: (userId: string) => boolean;
    isOwnerWithRequiredMfaLevel: (userId: string) => boolean;
    merge: (data: any) => void;
    toString: () => string;
    updateJoinedAt: (timestamp: Date) => void;
};

export type DiscordChannel = {
    application_id: string | undefined;
    defaultAutoArchiveDuration: number | undefined;
    defaultThreadRateLimitPerUser: number | undefined;
    flags_: number;
    guild_id: string;
    hdStreamingBuyerId: string | undefined;
    hdStreamingUntil: Date | undefined;
    iconEmoji: { id: string | null; name: string };
    id: string;
    lastMessageId: string | null;
    lastPinTimestamp: string | null;
    linkedLobby: any | undefined;
    memberListId: string | undefined;
    name: string;
    nsfw_: boolean;
    parent_id: string | null;
    permissionOverwrites_: { [key: string]: { id: string; type: number; allow: bigint; deny: bigint } };
    position_: number;
    rateLimitPerUser_: number;
    themeColor: string | null;
    topic_: string | null;
    type: DiscordChannelType;
    version: number | undefined;
    accessPermissions: bigint;
    bitrate: number;
    flags: number;
    isHDStreamSplashed: boolean;
    nsfw: boolean;
    permissionOverwrites: { [key: string]: { id: string; type: number; allow: bigint; deny: bigint } };
    position: number;
    rateLimitPerUser: number;
    topic: string;
    userLimit: number;
};

export type DiscordChannelMessages = {
    cached: boolean;
    channelId: string;
    error: boolean;
    focusTargetId: string | undefined;
    hasFetched: boolean;
    hasMoreAfter: boolean;
    hasMoreBefore: boolean;
    jumpFlash: boolean;
    jumpReturnTargetId: string | null;
    jumpSequenceId: number;
    jumpTargetId: string | null;
    jumpTargetOffset: number;
    jumpType: string;
    jumped: boolean;
    jumpedToPresent: boolean;
    loadingMore: boolean;
    ready: boolean;
    revealedMessageId: string | null;
    _after: Array<DiscordMessage>;
    _array: Array<DiscordMessage>;
    _before: Array<DiscordMessage>;
    _map: { [key: string]: DiscordMessage };
    length: number;
    addCachedMessages: (messages: DiscordMessage[], options: any) => void;
    constructor: Function;
    filter: (callback: (message: DiscordMessage, index?: number) => boolean) => Array<DiscordMessage>;
    findNewest: (criteria: any) => DiscordMessage;
    findOldest: (criteria: any) => DiscordMessage;
    first: () => DiscordMessage;
    focusOnMessage: (messageId: string) => void;
    forAll: (callback: (message: DiscordMessage, index: number) => void, context: any) => void;
    forEach: (callback: (message: DiscordMessage, index: number) => void, context: any) => void;
    get: (messageId: string) => DiscordMessage;
    getAfter: (messageId: string) => DiscordMessage;
    getByIndex: (index: number) => DiscordMessage;
    getManyAfter: (messageId: string, limit: number, options: any) => Array<DiscordMessage>;
    getManyBefore: (messageId: string, limit: number, options: any) => Array<DiscordMessage>;
    has: (messageId: string) => boolean;
    hasAfterCached: (messageId: string) => boolean;
    hasBeforeCached: (messageId: string) => boolean;
    hasPresent: () => boolean;
    indexOf: (message: DiscordMessage) => number;
    jumpToMessage: (messageId: string, animated?: boolean, offset?: number, sequenceId?: number, options?: any) => void;
    jumpToPresent: (options: any) => void;
    last: () => DiscordMessage;
    loadComplete: (data: any) => void;
    loadFromCache: (cache: any, options: any) => void;
    loadStart: (options: any) => void;
    map: (callback: (message: DiscordMessage, index: number) => any, context: any) => any[];
    merge: (messages: DiscordMessage[], replace?: boolean, options?: any) => void;
    mergeDelta: (added?: DiscordMessage[], removed?: DiscordMessage[], updated?: DiscordMessage[]) => void;
    mutate: (mutator: (messages: DiscordMessage[]) => void) => void;
    receiveMessage: (message: DiscordMessage) => void;
    receivePushNotification: (notification: any) => void;
    receiveReactionInAppNotification: (notification: any) => void;
    reduce: (reducer: (accumulator: any, message: DiscordMessage) => any, initialValue: any) => any;
    remove: (messageId: string) => void;
    removeMany: (messageIds: string[]) => void;
    replace: (messageId: string, newMessage: DiscordMessage) => void;
    reset: (options: any) => void;
    some: (predicate: (message: DiscordMessage, index?: number) => boolean, context?: any) => boolean;
    toArray: () => Array<DiscordMessage>;
    truncate: (limit: number, options: any) => void;
    truncateBottom: (limit: number, preserve?: boolean) => void;
    truncateTop: (limit: number, preserve?: boolean) => void;
    update: (messageId: string, newMessage: DiscordMessage) => void;
    _clearMessages: () => void;
    _merge: (messages: DiscordMessage[], replace?: boolean, options?: any) => void;
};

export type DiscordMessage = {
    activity?: null;
    activityInstance?: null;
    application?: null;
    applicationId?: null;
    attachments?: Array<DiscordMessageAttachment>;
    author: DiscordUser;
    blocked: boolean;
    bot: boolean;
    call?: null;
    changelogId?: null;
    channel_id: string;
    codedLinks?: any[]; // Replace 'any' with the appropriate type if known
    colorString?: string | undefined;
    components?: Array<{
        components: Array<DiscordMessageComponent>;
        id: string;
        type: number;
    }>;
    content: string;
    customRenderedContent?: any; // Replace 'any' with the appropriate type if known
    editedTimestamp?: string | null;
    embeds?: Array<DiscordMessageEmbed>;
    flags: DiscordMessageFlags;
    giftCodes?: any[]; // Replace 'any' with the appropriate type if known
    giftInfo?: any; // Replace 'any' with the appropriate type if known
    giftingPrompt?: null;
    id: string;
    ignored: boolean;
    interaction?: null;
    interactionData?: any; // Replace 'any' with the appropriate type if known
    interactionError?: any; // Replace 'any' with the appropriate type if known
    interactionMetadata?: any; // Replace 'any' with the appropriate type if known
    isSearchHit: boolean;
    isUnsupported: boolean;
    loggingName?: null;
    mentionChannels: any[]; // Replace 'any' with the appropriate type if known
    mentionEveryone: boolean;
    mentionRoles: any[]; // Replace 'any' with the appropriate type if known
    mentioned: boolean;
    mentions: any[]; // Replace 'any' with the appropriate type if known
    messageReference?: {
        guild_id: string;
        channel_id: string;
        message_id: string;
        type: number;
    };
    message_reference?: {
        guild_id: string;
        channel_id: string;
        message_id: string;
        type: number;
    };
    referenced_message?: DiscordMessage;
    messageSnapshots?: any[]; // Replace 'any' with the appropriate type if known
    nick?: string | undefined;
    nonce: string | null;
    pinned: boolean;
    poll?: any; // Replace 'any' with the appropriate type if known
    potions?: any; // Replace 'any' with the appropriate type if known
    purchaseNotification?: any; // Replace 'any' with the appropriate type if known
    reactions: any[]; // Replace 'any' with the appropriate type if known
    referralTrialOfferId?: null;
    roleSubscriptionData?: any; // Replace 'any' with the appropriate type if known
    soundboardSounds?: any; // Replace 'any' with the appropriate type if known
    state: DiscordMessageState;
    stickerItems?: any[]; // Replace 'any' with the appropriate type if known
    stickers?: any[]; // Replace 'any' with the appropriate type if known
    timestamp: Date | string;
    tts: boolean;
    type: DiscordMessageType;
    webhookId?: string | null;
    addReaction?: (emoji: string, animated?: boolean, users?: string[], options?: any, context?: any) => void;
    addReactionBatch?: (reactions: any, options: any) => void;
    canDeleteOwnMessage?: (options: any) => boolean;
    getChannelId?: () => string;
    getContentMessage?: () => string;
    getReaction?: (emoji: string) => any;
    hasPotions?: () => boolean;
    isCommandType?: () => boolean;
    isComponentsV2?: () => boolean;
    isEdited?: () => boolean;
    isFirstMessageInForumPost?: (options: any) => boolean;
    isInteractionPlaceholder?: () => boolean;
    isPoll?: () => boolean;
    isSystemDM?: () => boolean;
    removeReaction?: (emoji: string, animated?: boolean, users?: string[], options?: any) => void;
    removeReactionsForEmoji?: (emoji: string) => any;
    toJS?: () => any;
    userHasReactedWithEmoji?: (emoji: string, userId: string) => boolean;
};

export type DiscordMessageAttachment = {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    width: number;
    height: number;
    content_type: string;
    content_scan_version: number;
    duration_secs?: number;
    placeholder: string;
    placeholder_version: number;
    title?: string;
    spoiler: boolean;
    waveform?: string;
};

export type DiscordMessageEmbed = {
    author: {
        iconProxyURL?: string;
        iconURL?: string;
        name: string;
        url: string;
    };
    color: string;
    contentScanVersion: number;
    fields: Array<any>;
    flags?: number;
    id: string;
    image?: {
        flags: number;
        height: number;
        placeholder: string;
        placeholderVersion: number;
        proxyURL?: string;
        proxy_url?: string;
        srcIsAnimated: boolean;
        url: string;
        width: number;
    };
    provider?: {
        name: string;
        url: string;
    };
    rawDescription?: string;
    rawTitle?: string;
    referenceId?: string;
    thumbnail: {
        flags: number;
        height: number;
        placeholder: string;
        placeholderVersion: number;
        proxyURL?: string;
        proxy_url?: string;
        srcIsAnimated: boolean;
        url: string;
        width: number;
    };
    type: string;
    url: string;
    video?: {
        flags: number;
        height: number;
        placeholder?: string;
        placeholderVersion?: number;
        proxyURL?: string;
        proxy_url?: string;
        srcIsAnimated: boolean;
        url: string;
        width: number;
    };
};

export type DiscordMessageComponent = {
    customId?: string;
    disabled?: boolean;
    emoji?: unknown;
    id: string;
    label: string;
    skuId?: string;
    style: number;
    type: number;
    url?: string;
};

export type DiscordUser = {
    avatar: string;
    avatarDecorationData: any; // Replace 'any' with the appropriate type if known
    banner: string | null;
    bot: boolean;
    collectibles: any; // Replace 'any' with the appropriate type if known
    desktop: boolean;
    discriminator: string;
    email: string | null;
    flags: number;
    globalName: string;
    guildMemberAvatars: { [key: string]: string };
    hasAnyStaffLevel: () => boolean;
    hasBouncedEmail: boolean;
    hasFlag: (flag: number) => boolean;
    id: string;
    isStaff: () => boolean;
    isStaffPersonal: () => boolean;
    mfaEnabled: boolean;
    mobile: boolean;
    nsfwAllowed: boolean | undefined;
    personalConnectionId: string | null;
    phone: string | null;
    premiumType: any; // Replace 'any' with the appropriate type if known
    premiumUsageFlags: number;
    primaryGuild: string | null;
    publicFlags: number;
    purchasedFlags: number;
    system: boolean;
    username: string;
    verified: boolean;
    avatarDecoration: any; // Replace 'any' with the appropriate type if known
    createdAt: Date;
    isProvisional: boolean;
    nameplate: any; // Replace 'any' with the appropriate type if known
    tag: any; // Replace 'any' with the appropriate type if known
    addGuildAvatarHash: (guildId: string, hash: string) => void;
    getAvatarSource: (size: number, animated?: boolean, options?: any) => any;
    getAvatarURL: (size: number, options: any) => string;
    hadPremiumSubscription: () => boolean;
    hasAvatarForGuild: (guildId: string) => boolean;
    hasFreePremium: () => boolean;
    hasHadPremium: () => boolean;
    hasHadSKU: (sku: string) => boolean;
    hasPremiumUsageFlag: (flag: number) => boolean;
    hasPurchasedFlag: (flag: number) => boolean;
    hasUrgentMessages: () => boolean;
    hasVerifiedEmailOrPhone: () => boolean;
    isClaimed: () => boolean;
    isClyde: () => boolean;
    isLocalBot: () => boolean;
    isNonUserBot: () => boolean;
    isPhoneVerified: () => boolean;
    isPomelo: () => boolean;
    isSystemUser: () => boolean;
    isVerifiedBot: () => boolean;
    removeGuildAvatarHash: (guildId: string) => void;
    toString: () => string;
    get avatarDecoration(): any; // Replace 'any' with the appropriate type if known
    set avatarDecoration(e: any); // Replace 'any' with the appropriate type if known
    get createdAt(): Date;
    get isProvisional(): boolean;
    get nameplate(): any; // Replace 'any' with the appropriate type if known
    get tag(): any; // Replace 'any' with the appropriate type if known
};

export type DiscordGuildMember = {
    avatar: string | null;
    avatarDecoration: any | null; // Replace 'any' with the appropriate type if known
    colorRoleId: string;
    colorString: string;
    communicationDisabledUntil: Date | null;
    flags: number;
    fullProfileLoadedTimestamp: Date | undefined;
    guildId: string;
    highestRoleId: string;
    hoistRoleId: string;
    iconRoleId: string | undefined;
    isPending: boolean;
    joinedAt: Date;
    nick: string | null;
    premiumSince: Date | null;
    roles: string[];
    unusualDMActivityUntil: Date | undefined;
    userId: string;
};

export type DiscordRole = {
    color: number;
    colorString: string;
    flags: number;
    hoist: boolean;
    icon: string | null;
    id: string;
    managed: boolean;
    mentionable: boolean;
    name: string;
    originalPosition: number;
    permissions: bigint;
    position: number;
    tags: unknown;
    unicodeEmoji: string | null;
};

export type DiscordEmoji = {
    allNamesString: string;
    animated: boolean;
    available: boolean;
    guildId: string;
    id: string;
    managed: boolean;
    name: string;
    require_colons: boolean;
    roles: string[];
    type: number;
};

export type MessageActions = {
    fetchMessages: (params: { channelId: string; limit: number; before?: string; after?: string }) => Promise<Array<DiscordMessage>>;
    receiveMessage: (channelId: string, message: DiscordMessage, _?: unknown, options?: { messageReference?: {
        guild_id: string;
        channel_id: string;
        message_id: string;
    } }) => void;
    jumpToMessage(params: { channelId: string, messageId: string, flash?: boolean = false, offset?: number, context?: unknown, extraProperties?: any = null, isPreload?: boolean, returnMessageId?: string, skipLocalFetch: boolean, jumpType?: number}): void;
};
