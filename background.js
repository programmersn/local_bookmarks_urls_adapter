function makeIndent(indentLength) {
    return ".".repeat(indentLength);
}

function logItems(bookmarkItem, indent) {
    if (bookmarkItem.url) {
        console.log(makeIndent(indent) + bookmarkItem.url);
        const exampleURL = "file:///media/programmersn/NOUAIM/Studies/Documentation/Computer_science/Algorithmic_complexity/Inroduction_ebooks/Algorithms_A_Top-Down_Approach-Rodney_Howell.pdf";
        const newURL     = "e:/Studies/Documentation/Computer_science/Algorithmic_complexity/Inroduction_ebooks/Algorithms_A_Top-Down_Approach-Rodney_Howell.pdf";
        if (bookmarkItem.url === exampleURL) {
            browser.bookmarks.update(bookmarkItem.id, {url: newURL});
            console.log(`${makeIndent(indent)}--------------- CHANGED !!! ------------------`)
        }
    } else {
        console.log(makeIndent(indent) + "Folder");
        indent++;
    }
    if (bookmarkItem.children) {
        for (child of bookmarkItem.children) {
            logItems(child, indent);
        }
    }
    indent--;
}

function logTree(bookmarkItems) {
    console.group("Recursively logging bookmarks tree ...");
    logItems(bookmarkItems[0], 0);
    console.groupEnd();
}

function onRejected(error) {
    console.log(`An error: ${error}`);
}

function execute() {
    var gettingTree = browser.bookmarks.getTree();
    gettingTree.then(logTree, onRejected);
}

/*---------------------- Beginning flow of execution ------------------- */

console.log("Entering background.js");

browser.browserAction.onClicked.addListener(
    function () {
        console.log("Creating adapt_urls tab ...")
        browser.tabs.create({ "url": "/adapt_urls.html" });
    }
);