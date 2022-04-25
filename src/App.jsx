// React
import * as React from 'react';
// Wijmo
import * as wjcCore from '@grapecity/wijmo';
import { Grid } from './components/Grid';
import { RadialGauge } from './components/RadialGauge';
import { LinearGauge } from './components/LinearGauge';
import { BarChart } from './components/BarChart';
import { ColumnChart } from './components/ColumnChart';
import { LineChart } from './components/LineChart';
import { BubbleChart } from './components/BubbleChart';
import { BulletGraph } from './components/BulletGraph';
import { Blank } from './components/Blank';
import { Tile } from './components/Tile';
export class App extends React.Component {
    constructor() {
        super(...arguments);
        // Color palette
        this.palette = ['#8e99f3', '#ffca28', '#5c6bc0', '#bbdefb'];
        // Icons assets
        this.icons = {
            grid: [
                <path d="M57,5H7A2,2,0,0,0,5,7v7H59V7A2,2,0,0,0,57,5Zm1,19V23H46V15H45v8H33V15H32v8H19V15H18v8H6v1H18v7H6v1H18v8H6v1H18v8H6v1H18v8h1V50H32v8h1V50H45v8h1V50H58V49H46V41H58V40H46V32H58V31H46V24ZM19,24H32v7H19Zm0,8H32v8H19Zm0,17V41H32v8Zm26,0H33V41H45Zm0-9H33V32H45Zm0-9H33V24H45Z" fill={this.palette[3]}/>,
                <path d="M57,5H7A2,2,0,0,0,5,7V57a2,2,0,0,0,2,2H57a2,2,0,0,0,2-2V7A2,2,0,0,0,57,5ZM7,6H57a1,1,0,0,1,1,1v7H6V7A1,1,0,0,1,7,6ZM57,58H7a1,1,0,0,1-1-1V15H58V57A1,1,0,0,1,57,58Z" fill={this.palette[0]}/>,
            ],
            barChart: [
                <rect x="12" y="34" width="40" height="7" fill={this.palette[1]}/>,
                <rect x="12" y="46" width="33" height="7" fill={this.palette[2]}/>,
                <rect x="12" y="11" width="32" height="7" fill={this.palette[3]}/>,
                <path d="M36,22v7H12V22ZM10,14H8v1h2Zm0,11H8v1h2Zm0,12H8v1h2Zm0,12H8v1h2Zm49,9H7a.94.94,0,0,1-1-1V5H5V57a2,2,0,0,0,2,2H59Z" fill={this.palette[0]}/>,
            ],
            columnChart: [
                <rect x="23" y="12.02" width="7" height="40" fill={this.palette[1]}/>,
                <rect x="11" y="19.02" width="7" height="33" fill={this.palette[2]}/>,
                <rect x="46" y="20.02" width="7" height="32" fill={this.palette[3]}/>,
                <path d="M41,52H34V26h7Zm8,2v2h1V54ZM37,54v2h1V54ZM26,54v2h1V54ZM14,54v2h1V54ZM5,5V57a2,2,0,0,0,2,2H58V58H7a1,1,0,0,1-1-1V5Z" fill={this.palette[0]}/>,
            ],
            bubbleChart: [
                <path d="M59,58H7a.94.94,0,0,1-1-1V5H5V57a2,2,0,0,0,2,2H59Z" fill={this.palette[0]}/>,
                <path d="M36,23a2,2,0,1,1,2,2A2,2,0,0,1,36,23ZM13.63,29.07a2,2,0,1,0-2-2A2,2,0,0,0,13.63,29.07Zm9,12a2,2,0,1,0-2-2A2,2,0,0,0,22.63,41.07Zm24-5a2,2,0,1,0-2-2A2,2,0,0,0,46.63,36.07Zm-2.5,17a1.5,1.5,0,1,0-1.5-1.5A1.5,1.5,0,0,0,44.13,53.07Z" fill={this.palette[2]}/>,
                <path d="M19,12a4,4,0,1,1,4,4A4,4,0,0,1,19,12Zm6.63,16.07a3,3,0,1,0-3-3A3,3,0,0,0,25.63,28.07Zm11.5,8a3.5,3.5,0,1,0-3.5-3.5A3.5,3.5,0,0,0,37.13,36.07Zm-1,10a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,36.13,46.07Zm14,0a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,50.13,46.07Z" fill={this.palette[3]}/>,
            ],
            lineChart: [
                <polygon points="51 20.41 49.59 19 32.5 36.97 27.5 31.97 11 48.48 12.5 49.98 27.5 34.97 32.5 39.97 51 20.41" fill={this.palette[3]}/>,
                <path d="M6,5V57a1,1,0,0,0,1,1H58v1H7a2,2,0,0,1-2-2V5Z" fill={this.palette[0]}/>,
                <polygon points="34.92 30.42 27.5 23 11 39.51 12.5 41.01 27.5 26 33.42 31.92 34.92 30.42" fill={this.palette[2]}/>,
                <polygon points="40.58 36.08 39.08 37.58 45.97 44.47 47.38 42.88 40.58 36.08" fill={this.palette[2]}/>,
            ],
            radialGauge: [
                <circle cx="32" cy="32" r="4" fill={this.palette[1]}/>,
                <path d="M32,6A26,26,0,1,1,6,32,26,26,0,0,1,32,6m0-1A27,27,0,1,0,59,32,27,27,0,0,0,32,5ZM43.37,20.63a1.49,1.49,0,0,0-2.12,0l-6.84,6.84a6.51,6.51,0,0,1,2.12,2.12l6.84-6.84A1.49,1.49,0,0,0,43.37,20.63Z" fill={this.palette[0]}/>,
                <path d="M34,11a2,2,0,1,1-2-2A2,2,0,0,1,34,11ZM17,15a2,2,0,1,0,2,2A2,2,0,0,0,17,15Zm30,0a2,2,0,1,0,2,2A2,2,0,0,0,47,15ZM11,28a2,2,0,1,0,2,2A2,2,0,0,0,11,28Zm42,.91a2,2,0,1,0,2,2A2,2,0,0,0,53,28.91ZM32,40.76A25.87,25.87,0,0,0,14.09,48a23.95,23.95,0,0,0,35.83,0A25.88,25.88,0,0,0,32,40.76Z" fill={this.palette[3]}/>,
            ],
            linearGauge: [
                <path d="M29.5,19A4.5,4.5,0,1,1,34,23.5,4.49,4.49,0,0,1,29.5,19Zm-1.15-2H11a2,2,0,0,0-1.9,2.65,2,2,0,0,0,2,1.35H28.21A5.72,5.72,0,0,1,28,19.5c0-.08,0-.15,0-.23s0-.18,0-.27A6,6,0,0,1,28.35,17ZM54.9,18.35a2,2,0,0,0-2-1.35H39.65a5.89,5.89,0,0,1,0,4H53A2,2,0,0,0,54.9,18.35Z" fill={this.palette[2]}/>,
                <path d="M53,36H29.05a6,6,0,0,0,.29-1.85,6.13,6.13,0,0,0-.4-2.15h24a2,2,0,0,1,2,1.35A2,2,0,0,1,53,36ZM17.74,32H11a2,2,0,0,0-1.9,2.65,2,2,0,0,0,2,1.35h6.55a6.28,6.28,0,0,1-.29-1.85A6.13,6.13,0,0,1,17.74,32Zm5.6,6.65a4.5,4.5,0,1,0-4.5-4.5A4.5,4.5,0,0,0,23.34,38.65Z" fill={this.palette[3]}/>,
                <path d="M38.34,49.15A6.28,6.28,0,0,0,38.63,51H11.08a2,2,0,0,1-2-1.35A2,2,0,0,1,11,47H38.74A6.13,6.13,0,0,0,38.34,49.15Zm16.56-.8a2,2,0,0,0-2-1.35h-3a6.13,6.13,0,0,1,.4,2.15A6,6,0,0,1,50.05,51h3A2,2,0,0,0,54.9,48.35Zm-10.56,5.3a4.5,4.5,0,1,0-4.5-4.5A4.5,4.5,0,0,0,44.34,53.65Z" fill={this.palette[1]}/>,
            ],
            bulletGraph: [
                <rect x="41" y="17" width="14" height="11" fill={this.palette[2]}/>,
                <rect x="40.89" y="33.96" width="14" height="11" fill={this.palette[2]}/>,
                <polygon points="25 17 25 19 34 19 34 26 25 26 25 28 39 28 39 17 25 17" fill={this.palette[1]}/>,
                <polygon points="25 36 29 36 29 43 25 43 25 45 39 45 39 34 25 34 25 36" fill={this.palette[1]}/>,
                <rect x="9" y="26" width="14" height="2" fill={this.palette[3]}/>,
                <rect x="9" y="17" width="14" height="2" fill={this.palette[3]}/>,
                <rect x="9" y="34" width="14" height="2" fill={this.palette[3]}/>,
                <rect x="9" y="43" width="14" height="2" fill={this.palette[3]}/>,
                <path d="M49,53v2h1V53ZM37,53v2h1V53ZM26,53v2h1V53ZM14,53v2h1V53ZM31,24H9V21H31ZM26,41H9V38H26ZM60,58H6V57H60Z" fill={this.palette[0]}/>,
            ],
            blank: [
                <path d="M40,5V6H33V5ZM24,6h7V5H24ZM15,6h7V5H15Zm7,53V58H15v1Zm9-1H24v1h7ZM6,49V42H5v7ZM5,22H6V15H5ZM51,6h6a1,1,0,0,1,1,1v6h1V7a2,2,0,0,0-2-2H51ZM6,31V24H5v7Zm0,9V33H5v7ZM58,15v7h1V15ZM6,13V7A1,1,0,0,1,7,6h6V5H7A2,2,0,0,0,5,7v6ZM58,51v6a1,1,0,0,1-1,1H51v1h6a2,2,0,0,0,2-2V51ZM13,58H7a1,1,0,0,1-1-1V51H5v6a2,2,0,0,0,2,2h6ZM58,24v7h1V24Zm1,18H58v7h1ZM49,58H42v1h7ZM42,5V6h7V5ZM40,58H33v1h7ZM58,33v7h1V33Z" fill={this.palette[0]}/>,
            ],
        };
        // Tile names and types
        this.tileCatalog = [
            { name: 'Grid', tile: Grid, icon: this.icons.grid },
            { name: 'Radial Gauge', tile: RadialGauge, icon: this.icons.radialGauge },
            { name: 'Linear Gauge', tile: LinearGauge, icon: this.icons.linearGauge },
            { name: 'Bar Chart', tile: BarChart, icon: this.icons.barChart },
            { name: 'Column Chart', tile: ColumnChart, icon: this.icons.columnChart },
            { name: 'Line Chart', tile: LineChart, icon: this.icons.lineChart },
            { name: 'Bubble Chart', tile: BubbleChart, icon: this.icons.bubbleChart },
            { name: 'Bullet Graph', tile: BulletGraph, icon: this.icons.bulletGraph },
            { name: 'Blank', tile: Blank, icon: this.icons.blank },
        ];
        this.key = 0;
        this.state = {
            isWideMenu: false,
            tileCatalog: new wjcCore.CollectionView(this.tileCatalog),
            tiles: this.getTiles(),
            key: this.key,
            data: this.getData(),
        };
    }
    // tiles currently in use
    getTiles() {
        return [
            { name: this.tileCatalog[1].name, key: this.key += 1 },
            { name: this.tileCatalog[2].name, key: this.key += 1 },
            { name: this.tileCatalog[5].name, key: this.key += 1 },
            { name: this.tileCatalog[7].name, key: this.key += 1 },
            { name: this.tileCatalog[0].name, key: this.key += 1 },
        ];
    }
    // generate some data to show in the tiles
    getData() {
        let data = [];
        const today = new Date();
        for (let i = 0; i < 12; i++) {
            const sales = 100 + Math.random() * 800 + i * 50;
            const expenses = 50 + Math.random() * 300 + i * 5;
            data.push({
                id: i,
                date: wjcCore.DateTime.addMonths(today, 12 - i),
                sales: sales,
                expenses: expenses,
                profit: sales - expenses,
            });
        }
        return data;
    }
    // gets a tile content by name
    getTileContent(name) {
        const { data, tileCatalog } = this.state;
        const arr = tileCatalog.items;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].name == name) {
                return React.createElement(arr[i].tile, {
                    data: new wjcCore.CollectionView(data),
                    palette: this.palette
                });
            }
        }
        throw '*** tile not found: ' + name;
    }
    // adds a tile to the dashboard
    addTile(name) {
        const { tiles, key: stateKey } = this.state;
        const key = stateKey + 1;
        this.setState({ tiles: [{ name, key }, ...tiles], key });
    }
    // removes a tile from the dashboard
    removeTile(tileIndex) {
        const tiles = this.state.tiles.filter((item, index) => index != tileIndex);
        this.setState({ tiles: tiles });
    }
    // initialize component after it has been mounted
    componentDidMount() {
        // enable tile drag/drop
        const panel = document.querySelector('.dashboard');
        this.enableItemReorder(panel);
    }
    // allow users to re-order elements within a panel element
    // we work with the DOM elements and update the state when done.
    enableItemReorder(panel) {
        let dragSource = null;
        let dropTarget = null;
        // add drag/drop event listeners
        panel.addEventListener('dragstart', (e) => {
            const target = wjcCore.closest(e.target, '.tile');
            if (target && target.parentElement == panel) {
                dragSource = target;
                wjcCore.addClass(dragSource, 'drag-source');
                const dt = e.dataTransfer;
                dt.effectAllowed = 'move';
                dt.setData('text', dragSource.innerHTML);
            }
        });
        panel.addEventListener('dragover', (e) => {
            if (dragSource) {
                let tile = wjcCore.closest(e.target, '.tile');
                if (tile == dragSource) {
                    tile = null;
                }
                if (dragSource && tile && tile != dragSource) {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'move';
                }
                if (dropTarget != tile) {
                    wjcCore.removeClass(dropTarget, 'drag-over');
                    dropTarget = tile;
                    wjcCore.addClass(dropTarget, 'drag-over');
                }
            }
        });
        panel.addEventListener('drop', (e) => {
            if (dragSource && dropTarget) {
                // finish drag/drop
                e.stopPropagation();
                e.stopImmediatePropagation();
                e.preventDefault();
                // re-order HTML elements (optional here, we're updating the state later)
                const srcIndex = getIndex(dragSource);
                const dstIndex = getIndex(dropTarget);
                const refChild = srcIndex > dstIndex ? dropTarget : dropTarget.nextElementSibling;
                dragSource.parentElement.insertBefore(dragSource, refChild);
                // focus and view on the tile that was dragged
                dragSource.focus();
                // update state
                let tiles = this.state.tiles.slice();
                tiles.splice(srcIndex, 1);
                tiles.splice(dstIndex, 0, this.state.tiles[srcIndex]);
                this.setState({ tiles: tiles });
            }
        });
        panel.addEventListener('dragend', () => {
            wjcCore.removeClass(dragSource, 'drag-source');
            wjcCore.removeClass(dropTarget, 'drag-over');
            dragSource = dropTarget = null;
        });
        function getIndex(e) {
            const p = e.parentElement;
            for (let i = 0; i < p.children.length; i++) {
                if (p.children[i] == e)
                    return i;
            }
            return -1;
        }
    }
    // render the dashboard
    render() {
        const { tiles, isWideMenu } = this.state;
        // animated toggle menu
        const renderMenuToggle = (<div className={'menu-toggle' + (this.state.isWideMenu ? ' menu--open' : '')} onClick={() => this.setState({ isWideMenu: !isWideMenu })}>
                <svg width="30" height="20" viewBox="0 0 30 20" fill={this.palette[2]}>
                    <rect x="10" y="5" width="11" height="1"/>
                    <rect x="10" y="15" width="11" height="1"/>
                    <polygon points="29.48 10.27 24.23 5.03 23.52 5.73 27.79 10 10 10 10 11 27.79 11 23.52 15.27 24.23 15.97 29.48 10.73 29.7 10.5 29.48 10.27"/>
                </svg>
            </div>);
        // menu items
        const renderMenuItems = (<React.Fragment>
                {this.tileCatalog.map((item) => (<div key={`Menu ${item.name}`} className="menu-item" title={item.name} onClick={() => this.addTile(item.name)}>
                        <svg width="64" height="64" viewBox="0 0 64 64">
                            {item.icon.map((entity, key) => (<React.Fragment key={`Menu Item ${key}`}>{entity}</React.Fragment>))}
                        </svg>
                        <div className="menu-item-name">{item.name}</div>
                    </div>))}
            </React.Fragment>);
        // displayed when the dashboard is empty
        const renderBlankTile = (<div className="blank">
                <svg width="24" height="24" viewBox="0 0 24 24" fill={this.palette[0]}>
                    <path d="M4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H16L12,22L8,18H4A2,2 0 0,1 2,16V4A2,2 0 0,1 4,2M4,4V16H8.83L12,19.17L15.17,16H20V4H4M11,6H13V9H16V11H13V14H11V11H8V9H11V6Z"/>
                </svg>
                <div>Click on an item on the menu bar to add the new tile to the dashboard.</div>
            </div>);
        // list of tiles
        const renderTiles = (<React.Fragment>
                {tiles.map((item, index) => (<Tile header={item.name} content={this.getTileContent(item.name)} onRemove={this.removeTile.bind(this)} index={index} key={item.key}/>))}
            </React.Fragment>);
        const renderDashboard = tiles.length ? renderTiles : renderBlankTile;
        return (<div className="container">
				<div className={`menu ${isWideMenu ? 'menu--open' : ''}`}>
					{renderMenuToggle}
					{renderMenuItems}
				</div>
				<div className="hr"/>
				<div className="content">
					<div className="dashboard">{renderDashboard}</div>
				</div>
            </div>);
    }
}
