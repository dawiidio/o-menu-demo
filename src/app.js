import './scss/main.scss';
// import oMenu
import oMenu from 'o-menu';
import vis from 'vis';
// helper function
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomImage = () => `https://randomuser.me/api/portraits/men/${randomInRange(0, 100)}.jpg`;

const display = document.querySelector('.display-content');

const setContent = str => display.innerHTML = str;

const cGroups = {
    c1: {
        color: '#E91E63'
    },
    c2: {
        color: '#3F51B5'
    },
    c3: {
        color: '#009688'
    },
    c4: {
        color: '#4CAF50'
    },
    c5: {
        color: '#FFC107'
    },
    c6: {
        color: '#795548'
    },
    c7: {
        color: '#00BCD4'
    },
    c8: {
        color: '#F44336'
    },
    c9: {
        color: '#CDDC39'
    }
}

var nodes = [
    {id: 0,  group: 'c4', label: '8'},
    {id: 1,  group: 'c4', label: '12'},
    {id: 2,  group: 'c4', label: '74'},
    {id: 3,  group: 'c4'},
    {id: 4,  group: 'c4'},
    {id: 5,  group: 'c4'},
    {id: 6,  group: 'c3'},
    {id: 7,  group: 'c3'},
    {id: 8,  group: 'c3'},
    {id: 9,  group: 'c1'},
    {id: 10, group: 'c1'},
    {id: 11, group: 'c1'},
    {id: 12, group: 'images', image: getRandomImage()},
    {id: 13, group: 'images', image: getRandomImage()},
    {id: 14, group: 'images', image: getRandomImage()},
    {id: 15, group: 'c5'},
    {id: 16, group: 'c5'},
    {id: 17, group: 'c5'},
    {id: 18, group: 'c8', label: '42'},
    {id: 19, group: 'c8', label: '91'},
    {id: 20, group: 'c8', label: '5'},
    {id: 21, group: 'c7'},
    {id: 22, group: 'c7'},
    {id: 23, group: 'c7'},
    {id: 24, group: 'images', image: getRandomImage()},
    {id: 25, group: 'images', image: getRandomImage()},
    {id: 26, group: 'images', image: getRandomImage()},
    {id: 27, group: 'c6'},
    {id: 28, group: 'c6'},
    {id: 29, group: 'c6'}
];
var edges = [{from: 1, to: 0},
    {from: 2, to: 0},
    {from: 4, to: 3},
    {from: 5, to: 4},
    {from: 4, to: 0},
    {from: 7, to: 6},
    {from: 8, to: 7},
    {from: 7, to: 0},
    {from: 10, to: 9},
    {from: 11, to: 10},
    {from: 10, to: 4},
    {from: 13, to: 12},
    {from: 14, to: 13},
    {from: 13, to: 0},
    {from: 16, to: 15},
    {from: 17, to: 15},
    {from: 15, to: 10},
    {from: 19, to: 18},
    {from: 20, to: 19},
    {from: 19, to: 4},
    {from: 22, to: 21},
    {from: 23, to: 22},
    {from: 22, to: 13},
    {from: 25, to: 24},
    {from: 26, to: 25},
    {from: 25, to: 7},
    {from: 28, to: 27},
    {from: 29, to: 28},
    {from: 28, to: 0}
]

// create a network
var container = document.getElementById('main');
var data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges)
};
var options = {
    nodes: {
        shape: 'dot',
        size: 30,
        font: {
            size: 32,
            color: '#9c9c9c'
        },
        borderWidth: 2
    },
    edges: {
        width: 2
    },
    groups: {
        images: {
            shape: 'circularImage'
        },
        ...cGroups
    }
};
const network = new vis.Network(container, data, options);

// create menu instance, firstly you need to pass parent element id for menu, secondly default options for menu 
const oMenuInstance = oMenu('o-menu-main', {
    menu: {
        innerCircleRadius: 55,
        openMenuOn: false,
        styles: {
            innerCircle: {
                fill: '#ececec'
            },
            defaults:{
                'z-index': 9999
            }
        }
        // closeMenuOn: false
    },
    nthSlice: {
        contentSize: 22,
        iconDistanceFromInnerCircle: 5,
        parentFillMode: -0.3,
        styles: {
            contentContainer:{
                fontSize: 22,
                color: '#efefef'
            }
        }
    },
    slice: {
        contentSize : 30,
        iconDistanceFromInnerCircle: 10,
        styles: {
            contentContainer:{
                fontSize: 30,
                color: '#efefef'
            },
        }
    },
    onEndCloseAnimation: val => {
        setContent(`You clicked: <strong>${val}</strong>`);
    }
});

