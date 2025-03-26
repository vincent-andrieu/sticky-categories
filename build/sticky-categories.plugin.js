/**
 * @name StickyCategories
 * @author gassastsina
 * @description Make categories sticky in the channel list.
 * @version 1.0.0
 * @authorId 292388871381975040
 * @source https://github.com/vincent-andrieu/sticky-categories
 * @updateUrl https://raw.githubusercontent.com/vincent-andrieu/sticky-categories/refs/heads/main/build/sticky-categories.plugin.js
 */
'use strict';

var DiscordChannelType;
(function (DiscordChannelType) {
    DiscordChannelType[DiscordChannelType["DM"] = 1] = "DM";
    DiscordChannelType[DiscordChannelType["GROUP_DM"] = 3] = "GROUP_DM";
    DiscordChannelType[DiscordChannelType["GUILD_TEXT"] = 0] = "GUILD_TEXT";
    DiscordChannelType[DiscordChannelType["GUILD_VOICE"] = 2] = "GUILD_VOICE";
    DiscordChannelType[DiscordChannelType["GUILD_CATEGORY"] = 4] = "GUILD_CATEGORY";
    DiscordChannelType[DiscordChannelType["GUILD_ANNOUNCEMENT"] = 5] = "GUILD_ANNOUNCEMENT";
    DiscordChannelType[DiscordChannelType["GUILD_STORE"] = 6] = "GUILD_STORE";
    DiscordChannelType[DiscordChannelType["ANNOUNCEMENT_THREAD"] = 10] = "ANNOUNCEMENT_THREAD";
    DiscordChannelType[DiscordChannelType["PUBLIC_THREAD"] = 11] = "PUBLIC_THREAD";
    DiscordChannelType[DiscordChannelType["PRIVATE_THREAD"] = 12] = "PRIVATE_THREAD";
    DiscordChannelType[DiscordChannelType["GUILD_STAGE_VOICE"] = 13] = "GUILD_STAGE_VOICE";
    DiscordChannelType[DiscordChannelType["GUILD_DIRECTORY"] = 14] = "GUILD_DIRECTORY";
    DiscordChannelType[DiscordChannelType["GUILD_FORUM"] = 15] = "GUILD_FORUM";
    DiscordChannelType[DiscordChannelType["GUILD_MEDIA"] = 16] = "GUILD_MEDIA";
    DiscordChannelType[DiscordChannelType["LOBBY"] = 17] = "LOBBY";
    DiscordChannelType[DiscordChannelType["DM_SDK"] = 18] = "DM_SDK";
    DiscordChannelType[DiscordChannelType["UNKNOWN"] = 10000] = "UNKNOWN";
})(DiscordChannelType || (DiscordChannelType = {}));
var DiscordMessageType;
(function (DiscordMessageType) {
    DiscordMessageType[DiscordMessageType["DEFAULT"] = 0] = "DEFAULT";
    DiscordMessageType[DiscordMessageType["RECIPIENT_ADD"] = 1] = "RECIPIENT_ADD";
    DiscordMessageType[DiscordMessageType["RECIPIENT_REMOVE"] = 2] = "RECIPIENT_REMOVE";
    DiscordMessageType[DiscordMessageType["CALL"] = 3] = "CALL";
    DiscordMessageType[DiscordMessageType["CHANNEL_NAME_CHANGE"] = 4] = "CHANNEL_NAME_CHANGE";
    DiscordMessageType[DiscordMessageType["CHANNEL_ICON_CHANGE"] = 5] = "CHANNEL_ICON_CHANGE";
    DiscordMessageType[DiscordMessageType["CHANNEL_PINNED_MESSAGE"] = 6] = "CHANNEL_PINNED_MESSAGE";
    DiscordMessageType[DiscordMessageType["USER_JOIN"] = 7] = "USER_JOIN";
    DiscordMessageType[DiscordMessageType["GUILD_BOOST"] = 8] = "GUILD_BOOST";
    DiscordMessageType[DiscordMessageType["GUILD_BOOST_TIER_1"] = 9] = "GUILD_BOOST_TIER_1";
    DiscordMessageType[DiscordMessageType["GUILD_BOOST_TIER_2"] = 10] = "GUILD_BOOST_TIER_2";
    DiscordMessageType[DiscordMessageType["GUILD_BOOST_TIER_3"] = 11] = "GUILD_BOOST_TIER_3";
    DiscordMessageType[DiscordMessageType["CHANNEL_FOLLOW_ADD"] = 12] = "CHANNEL_FOLLOW_ADD";
    DiscordMessageType[DiscordMessageType["GUILD_STREAM"] = 13] = "GUILD_STREAM";
    DiscordMessageType[DiscordMessageType["GUILD_DISCOVERY_DISQUALIFIED"] = 14] = "GUILD_DISCOVERY_DISQUALIFIED";
    DiscordMessageType[DiscordMessageType["GUILD_DISCOVERY_REQUALIFIED"] = 15] = "GUILD_DISCOVERY_REQUALIFIED";
    DiscordMessageType[DiscordMessageType["GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING"] = 16] = "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING";
    DiscordMessageType[DiscordMessageType["GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING"] = 17] = "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING";
    DiscordMessageType[DiscordMessageType["THREAD_CREATED"] = 18] = "THREAD_CREATED";
    DiscordMessageType[DiscordMessageType["REPLY"] = 19] = "REPLY";
    DiscordMessageType[DiscordMessageType["CHAT_INPUT_COMMAND"] = 20] = "CHAT_INPUT_COMMAND";
    DiscordMessageType[DiscordMessageType["THREAD_STARTER_MESSAGE"] = 21] = "THREAD_STARTER_MESSAGE";
    DiscordMessageType[DiscordMessageType["GUILD_INVITE_REMINDER"] = 22] = "GUILD_INVITE_REMINDER";
    DiscordMessageType[DiscordMessageType["CONTEXT_MENU_COMMAND"] = 23] = "CONTEXT_MENU_COMMAND";
    DiscordMessageType[DiscordMessageType["AUTO_MODERATION_ACTION"] = 24] = "AUTO_MODERATION_ACTION";
    DiscordMessageType[DiscordMessageType["ROLE_SUBSCRIPTION_PURCHASE"] = 25] = "ROLE_SUBSCRIPTION_PURCHASE";
    DiscordMessageType[DiscordMessageType["INTERACTION_PREMIUM_UPSELL"] = 26] = "INTERACTION_PREMIUM_UPSELL";
    DiscordMessageType[DiscordMessageType["STAGE_START"] = 27] = "STAGE_START";
    DiscordMessageType[DiscordMessageType["STAGE_END"] = 28] = "STAGE_END";
    DiscordMessageType[DiscordMessageType["STAGE_SPEAKER"] = 29] = "STAGE_SPEAKER";
    DiscordMessageType[DiscordMessageType["STAGE_RAISE_HAND"] = 30] = "STAGE_RAISE_HAND";
    DiscordMessageType[DiscordMessageType["STAGE_TOPIC"] = 31] = "STAGE_TOPIC";
    DiscordMessageType[DiscordMessageType["GUILD_APPLICATION_PREMIUM_SUBSCRIPTION"] = 32] = "GUILD_APPLICATION_PREMIUM_SUBSCRIPTION";
    DiscordMessageType[DiscordMessageType["PRIVATE_CHANNEL_INTEGRATION_ADDED"] = 33] = "PRIVATE_CHANNEL_INTEGRATION_ADDED";
    DiscordMessageType[DiscordMessageType["PRIVATE_CHANNEL_INTEGRATION_REMOVED"] = 34] = "PRIVATE_CHANNEL_INTEGRATION_REMOVED";
    DiscordMessageType[DiscordMessageType["PREMIUM_REFERRAL"] = 35] = "PREMIUM_REFERRAL";
    DiscordMessageType[DiscordMessageType["GUILD_INCIDENT_ALERT_MODE_ENABLED"] = 36] = "GUILD_INCIDENT_ALERT_MODE_ENABLED";
    DiscordMessageType[DiscordMessageType["GUILD_INCIDENT_ALERT_MODE_DISABLED"] = 37] = "GUILD_INCIDENT_ALERT_MODE_DISABLED";
    DiscordMessageType[DiscordMessageType["GUILD_INCIDENT_REPORT_RAID"] = 38] = "GUILD_INCIDENT_REPORT_RAID";
    DiscordMessageType[DiscordMessageType["GUILD_INCIDENT_REPORT_FALSE_ALARM"] = 39] = "GUILD_INCIDENT_REPORT_FALSE_ALARM";
    DiscordMessageType[DiscordMessageType["GUILD_DEADCHAT_REVIVE_PROMPT"] = 40] = "GUILD_DEADCHAT_REVIVE_PROMPT";
    DiscordMessageType[DiscordMessageType["CUSTOM_GIFT"] = 41] = "CUSTOM_GIFT";
    DiscordMessageType[DiscordMessageType["GUILD_GAMING_STATS_PROMPT"] = 42] = "GUILD_GAMING_STATS_PROMPT";
    DiscordMessageType[DiscordMessageType["PURCHASE_NOTIFICATION"] = 44] = "PURCHASE_NOTIFICATION";
    DiscordMessageType[DiscordMessageType["VOICE_HANGOUT_INVITE"] = 45] = "VOICE_HANGOUT_INVITE";
    DiscordMessageType[DiscordMessageType["POLL_RESULT"] = 46] = "POLL_RESULT";
    DiscordMessageType[DiscordMessageType["CHANGELOG"] = 47] = "CHANGELOG";
    DiscordMessageType[DiscordMessageType["NITRO_NOTIFICATION"] = 48] = "NITRO_NOTIFICATION";
    DiscordMessageType[DiscordMessageType["CHANNEL_LINKED_TO_LOBBY"] = 49] = "CHANNEL_LINKED_TO_LOBBY";
    DiscordMessageType[DiscordMessageType["GIFTING_PROMPT"] = 50] = "GIFTING_PROMPT";
    DiscordMessageType[DiscordMessageType["IN_GAME_MESSAGE_NUX"] = 51] = "IN_GAME_MESSAGE_NUX";
    DiscordMessageType[DiscordMessageType["GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION"] = 52] = "GUILD_JOIN_REQUEST_ACCEPT_NOTIFICATION";
    DiscordMessageType[DiscordMessageType["GUILD_JOIN_REQUEST_REJECT_NOTIFICATION"] = 53] = "GUILD_JOIN_REQUEST_REJECT_NOTIFICATION";
    DiscordMessageType[DiscordMessageType["GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION"] = 54] = "GUILD_JOIN_REQUEST_WITHDRAWN_NOTIFICATION";
    DiscordMessageType[DiscordMessageType["HD_STREAMING_UPGRADED"] = 55] = "HD_STREAMING_UPGRADED";
})(DiscordMessageType || (DiscordMessageType = {}));
var DiscordMessageFlags;
(function (DiscordMessageFlags) {
    DiscordMessageFlags[DiscordMessageFlags["DEFAULT"] = 0] = "DEFAULT";
    DiscordMessageFlags[DiscordMessageFlags["CROSSPOSTED"] = 1] = "CROSSPOSTED";
    DiscordMessageFlags[DiscordMessageFlags["IS_CROSSPOST"] = 2] = "IS_CROSSPOST";
    DiscordMessageFlags[DiscordMessageFlags["SUPPRESS_EMBEDS"] = 4] = "SUPPRESS_EMBEDS";
    DiscordMessageFlags[DiscordMessageFlags["SOURCE_MESSAGE_DELETED"] = 8] = "SOURCE_MESSAGE_DELETED";
    DiscordMessageFlags[DiscordMessageFlags["URGENT"] = 16] = "URGENT";
    DiscordMessageFlags[DiscordMessageFlags["HAS_THREAD"] = 32] = "HAS_THREAD";
    DiscordMessageFlags[DiscordMessageFlags["EPHEMERAL"] = 64] = "EPHEMERAL";
    DiscordMessageFlags[DiscordMessageFlags["LOADING"] = 128] = "LOADING";
    DiscordMessageFlags[DiscordMessageFlags["FAILED_TO_MENTION_SOME_ROLES_IN_THREAD"] = 256] = "FAILED_TO_MENTION_SOME_ROLES_IN_THREAD";
    DiscordMessageFlags[DiscordMessageFlags["GUILD_FEED_HIDDEN"] = 512] = "GUILD_FEED_HIDDEN";
    DiscordMessageFlags[DiscordMessageFlags["SHOULD_SHOW_LINK_NOT_DISCORD_WARNING"] = 1024] = "SHOULD_SHOW_LINK_NOT_DISCORD_WARNING";
    DiscordMessageFlags[DiscordMessageFlags["SUPPRESS_NOTIFICATIONS"] = 4096] = "SUPPRESS_NOTIFICATIONS";
    DiscordMessageFlags[DiscordMessageFlags["IS_VOICE_MESSAGE"] = 8192] = "IS_VOICE_MESSAGE";
    DiscordMessageFlags[DiscordMessageFlags["HAS_SNAPSHOT"] = 16384] = "HAS_SNAPSHOT";
    DiscordMessageFlags[DiscordMessageFlags["IS_COMPONENTS_V2"] = 32768] = "IS_COMPONENTS_V2";
    DiscordMessageFlags[DiscordMessageFlags["SENT_BY_SOCIAL_LAYER_INTEGRATION"] = 65536] = "SENT_BY_SOCIAL_LAYER_INTEGRATION";
})(DiscordMessageFlags || (DiscordMessageFlags = {}));
var DiscordMessageState;
(function (DiscordMessageState) {
    DiscordMessageState["SENT"] = "SENT";
    DiscordMessageState["SENDING"] = "SENDING";
    DiscordMessageState["SEND_FAILED"] = "SEND_FAILED";
})(DiscordMessageState || (DiscordMessageState = {}));
var DiscordMessageComponentStyle;
(function (DiscordMessageComponentStyle) {
    DiscordMessageComponentStyle[DiscordMessageComponentStyle["PRIMARY"] = 1] = "PRIMARY";
    DiscordMessageComponentStyle[DiscordMessageComponentStyle["SECONDARY"] = 2] = "SECONDARY";
    DiscordMessageComponentStyle[DiscordMessageComponentStyle["SUCCESS"] = 3] = "SUCCESS";
    DiscordMessageComponentStyle[DiscordMessageComponentStyle["DESTRUCTIVE"] = 4] = "DESTRUCTIVE";
    DiscordMessageComponentStyle[DiscordMessageComponentStyle["LINK"] = 5] = "LINK";
    DiscordMessageComponentStyle[DiscordMessageComponentStyle["PREMIUM"] = 6] = "PREMIUM";
})(DiscordMessageComponentStyle || (DiscordMessageComponentStyle = {}));
var DiscordComponentVisualState;
(function (DiscordComponentVisualState) {
    DiscordComponentVisualState[DiscordComponentVisualState["NORMAL"] = 0] = "NORMAL";
    DiscordComponentVisualState[DiscordComponentVisualState["LOADING"] = 1] = "LOADING";
    DiscordComponentVisualState[DiscordComponentVisualState["DISABLED"] = 2] = "DISABLED";
})(DiscordComponentVisualState || (DiscordComponentVisualState = {}));

