/**
 * @name StickyCategories
 * @author gassastsina
 * @description Make categories sticky in the channel list. Add a clickable area above categories to scroll to it.
 * @version 1.0.0
 * @authorId 292388871381975040
 * @source https://github.com/vincent-andrieu/sticky-categories
 * @updateUrl https://raw.githubusercontent.com/vincent-andrieu/sticky-categories/refs/heads/main/build/sticky-categories.plugin.js
 */
'use strict';

const NAME = "StickyCategories";
const LOG_PREFIX = `[${NAME}]`;
const CONTAINER_ID = "channels";
const PARENT_SELECTOR = 'ul[class^="content_"]';
const CATEGORIES_SELECTOR = '[class*="containerDefault_"][draggable="true"]';
class StickyCategories {
    _fluxDispatcher;
    observer = null;
    _onEventSubscriptionCb = this._onEvent.bind(this);
    _listeningEvents = ["CHANNEL_SELECT"];
    clickHandlers = new Map();
    start() {
        console.warn(LOG_PREFIX, "Started");
        this._fluxDispatcher = BdApi.Webpack.getByKeys("actionLogger");
        this._addCategoriesStyles();
        this._setupObserver();
        this._subscribeEvents();
    }
    stop() {
        this._unsubscribeEvents();
        this._removeCategoriesStyle();
        console.warn(LOG_PREFIX, "Stopped");
    }
    _addCategoriesStyles(categories = document.querySelectorAll(CATEGORIES_SELECTOR)) {
        categories.forEach((category) => {
            category.style.setProperty("position", "sticky");
            category.style.setProperty("top", "0");
            category.style.setProperty("z-index", "10");
            category.style.setProperty("background-color", "var(--background-secondary)");
            category.style.setProperty("box-shadow", "0 5px 8px -2px var(--background-secondary)");
            this._addClickHandlers(category);
        });
        const scrollerContainer = document.getElementById(CONTAINER_ID);
        scrollerContainer?.addEventListener("scroll", (event) => this._onScroll(event, scrollerContainer));
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
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const timeout = Date.now() + 10_000;
                let categories = document.querySelectorAll(CATEGORIES_SELECTOR);
                while (Date.now() < timeout && categories.length === 0) {
                    await new Promise((resolve) => setTimeout(resolve, 500));
                    categories = document.querySelectorAll(CATEGORIES_SELECTOR);
                }
                if (categories.length > 0) {
                    this._addCategoriesStyles();
                }
                this._setupObserver();
                break;
            default:
                console.warn(LOG_PREFIX, "Unknown event", event);
                break;
        }
    }
}

module.exports = StickyCategories;