network.on('oncontext', event => {
    event.event.preventDefault();
    const id = network.getNodeAt(event.pointer.DOM);

    if(!id){
        setContent('You need to click on any node');
        return false;
    }

    const node = data.nodes.get(id);
    const slices = [];
    const icc = node.image ? `
        <img class="icc-image" src="${node.image}"/>
    ` : ``;

    const icc2 = node.label ? `
        <div class="inner-circle-content">
            <div>${node.label}</div>
            <div>100</div>
        </div>
    ` : ``; 
    const options = {
        menu:{
            innerCircleContent: icc ? icc : icc2
        },
        slices
    };
    
    if(node && !node.image && !node.label){
        options.slice = {
            styles: {
                defaults:{
                    fill: 'rgb(29, 29, 29)',
                    stroke: 'rgb(66, 66, 66)'
                },
                contentContainer:{
                    color: cGroups[node.group].color,
                    fontSize: 28
                }
            }
        };

        slices.push(
            {
                content: '<i class="fa fa-car"></i>',
                value: 'car'
            },
            {
                content: '<i class="fa fa-certificate"></i>',
                value: 'certificate'
            },
            {
                content: '<i class="fa fa-cube"></i>',
                value: 'cube'
            },
            {
                content: '<i class="fa fa-code"></i>',
                value: 'code'
            },
            {
                content: '<i class="fa fa-globe"></i>',
                value: 'globe'
            },
            {
                content: '<i class="fa fa-heart"></i>',
                value: 'heart'
            },
            {
                content: '<i class="fa fa-space-shuttle"></i>',
                value: 'space-shuttle'
            },
            {
                content: '<i class="fa fa-coffee"></i>',
                value: 'coffee'
            }
        );
    }

    if(node && node.label){
        options.slice = {
            styles: {
                defaults:{
                    fill: 'rgb(29, 29, 29)',
                    stroke: 'rgb(66, 66, 66)'
                }
            }
        };

        slices.push(
            {
                content: '+',
                value:'+'
            },
            {
                content: '-',
                value: '-'
            },
            {
                content: '*',
                value: '*'
            },
            {
                content: '/',
                value: '/'
            },
            {
                content: '%',
                value: '%'
            },
            {
                content: '^',
                value: '^'
            }
        );
    }

    if(node && node.image){
        slices.push({
            content: '<i class="fa fa-send"></i>',
            styles:{
                defaults: {
                    fill: '#4CAF50'
                }
            },
            slices: [
                {
                    value: 'message',                        
                    content: '<i class="fa fa-comment"></i>',
                },
                {
                    value: 'mail', 
                    content: '<i class="fa fa-envelope"></i>',
                }
            ]
        },
        {
            content: '<i class="fa fa-share"></i>',
            styles:{
                defaults: {
                    fill: '#009688'
                }
            },
            slices: [
                {
                    value: 'fb',                        
                    content: '<i class="fa fa-facebook"></i>',
                },
                {
                    value: 't', 
                    content: '<i class="fa fa-twitter"></i>',
                },
                {
                    value: 'p', 
                    content: '<i class="fa fa-pinterest"></i>',
                },
                {
                    value: 'gh', 
                    content: '<i class="fa fa-github"></i>',
                },
                {
                    value: 'yt', 
                    content: '<i class="fa fa-youtube"></i>',
                }
            ]
        },
        {
            content: '<i class="fa fa-pencil"></i>',
            styles:{
                defaults: {
                    fill: '#FF9800',
                    value: 'edit'
                }
            }
        },
        {
            content: '<i class="fa fa-remove"></i>',
            styles:{
                defaults: {
                    fill: '#F44336',
                    value: 'remove'
                }
            },
        },
        {
            content: '<i class="fa fa-bar-chart-o"></i>',
            styles:{
                defaults: {
                    fill: '#8BC34A'
                }
            },
            slices: [
                {
                    value: 'pie-chart',                        
                    content: '<i class="fa fa-pie-chart"></i>',
                },
                {
                    value: 'area-chart', 
                    content: '<i class="fa fa-area-chart"></i>',
                }
            ]
        });
    }
    
    if(node && !node.image){
        options.menu.styles =  {
            innerCircle: {
                fill : cGroups[node.group].color
            }
        }
    }
    
    oMenuInstance.open(event.event, options);
})