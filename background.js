function makeIndent(indentLength) {
    return ".".repeat(indentLength);
}

function logItems(bookmarkItem, indent, oldprefix, newprefix) {
    //console.group(`Recursion with oldprefix=${oldprefix} and newprefix=${newprefix} ...`);
    if (bookmarkItem.url) {
        //console.log(makeIndent(indent) + bookmarkItem.url);
        if (bookmarkItem.url.startsWith(oldprefix)) {
            console.log (`$$$$$$$$$$$$$$$$$$ Changing bookmark ${bookmarkItem.url} $$$$$$$$$$$$$$$ `);
            const newUrl = bookmarkItem.url.replace(oldprefix, newprefix);
            browser.bookmarks.update(bookmarkItem.id, { url: newUrl });
         //   console.log(`${makeIndent(indent)}--------------- CHANGED !!! ------------------`)
        }
    } else {
        //console.log(makeIndent(indent) + "Folder");
        indent++;
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            logItems(child, indent, oldprefix, newprefix);
        }
    }
    indent--;
    //console.groupEnd();
}

function logTree(bookmarkItems, oldprefix, newprefix) {
    console.group(`Recursively logging bookmarks tree with oldprefix=${oldprefix} and newprefix=${newprefix} ...`);
    logItems(bookmarkItems[0], 0, oldprefix, newprefix);
    console.groupEnd();
}

function onRejected(error) {
    console.log(`An error: ${error}`);
}

function execute(oldprefix, newprefix) {
    var gettingTree = browser.bookmarks.getTree();
    gettingTree.then(
        function (bookmarkItems) {
            logTree(bookmarkItems, oldprefix, newprefix);
        },
        onRejected);
}

/*---------------------- Beginning flow of execution ------------------- */

console.log("Entering background.js");

browser.browserAction.onClicked.addListener(
    function () {
        console.log("Creating adapt_urls tab ...")
        browser.tabs.create({ "url": "/adapt_urls.html" });
    }
);