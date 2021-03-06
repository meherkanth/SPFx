var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from "react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { Fabric } from "office-ui-fabric-react/lib/Fabric";
import { DetailsList, DetailsListLayoutMode, Selection } from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { mergeStyleSets } from "office-ui-fabric-react/lib/Styling";
var classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: "16px"
    },
    fileIconCell: {
        textAlign: "center",
        selectors: {
            "&:before": {
                content: ".",
                display: "inline-block",
                verticalAlign: "middle",
                height: "100%",
                width: "0px",
                visibility: "hidden"
            }
        }
    },
    fileIconImg: {
        verticalAlign: "middle",
        maxHeight: "16px",
        maxWidth: "16px"
    },
    controlWrapper: {
        display: "flex",
        flexWrap: "wrap"
    },
    exampleToggle: {
        display: "inline-block",
        marginBottom: "10px",
        marginRight: "30px"
    },
    selectionDetails: {
        marginBottom: "20px"
    }
});
var controlStyles = {
    root: {
        margin: "0 30px 20px 0",
        maxWidth: "300px"
    }
};
var FabricDetailsList = /** @class */ (function (_super) {
    __extends(FabricDetailsList, _super);
    function FabricDetailsList(props, state) {
        var _this = _super.call(this, props) || this;
        _this._onChangeText = function (ev, text) {
            _this.setState({
                items: text
                    ? _this._allItems.filter(function (i) { return i.name.toLowerCase().indexOf(text) > -1; })
                    : _this._allItems
            });
        };
        _this._onColumnClick = function (ev, column) {
            var _a = _this.state, columns = _a.columns, items = _a.items;
            var newColumns = columns.slice();
            var currColumn = newColumns.filter(function (currCol) { return column.key === currCol.key; })[0];
            newColumns.forEach(function (newCol) {
                if (newCol === currColumn) {
                    currColumn.isSortedDescending = !currColumn.isSortedDescending;
                    currColumn.isSorted = true;
                }
                else {
                    newCol.isSorted = false;
                    newCol.isSortedDescending = true;
                }
            });
            var newItems = _copyAndSort(items, currColumn.fieldName, currColumn.isSortedDescending);
            _this.setState({
                columns: newColumns,
                items: newItems
            });
        };
        _this._allItems = _generateDocuments(_this.props);
        var columns = [
            {
                key: "column1",
                name: "File Type",
                className: classNames.fileIconCell,
                iconClassName: classNames.fileIconHeaderIcon,
                ariaLabel: "Column operations for File type, Press to sort on File type",
                iconName: "Page",
                isIconOnly: true,
                fieldName: "name",
                minWidth: 16,
                maxWidth: 16,
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return (React.createElement("img", { src: item.iconName, className: classNames.fileIconImg, alt: item.fileType + " file icon" }));
                }
            },
            {
                key: "column2",
                name: "Name",
                fieldName: "name",
                minWidth: 210,
                maxWidth: 350,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                sortAscendingAriaLabel: "Sorted A to Z",
                sortDescendingAriaLabel: "Sorted Z to A",
                onColumnClick: _this._onColumnClick,
                data: "string",
                isPadded: true
            },
            {
                key: "column3",
                name: "Date Modified",
                fieldName: "dateModifiedValue",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                onColumnClick: _this._onColumnClick,
                data: "number",
                onRender: function (item) {
                    return React.createElement("span", null, item.dateModified);
                },
                isPadded: true
            },
            {
                key: "column4",
                name: "Modified By",
                fieldName: "modifiedBy",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: "string",
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.modifiedBy);
                },
                isPadded: true
            },
            {
                key: "column5",
                name: "File Size",
                fieldName: "fileSizeRaw",
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                isCollapsible: true,
                data: "number",
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.fileSize);
                }
            }
        ];
        _this._selection = new Selection({
            onSelectionChanged: function () {
                _this.setState({
                    selectionDetails: _this._getSelectionDetails()
                });
            }
        });
        _this.state = {
            items: _this._allItems,
            columns: columns,
            selectionDetails: _this._getSelectionDetails()
        };
        return _this;
        // if (Environment.type === EnvironmentType.SharePoint) {
        //   this.props.spcontect.spHttpClient
        //     .get(
        //       this.props.spcontect.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Documents')/items/?$expand=file",
        //       SPHttpClient.configurations.v1
        //     )
        //     .then((Response: SPHttpClientResponse) => {
        //       // this.etag = Response.headers.get('ETag');
        //       Response.json().then((listItems: any) => {
        //         console.log(listItems);
        //         // this.setState({ birthday: new Date(listItem.Birthday) });
        //       });
        //     });
        // }
    }
    FabricDetailsList.prototype.render = function () {
        var _a = this.state, columns = _a.columns, items = _a.items, selectionDetails = _a.selectionDetails;
        return (React.createElement(Fabric, null,
            React.createElement("div", { className: classNames.controlWrapper },
                React.createElement(TextField, { label: "Filter by name:", onChange: this._onChangeText, styles: controlStyles })),
            React.createElement("div", { className: classNames.selectionDetails }, selectionDetails),
            React.createElement(MarqueeSelection, { selection: this._selection },
                React.createElement(DetailsList, { items: items, columns: columns, setKey: "set", layoutMode: DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: true, onItemInvoked: this._onItemInvoked, enterModalSelectionOnTouch: true, ariaLabelForSelectionColumn: "Toggle selection", ariaLabelForSelectAllCheckbox: "Toggle selection for all items" }))));
    };
    FabricDetailsList.prototype._onItemInvoked = function (item) {
        alert('Item invoked:' + item.name);
    };
    FabricDetailsList.prototype._getSelectionDetails = function () {
        var selectionCount = this._selection.getSelectedCount();
        switch (selectionCount) {
            case 0:
                return "No items selected";
            case 1:
                return ("1 item selected: " +
                    this._selection.getSelection()[0].name);
            default:
                return selectionCount + " items selected";
        }
    };
    return FabricDetailsList;
}(React.Component));
export default FabricDetailsList;
function _copyAndSort(items, columnKey, isSortedDescending) {
    var key = columnKey;
    return items
        .slice(0)
        .sort(function (a, b) {
        return (isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1;
    });
}
function _generateDocuments(props) {
    var items = [];
    if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
        props.spcontect.spHttpClient
            .get(props.spcontect.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Documents')/items/?$select=Modified,File,Editor/Title&$expand=File,Editor", SPHttpClient.configurations.v1)
            .then(function (Response) {
            // this.etag = Response.headers.get('ETag');
            Response.json().then(function (listItems) {
                console.log(listItems);
                listItems.value.forEach(function (element) {
                    var iconurl;
                    if (element.File.Name.split('.').pop().toLowerCase() === 'pdf') {
                        iconurl = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types/48/pdf.svg';
                    }
                    else {
                        iconurl = "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/" + element.File.Name.split('.').pop() + "_16x1.svg";
                    }
                    items.push({
                        name: element.File.Name,
                        value: element.File.Name,
                        iconName: iconurl,
                        fileType: element.File.Name.split('.')[1],
                        modifiedBy: element.Editor.Title,
                        dateModified: new Date(element.Modified).toLocaleDateString(),
                        dateModifiedValue: new Date(element.Modified).valueOf(),
                        fileSize: readableFileSize(element.File.Length),
                        fileSizeRaw: element.File.Length
                    });
                });
            });
        });
    }
    else if (Environment.type === EnvironmentType.Local) {
        for (var i = 0; i < 500; i++) {
            var randomDate = _randomDate(new Date(2012, 0, 1), new Date());
            var randomFileSize = _randomFileSize();
            var randomFileType = _randomFileIcon();
            var fileName = _lorem(2);
            fileName =
                fileName.charAt(0).toUpperCase() +
                    fileName.slice(1).concat("." + randomFileType.docType);
            var userName = _lorem(2);
            userName = userName
                .split(" ")
                .map(function (name) { return name.charAt(0).toUpperCase() + name.slice(1); })
                .join(" ");
            items.push({
                name: fileName,
                value: fileName,
                iconName: randomFileType.url,
                fileType: randomFileType.docType,
                modifiedBy: userName,
                dateModified: randomDate.dateFormatted,
                dateModifiedValue: randomDate.value,
                fileSize: randomFileSize.value,
                fileSizeRaw: randomFileSize.rawSize
            });
        }
    }
    return items;
}
function readableFileSize(size) {
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = 0;
    while (size >= 1024) {
        size /= 1024;
        ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
}
function _randomDate(start, end) {
    var date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return {
        value: date.valueOf(),
        dateFormatted: date.toLocaleDateString()
    };
}
var FILE_ICONS = [
    { name: "accdb" },
    { name: "csv" },
    { name: "docx" },
    { name: "dotx" },
    { name: "mpt" },
    { name: "odt" },
    { name: "one" },
    { name: "onepkg" },
    { name: "onetoc" },
    { name: "pptx" },
    { name: "pub" },
    { name: "vsdx" },
    { name: "xls" },
    { name: "xlsx" },
    { name: "xsn" }
];
function _randomFileIcon() {
    var docType = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
    return {
        docType: docType,
        url: "https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/" + docType + "_16x1.svg"
    };
}
function _randomFileSize() {
    var fileSize = Math.floor(Math.random() * 100) + 30;
    return {
        value: fileSize + " KB",
        rawSize: fileSize
    };
}
var LOREM_IPSUM = ("lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut " +
    "labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut " +
    "aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
    "eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt ").split(" ");
var loremIndex = 0;
function _lorem(wordCount) {
    var startIndex = loremIndex + wordCount > LOREM_IPSUM.length ? 0 : loremIndex;
    loremIndex = startIndex + wordCount;
    return LOREM_IPSUM.slice(startIndex, loremIndex).join(" ");
}
//# sourceMappingURL=FabricDetailsList.js.map