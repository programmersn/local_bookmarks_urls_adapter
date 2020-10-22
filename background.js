
function adaptUrlsRecursively(bookmarkItem, oldprefix, newprefix) {
    if (bookmarkItem.url) {
        if (oldprefix.startsWith("file:///")) {
            var oldprefixAlt = oldprefix.replace("file:///", "");
        } else {
            var oldprefixAlt = "file:///" + oldprefix;
        }
        if (bookmarkItem.url.startsWith(oldprefix) ||
            bookmarkItem.url.startsWith(oldprefixAlt)) {
            const newUrl = bookmarkItem.url.replace(oldprefix, newprefix);
            browser.bookmarks.update(bookmarkItem.id, { url: newUrl });
            console.log(`$$$$$$$$$$$$$$$$$$ Changing bookmark ${bookmarkItem.url} $$$$$$$$$$$$$$$ `);
        }
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            adaptUrlsRecursively(child, oldprefix, newprefix);
        }
    }
}

function onRejected(error) {
    console.log(`An error: ${error}`);
}

function adaptUrls(oldprefix, newprefix) {
    var gettingTree = browser.bookmarks.getTree();
    gettingTree.then(
        function (bookmarkItems) {
            console.group(`Recursively logging bookmarks tree with oldprefix=${oldprefix} and newprefix=${newprefix} ...`);
            adaptUrlsRecursively(bookmarkItems[0], oldprefix, newprefix);
            console.groupEnd();
        },
        onRejected);
}

/*---------------------- Beginning flow of execution ------------------- */

console.log("Entering background.js");

browser.browserAction.onClicked.addListener(
    function () {
        console.log("Creating adapt_urls tab ...");
        browser.tabs.create({ "url": "/adapt_urls.html" });
    }
);