const NAME = "StickyCategories";
const LOG_PREFIX = `[${NAME}]`;
const CONTAINER_ID = "channels";
const PARENT_SELECTOR = 'ul[class^="content_"]';
const CATEGORIES_SELECTOR = '[class*="containerDefault_"][draggable="true"]';
class StickyCategories {
    _guildChannelStore;
    _selectedGuildStore;
    _fluxDispatcher;
    observer = null;
    _onEventSubscriptionCb = this._onEvent.bind(this);
    _listeningEvents = ["CHANNEL_SELECT"];
    clickHandlers = new Map();
    start() {
        console.warn(LOG_PREFIX, "Started");
        this._guildChannelStore = BdApi.Webpack.getStore("GuildChannelStore");
        this._selectedGuildStore = BdApi.Webpack.getStore("SelectedGuildStore");
        this._fluxDispatcher = BdApi.Webpack.getByKeys("actionLogger");
        this._addCategoriesStyles();
        this._setupObserver();
        this._subscribeEvents();
        this._patchChannelsVirtualScroll();
    }
    stop() {
        BdApi.Patcher.unpatchAll(NAME);
        this._unsubscribeEvents();
        this._removeCategoriesStyle();
        console.warn(LOG_PREFIX, "Stopped");
    }
    _addCategoriesStyles(categories = document.querySelectorAll(CATEGORIES_SELECTOR)) {
        categories.forEach((category) => {
            category.style.setProperty("position", "sticky");
            category.style.setProperty("top", "0");
            category.style.setProperty("z-index", "10");
            category.style.setProperty("background-color", "var(--background-tertiary)");
            category.style.setProperty("box-shadow", "0 5px 8px -2px var(--background-tertiary)");
            this._addClickHandlers(category);
        });
        const scrollerContainer = document.getElementById(CONTAINER_ID);
        scrollerContainer?.addEventListener("scroll", (event) => this._onScroll(event, scrollerContainer));
    }
    _isCategorySticky(category) {
        return category.style.position === "sticky";
    }
    _onScroll(_event, container) {
        const unreadBarIcon = document.querySelector('[class*="unreadIcon_"]');
        if (unreadBarIcon) {
            container.style.setProperty("margin-top", "16px");
        }
        else if (container.style.marginTop) {
            container.style.removeProperty("margin-top");
        }
    }
    _onCategoryClick(_event, category) {
        // Remove the position temporarily to scroll to its original position without the sticky behavior
        const lastPosition = category.style.position;
        category.style.removeProperty("position");
        category.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
        category.style.setProperty("position", lastPosition);
    }
    _addClickHandlers(category) {
        if (this.clickHandlers.has(category))
            return;
        const clickHandler = (event) => {
            const target = event.target;
            // For clicks on the top padding area
            if (target === category || category.contains(target)) {
                // Calculate if click was in top padding
                const categoryRect = category.getBoundingClientRect();
                const paddingArea = 16; // Top padding of the category
                if (event.clientY < categoryRect.top + paddingArea) {
                    this._onCategoryClick(event, category);
                }
            }
        };
        // Store the handler so we can remove it later
        this.clickHandlers.set(category, clickHandler);
        // Add the event listener
        category.addEventListener("click", clickHandler, true);
    }
    // Virtual scroll handling
    _setupObserver() {
        // Find the specific container to observe
        const containerElement = document.querySelector(PARENT_SELECTOR);
        if (!containerElement) {
            return;
        }
        // Create a new mutation observer to watch for DOM changes
        this.observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
                    // When new nodes are added, check if any are categories
                    const newCategories = [];
                    mutation.addedNodes.forEach((node) => {
                        if (node instanceof HTMLElement) {
                            // Check if the node itself is a category
                            if (node.matches(CATEGORIES_SELECTOR)) {
                                newCategories.push(node);
                            }
                        }
                    });
                    if (newCategories.length > 0) {
                        this._addCategoriesStyles(newCategories);
                    }
                }
            }
        });
        // Start observing the specific container element with the configured parameters
        this.observer.observe(containerElement, {
            childList: true,
            subtree: true
        });
    }
    _patchChannelsVirtualScroll() {
        const moduleFilter = BdApi.Webpack.Filters.byStrings("sections", "getScrollerState", "getAnchorId");
        const module = BdApi.Webpack.getModule((module) => Object.values(module).some((subModule) => subModule.length === 1 && moduleFilter(subModule)));
        const key = module ? Object.keys(module).find((key) => moduleFilter(module[key])) : undefined;
        if (!key) {
            return console.error(LOG_PREFIX, "Failed to find the module");
        }
        BdApi.Patcher.after(NAME, module, key, (_, _args, returnValue) => {
            const items = returnValue.items;
            const guildId = this._selectedGuildStore?.getGuildId();
            if (!items.length || !guildId)
                return returnValue;
            const channels = this._guildChannelStore?.getChannels(guildId);
            const categories = channels?.[DiscordChannelType.GUILD_CATEGORY];
            let lastCategoryNotRendered = undefined;
            if (!categories) {
                return returnValue;
            }
            // categories[0] is the uncategorized category
            if (items[0]?.type !== "section" &&
                categories.length > 1 &&
                !items.some((item) => item.type === "section" && item.anchorId && item.anchorId === categories[1].channel.id)) {
                for (let i = 1; i < categories.length; i++) {
                    if (items.some((item) => item.type === "section" && item.anchorId && item.anchorId === categories[i].channel.id)) {
                        lastCategoryNotRendered = categories[i - 1]?.channel.id;
                        break;
                    }
                }
            }
            if (lastCategoryNotRendered) {
                const nextSection = items.find((item) => item.type === "section");
                items.unshift({
                    anchorId: lastCategoryNotRendered,
                    listIndex: 0,
                    offsetTop: 0,
                    section: nextSection ? nextSection.section - 1 : 5,
                    type: "section"
                });
            }
            return returnValue;
        });
    }
    // Destructors
    _removeCategoriesStyle() {
        this._teardownObserver();
        this._removeClickHandlers();
        const categories = document.querySelectorAll(CATEGORIES_SELECTOR);
        categories.forEach((category) => {
            category.style.removeProperty("position");
            category.style.removeProperty("top");
            category.style.removeProperty("z-index");
            category.style.removeProperty("background-color");
            category.style.removeProperty("box-shadow");
        });
        document.getElementById(CONTAINER_ID)?.style.removeProperty("margin-top");
    }
    _teardownObserver() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
    _removeClickHandlers() {
        this.clickHandlers.forEach((handler, category) => {
            if (category) {
                category.removeEventListener("click", handler, true);
            }
        });
        this.clickHandlers.clear();
    }
    // Events handling
    _subscribeEvents() {
        this._listeningEvents.forEach((event) => this._fluxDispatcher?.subscribe(event, this._onEventSubscriptionCb));
    }
    _unsubscribeEvents() {
        this._listeningEvents.forEach((event) => this._fluxDispatcher?.unsubscribe(event, this._onEventSubscriptionCb));
    }
    async _onEvent(event) {
        switch (event.type) {
            case "CHANNEL_SELECT":
                this._removeCategoriesStyle();
                const retry = 40; // 4 seconds
                for (let i = 0; i < retry; i++) {
                    this._onChannelSelect();
                    await new Promise((resolve) => setTimeout(resolve, 100));
                    const categories = document.querySelectorAll(CATEGORIES_SELECTOR);
                    if (new Array(...categories).every((category) => this._isCategorySticky(category))) {
                        break;
                    }
                }
                break;
            default:
                console.warn(LOG_PREFIX, "Unknown event", event);
                break;
        }
    }
    _onChannelSelect() {
        const categories = document.querySelectorAll(CATEGORIES_SELECTOR);
        if (categories.length > 0) {
            this._addCategoriesStyles();
        }
        this._setupObserver();
    }
}

module.exports = StickyCategories;
