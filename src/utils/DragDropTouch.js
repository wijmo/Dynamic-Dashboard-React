import * as wjcCore from '@grapecity/wijmo';
/**
 * Object used to hold the data that is being dragged during drag and drop operations.
 *
 * It may hold one or more data items of different types. For more information about
 * drag and drop operations and data transfer objects, see
 * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer">HTML Drag and Drop API</a>.
 *
 * This object is created automatically by the @see:DragDropTouch singleton and is
 * accessible through the @see:dataTransfer property of all drag events.
 */
export class DataTransfer {
    constructor() {
        this._dropEffect = 'move';
        this._effectAllowed = 'all';
        this._data = {};
    }
    /**
     * Gets or sets the type of drag-and-drop operation currently selected.
     * The value must be 'none',  'copy',  'link', or 'move'.
     */
    get dropEffect() {
        return this._dropEffect;
    }
    set dropEffect(value) {
        this._dropEffect = wjcCore.asString(value);
    }
    /**
     * Gets or sets the types of operations that are possible.
     * Must be one of 'none', 'copy', 'copyLink', 'copyMove', 'link',
     * 'linkMove', 'move', 'all' or 'uninitialized'.
     */
    get effectAllowed() {
        return this._effectAllowed;
    }
    set effectAllowed(value) {
        this._effectAllowed = wjcCore.asString(value);
    }
    /**
     * Gets an array of strings giving the formats that were set in the @see:dragstart event.
     */
    get types() {
        return Object.keys(this._data);
    }
    /**
     * Removes the data associated with a given type.
     *
     * The type argument is optional. If the type is empty or not specified, the data
     * associated with all types is removed. If data for the specified type does not exist,
     * or the data transfer contains no data, this method will have no effect.
     *
     * @param type Type of data to remove.
     */
    clearData(type) {
        if (type != null) {
            delete this._data[type];
        }
        else {
            this._data = null;
        }
    }
    /**
     * Retrieves the data for a given type, or an empty string if data for that type does
     * not exist or the data transfer contains no data.
     *
     * @param type Type of data to retrieve.
     */
    getData(type) {
        return this._data[type] || '';
    }
    /**
     * Set the data for a given type.
     *
     * For a list of recommended drag types, please see
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Recommended_Drag_Types.
     *
     * @param type Type of data to add.
     * @param value Data to add.
     */
    setData(type, value) {
        this._data[type] = value;
    }
    /**
     * Set the image to be used for dragging if a custom one is desired.
     *
     * @param img An image element to use as the drag feedback image.
     * @param offsetX The horizontal offset within the image.
     * @param offsetY The vertical offset within the image.
     */
    setDragImage(img, offsetX, offsetY) {
        var ddt = DragDropTouch._instance;
        ddt._imgCustom = img;
        ddt._imgOffset = new wjcCore.Point(offsetX, offsetY);
    }
}
/**
 * Defines a class that adds support for touch-based HTML5 drag/drop operations.
 *
 * The @see:DragDropTouch class listens to touch events and raises the
 * appropriate HTML5 drag/drop events as if the events had been caused
 * by mouse actions.
 *
 * The purpose of this class is to enable using existing, standard HTML5
 * drag/drop code on mobile devices running IOS or Android.
 *
 * To use, include the DragDropTouch.js file on the page. The class will
 * automatically start monitoring touch events and will raise the HTML5
 * drag drop events (dragstart, dragenter, dragleave, drop, dragend) which
 * should be handled by the application.
 *
 * For details and examples on HTML drag and drop, see
 * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations.
 */
export class DragDropTouch {
    /**
     * Initializes the single instance of the @see:DragDropTouch class.
     */
    constructor() {
        this._lastClick = 0;
        // enforce singleton pattern
        wjcCore.assert(!DragDropTouch._instance, 'DragDropTouch instance already created.');
        // listen to touch events
        if ('ontouchstart' in document) {
            var d = document, ts = this._touchstart.bind(this), tm = this._touchmove.bind(this), te = this._touchend.bind(this);
            d.addEventListener('touchstart', ts);
            d.addEventListener('touchmove', tm);
            d.addEventListener('touchend', te);
            d.addEventListener('touchcancel', te);
        }
    }
    /**
     * Gets a reference to the @see:DragDropTouch singleton.
     */
    static getInstance() {
        return DragDropTouch._instance;
    }
    // ** event handlers
    _touchstart(e) {
        if (this._shouldHandle(e)) {
            // raise double-click and prevent zooming
            if (Date.now() - this._lastClick < DragDropTouch._DBLCLICK) {
                if (this._dispatchEvent(e, 'dblclick', e.target)) {
                    e.preventDefault();
                    this._reset();
                    return;
                }
            }
            // clear all variables
            this._reset();
            // get nearest draggable element
            var src = wjcCore.closest(e.target, '[draggable]');
            if (src) {
                // give caller a chance to handle the hover/move events
                if (!this._dispatchEvent(e, 'mousemove', e.target) &&
                    !this._dispatchEvent(e, 'mousedown', e.target)) {
                    // get ready to start dragging
                    this._dragSource = src;
                    this._ptDown = this._getPoint(e);
                    this._lastTouch = e;
                    e.preventDefault();
                    // show context menu if the user hasn't started dragging after a while
                    setTimeout(() => {
                        if (this._dragSource == src && this._img == null) {
                            if (this._dispatchEvent(e, 'contextmenu', src)) {
                                this._reset();
                            }
                        }
                    }, DragDropTouch._CTXMENU);
                }
            }
        }
    }
    _touchmove(e) {
        if (this._shouldHandle(e)) {
            // see if target wants to handle move
            var target = this._getTarget(e);
            if (this._dispatchEvent(e, 'mousemove', target)) {
                this._lastTouch = e;
                e.preventDefault();
                return;
            }
            // start dragging
            if (this._dragSource && !this._img) {
                var delta = this._getDelta(e);
                if (delta > DragDropTouch._THRESHOLD) {
                    this._dispatchEvent(e, 'dragstart', this._dragSource);
                    this._createImage(e);
                    this._dispatchEvent(e, 'dragenter', target);
                }
            }
            // continue dragging
            if (this._img) {
                this._lastTouch = e;
                e.preventDefault(); // prevent scrolling
                if (target != this._lastTarget) {
                    this._dispatchEvent(this._lastTouch, 'dragleave', this._lastTarget);
                    this._dispatchEvent(e, 'dragenter', target);
                    this._lastTarget = target;
                }
                this._moveImage(e);
                this._dispatchEvent(e, 'dragover', target);
            }
        }
    }
    _touchend(e) {
        if (this._shouldHandle(e)) {
            // see if target wants to handle up
            if (this._dispatchEvent(this._lastTouch, 'mouseup', e.target)) {
                e.preventDefault();
                return;
            }
            // user clicked the element but didn't drag, so clear the source and simulate a click
            if (!this._img) {
                this._dragSource = null;
                this._dispatchEvent(this._lastTouch, 'click', e.target);
                this._lastClick = Date.now();
            }
            // finish dragging
            this._destroyImage();
            if (this._dragSource) {
                if (e.type.indexOf('cancel') < 0) {
                    this._dispatchEvent(this._lastTouch, 'drop', this._lastTarget);
                }
                this._dispatchEvent(this._lastTouch, 'dragend', this._dragSource);
                this._reset();
            }
        }
    }
    // ** utilities
    // ignore events that have been handled or that involve more than one touch
    _shouldHandle(e) {
        return e &&
            !e.defaultPrevented &&
            e.touches && e.touches.length < 2;
    }
    // clear all members
    _reset() {
        this._destroyImage();
        this._dragSource = null;
        this._lastTouch = null;
        this._lastTarget = null;
        this._ptDown = null;
        this._dataTransfer = new DataTransfer();
    }
    // get point for a touch event
    _getPoint(e, page) {
        if (e && e.touches) {
            e = e.touches[0];
        }
        wjcCore.assert(e && ('clientX' in e), 'invalid event?');
        if (page == true) {
            return new wjcCore.Point(e.pageX, e.pageY);
        }
        else {
            return new wjcCore.Point(e.clientX, e.clientY);
        }
    }
    // get distance between the current touch event and the first one
    _getDelta(e) {
        var p = this._getPoint(e);
        return Math.abs(p.x - this._ptDown.x) + Math.abs(p.y - this._ptDown.y);
    }
    // get the element at a given touch event
    _getTarget(e) {
        var pt = this._getPoint(e), el = document.elementFromPoint(pt.x, pt.y);
        while (el && getComputedStyle(el).pointerEvents == 'none') {
            el = el.parentElement;
        }
        return el;
    }
    // create drag image from source element
    _createImage(e) {
        // just in case...
        if (this._img) {
            this._destroyImage();
        }
        // create drag image from custom element or drag source
        var src = this._imgCustom || this._dragSource;
        this._img = src.cloneNode(true);
        this._copyStyle(src, this._img);
        this._img.style.top = this._img.style.left = '-9999px';
        // if creating from drag source, apply offset and opacity
        if (!this._imgCustom) {
            var rc = src.getBoundingClientRect(), pt = this._getPoint(e);
            this._imgOffset = new wjcCore.Point(pt.x - rc.left, pt.y - rc.top);
            this._img.style.opacity = DragDropTouch._OPACITY.toString();
        }
        // add image to document
        this._moveImage(e);
        document.body.appendChild(this._img);
    }
    // dispose of drag image element
    _destroyImage() {
        if (this._img && this._img.parentElement) {
            this._img.parentElement.removeChild(this._img);
        }
        this._img = null;
        this._imgCustom = null;
    }
    // move the drag image element
    _moveImage(e) {
        requestAnimationFrame(() => {
            var pt = this._getPoint(e, true);
            wjcCore.setCss(this._img, {
                position: 'absolute',
                pointerEvents: 'none',
                zIndex: 999999,
                left: Math.round(pt.x - this._imgOffset.x),
                top: Math.round(pt.y - this._imgOffset.y)
            });
        });
    }
    // copy properties from an object to another
    _copyProps(dst, src, props) {
        for (var i = 0; i < props.length; i++) {
            var p = props[i];
            dst[p] = src[p];
        }
    }
    _copyStyle(src, dst) {
        // remove potentially troublesome attributes
        DragDropTouch._rmvAtts.forEach(function (att) {
            dst.removeAttribute(att);
        });
        // copy canvas content
        if (src instanceof HTMLCanvasElement) {
            var cSrc = src, cDst = dst;
            cDst.width = cSrc.width;
            cDst.height = cSrc.height;
            cDst.getContext('2d').drawImage(cSrc, 0, 0);
        }
        // copy style
        var cs = getComputedStyle(src);
        for (var i = 0; i < cs.length; i++) {
            var key = cs[i];
            dst.style[key] = cs[key];
        }
        dst.style.pointerEvents = 'none';
        // and repeat for all children
        for (var i = 0; i < src.children.length; i++) {
            this._copyStyle(src.children[i], dst.children[i]);
        }
    }
    _dispatchEvent(e, type, target) {
        if (e && target) {
            var evt = document.createEvent('Event'), t = e.touches ? e.touches[0] : e;
            evt.initEvent(type, true, true);
            evt.button = 0;
            evt.which = evt.buttons = 1;
            this._copyProps(evt, e, DragDropTouch._kbdProps);
            this._copyProps(evt, t, DragDropTouch._ptProps);
            evt.dataTransfer = this._dataTransfer;
            target.dispatchEvent(evt);
            return evt.defaultPrevented;
        }
        return false;
    }
}
/*private*/ DragDropTouch._instance = new DragDropTouch(); // singleton
// constants
DragDropTouch._THRESHOLD = 5; // pixels to move before drag starts
DragDropTouch._OPACITY = 0.5; // drag image opacity
DragDropTouch._DBLCLICK = 500; // max ms between clicks in a double click
DragDropTouch._CTXMENU = 900; // ms to hold before raising 'contextmenu' event
// copy styles/attributes from drag source to drag image element
DragDropTouch._rmvAtts = 'id,class,style,draggable'.split(',');
// synthesize and dispatch an event
// returns true if the event has been handled (e.preventDefault == true)
DragDropTouch._kbdProps = 'altKey,ctrlKey,metaKey,shiftKey'.split(',');
DragDropTouch._ptProps = 'pageX,pageY,clientX,clientY,screenX,screenY'.split(',');
